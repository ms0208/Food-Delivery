import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    cardData: {
        type: Object,
        default: {}
    }
}, { minimize: false })

const Usermodel = mongoose.model.user || mongoose.model("user",userSchema);
export default Usermodel;