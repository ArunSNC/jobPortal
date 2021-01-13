
module.exports = async (req, res, next) => {

    if(!req.headers || !req.headers.authorization) return res.badRequest({message: 'Authorization header is missing', success:false});

    const tokenParam = req.headers.authorization;

    const decodedToken = JWTservice.verify(tokenParam);
    const user = await User.findOne({
        id: decodedToken.user
    });

    if(!user) return res.badRequest({message: 'Unauthorized', success: false});

    req.user = user.id;

    next();
}