    import mongoose from "mongoose";

    const contactSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'blocked'],
        default: 'pending'
      }
    });

    contactSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

    const Contact = mongoose.model("Contact", contactSchema);

    export default Contact;

