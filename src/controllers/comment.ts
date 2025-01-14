import { Request, Response } from 'express';
import Comment from '../models/comment.model.ts';

import IComment from '../ts/interfaces/comment.interface.ts';
import IResult from '../ts/interfaces/result.interface.ts';

const get = async (req: Request, res: Response) => {
	try {
		const { limit, cursor } = req.query;
		const defaultLimit = 10;

		const basePath: string = '/api/comment';
		let result: IResult;
		const qLimit: number = !limit ? defaultLimit : parseInt(limit as string);

		if (!cursor) {
			const comments: Array<IComment> = await Comment.find().limit(qLimit).exec();
			const next_cursor = comments[comments.length-1].createdAt.toISOString();

			result = {
				total: comments.length,
				next_cursor: comments.length < qLimit
					? null
					: `${basePath}?limit=${limit}&cursor=${next_cursor}`,
				previous_cursor: null,
				result: comments,
			};
		} else {
			const comments: Array<IComment> = await Comment.find({ createdAt: { $gte: cursor } }).limit(qLimit).exec();

			const next_cursor = comments[comments.length-1].createdAt.toISOString();
			const previous_cursor = comments[0].createdAt.toISOString();

			result  = {
				total: comments.length,
				next_cursor: comments.length < qLimit
					? null
					: `${basePath}?limit=${limit}&cursor=${next_cursor}`,
				previous_cursor: `${basePath}?limit=${limit}&cursor=${previous_cursor}`,
				result: comments,
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
		const comment: IComment | null = await Comment.findById(id).exec();
		res.status(200).json(comment).end();
	} catch (err) {
		res.status(404).json({ message: `${err}` }).end();
	}
}

const create = async (req: Request, res: Response) => {}

const update = async (req: Request, res: Response) => {}

const del = async (req: Request, res: Response) => {}

export default {
	get,
	getById,
	create,
	update,
	del,
};

