const express = require('express')
const router = express.Router();
const Tool = require('../Models/Tool');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', checkToken, async (req, res) => {
    try {
        const { params } = req;
        let tool = null;
        let user = req.user.data
        let query = {...params}
        if(user.userType > 1) query['_id'] = {$in: user.tools}
        await Tool.find(query).then( doc => tool = doc );
        if(!tool){
            return res.status(400).json({ ok: false, message: 'Tool not found', data: tool });
        }
        return res.status(200).json({ ok: true, message: 'Tool fetched', data: tool});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        let user = req.user.data
        if(user.userType != 1) return res.status(500).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        console.log("Creating tool", body)
        const { error } = Schemas.tool.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let tool = null;
        await Tool.create(body).then( doc => tool = doc );
        return res.status(200).json({ ok: true, message: 'Created tool', data: tool });
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
        console.log("Updating tool", body);
        const { condition, data } = body;
        let tool = null;
        await Tool.findOneAndUpdate(condition, data, { new: true }).then( doc => tool = doc );
        if(!tool){
            return res.status(400).json({ ok: false, message: 'Tool not found', data: tool });
        }
        return res.status(200).json({ ok: true, message: 'Updated tool', data: tool });
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
        console.log("Deleting tool", body);
        let tool = null;
        await Tool.deleteOne(body).then( doc => tool = doc );
        if(!tool){
            return res.status(400).json({ ok: false, message: 'Tool not found', data: tool });
        }
        return res.status(200).json({ ok: true, message: 'Deleted tool', data: tool });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;