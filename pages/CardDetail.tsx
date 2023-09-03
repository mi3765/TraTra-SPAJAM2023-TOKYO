"use client"
import React, { useState } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

export const CardDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = () => {
        // 確認ボタンがクリックされた際の処理をここに追加
        setIsModalOpen(false); // モーダルを閉じる例
        
    };

    const handleCancel = () => {
        // キャンセルボタンがクリックされた際の処理をここに追加
        setIsModalOpen(false); // モーダルを閉じる例
    };

    return (
        <div>
            <h1>CardDetail</h1>
            <p>Tag</p>
            <p>Price</p>
            <div onClick={() => {
                setIsModalOpen(true);
                window.open("https://buy.stripe.com/test_8wM6qE4Ut59x8uYdQQ", '_blank');
                }} >
                <Button text="購入" />
            </div>

            {isModalOpen && (
                <Modal
                    message="本当に購入しますか？"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};
