import { fr } from "./fr";
import { ar } from "./ar";
import { en } from "./en";

export type TranslationKeys = typeof fr;

const translations = { fr, en, ar } as const;

export default translations;
