const { now } = require("mongoose");
const userModel = require("../models/user");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'abelsantiago1000@gmail.com',
        pass: 'hziu mzvx zajq pice',
    },
});

function sendConfirmationEmail(email) {
const mailOptions = {
    from: 'abelsantiago1000@gmail.com',
    to: email,
    subject: 'Confirmar correo electrónico',
    html:'PENE'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error al enviar el correo de confirmación:', error);
    } else {
        console.log('Correo de confirmación enviado:', info.response);
    }
    });
}

//Flecha
const createUser = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData.firstname);
        const newUser = new userModel({ ...userData });
        //console.log(user);

        await newUser.save();
        sendConfirmationEmail(newUser.email)
        res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const userFind = await userModel.findById(id);
        console.log(userFind);
        res.status(200).json(userFind);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userDataEdit = req.body;
        userDataEdit.updated_at = now();
        console.log(userDataEdit);

        await userModel.findByIdAndUpdate(id, userDataEdit);

        res.status(200).json({'message': 'Modificado satisfactoriamente'});

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteUserById = async (req, res) => {
    try{
        const {id} = req.params;   
        const response = await userModel.findByIdAndDelete(id);
        res.status(200).json({'message': "Usuario eliminado exitosamente"})
    }catch(err){
        res.status(400).json({'message': err})
    }

}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};



/*Anónima
const create = function(){}

//Convencional
async function createUser1(){}
*/