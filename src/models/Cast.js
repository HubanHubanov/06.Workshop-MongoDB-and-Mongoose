const mongoose = require("mongoose");

const castScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     age: {
        type: Number,
        required: true,
        max: 120,
        min: 14
     },
     born: {
        type: String,
        required: true
     },
     nameInMovies: {
        type: String,
        reqired: true
     },
      castImage: {
        type: String,
        required: true,
        // match: /^https?:\/\// 
        validate: {
            validator(value) { 
                return /^https?:\/\//.test(value)
            },
            message: (props) => `${props.value} is invalid url for the castImage!` 
        }
      },
    
});

const Cast = mongoose.model("Cast", castScheme);

module.exports = Cast;