const express = require('express')
const router = express.Router();
const Activity = require('../Models/Activity');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', checkToken, async (req, res) => {
    try {
        const { params } = req;
        let activity = null;
        await Activity.find(params).then( doc => activity = doc );
        if(!activity){
            return res.status(400).json({ ok: false, message: 'Activity not found', data: activity });
        }
        return res.status(200).json({ ok: true, message: 'Activity fetched', data: activity});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        console.log("Creating activity", body)
        const { error } = Schemas.activity.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let activity = null;
        await Activity.create(body).then( doc => activity = doc );
        return res.status(200).json({ ok: true, message: 'Created activity', data: activity });
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
        console.log("Updating activity", body);
        const { condition, data } = body;
        let activity = null;
        await Activity.findOneAndUpdate(condition, data, { new: true }).then( doc => activity = doc );
        if(!activity){
            return res.status(400).json({ ok: false, message: 'Activity not found', data: activity });
        }
        return res.status(200).json({ ok: true, message: 'Updated activity', data: activity });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;