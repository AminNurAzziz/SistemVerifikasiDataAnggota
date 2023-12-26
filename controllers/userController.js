const User = require('../models/user-schema');

class UserController {
    static renderRegister(req, res) {
        res.render('users/register');
    }

    static async register(req, res, next) {
        try {
            const { email, username, role, password } = req.body;
            console.log(req.body)
            const user = new User({ email, username, role });
            console.log(user)
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
                if (err) return next(err);
                res.redirect('/admin/');
            });
        } catch (e) {
            res.send(e.message);
        }
    }

    static renderLogin(req, res) {
        res.render('form-login');
    }

    static login(req, res) {
        req.flash('success', 'Welcome back!');
        return res.redirect('/admin/');
    }

    static logout(req, res) {
        req.logout((err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            console.log("logout");
            req.flash('success', "Goodbye!");
            res.redirect('/login');
        });
    }
}

module.exports = UserController;
