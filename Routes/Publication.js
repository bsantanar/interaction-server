const express = require('express')
const router = express.Router();
const Publication = require('../Models/Publication');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', async (req, res) => {
    try {
        // let user = req.user.data
        const { query } = req;
        let publication = null;
        // if(user.userType > 1) query['$or'] = [
        //     {projectId: {$in: user.projects}},
        //     {toolsId: {$in: user.tools}}
        // ]
        await Publication.find(query).populate('projectId category', '_id name')
                .then( doc => publication = doc );
        if(!publication){
            return res.status(400).json({ ok: false, message: 'Publication not found', data: publication });
        }
        return res.status(200).json({ ok: true, message: 'Publication fetched', data: publication});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.get('/dashboard', checkToken, async (req, res) => {
    try {
        let user = req.user.data
        const { params } = req;
        let publication = null;
        let query = {...params}
        if(user.userType > 1) query['$or'] = [
            {projectId: {$in: user.projects}}
        ]
        await Publication.find(query).populate('projectId category', '_id name')
                .then( doc => publication = doc );
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
        let user = req.user.data
        if(user.userType > 2) return res.status(500).json({ ok: false, message: 'No permissions', data: e });
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
        let user = req.user.data
        if(user.userType > 2) return res.status(500).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        const { error } = Schemas.update.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Updating publication", body);
        const { condition, data } = body;
        let publication = null;
        await Publication.findOneAndUpdate(condition, data, { new: true })
                            .populate('projectId category', '_id name')
                            .then( doc => publication = doc );
        if(!publication){
            return res.status(400).json({ ok: false, message: 'Publication not found', data: publication });
        }
        return res.status(200).json({ ok: true, message: 'Updated publication', data: publication });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});


router.delete('/', checkToken, async (req, res) => {
    try {
        let user = req.user.data
        if(user.userType > 2) return res.status(500).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        const { error } = Schemas.delete.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Deleting publication", body);
        let publication = null;
        await Publication.deleteOne(body).then( doc => publication = doc );
        if(!publication){
            return res.status(400).json({ ok: false, message: 'Publication not found', data: publication });
        }
        return res.status(200).json({ ok: true, message: 'Deleted publication', data: publication });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;
