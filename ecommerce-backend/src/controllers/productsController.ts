import { Request, Response } from 'express';
import { connectToDatabase } from '../utils/db';
import { Product } from '../models/productModel';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        console.log(page,limit);
        const db = await connectToDatabase();
        const productsCollection = db.collection<Product>('products');
        const products = await productsCollection.find().skip(skip).limit(limit).toArray();
        const totalProducts = await productsCollection.countDocuments();
        res.json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        res.status(500).json({ error: 'Erreur interne.' });
    }
};