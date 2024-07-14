//Src/controllers/productController.js
import Product from '../models/productModel.js';

// Controler pentru obținerea tuturor produselor
export async function getAllProducts(req, res) {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

// Controler pentru căutarea produselor pe baza unui query
export async function getProductsByQuery(req, res) {
    const { query, bloodType } = req.query;
    if (!query || query.trim().length === 0) {
        return res.status(400).json({ message: "Query must be a non-empty string" });
    }
    try {
        const products = await Product.find({
            title: { $regex: new RegExp(query), $options: 'i' }
        });
        // Filtrarea produselor în funcție de compatibilitatea cu tipul de sânge
        const filteredProducts = products.map(product => ({
            ...product._doc,
            isAllowed: isProductAllowed(bloodType, product)
        }));
        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

// Funcție ajutătoare pentru a determina dacă un produs este permis pentru un tip de sânge
function isProductAllowed(bloodType, product) {
    // Logica specifică de validare bazată pe tipul de sânge și produs
    return true; // Sau false, în funcție de reguli
}
