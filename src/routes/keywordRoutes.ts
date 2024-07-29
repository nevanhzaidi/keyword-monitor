import { Router } from 'express';
import { addKeyword, listKeywords } from '../controllers/keywordController';

const router = Router();

router.post('/keywords', addKeyword);
router.get('/keywords', listKeywords);

export default router;
