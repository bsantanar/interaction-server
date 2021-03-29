const express = require('express')
const router = express.Router();
const RequestDataset = require('../Models/RequestDataset');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', async (req, res) => {
    try {
        const { params } = req;
        let requestDataset = null;
        let query = {...params}
        await RequestDataset.find(query)
                .then( doc => requestDataset = doc );
        if(!requestDataset){
            return res.status(400).json({ ok: false, message: 'RequestDataset not found', data: requestDataset });
        }
        return res.status(200).json({ ok: true, message: 'RequestDataset fetched', data: requestDataset});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        console.log("Creating requestDataset", body)
        const { error } = Schemas.requestDataset.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let requestDataset = null;
        await RequestDataset.create(body).then( doc => requestDataset = doc );
        return res.status(200).json({ ok: true, message: 'Created requestDataset', data: requestDataset });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;