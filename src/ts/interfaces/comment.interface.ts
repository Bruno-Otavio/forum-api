import { Document } from 'mongoose';
import IPost from './post.interface.ts';
import IUser from './user.interface.ts';

interface Comment extends Document {
	_author: IUser['_id'];
	_post: IPost['_id'];
	content: string;
	imageUrl: string | null;
	metadata: {
		upVotes: number,
		downVotes: number,
	},
	createdAt: Date;
	lastUpdate?: Date;
}

export default IComment;
