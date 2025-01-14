import { Document } from 'mongoose';
import IUser from './user.interface.ts';
import IComment from './comment.interface.ts';

interface IPost extends Document {
	_author: IUser['_id'];
	title: string,
	content: string,
	imageUrl: string | null,
	comments?: <IComment>[],
	metadata: {
		upVotes: number,
		downVotes: number,
		favorites: number,
	},
	createdAt: Date,
	lastUpdate?: Date,
}

export default IPost;
