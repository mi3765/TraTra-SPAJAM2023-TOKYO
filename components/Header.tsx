'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import supabase from '@/lib/supabase';
import { User } from '@supabase/supabase-js'; 

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
            // console.log("Fetched user from auth:", data?.user); // ユーザー情報のログ

            if (data?.user) {
                const { data: userData } = await supabase
                    .from('users')
                    .select('user_name')
                    .eq('id', data.user.id)
                    .single();
                
                setUserName(userData?.user_name || null);
                // console.log("Fetched user_name from users table:", userData?.user_name); // user_nameのログ
            }
        };
        fetchUser();
    
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user || null);
            // console.log("User from session change:", session?.user); // セッション変更時のユーザー情報のログ

            if (session?.user) {
                const { data: userData } = await supabase
                    .from('users')
                    .select('user_name')
                    .eq('id', session.user.id)
                    .single();
                
                setUserName(userData?.user_name || null);
                // console.log("Fetched user_name from users table on session change:", userData?.user_name); // セッション変更時のuser_nameのログ
            }
        });
    
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        console.log("Attempting to log out...");
        try {
            await supabase.auth.signOut();
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };        

    return (
        <header className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">My App</h1>
                <nav>
                    {user ? (
                        <>
                            <span className="mr-4">{userName}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/Signup" className="mr-4">
                                Signup
                            </Link>
                            <Link href="/Login">
                                Login
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
