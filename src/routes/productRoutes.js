//Src/routes/productRoutes.js
import express from 'express';
import { getAllProducts, getProductsByQuery } from '../controllers/productController.js';

const router = express.Router();

// Ruta pentru a obține toate produsele
router.get('/products', getAllProducts);

// Ruta pentru căutarea produselor pe baza query-ului
router.get('/products/search', getProductsByQuery);

export default router;
