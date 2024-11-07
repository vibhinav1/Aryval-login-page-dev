"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Cookies from "js-cookie";

export function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return (
            password.length >= minLength &&
            hasUppercase &&
            hasLowercase &&
            hasNumber &&
            hasSpecialChar
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate inputs
        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
            return;
        }

        const sanitizedEmail = DOMPurify.sanitize(email);
        const sanitizedPassword = DOMPurify.sanitize(password);

        try {
            const response = await fetch("/api/localdb/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: sanitizedEmail, password: sanitizedPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Failed to login. Please try again.");
                return;
            }

            const { token, ...accountInfo } = await response.json();

            if (!token) {
                setError("Login successful, but no session token received.");
                return;
            }

            console.log("Login successful:", accountInfo);
            Cookies.set("sessionToken", token, { expires: 1, secure: true });
            router.push("/schools");
        } catch (err) {
            console.error("Login error:", err);
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="email">Email</label>
                    <input
                        className="input input-bordered w-full py-2 px-4"
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(""); 
                        }}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="password">Password</label>
                    <input
                        className="input input-bordered w-full py-2 px-4"
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <br />
                <div className="flex flex-col">
                    <button className="btn btn-outline w-full py-3" type="submit">Login</button>
                    <button
                        type="button"
                        onClick={() => router.push("/request-reset-page")}
                        className="text-blue-500 underline mt-2 self-end"
                    >
                        Forgot Account?
                    </button>
                </div>
            </form>
            <div className="flex flex-col items-center mt-4">
                <button className="btn btn-outline w-full py-3" onClick={() => router.push("/account-info-page")}>
                    Create Account
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
