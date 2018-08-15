const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    // name, user, imageSrc - dashter
    name:{
        type: String,
        required: true
    },
    imageSrc:{
        type: String,
        default: ''
    },
    user:{
       ref: 'users',
       type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('categories', categorySchema);