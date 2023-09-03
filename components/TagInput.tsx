"use client"
import React, { useState } from 'react';

interface TagInputProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = () => {
        if (tagInput.trim() === '') return; // 空のタグを追加しない
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                タグ
            </label>
            <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="bg-blue-500 text-white font-bold py-1 px-2 rounded-full mr-2 mt-2"
                    >
                        {tag}
                    </div>
                ))}
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tags"
                    type="text"
                    placeholder="タグを追加"
                    value={tagInput}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleAddTag();
                    }}
                />
            </div>
        </div>
    );
};

export default TagInput;