const express = require('express')
const router = express.Router();
const Project = require('../Models/Project');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', checkToken, async (req, res) => {
    try {
        const { params } = req;
        let project = null;
        await Project.findOne(params).then( doc => project = doc );
        if(!project){
            return res.status(400).json({ ok: false, message: 'Project not found', data: project });
        }
        return res.status(200).json({ ok: true, message: 'Project fetched', data: project});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        console.log("Creating project", body)
        const { error } = Schemas.project.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let project = null;
        await Project.create(body).then( doc => project = doc );
        return res.status(200).json({ ok: true, message: 'Created project', data: project });
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
        console.log("Updating project", body);
        const { condition, data } = body;
        let project = null;
        await Project.findOneAndUpdate(condition, data, { new: true }).then( doc => project = doc );
        if(!project){
            return res.status(400).json({ ok: false, message: 'Project not found', data: project });
        }
        return res.status(200).json({ ok: true, message: 'Updated project', data: project });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;