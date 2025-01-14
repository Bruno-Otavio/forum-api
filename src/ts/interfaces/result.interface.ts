import IPost from './post.interface.ts';
import IComment from './comment.interface.ts';

interface IResult {
	total: number;
	next_cursor: string | null | undefined;
	previous_cursor: string | null | undefined;
	result: Array<IPost | IComment>; 
}

export default IResult
