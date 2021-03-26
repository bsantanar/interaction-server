const jwt = require('jsonwebtoken');

exports.checkToken = async (req, res, next) => {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else {
        return res.status(401)
            .send({ ok: false, message: 'Not authorized. Token not found.' });
    }
    try {
        let userInfo = jwt.verify(token, '1n7er4c7i0n.2021')
        req.user = userInfo
        //console.log(userInfo);
        return next();
    } catch (e) {
        return res.status(401)
            .send({ ok: false, message: 'Not authorized. Invalid token.', error: e });
    }
};