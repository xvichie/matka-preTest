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
        type: [String]
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