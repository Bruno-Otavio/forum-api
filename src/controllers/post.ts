import { Request, Response } from 'express';
import Post from '../models/post.model.ts';

import IPost from '../ts/interfaces/post.interface.ts';
import IComment from '../ts/interfaces/comment.interface.ts';
import IResult from '../ts/interfaces/result.interface.ts';

const get = async (req: Request, res: Response) => {
	try {
		const { limit, cursor } = req.query;
		const defaultLimit = 10;

		const basePath: string = '/api/post';
		let result: IResult;
		const qLimit: number = !limit ? defaultLimit : parseInt(limit as string);

		if (!cursor) {
			const posts: Array<IPost> = await Post.find().limit(qLimit).exec();
			const next_cursor = posts[posts.length-1].createdAt.toISOString();

			result = {
				total: posts.length,
				next_cursor: posts.length < qLimit
					? null
					: `${basePath}?limit=${limit}&cursor=${next_cursor}`,
				previous_cursor: null,
				result: posts,
			};
		} else {
			const posts: Array<IPost> = await Post.find({ createdAt: { $gte: cursor } }).limit(qLimit).exec();

			const next_cursor = posts[posts.length-1].createdAt.toISOString();
			const previous_cursor = posts[0].createdAt.toISOString();

			result  = {
				total: posts.length,
				next_cursor: posts.length < qLimit
					? null
					: `${basePath}?limit=${limit}&cursor=${next_cursor}`,
				previous_cursor: `${basePath}?limit=${limit}&cursor=${previous_cursor}`,
				result: posts,
			};
		}
		
		res.status(200).json(result).end();
	} catch (err) {
		res.status(500).json({ message: `Something went wrong: ${err}` }).end();
	}
}

const getById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const post: IPost | null = await Post.findById(id).exec();
		res.status(200).json(post).end();
	} catch (err) {
		res.status(404).json({ message: `${err}` }).end();
	}
}

const create = async (req: Request, res: Response) => {
	try {
		const post: IPost | null = await Post.create(req.body);
		res.status(201).json(post).end();
	} catch (err) {
		res.status(400).json({ message: `${err}` }).end();
	}
}

const update = async (req: Request, res: Response) => {}

const del = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const post: IPost | null = await Post.findByIdAndDelete(id).exec();

		if (post) {
			res.status(200).json({ message: 'Post deleted successfully' }).end();
		} else {
			res.status(404).json({ message: 'Could not found post' }).end();
		}
	} catch (err) {
		res.status(400).json({ message: `${err}` }).end();
	}
}

export default {
	get,
	getById,
	create,
	update,
	del,
};

