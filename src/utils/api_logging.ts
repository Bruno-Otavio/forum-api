import { Router } from 'express';

interface IPath {
	path: string;
	method: string;
}

function apiLogging(routes: Router) {
	const stack = routes.stack;
	const paths: Array<IPath> = [];

	for (const key in stack) {
		if (stack.hasOwnProperty(key)) {
			const layer = stack[key];
			if (layer.route) {
				const route = layer.route;
				const path: IPath = <IPath>{};

				path.path = route.path;
				path.method = route.stack[0].method.toUpperCase();

				paths.push(path);
			}
		}
	}

	console.log(paths);
}

export default apiLogging;

