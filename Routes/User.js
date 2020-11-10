const express = require('express')
const router = express.Router();
const { checkToken } = require('../Middlewares/validateToken');
const User = require('../Models/User');

router.get('/:id', checkToken, async (req, res) => {
    try {
        const user = req.params.id;
        return res.status(200).json({ ok: true, message: 'User fetched'});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        console.log("Creating user", body)
        let newUser = null;
        await User.create(body).then( doc => newUser = doc );
        return res.status(200).json({ ok:true, message: 'Created user', newUser });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;