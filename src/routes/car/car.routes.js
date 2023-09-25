import { Router } from 'express';
const router = Router();
import { UploadFile } from '../../middlewares/multer.middleware.js';
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';


export default router
