const express = require('express')
const router = express.Router();
const Member = require('../Models/Member');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', async (req, res) => {
    try {
        const { query } = req;
        let member = null;
        //if(user.userType > 1) query['projectsIds'] = {$in: user.projects}
        await Member
                .aggregate.sample(process.env.SAMPLE_MEMBER)
                .find(query)
                .populate('projectsIds category', '_id name priority')
                .then( doc => member = doc );
        if(!member){
            return res.status(400).json({ ok: false, message: 'Member not found', data: member });
        }
        return res.status(200).json({ ok: true, message: 'Member fetched', data: member});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.get('/dashboard', checkToken, async (req, res) => {
    try {
        const { params } = req;
        let member = null;
        let user = req.user.data
        let query = {...params}
        if(user.userType > 1) query['projectsIds'] = {$in: user.projects}
        await Member.find(query).populate('projectsIds category', '_id name')
                .then( doc => member = doc );
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
        let user = req.user.data
        if(user.userType > 2) return res.status(403).json({ ok: false, message: 'No permissions', data: e });
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
        let user = req.user.data
        if(user.userType > 2) return res.status(403).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        const { error } = Schemas.update.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Updating member", body);
        const { condition, data } = body;
        let member = null;
        await Member.findOneAndUpdate(condition, data, { new: true })
                .populate('projectsIds category', '_id name priority')
                .then( doc => member = doc );
        if(!member){
            return res.status(400).json({ ok: false, message: 'Member not found', data: member });
        }
        return res.status(200).json({ ok: true, message: 'Updated member', data: member });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});


router.delete('/', checkToken, async (req, res) => {
    try {
        let user = req.user.data
        if(user.userType > 2) return res.status(403).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        const { error } = Schemas.delete.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Deleting member", body);
        let member = null;
        await Member.deleteOne(body).then( doc => member = doc );
        if(!member){
            return res.status(400).json({ ok: false, message: 'Member not found', data: member });
        }
        return res.status(200).json({ ok: true, message: 'Deleted member', data: member });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;
