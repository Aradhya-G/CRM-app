const dbConfig = require("./configs/db.config")
const mongoose = require("mongoose")
const authController = require("./controllers/auth.controller")
const express = require('express')
const app = express()
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')
const constants = require('./utils/constants')
app.use(express.json())

async function init() {
    let user = await User.findOne({ userId: "admin" })

    if (user) {
        console.log("Admin user already present", user)
        return
    }

    try {
        let user = await User.create({
            name: "Haise",
            userId: "admin",
            email: "haise@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("admin", 8),
            userStatus: constants.userStatus.approved
        })
        console.log(user)
    } catch (err) {
        console.log(err.message)
    }
}

mongoose.connect(dbConfig.DB_URL)

const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"))
db.once("open", () =>{
     console.log("Connected to Mongo DB")
    init()
})
// app.use(userRouter)
require('./routes/auth.routes')(app)
require("./routes/user.routes")(app)
require("./routes/ticket.routes")(app)

app.get("/", (req, res) => res.send("Hi"))

module.exports = app.listen(3000, () => console.log("Listening at localhost:3000"))