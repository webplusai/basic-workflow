const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const globalSchemaProps = require("./globalSchemaProps")

const email_regex = email_regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

const userSchema = mongoose.Schema({
    ...globalSchemaProps,
    email: {
        type: String,
        required: true,
        unique: true,
        match: email_regex
    },
    name: { type: String },
    role: { type: String },
    image: String,
    emailVerified: { type: Boolean, default: false },
});

userSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Users', userSchema);