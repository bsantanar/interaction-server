const express = require('express')
const router = express.Router();
const Resource = require('../Models/Resource');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', checkToken, async (req, res) => {
    try {
        const { params } = req;
        let resource = null;
        await Resource.find(params).then( doc => resource = doc );
        if(!resource){
            return res.status(400).json({ ok: false, message: 'Resource not found', data: resource });
        }
        return res.status(200).json({ ok: true, message: 'Resource fetched', data: resource});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        console.log("Creating resource", body)
        const { error } = Schemas.resource.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let resource = null;
        await Resource.create(body).then( doc => resource = doc );
        return res.status(200).json({ ok: true, message: 'Created resource', data: resource });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.put('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        const { error } = Schemas.resource.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Updating resource", body);
        const { condition, data } = body;
        let resource = null;
        await Resource.findOneAndUpdate(condition, data, { new: true }).then( doc => resource = doc );
        if(!resource){
            return res.status(400).json({ ok: false, message: 'Resource not found', data: resource });
        }
        return res.status(200).json({ ok: true, message: 'Updated resource', data: resource });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;