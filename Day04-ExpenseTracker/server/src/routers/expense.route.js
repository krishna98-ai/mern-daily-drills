import Router from 'express';
import { createExpense, getAllExpenses, deleteExpense, updateExpense } from '../controllers/expense.controller.js';

const router = Router();
router.route('/').post(createExpense)
  .get(getAllExpenses);

router.route('/:id').delete(deleteExpense)
  .put(updateExpense);  
  export default router;
  