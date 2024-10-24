export interface FormData {
    label: string;
    heading: string;
    formType: "newsletter" | "register" | "contact";
    newsletterFields?: {
        emailPlaceholder: string;
    };
    registerFields?: {
        namePlaceholder: string;
        emailPlaceholder: string;
        passwordPlaceholder: string;
    };
    contactFields?: {
        namePlaceholder: string;
        emailPlaceholder: string;
        messagePlaceholder: string;
        phonePlaceholder: string;
    };
    submitButtonText: string;
}
