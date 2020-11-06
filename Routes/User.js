const express = require('express')
const router = express.Router();
const { checkToken } = require('../Middlewares/validateToken');
const db = require('../config/db');

router.get('/bySku/:key', checkToken, async (req, res) => {
    try {
        const sku = req.params.key;
        return res.status(200).json({ ok:true, message: 'Fetched from ripley api', data});
    } catch (e) {
        return res.status(500).json({ok: false, message: 'Internal server Error', data: e.response.data})
    }
});

router.get('/:key', checkToken, async (req, res) => {
    try {
        const products = req.params.key;
        return res.status(200).json({ ok:true, message: 'Fetched from ripley api', data});
    } catch (e) {
        return res.status(500).json({ok: false, message: 'Internal server Error', data: e.response.data})
    }
});

module.exports = router;