const { now } = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const { generateToken, refreshToken, decodeAccessToken } = require('../utils/jwt');
const { Resend } = require("resend");
const resend = new Resend("re_JngonMqv_Aob4FRHfSPuaCv4vEZSGULtK");

// Crear la función para el registro - sigin

const signin = async (req, res) => {
    const {firstname, lastname, email, current_password, phone_number} = req.body;
    console.log(email);
    
    try {

        if (!email){
            res.status(400).json({message: "El email es requerido"});
            throw new Error('El email es requerido');
        }
        if (!current_password){
            res.status(400).json({message: "La contraseña es requerida"});
            throw new Error('La contraseña es requerida');
        }

        const emailLowerCase = email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        const current_password_hash = await bcrypt.hash(current_password, salt);
        const userData = req.body;
        console.log(emailLowerCase, current_password_hash);
        const newUser = new userModel({
            firstname,
            lastname,
            email: emailLowerCase,
            current_password: current_password_hash,
            phone_number
        });
        

        
        const userStorage = await newUser.save();
        const data = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [emailLowerCase],
            subject: "Confirmación para activar tu cuenta",
            html: `
            <h1>¡Hola ${firstname}! Gracias por registrarte en nuestra página</h1>
            <p>Para activar tu cuenta, por favor da click en el siguiente link</p>
            <a href='http://localhost:3100/api/v1/auth/activate/${userStorage._id}'>Activar cuenta</a>
            `,
            
        });
        console.log(data);
        res.status(201).json(userStorage);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    const { email, current_password } = req.body;
    try {
        if (!email || !current_password) {
            throw new Error('El email y la contraseña son obligatorios');
        }
        const emailLowerCase = email.toLowerCase();
        console.log(emailLowerCase);
        const userStore = await userModel.findOne({ email: emailLowerCase }).exec();
        console.log(userStore);
        if (!userStore) {
            throw new Error("El usuario no existe");
        }

        const check = await bcrypt.compare(current_password, userStore.current_password);

        if (!check) {
            throw new Error("La contraseña no es correcta")
        }

        const token = generateToken(userStore);
        const refresh = refreshToken(userStore);
        res.status(200).json({
            access: token,
            refresh: refresh,
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}



const getMe = async(req, res) => {
    try {
        const { _id } = req.user._doc;
        const userFind = await userModel.findById(_id);
        // Obtener token del usuario

        res.status(200).json(userFind);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const activate = async (req, res) => {
    try {
        const { id } = req.params;
        const userFind = await userModel.findById(id);

        userFind.status = true;
        userStore = await userFind.save();

        res.redirect(301, 'http://localhost:3000/login');

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = {
    signin,
    login,
    getMe,
    activate
};