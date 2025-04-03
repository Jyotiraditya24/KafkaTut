import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    topic: { type: String, required: true, trim: true },
    partition: { type: String },
    parameter: { type: String },
    value: { type: String, required: true, trim: true }
}, { timestamps: true });

const Sensor = mongoose.model('Sensor', sensorSchema);

export default Sensor;
