import { Schema, model } from 'mongoose';

const urlSchema = new Schema({
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitHistory: [
        { visitTime: { type: Number } }
    ]
}, { timestamps: true });

const urlModel = model('url', urlSchema);
export default urlModel;