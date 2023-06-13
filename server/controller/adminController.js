const session = require("express-session")
const model = require("../model/model")
const userData = model.Usersignup
const register = model.Register


exports.admin_login = ((req, res) => {
    if (!req.session.isAuth) {
        res.render("login", { admin: true })
    } else {
        allUsers(req, res)
    }
})

// Admin login 
const allUsers = async (req, res) => {
    const users = await userData.find()
    res.render("table", { user: users })
}

exports.admin_login_post = ((req, res) => {
    if (req.session.isAuth) {
        allUsers(req, res)
    } else {
        const { email, password } = req.body
        if (email === "admin@gmail.com" && password === "admin123") {
            req.session.isAuth = true
            allUsers(req, res)
        } else {
            res.render("error", { message: "Invalid Usernmae and Password", adminError: true })

        }
    }
})

// Admin Logout
exports.admin_logout_post = ((req, res) => {
    req.session.isAuth = false
    res.redirect('/admin_login')
})


// To view User deatils
exports.user_details = async (req, res) => {
    if (req.session.isAuth) {
        const userid = req.query.id
        const singleUser = await userData.findById(userid)
        res.render("register", { user: singleUser, viewOnly: true })
    } else {
        res.render("error", { message: "Invalid User please loggin", adminError: true })

    }
}

// To edit option to admin
exports.update_user = async (req, res) => {
    if (req.session.isAuth) {
        const userid = req.query.id
        const users = await userData.findById(userid)
        res.render("register", { user: users, admin: true })
    } else {
        res.render("error", { message: "Invalid User please loggin", adminError: true })
    }
};

//To Edit the user
exports.update_user_post = async (req, res) => {
    if (req.session.isAuth) {
        const userId = req.query.id;
        const { name, email, phone, age, dept, semister } = req.body;

        try {
            const updatedUser = await userData.findByIdAndUpdate(
                userId,
                { name, email, phone, age, dept, semister },
                { new: true }
            );
            allUsers(req, res)
        } catch (error) {
            res.status(500).json({ message: error.message || "Error while updating the user" });
        }
    } else {
        res.render("error", { message: "Invalid User please loggin", adminError: true })
    }
}

// To delete User
exports.delete_user = async (req, res) => {
    if (req.session.isAuth) {
        const userid = req.query.id
        const user = await userData.findByIdAndDelete(userid)
        allUsers(req, res)
    } else {
        res.render("error", { message: "Invalid User please loggin", adminError: true })
    }
}