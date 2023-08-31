'use client'

import { useState } from 'react';
import { useRouter } from 'next/router'; // 1. useRouterをインポート
import supabase from '@/lib/supabase';

export const Login = () => {
    const router = useRouter(); // 1. useRouterのインスタンスを作成
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // 2. loadingステートを追加

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // 2. リクエスト開始時にloadingをtrueに設定

        const { error, data } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
            setLoading(false); // エラーが発生した場合、loadingをfalseに設定
            return;
        }

        if (data) {
            router.push('/'); // 3. Loginが成功したらルートページにリダイレクト
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <h1 className="text-center text-2xl font-extrabold text-gray-900">Login</h1>
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-login" className="sr-only">Email address</label>
                            <input
                                id="email-login"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password-login" className="sr-only">Password</label>
                            <input
                                id="password-login"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading} // 2. loading中はボタンを無効化
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;