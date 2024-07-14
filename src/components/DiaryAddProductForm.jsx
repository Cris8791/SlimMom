//Src/components/DiaryAddProductForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const DiaryAddProductForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/products/search?query=${searchTerm}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setProducts([]);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter product name"
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {products.map(product => (
                    <li key={product._id}>{product.title} - {product.calories} calories</li>
                ))}
            </ul>
        </div>
    );
};

export default DiaryAddProductForm;
