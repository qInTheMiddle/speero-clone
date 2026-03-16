'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [stage, setStage] = useState<'enter-phone' | 'enter-code'>('enter-phone');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const { login } = useAuth();

    const handleVerifyCode = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),  
            });
            if (response.ok) {
                alert('Login Successful');
                const data = await response.json();
                login(data.user);
                router.push('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'An error occured');
            }
        } catch (err) {
            setError('Failed to connect to the server.');
        } finally {
            setIsLoading(false);
        }
        
        // console.log('Logging in with:', code);
        // setTimeout(() => setIsLoading(false), 1500);
    };

    const handleSendCode = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Requesting code for ${phoneNumber} phone number`);
        setStage('enter-code');
    };

    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="p-8 rounded-lg shadow-md w-full max-w-md">
            {error && <div className="text-red-500">{error}</div>}
            {/* <form onSubmit={handleSubmit} className="space-y-4">
                
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-3 border rounded-lg" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-3 border rounded-lg" />

                <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white p-3 rounded-lg font-bold">
                    {isLoading ? "Checking..." : "Login"}
                </button>
            </form> */}
            {stage === 'enter-phone' ? (
                <form onSubmit={handleSendCode} className="space-y-4">
                    <p>Enter mobile number</p>
                    <div className="flex items-center border rounded-lg p-3">
                        <span className="text-gray-500 pr-2 border-r mr-2">+966</span>
                        <input 
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="5xxxxxxxx"
                            maxLength={9}
                            required
                            className="w-full p-3 border rounded-lg bg-gray-300 text-black"
                        />
                    </div>
                    <button type="submit" className="w-full bg-red-600 text-white p-3 rounded-lg font-bold">
                        Send Code
                    </button>
                </form>

            ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                    <p>Enter code to sent to {phoneNumber}.</p>
                    <input 
                        type="number"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="----"
                        maxLength={4}
                        required
                        className="w-full p-3 border rounded-lg bg-gray-300 text-black tracking-[1em]"
                    />
                    <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white p-3 rounded-lg font-bold">
                        {isLoading ? "Verifying..." : "Verify & Login"}
                    </button>
                </form>
            )}
            </div>
        </div>
        </>
            
    )
}