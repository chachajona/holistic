export const languages = [
    { id: "vi", title: "Tiếng Việt", isDefault: true },
    { id: "en", title: "English", isDefault: false },
] as const;

export const baseLanguage = languages.find(l => l.isDefault)!;

export type Locale = (typeof languages)[number]["id"];

export const isValidLocale = (locale: string): locale is Locale =>
    languages.some(lang => lang.id === locale);
