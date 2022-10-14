const mongoose = require("mongoose");
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

mongoose.connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
    }
);

mongoose.connection.on("error", () => console.error("connection error:"));
mongoose.connection.once("open", () => console.log("database connected"));