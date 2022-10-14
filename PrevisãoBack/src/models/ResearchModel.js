const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

const citySchema = new mongoose.Schema({
    nameCity: {
        type: String,
        maxlength: 300,
        required: true
    },
    weatherId: {
        type: Number,
        required: true
    },
    temperature: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    temperature_min: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    temperature_max: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    pressure: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    windSpeed: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    pop: {
        type: Number,
        required: true
    },
    feels_like: {
        type: mongoose.Types.Decimal128,
        required: true
    }
}, {
    timestamps: true
});
const ResearchModel = mongoose.model("Cities", citySchema);

module.exports = ResearchModel;