
import React, { useState, useEffect } from "react";
import { db } from "../firebase/setup";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(), 
                }));
                setProducts(productList);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-white">Loading products...</div>;
    }

    if (products.length === 0) {
        return <div className="text-white">No products available.</div>;
    }

    return (
        <div className="w-full h-auto p-10 bg-[#1a1a1a] text-white">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-[#2a2a2a] p-4 rounded-md flex flex-col items-center"
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-md mb-4 cursor-pointer"
                            onClick={() => navigate(`/product/${product.id}`)} // Navigate to product details
                        />
                        <h2 className="text-lg font-semibold mb-2">
                            {product.name}
                        </h2>
                        <p className="text-sm text-gray-400 mb-2">
                            {product.category}
                        </p>
                        <p className="text-xl font-bold mb-4">${product.price}</p>
                        <button className="py-2 px-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200">
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
