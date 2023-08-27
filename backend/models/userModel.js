const mongoose = require('mongoose');


const testSchema = mongoose.Schema({
    problems: {
        type: [Object]
    },
    answers: {
        type: [String]
    },
    similars: {
        type: [Array]
    },
    chosenAnswers: {
        type: [mongoose.Schema.Types.Mixed], // Allow an array of mixed types
        validate: {
            validator: function (value) {
                // Validate that each item in the array is either a string or an array of strings
                return value.every(item => typeof item === 'string' || (Array.isArray(item) && item.every(subItem => typeof subItem === 'string')));
            },
            message: 'Invalid data structure for chosenAnswers'
        }
    },
    score: {
        type: Number
    },
    time: {
        type: Number
    },
    maxScore: {
        type: Number
    }
})

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    test: { type: [testSchema] }
})

module.exports = mongoose.model('userTests', userSchema);