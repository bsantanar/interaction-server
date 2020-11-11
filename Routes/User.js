const express = require('express')
const router = express.Router();
const User = require('../Models/User');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', checkToken, async (req, res) => {
    try {
        const { params } = req;
        let user = null;
        await User.findOne(params).then( doc => user = doc );
        if(!user){
            return res.status(400).json({ ok: false, message: 'User not found', data: user });
        }
        return res.status(200).json({ ok: true, message: 'User fetched', data: user});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        console.log("Creating user", body)
        const { error } = Schemas.user.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let newUser = null;
        await User.create(body).then( doc => newUser = doc );
        return res.status(200).json({ ok: true, message: 'Created user', data: newUser });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.put('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        const { error } = Schemas.update.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Updating user", body);
        const { condition, data } = body;
        let newUser = null;
        await User.findOneAndUpdate(condition, data, { new: true }).then( doc => newUser = doc );
        if(!newUser){
            return res.status(400).json({ ok: false, message: 'User not found', data: newUser });
        }
        return res.status(200).json({ ok: true, message: 'Updated user', data: newUser });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;