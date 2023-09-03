import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Modal from "./Modal"; // モーダルコンポーネントへの適切なパスを指定してください
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase/firebase";

const UploadPicture = () => {
	const storage = getStorage(app);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const [showModal, setShowModal] = useState(false);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files ? Array.from(event.target.files) : [];
		const urls = files.map((file) => URL.createObjectURL(file));
		setPreviewUrls((prevUrls) => [...prevUrls, ...urls]);
	};

	const handleUploadConfirmation = async () => {
		// Firebase Storageへのアップロードロジック
		for (let url of previewUrls) {
			const response = await fetch(url);
			const blob = await response.blob();
			const filePath = `routes/${new Date().toISOString()}-${blob.size}.jpg`;
			const storageRef = ref(storage, filePath);

			try {
				await uploadBytes(storageRef, blob);
				const downloadURL = await getDownloadURL(storageRef);
				console.log("File uploaded at:", downloadURL);
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		}
		setShowModal(false);
	};

	const removeImage = (index: number) => {
		const updatedPreviewUrls = [...previewUrls];
		updatedPreviewUrls.splice(index, 1);
		setPreviewUrls(updatedPreviewUrls);
	};

	return (
		<div className="text-center">
			<div className="flex flex-wrap justify-center">
				{previewUrls.map((url, index) => (
					<div key={index} className="relative m-2">
						<img
							src={url}
							alt={`Preview ${index}`}
							className="mb-4 w-24 h-24 object-cover rounded"
						/>
						<button
							className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
							onClick={() => removeImage(index)}
						>
							X
						</button>
					</div>
				))}
			</div>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
				onClick={() => {
					const fileInput = document.createElement("input");
					fileInput.type = "file";
					fileInput.multiple = true;
					// fileInput.onchange = handleFileUpload;
					fileInput.click();
				}}
			>
				<div className="flex items-center text-center">
					<AddPhotoAlternateIcon fontSize="large" />
					<p className="m-2">画像を選択</p>
				</div>
			</button>
			{showModal && (
				<Modal
					message="本当にこれらの画像をアップロードしますか？"
					onConfirm={handleUploadConfirmation}
					onCancel={() => setShowModal(false)}
				/>
			)}
		</div>
	);
};

export default UploadPicture;
