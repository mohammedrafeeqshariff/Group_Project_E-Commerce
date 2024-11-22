const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_DB_URI)
        .then((con) => {
            console.log(
                `MongoDB Database connected with HOST: ${con.connection.host}`
            );
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err.message);
            process.exit(1); 
        });
};

module.exports = connectDatabase;
