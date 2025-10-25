import { toast as sonnerToast } from "sonner";

type ToastVariant = "default" | "destructive";

interface ToastOptions {
    title?: string;
    description?: string;
    variant?: ToastVariant;
}

export function toast({ title, description, variant }: ToastOptions) {
    const message = title || description || "";
    const desc = title && description ? description : undefined;

    if (variant === "destructive") {
        return sonnerToast.error(message, {
            description: desc,
        });
    }

    return sonnerToast(message, {
        description: desc,
    });
}

export function useToast() {
    return {
        toast,
        dismiss: sonnerToast.dismiss,
    };
}
