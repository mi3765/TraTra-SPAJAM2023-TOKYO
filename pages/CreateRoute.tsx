import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal';
import UploadPicture from '@/components/UploadPicture'; // 1. UploadPictureのインポート
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'; // 2. AddPhotoAlternateIconのインポート
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { app, db } from "@/firebase/firebase";
import Map from "@/pages/api/Map";
import Header from '@/components/Header';
import { Footer } from '@/components/Footer ';

const CreateRoute = () => {
    const [routeName, setRouteName] = useState('');
    const [routeDescription, setRouteDescription] = useState('');
    const [tags, setTags] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const router = useRouter();

    const handleRouteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRouteName(e.target.value);
    };

    const handleRouteDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRouteDescription(e.target.value);
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value);
    };

    const handleCreateRoute = () => {
        if (!routeName || !routeDescription || !tags) {
            alert('全てのフィールドは必須です');
            return;
        }
        setShowConfirmationModal(true);
    };

    const handleConfirmCreateRoute = async () => {
        const auth = getAuth(app);
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error("User is not authenticated.");
            alert("ユーザーが認証されていません。ログインしてください。"); // 3. エラー処理の強化
            setShowConfirmationModal(false);
            return;
        }

        try {
            const newRoute = {
                mapUrl: "TODO: Set your map URL here",
                created_by: currentUser.displayName || "Unknown User",
                created_at: serverTimestamp()
            };

            await addDoc(collection(db, "routes"), newRoute);
            console.log("Route successfully added!");

            router.push("/");
            setShowConfirmationModal(false);

        } catch (error) {
            console.error("Error adding route:", error);
            alert("ルートの追加中にエラーが発生しました。"); // 3. エラー処理の強化
        }
    };

    const handleCloseModal = () => {
        setShowConfirmationModal(false);
    };

    return (
        <div>
            <Header/>
            <div className="max-w-lg mx-auto mt-6 p-6 bg-white">
                <h1 className="text-2xl font-semibold mb-4 text-center">Create Route</h1>
                <div className="text-center my-10">
                    <Map />
                </div>
                <UploadPicture />
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="routeName">
                        ルート名
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="routeName"
                        type="text"
                        placeholder="ルート名を入力"
                        value={routeName}
                        onChange={handleRouteNameChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="routeDescription">
                        ルートの詳細説明
                    </label>
                    <textarea
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="routeDescription"
                        rows={4}
                        placeholder="ルートの詳細説明を入力"
                        value={routeDescription}
                        onChange={handleRouteDescriptionChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                        タグ
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tags"
                        type="text"
                        placeholder="タグを追加"
                        value={tags}
                        onChange={handleTagsChange}
                        required
                    />
                </div>
                <div className="text-center mt-10">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleCreateRoute}
                    >
                        ルートを出品
                    </button>
                </div>
            </div>

            {showConfirmationModal && (
                <Modal
                    message="本当に出品しますか？"
                    onConfirm={handleConfirmCreateRoute}
                    onCancel={handleCloseModal}
                />
            )}
            <Footer/>
        </div>
    );
};

export default CreateRoute;
