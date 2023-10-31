const { now } = require("mongoose");
const serviceModel = require("../models/service");


const createService = async (req, res) => {
    try {
        const serviceData = req.body;
        //console.log(ServiceData.firstname);
        const newService = new serviceModel({ ...serviceData });

        //console.log(Service);

        await newService.save();
        res.status(201).json(newService);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllServices = async (req, res) => {
    try {
        const allServices = await serviceModel.find();
        res.status(200).json(allServices);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const serviceFind = await serviceModel.findById(id);
        console.log(serviceFind);
        res.status(200).json(serviceFind);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceDataEdit = req.body;

        await ServiceModel.findByIdAndUpdate(id, serviceDataEdit);

        res.status(200).json({'message': 'Servicio modificado satisfactoriamente'});

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteServiceById = async (req, res) => {
    try{
        const {id} = req.params;   
        const response = await serviceModel.findByIdAndDelete(id);
        console.log(response);
        res.status(200).json({'message': "Servicio eliminado exitosamente"})
    }catch(err){
        res.status(400).json({'message': err})
    }

}

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById
};