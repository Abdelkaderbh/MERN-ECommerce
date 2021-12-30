const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.js");
const cors = require("cors");
const authRoute = require("./routes/auth.js");


dotenv.config();

const PORT = 8080;


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Success")).catch((err) => {
        console.log(err)
    });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () =>
    console.log(`Servre is Running on http://localhost:${PORT}`, )
)