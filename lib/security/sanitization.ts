export function sanitizeSearchTerm(search: string): string {
    if (!search || typeof search !== "string") {
        return "";
    }

    return search
        .replace(/[%_\\]/g, char => `\\${char}`)
        .replace(/['";]/g, "")
        .trim()
        .slice(0, 100);
}

export function escapeILikePattern(value: string): string {
    return value.replace(/[%_\\]/g, char => `\\${char}`);
}
