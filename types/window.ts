// Google Analytics gtag types
export interface GtagEvent {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
}

export interface Gtag {
    (command: 'event', eventName: string, eventParams?: GtagEvent): void;
    (command: 'config', targetId: string, config?: any): void;
    (command: 'set', params: any): void;
    (command: string, ...args: any[]): void;
}

declare global {
    interface Window {
        gtag?: Gtag;
    }
}

export {};
