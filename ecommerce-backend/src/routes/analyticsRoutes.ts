import { Router } from 'express';
import { getTotalSales, getTopProducts, getCategorySales } from '../controllers/analyticsController';

const router = Router();

router.get('/total_sales', getTotalSales);
router.get('/trending_products', getTopProducts);
router.get('/category_sales', getCategorySales);

export default router;