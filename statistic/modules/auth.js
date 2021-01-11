export default function (req, next) {
    process.client.authService
        .profile(req.metadata)
        // eslint-disable-next-line no-return-assign
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(next);
}
