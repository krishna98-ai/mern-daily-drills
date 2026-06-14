import Router from 'express';
import { createExpense, getAllExpenses, deleteExpense, updateExpense } from '../controllers/expense.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';
const router = Router();
router.use(verifyJWT);
router.route('/').post(createExpense)
  .get(getAllExpenses);

router.route('/:id').delete(deleteExpense)
  .put(updateExpense);  
  export default router;
  