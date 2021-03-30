const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../Models/User');
const { checkToken } = require('../Middlewares/validateToken');
const Schemas = require('../Schemas/Schemas');
const bcrypt = require('bcryptjs');

router.get('/', checkToken, async (req, res) => {
    try {
        const { params } = req;
        let user = null;
        await User.find(params, {password: 0}).populate('projects')
                    .then( doc => user = doc );
        if(!user){
            return res.status(400).json({ ok: false, message: 'User not found', data: user });
        }
        return res.status(200).json({ ok: true, message: 'User fetched', data: user});
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.post('/login', async(req, res) => {

    let body = req.body;
  
    try {
        console.log("login request", body.email)
        // Buscamos email en DB
        const user = await User.findOne({email: body.email}, 
            {}, {lean:true});
        // Evaluamos si existe el usuario en DB
        if(!user){
            return res.status(400).json({
                mensaje: 'Usuario o contraseña inválidos',
            });
        }
    
        // Evaluamos la contraseña correcta
        if( !bcrypt.compareSync(body.password, user.password) ){
            console.log("bad password")
            return res.status(400).json({
            mensaje: 'Usuario o contraseña inválidos',
            });
        }
        delete user.password
        // Generar Token
        let token = jwt.sign({
            data: user
        }, '1n7er4c7i0n.2021', { expiresIn: 60 * 60 * 24}) // Expira en 30 días
        // Pasó las validaciones
        return res.status(200).json({
            ok: true,
            message: 'Login Successfull',
            user,
            token
        })
        
    } catch (e) {
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
  
});

router.post('/', checkToken, async (req, res) => {
    try {
        let user = req.user.data
        if(user.userType != 1) return res.status(403).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        console.log("Creating user", body)
        const { error } = Schemas.user.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync(body.password, salt);
        let newUser = null;
        await User.create(body).then( doc => newUser = doc );
        return res.status(200).json({ ok: true, message: 'Created user', data: newUser });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

router.put('/', checkToken, async (req, res) => {
    try {
        let user = req.user.data
        if(user.userType != 1) return res.status(403).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        const { error } = Schemas.update.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Updating user", body);
        const { condition, data } = body;
        if(data.password){
            const salt = bcrypt.genSaltSync();
            body.password = bcrypt.hashSync(body.password, salt);
        }
        let newUser = null;
        await User.findOneAndUpdate(condition, data,{ new: true }).then( doc => newUser = doc );
        if(!newUser){
            return res.status(400).json({ ok: false, message: 'User not found', data: newUser });
        }
        return res.status(200).json({ ok: true, message: 'Updated user', data: newUser });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});


router.delete('/', checkToken, async (req, res) => {
    try {
        let userData = req.user.data
        if(userData.userType != 1) return res.status(403).json({ ok: false, message: 'No permissions', data: e });
        const body = req.body;
        const { error } = Schemas.delete.validate(body);
        if(error) return res.status(400).json({ ok:false, message: error.message, data: null });
        console.log("Deleting user", body);
        let user = null;
        await User.deleteOne(body).then( doc => user = doc );
        if(!user){
            return res.status(400).json({ ok: false, message: 'User not found', data: user });
        }
        return res.status(200).json({ ok: true, message: 'Deleted user', data: user });
    } catch (e) {
        console.error("ERROR", e);
        return res.status(500).json({ ok: false, message: 'Internal server Error', data: e });
    }
});

module.exports = router;