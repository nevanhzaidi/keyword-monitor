import { Router } from 'express';
import { listPosts, listUpdates } from '../controllers/postController';

const router = Router();

router.get('/posts', listPosts);
router.get('/updates', listUpdates);

export default router;
