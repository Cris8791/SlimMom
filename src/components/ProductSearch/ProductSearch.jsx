import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductSearch({ bloodType }) {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (query.length > 1) {  // Pentru a evita prea multe request-uri, poți limita căutarea pentru query-uri mai mari de un caracter
                const response = await axios.get(`http://localhost:5000/api/products/search?query=${query}&bloodType=${bloodType}`);
                setProducts(response.data);
            }
        };

        fetchProducts();
    }, [query, bloodType]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <ul>
                {products.map(product => (
                    <li key={product._id} style={{ color: product.isAllowed ? 'green' : 'red' }}>
                        {product.title} {product.isAllowed ? '' : '(Not Allowed)'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductSearch;
