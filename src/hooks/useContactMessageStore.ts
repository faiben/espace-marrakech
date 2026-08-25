"use client";

import { useState, useEffect, useCallback } from "react";
import { ContactMessage } from "@/types";
import { supabase } from "@/lib/supabase";

function toCamel(obj: Record<string, unknown>): ContactMessage {
  const r: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    r[k.replace(/_([a-z])/g, (_: string, c: string) => c.toUpperCase())] = v;
  }
  return r as unknown as ContactMessage;
}

function toSnake(obj: Record<string, unknown>): Record<string, unknown> {
  const r: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    r[k.replace(/[A-Z]/g, (c) => "_" + c.toLowerCase())] = v;
  }
  return r;
}

export function useContactMessageStore() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("contact_messages").select("*");
      if (data) setMessages(data.map(toCamel));
      setLoaded(true);
    })();
  }, []);

  const addMessage = useCallback(async (msg: Omit<ContactMessage, "id" | "createdAt" | "status">) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      status: "unread",
      createdAt: new Date().toISOString(),
    };
    const { error } = await supabase.from("contact_messages").insert(toSnake(newMsg as unknown as Record<string, unknown>));
    if (error) throw new Error(error.message);
    setMessages((prev) => [newMsg, ...prev]);
    return newMsg;
  }, []);

  const markRead = useCallback(async (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "read" as const } : m)));
    await supabase.from("contact_messages").update({ status: "read" }).eq("id", id);
  }, []);

  const deleteMessage = useCallback(async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await supabase.from("contact_messages").delete().eq("id", id);
  }, []);

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return { messages, unreadCount, addMessage, markRead, deleteMessage, loaded };
}
