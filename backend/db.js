const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/maroon";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error.message);
        });
};

module.exports = connectToMongo;
