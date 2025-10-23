"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DashboardLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("Authentication failed. Please try again.");
            if (process.env.NODE_ENV === "development") {
                console.error("Login error:", err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="font-roboto bg-brown-50 flex min-h-screen items-center justify-center p-4">
            <Card className="border-brown-300 bg-primary-background w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="font-robotoSlab text-primary-text text-2xl font-bold">
                        Dashboard Login
                    </CardTitle>
                    <CardDescription className="text-primary-text/60">
                        Sign in with your email and password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-primary-text">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={isLoading}
                                required
                                className="border-brown-300 bg-brown-50 text-primary-text placeholder:text-primary-text/40"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-primary-text"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                                className="border-brown-300 bg-brown-50 text-primary-text placeholder:text-primary-text/40"
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-700">{error}</p>
                        )}
                        <Button
                            type="submit"
                            className="bg-navbar-accent-background text-navbar-text hover:bg-navbar-accent-background/90 w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Authenticating..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
