import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (authorization) {
		const token: string = authorization.split(' ')[1];

		jwt.verify(token, processs.env.JWT_KEY, (err, user) => {
			if (err) {
				res.status(403).end();
			}
		});
	} else {
		res.status(401).json({ message: 'Please send auth token' }).end();
	}
}

export default verifyToken;

