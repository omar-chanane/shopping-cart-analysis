import {Request, Response} from 'express';
import {connectToDatabase} from '../utils/db';
import {Product} from '../models/productModel';
import {Sale} from '../models/saleModel';


export const getTotalSales = async (req: Request, res: Response) => {
    const {startDate, endDate} = req.query;
    try {
        const db = await connectToDatabase();
        const salesCollection = db.collection<Sale>('sales');
        const totalSales = await salesCollection.aggregate([
            {
                $match: {
                    Date: {
                        $gte: new Date(startDate as string).toISOString().split('T')[0],
                        $lte: new Date(endDate as string).toISOString().split('T')[0]
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    TotalAmount: {
                        $sum: {$toDouble: "$TotalAmount"}
                    },
                },
            },
        ]).toArray();
        res.json({totalSales: totalSales[0]?.TotalAmount || 0});
    } catch (error) {
        console.error('Erreur lors du calcul des ventes totales:', error);
        res.status(500).json({error: 'Erreur interne.'});
    }
};
export const getTopProducts = async (req: Request, res: Response) => {
    try {
        const db = await connectToDatabase();
        const salesCollection = db.collection<Sale>('sales');
        const productsCollection = db.collection<Product>('products');

        const topProducts = await salesCollection.aggregate([
            {
                $group: {
                    _id: '$ProductID',
                    totalQuantity: {$sum: {$toInt: "$Quantity"}},
                    totalAmount: {$sum: {$toDouble: "$TotalAmount"}},
                },
            },
            {$sort: {totalQuantity: -1}},
            {$limit: 3},
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'ProductID',
                    as: 'product_details',
                },
            },

            {$unwind: '$product_details'},
            {
                $project: {
                    productName: '$product_details.ProductName',
                    totalQuantity: 1,
                    totalAmount: 1,
                },
            },
        ]).toArray();

        res.json(topProducts);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits les plus vendus:', error);
        res.status(500).json({error: 'Erreur interne.'});
    }
};
export const getCategorySales = async (req: Request, res: Response) => {
    try {
        const db = await connectToDatabase();
        const salesCollection = db.collection<Sale>('sales');
        const categorySales = await salesCollection.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'ProductID',
                    foreignField: 'ProductID',
                    as: 'product_details',
                },
            },
            { $unwind: '$product_details' },
            {
                $group: {
                    _id: '$product_details.Category',
                    totalSales: {$sum: {$toDouble: "$TotalAmount"}},
                    totalQuantity: {$sum: {$toInt: "$Quantity"}},
                },
            },
            {
                $sort: { totalSales: -1 },
            },
        ]).toArray();

        const totalSalesOverall = categorySales.reduce((sum, category) => sum + category.totalSales, 0);
        const categorySalesWithPercentage = categorySales.map((category) => ({
            category: category._id,
            totalSales: category.totalSales,
            totalQuantity: category.totalQuantity,
            percentage: ((category.totalSales / totalSalesOverall) * 100).toFixed(2),
        }));
        res.json(categorySalesWithPercentage);
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes par catégorie:', error);
        res.status(500).json({ error: 'Erreur interne.' });
    }
};