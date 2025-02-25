import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/setup";
import { doc, getDoc } from "firebase/firestore";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const productDoc = await getDoc(doc(db, "products", id!));
                if (productDoc.exists()) {
                    setProduct({ id: productDoc.id, ...productDoc.data() });
                } else {
                    console.error("No product found!");
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-white">Loading product...</div>;
    }

    if (!product) {
        return <div className="text-white">Product not found.</div>;
    }

    return (
        <div className="w-full h-auto p-10 bg-[#1a1a1a] text-white">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full md:w-1/2 h-auto rounded-md mb-4 md:mb-0"
                />
                <div className="md:ml-10">
                    <p className="text-lg text-gray-400 mb-2">
                        Category: {product.category}
                    </p>
                    <p className="text-2xl font-bold mb-4">${product.price}</p>
                    <p className="text-md text-gray-300 mb-4">
                        This is a detailed view of the product.
                    </p>
                    <button className="py-2 px-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
