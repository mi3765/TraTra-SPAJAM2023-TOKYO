"use client"
import React from 'react';

const Modal = ({ message, onConfirm, onCancel, }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            {/* モーダルコンテンツ */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <p>{message}</p>
                <div className="mt-4 text-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                        onClick={onConfirm}
                    >
                        はい
                    </button>
                    <button
                        className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={onCancel}
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
