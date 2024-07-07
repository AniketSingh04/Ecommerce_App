import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Export the user model
// The first argument is the singular name of the collection your model is for (Mongoose automatically looks for the plural form of the collection name)
// The second argument is the schema to be used for the model
export default mongoose.model('User', userSchema);

