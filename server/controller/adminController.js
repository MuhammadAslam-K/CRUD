const session = require("express-session")
const model = require("../model/model")
const userData = model.Usersignup


exports.admin_login = ((req, res) => {
    if (req.session.admin) {
        allUsers(req, res)
    } else {
        res.render("login", { admin: true })
    }
})

// Admin login 
const allUsers = async (req, res) => {
    const users = await userData.find()
    res.redirect("/dashboard")
}

exports.admin_login_post = ((req, res) => {
    if (req.session.admin) {
        allUsers(req, res)
    } else {
        const { email, password } = req.body
        if (email === "admin@gmail.com" && password === "admin123") {
            req.session.admin = email
            allUsers(req, res)
        } else {
            res.render("login", { message: "Invalid Usernmae and Password", admin: true })

        }
    }
})

// Admin Logout
exports.admin_logout_post = ((req, res) => {
    delete req.session.admin
    res.redirect('/admin_login')
})

exports.dashboard = async (req, res) => {
    if (req.session.admin) {
        const users = await userData.find()
        res.render("table", { user: users })
    } else {
        res.render("login", { message: "Unauthorised User please loggin", admin: true })
    }
}


// To view User deatils
exports.user_details = async (req, res) => {
    if (req.session.admin) {
        const userid = req.query.id
        const singleUser = await userData.findById(userid)
        res.render("register", { user: singleUser, viewOnly: true })
    } else {
        res.render("login", { message: "Unauthorised User please loggin", admin: true })

    }
}

// To edit option to admin
exports.update_user = async (req, res) => {
    if (req.session.admin) {
        const userid = req.query.id
        const users = await userData.findById(userid)
        res.render("register", { user: users, admin: true })
    } else {
        res.render("login", { message: "Unauthorised User please loggin", admin: true })
    }
};

//To Edit the user
exports.update_user_post = async (req, res) => {
    if (req.session.admin) {
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
        res.render("login", { message: "Unauthorised User please loggin", admin: true })
    }
}

// To delete User
exports.delete_user = async (req, res) => {
    if (req.session.admin) {
        const userid = req.query.id
        const user = await userData.findByIdAndDelete(userid)
        allUsers(req, res)
    } else {
        res.render("login", { message: "Unauthorised User please loggin", admin: true })
    }
}