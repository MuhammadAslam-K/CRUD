const express = require("express")
const session = require("express-session")
const hbs = require("hbs")
const path = require("path")
const { v4: uuid } = require("uuid")
const mongoDB = require("./server/dataBase/connection")
const nocache = require("nocache")


const app = express()
const PORT = process.env.PORT || 3000
mongoDB()
app.set("view engine", 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(nocache());

app.use("/img", express.static(path.join(__dirname, "assets/img")))
app.use("/css", express.static(path.join(__dirname, "assets/css")))

app.use(session({
    secret: uuid(),
    saveUninitialized: true,
    resave: true
}))


hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.use('/', require("./server/router/routes"))

app.listen(PORT, (() => console.log(`server started at  http://localhost:${PORT}`)))
