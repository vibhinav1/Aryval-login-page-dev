"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RequestResetPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!email) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/localdb/reset/send-reset-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'Password reset email sent successfully!');
            } else {
                setError(data.error || 'An error occurred while sending the reset link.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to send the reset link. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Request Password Reset</h1>
            {message && <p className="text-green-500 text-center">{message}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="input input-bordered w-full py-2 px-4"
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-outline w-full py-3"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </div>
            </form>
            <div className="flex flex-col items-center mt-4">
                <button
                    className="btn btn-outline w-full py-3"
                    onClick={() => router.push('/login-page')}
                >
                    Go back to Login
                </button>
            </div>
        </div>
    );
};

export default RequestResetPage;
