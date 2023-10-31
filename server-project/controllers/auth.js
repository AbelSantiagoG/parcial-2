const { now } = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const { generateToken, refreshToken, decodeAccessToken } = require('../utils/jwt');

// Crear la función para el registro - sigin

const signin = async (req, res) => {
    const {firstname, lastname, email, current_password} = req.body;
    
    
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
        const salt = await bcrypt.genSalt();
        const current_password_hash = await bcrypt.hash(current_password, salt);
        const newUser = new userModel({
            firstname,
            lastname,
            email: emailLowerCase,
            current_password: current_password_hash
        });


        const userStorage = newUser.save();
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
        const { id } = req.params;
        const userFind = await userModel.findById(id);
        // Obtener token del usuario

        
        res.status(200).json(userFind);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = {
    signin,
    login,
    getMe,
};