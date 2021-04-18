const express = require('express')
const router = express.Router();
const Dataset = require('../Models/Dataset');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', async (req, res) => {
    try {
        const { query } = req;
        let dataset = null;
        await Dataset.find(query).populate('publications')
                .then( doc => dataset = doc );
        if(!dataset){
            return res.status(400).json({ ok: false, message: 'Dataset not found', data: dataset });
        }
        return res.status(200).json({ ok: true, message: 'Dataset fetched', data: dataset});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        let user = req.user.data
        if(user.userType != 1) return res.status(500).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        console.log("Creating dataset", body)
        const { error } = Schemas.dataset.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let dataset = null;
        await Dataset.create(body).then( doc => dataset = doc );
        return res.status(200).json({ ok: true, message: 'Created dataset', data: dataset });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.put('/', checkToken, async (req, res) => {
    try {
        let user = req.user.data
        if(user.userType != 1) return res.status(500).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        const { error } = Schemas.update.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Updating dataset", body);
        const { condition, data } = body;
        let dataset = null;
        await Dataset.findOneAndUpdate(condition, data, { new: true }).then( doc => dataset = doc );
        if(!dataset){
            return res.status(400).json({ ok: false, message: 'Dataset not found', data: dataset });
        }
        return res.status(200).json({ ok: true, message: 'Updated dataset', data: dataset });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.delete('/', checkToken, async (req, res) => {
    try {
        let user = req.user.data
        if(user.userType != 1) return res.status(500).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        const { error } = Schemas.delete.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Deleting dataset", body);
        let dataset = null;
        await Dataset.deleteOne(body).then( doc => dataset = doc );
        if(!dataset){
            return res.status(400).json({ ok: false, message: 'Dataset not found', data: dataset });
        }
        return res.status(200).json({ ok: true, message: 'Deleted dataset', data: dataset });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;