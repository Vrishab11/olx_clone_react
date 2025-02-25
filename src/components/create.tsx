
import React, { useState } from "react";
import { db } from "../firebase/setup";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateP = () => {
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate()


    const CLOUD_NAME = "dqgvsn0wt";
    const UPLOAD_PRESET = "oolx_clone";

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) {
            setError("Please upload an image.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();
            console.log("Cloudinary upload response:", data);

            const product = {
                name,
                category,
                price,
                imageUrl: data.secure_url,
                createdAt: new Date(),
            };

            await addDoc(collection(db, "products"), product);
            console.log("Product submitted:", product);

            navigate('/')

            setError(null);
            setSuccess(true);
            setName("");
            setCategory("");
            setPrice(0);
            setImage(null);
            setImagePreview(null);
        } catch (err) {
            console.error("Error uploading image or saving product:", err);
            setError("Failed to submit product. Please try again.");
        }
    };

    return (
        <div className="w-full h-screen flex flex-col bg-[#1a1a1a] p-20 justify-center items-center">
            <div className="w-full max-w-[450px] text-center text-white mb-10">
                <h1 className="text-4xl font-bold mb-4">Create Product</h1>
                <p className="text-lg text-gray-400">
                    Fill in the details below to add a new product to your catalog.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-[450px]">
                <div className="w-full flex flex-col mb-6">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                    />
                </div>
                {imagePreview && (
                    <div className="w-full flex flex-col items-center mb-4">
                        <p className="text-white mb-2">Image Preview:</p>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-[100px] h-[100px] rounded-md"
                        />
                    </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {success && (
                    <p className="text-green-500">Product submitted successfully!</p>
                )}
                <button
                    type="submit"
                    className="w-full bg-white text-black py-2 font-semibold rounded-md hover:bg-gray-200"
                >
                    Submit Product
                </button>
            </form>
        </div>
    );
};

export default CreateP;


