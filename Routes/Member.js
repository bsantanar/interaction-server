const express = require('express')
const router = express.Router();
const Member = require('../Models/Member');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', checkToken, async (req, res) => {
    try {
        const { params } = req;
        let member = null;
        await Member.findOne(params).then( doc => member = doc );
        if(!member){
            return res.status(400).json({ ok: false, message: 'Member not found', data: member });
        }
        return res.status(200).json({ ok: true, message: 'Member fetched', data: member});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        console.log("Creating member", body)
        const { error } = Schemas.member.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let member = null;
        await Member.create(body).then( doc => member = doc );
        return res.status(200).json({ ok: true, message: 'Created member', data: member });
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
        console.log("Updating member", body);
        const { condition, data } = body;
        let member = null;
        await Member.findOneAndUpdate(condition, data, { new: true }).then( doc => member = doc );
        if(!member){
            return res.status(400).json({ ok: false, message: 'Member not found', data: member });
        }
        return res.status(200).json({ ok: true, message: 'Updated member', data: member });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;