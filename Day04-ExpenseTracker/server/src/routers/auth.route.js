import Router from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';
import { login, logout,register,getCurrentUser,refreshAccessToken,changePassword } from '../controllers/user.controller.js';        

const router = Router();

router.route('/login').post(login);
router.route('/logout').post(verifyJWT, logout);
router.route('/register').post(register);
router.route('/me').get(verifyJWT, getCurrentUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(verifyJWT, changePassword);

export default router;
