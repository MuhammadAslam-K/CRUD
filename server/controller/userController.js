const model = require("../model/model")
const userData = model.Usersignup
const register = model.Register

exports.user_login = ((req, res) => {
    res.render("login")
})

exports.user_signup = ((req, res) => {
    res.render("signup")
})

// user Login
exports.user_login_post = async (req, res) => {

    const { email, password } = req.body
    const exist = await userData.findOne({ email: email })
    if (exist) {
        if (exist.password === password) {
            req.session.userLogged = true
            res.render("register")
        } else {
            res.render("error", { message: "The password is incorrect", PasswordError: true })
        }
    } else {
        res.render("error", { message: "User not found please signUP", invalidUserError: true })
    }
}



// User Signup
exports.user_signup_post = async (req, res) => {
    const email = req.body.email
    const exist = await userData.findOne({ email: email })
    if (exist) {
        res.render("error", { message: "The user already Exist please Login", user: true })
    } else {
        const user = new userData({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        try {
            await user.save()
            res.render("login")
        } catch (error) {
            res.send(error)
        }
    }
}

// Form registration
exports.user_register_post = async (req, res) => {
    if (req.session.userLogged) {

        const formRegister = new register({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            dept: req.body.dept,
            semister: req.body.semister,
        })
        try {
            // const name = req.body.name
            await formRegister.save()
            res.render("Success")
        } catch (error) {
            res.render("error", { message: "You Have already submitted the form " })
        }
    } else {
        res.render("error", { message: "Invalid User please login", user: true })
    }
}