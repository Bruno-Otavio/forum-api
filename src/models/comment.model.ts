import { Schema, model } from 'mongoose';
import IComment from '../ts/interfaces/comment.interface.ts';

const commentSchema: Schema = new Schema({
	_author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	_post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
	},
	content: {
		type: String,
		required: true,
	},
	imageUrl: String,
	metadata: {
		upVotes: { type: Number, default: 0 },
		downVotes: { type: Number, default: 0 },
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	lastUpdate: Date,
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;

