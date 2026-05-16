import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAccounts, getAccountById, getAccountTransactions, getAllAccounts } from '../controllers/accountController';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAccounts);
router.get('/browse/all', getAllAccounts);
router.get('/:accountId', getAccountById);
router.get('/:accountId/transactions', getAccountTransactions);

export default router;