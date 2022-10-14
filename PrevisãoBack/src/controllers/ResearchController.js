const mongoose = require("mongoose");
const ResearchModel = require("../models/ResearchModel");

class ResearchController {
    get = async (req, res, next) => {
        let id = req.params.id;
        const cities = id ? await ResearchModel.findById({ _id: new mongoose.Types.ObjectId(id) }) || {} : await ResearchModel.find().sort({ _id: -1 });

        res.status(200);
        return res.json(cities);
    }

    post = async (req, res, next) => {
       const city = await new ResearchModel(req.body).save();

        res.status(201);
        return res.json(city);
       
    }
}

module.exports = new ResearchController;