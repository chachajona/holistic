import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import MessengerChat from "@/components/common/MessengerChat";

// Mock translations
const mockTranslations = {
    messenger: {
        openChat: "Open Messenger Chat",
        chatWithUs: "Chat with us on Messenger",
    },
};

// Mock useLocale hook
vi.mock("@/providers/LocaleProvider", () => ({
    useLocale: () => ({
        t: (key: string) => {
            const keys = key.split(".");
            let value: any = mockTranslations;
            for (const k of keys) {
                value = value?.[k];
            }
            return value || key;
        },
        locale: "en",
    }),
    LocaleProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("MessengerChat", () => {
    const originalEnv = process.env;
    let gtagMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        process.env = { ...originalEnv };
        gtagMock = vi.fn();
        (window as any).gtag = gtagMock;
    });

    afterEach(() => {
        process.env = originalEnv;
        delete (window as any).gtag;
        vi.clearAllMocks();
    });

    describe("Rendering", () => {
        it("should render the messenger button with valid pageId", () => {
            render(<MessengerChat pageId="123456789012345" />);
            const button = screen.getByTestId("messenger-chat-button");
            expect(button).toBeInTheDocument();
        });

        it("should not render when pageId is missing", () => {
            const consoleSpy = vi
                .spyOn(console, "warn")
                .mockImplementation(() => {});
            render(<MessengerChat pageId="" />);
            expect(
                screen.queryByTestId("messenger-chat-button"),
            ).not.toBeInTheDocument();
            expect(consoleSpy).toHaveBeenCalledWith(
                "MessengerChat: Missing NEXT_PUBLIC_FACEBOOK_PAGE_ID",
            );
            consoleSpy.mockRestore();
        });

        it("should not render with invalid pageId format", () => {
            const consoleSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            render(<MessengerChat pageId="invalid-id" />);
            expect(
                screen.queryByTestId("messenger-chat-button"),
            ).not.toBeInTheDocument();
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining("Invalid PAGE_ID format"),
            );
            consoleSpy.mockRestore();
        });

        it("should use NEXT_PUBLIC_FACEBOOK_PAGE_ID from env when pageId prop is not provided", () => {
            process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID = "987654321098765";
            render(<MessengerChat />);
            const link = screen.getByTestId("messenger-chat-link");
            expect(link).toHaveAttribute(
                "href",
                "https://m.me/987654321098765",
            );
        });

        it("should apply custom className", () => {
            render(
                <MessengerChat
                    pageId="123456789012345"
                    className="custom-class"
                />,
            );
            const widget = screen.getByTestId("messenger-chat-widget");
            expect(widget).toHaveClass("custom-class");
        });

        it("should apply custom theme color", () => {
            render(
                <MessengerChat pageId="123456789012345" themeColor="#ff0000" />,
            );
            const button = screen.getByTestId("messenger-chat-button");
            expect(button).toHaveStyle({ backgroundColor: "#ff0000" });
        });

        it("should apply default theme color when not provided", () => {
            render(<MessengerChat pageId="123456789012345" />);
            const button = screen.getByTestId("messenger-chat-button");
            expect(button).toHaveStyle({ backgroundColor: "#9a7f74" });
        });
    });

    describe("Link generation", () => {
        it("should generate correct messenger URL", () => {
            render(<MessengerChat pageId="123456789012345" />);
            const link = screen.getByTestId("messenger-chat-link");
            expect(link).toHaveAttribute(
                "href",
                "https://m.me/123456789012345",
            );
        });

        it("should have proper link attributes for security", () => {
            render(<MessengerChat pageId="123456789012345" />);
            const link = screen.getByTestId("messenger-chat-link");
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });
    });

    describe("Accessibility", () => {
        it("should have proper aria-label", () => {
            render(<MessengerChat pageId="123456789012345" />);
            const button = screen.getByTestId("messenger-chat-button");
            expect(button).toHaveAttribute(
                "aria-label",
                "Open Messenger Chat",
            );
        });

        it("should display tooltip on hover", async () => {
            const user = userEvent.setup();
            render(<MessengerChat pageId="123456789012345" />);
            const button = screen.getByTestId("messenger-chat-button");

            await user.hover(button);

            // Wait for tooltip to appear (with delay)
            const tooltip = await screen.findByTestId(
                "messenger-chat-tooltip",
                {},
                { timeout: 1000 },
            );
            expect(tooltip).toBeInTheDocument();
            expect(tooltip).toHaveTextContent("Chat with us on Messenger");
        });
    });

    describe("Analytics tracking", () => {
        it("should call onMessengerClick callback when provided", async () => {
            const onMessengerClick = vi.fn();
            const user = userEvent.setup();

            render(
                <MessengerChat
                    pageId="123456789012345"
                    onMessengerClick={onMessengerClick}
                />,
            );

            const link = screen.getByTestId("messenger-chat-link");
            await user.click(link);

            expect(onMessengerClick).toHaveBeenCalledTimes(1);
        });

        it("should track gtag event when gtag is available", async () => {
            const user = userEvent.setup();

            render(<MessengerChat pageId="123456789012345" />);

            const link = screen.getByTestId("messenger-chat-link");
            await user.click(link);

            expect(gtagMock).toHaveBeenCalledWith("event", "messenger_click", {
                event_category: "engagement",
                event_label: "messenger_chat_button",
            });
        });

        it("should not error when gtag is not available", async () => {
            delete (window as any).gtag;
            const user = userEvent.setup();

            render(<MessengerChat pageId="123456789012345" />);

            const link = screen.getByTestId("messenger-chat-link");
            await expect(user.click(link)).resolves.not.toThrow();
        });
    });

    describe("Validation", () => {
        it("should accept pageId with 15 digits", () => {
            render(<MessengerChat pageId="123456789012345" />);
            expect(
                screen.getByTestId("messenger-chat-button"),
            ).toBeInTheDocument();
        });

        it("should accept pageId with 16 digits", () => {
            render(<MessengerChat pageId="1234567890123456" />);
            expect(
                screen.getByTestId("messenger-chat-button"),
            ).toBeInTheDocument();
        });

        it("should accept pageId with 17 digits", () => {
            render(<MessengerChat pageId="12345678901234567" />);
            expect(
                screen.getByTestId("messenger-chat-button"),
            ).toBeInTheDocument();
        });

        it("should reject pageId with less than 15 digits", () => {
            const consoleSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            render(<MessengerChat pageId="12345678901234" />);
            expect(
                screen.queryByTestId("messenger-chat-button"),
            ).not.toBeInTheDocument();
            consoleSpy.mockRestore();
        });

        it("should reject pageId with more than 17 digits", () => {
            const consoleSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            render(<MessengerChat pageId="123456789012345678" />);
            expect(
                screen.queryByTestId("messenger-chat-button"),
            ).not.toBeInTheDocument();
            consoleSpy.mockRestore();
        });

        it("should reject non-numeric pageId", () => {
            const consoleSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            render(<MessengerChat pageId="abc123" />);
            expect(
                screen.queryByTestId("messenger-chat-button"),
            ).not.toBeInTheDocument();
            consoleSpy.mockRestore();
        });
    });
});
