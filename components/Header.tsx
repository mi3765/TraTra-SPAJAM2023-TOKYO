"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { app, db } from "@/firebase/firebase";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

const Header = () => {
    const auth = getAuth(app);
    const [userName, setUserName] = useState<string | null>(null);
    const [isSearchActive, setIsSearchActive] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists() && userDoc.data().user_name) {
                        setUserName(userDoc.data().user_name);
                    } else {
                        console.error("User document doesn't exist or user_name field is missing.");
                        setUserName(null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.log("User is not authenticated.");
                setUserName(null);
            }
        });

        return () => unsubscribe();
    }, [auth, db]);


    const handleSearchIconClick = () => {
        setIsSearchActive(!isSearchActive);
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("Successfully signed out");
            setUserName(null); // ユーザー名をリセット
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };

    const router = useRouter();

    const handleClickHome = () => {
        router.push("/");
    }


    return (
        <header className={`bg-blue-600 p-4 text-white ${isSearchActive ? 'h-auto' : ''}`}>
            <div className="container mx-auto flex justify-between items-center">
                {isSearchActive ? (
                    <input
                        type="text"
                        className="bg-white text-black rounded p-2 flex-grow mr-4"
                        placeholder="検索..."
                    />
                ) : (
                    <h1 className="text-2xl font-bold cursor-pointer" onClick={handleClickHome}>
                        TraTra
                    </h1>
                )}

                <nav className='flex items-center mt-1'>
                    <div className='mr-4'>
                        {userName ? (
                            <>
                                <span className="mr-4">{userName}</span>
                                <button onClick={handleSignOut}>Logout</button>
                            </>
                        ) : (
                            <>
                                {isSearchActive ? null : (
                                    <>
                                        <Link href="/Signup" className="mr-4">
                                            Signup
                                        </Link>
                                        <Link href="/Login">
                                            Login
                                        </Link>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <SearchIcon onClick={handleSearchIconClick} />
                </nav>
            </div>
        </header>
    );
}

export default Header;