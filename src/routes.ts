import express, { Request, Response  } from 'express';

import Auth from './controllers/auth';
import User from './controllers/user';
import Post from './controllers/post';
import Comment from './controllers/comment';

const router = express.Router();

router.get('/api', (req: Request, res: Response) => {
	res.send('API working fine.');
});

router.post('/api/auth/login', Auth.login);
router.post('/api/auth/register', Auth.register);

router.get('/api/user/:id', User.getById);
router.put('/api/user/:id', User.update);
router.delete('/api/user/:id', User.del);

router.get('/api/post', Post.get);
router.get('/api/post/:id', Post.getById);
router.post('/api/post', Post.create);
router.put('/api/post/:id', Post.update);
router.delete('/api/post/:id', Post.del);

router.get('/api/comment', Comment.get);
router.get('/api/comment/:id', Comment.getById);
router.post('/api/comment', Comment.create);
router.delete('/api/comment/:id', Comment.del);

export default router;

