const express = require('express')
const router = express.Router();
const Publication = require('../Models/Publication');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', checkToken, async (req, res) => {
    try {
        const { params } = req;
        let publication = null;
        await Publication.find(params).then( doc => publication = doc );
        if(!publication){
            return res.status(400).json({ ok: false, message: 'Publication not found', data: publication });
        }
        return res.status(200).json({ ok: true, message: 'Publication fetched', data: publication});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        console.log("Creating publication", body)
        const { error } = Schemas.publication.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let publication = null;
        await Publication.create(body).then( doc => publication = doc );
        return res.status(200).json({ ok: true, message: 'Created publication', data: publication });
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
        console.log("Updating publication", body);
        const { condition, data } = body;
        let publication = null;
        await Publication.findOneAndUpdate(condition, data, { new: true }).then( doc => publication = doc );
        if(!publication){
            return res.status(400).json({ ok: false, message: 'Publication not found', data: publication });
        }
        return res.status(200).json({ ok: true, message: 'Updated publication', data: publication });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;