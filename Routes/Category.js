const express = require('express')
const router = express.Router();
const Category = require('../Models/Category');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');

router.get('/', checkToken, async (req, res) => {
    try {
        const { query } = req;
        let category = null;
        // let user = req.user.data
        //if(user.userType > 1) query['projectId'] = {$in: user.projects}
        await Category.find(query)
                .then( doc => category = doc );
        if(!category){
            return res.status(400).json({ ok: false, message: 'Category not found', data: category });
        }
        return res.status(200).json({ ok: true, message: 'Category fetched', data: category});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        console.log("Creating category", body)
        const { error } = Schemas.category.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        let category = null;
        await Category.create(body).then( doc => category = doc );
        return res.status(200).json({ ok: true, message: 'Created category', data: category });
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
        console.log("Updating category", body);
        const { condition, data } = body;
        let category = null;
        await Category.findOneAndUpdate(condition, data, { new: true }).then( doc => category = doc );
        if(!category){
            return res.status(400).json({ ok: false, message: 'Category not found', data: category });
        }
        return res.status(200).json({ ok: true, message: 'Updated category', data: category });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});


router.delete('/', checkToken, async (req, res) => {
    try {
        const body = req.body;
        const { error } = Schemas.delete.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Deleting category", body);
        let category = null;
        await Category.deleteOne(body).then( doc => category = doc );
        if(!category){
            return res.status(400).json({ ok: false, message: 'Category not found', data: category });
        }
        return res.status(200).json({ ok: true, message: 'Deleted category', data: category });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;