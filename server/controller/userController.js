const model = require("../model/model")
const userData = model.Usersignup

exports.user_login = ((req, res) => {
    if (req.session.user) {
        res.redirect('/user_success')
    } else {
        res.render("login")
    }
})

exports.user_signup = ((req, res) => {
    if (req.session.user) {
        res.redirect("/user_seccess")
    } else {
        res.render("register", { userSignup: true })
    }
})

// user Login
exports.user_login_post = async (req, res) => {

    const { email, password } = req.body
    const exist = await userData.findOne({ email: email })
    if (exist) {
        if (exist.password === password) {
            req.session.user = email
            res.redirect("/user_success")
        } else {
            res.render("login", { message: "The password is incorrect" })
        }
    } else {
        res.render("login", { message: "User not found please signUP" })
    }
}
// User Logout
exports.user_logout_post = (req, res) => {
    delete req.session.user;
    res.redirect("/")
}



// User Registert
exports.user_signup_post = async (req, res) => {
    if (req.session.user) {
        res.redirect("/user_success")
    }
    const email = req.body.email
    const exist = await userData.findOne({ email: email })
    if (exist) {
        res.render("register", { message: "The user already Exist please Login", userSignup: true })
    } else {
        const user = new userData({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            dept: req.body.dept,
            semister: req.body.semister,
        })

        try {
            await user.save()
            res.render("login")
        } catch (error) {
            res.send(error)
        }
    }
}

// user success page

exports.user_success = ((req, res) => {
    if (req.session.user) {
        res.render("Success")
    } else {
        res.redirect("/")
    }
})