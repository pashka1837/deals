import jwt from 'jsonwebtoken';

export default function check_jwt() {
	const secret = process.env.CLIENT_SECRET || '';

	return function (req, _, next) {
		const {token} = req.query;

		jwt.verify(token, secret);

		next();
	};
}
