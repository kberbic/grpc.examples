import correlation from './correlation.js';
import jwt from './jwt.js';

export default function () {
  return [
    correlation,
    jwt([
        '/authService/register',
        '/authService/login',
      ]),
  ];
}
