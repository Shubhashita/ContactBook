const authService = require("../services/auth.service");
const { validateRegister, validateLogin } = require("../validators/auth.validator");

class AuthController {
    async register(req, res) {
        const { error } = validateRegister(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, email, password } = req.body;

        try {
            const user = await authService.register(name, email, password);
            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        const { error } = validateLogin(req.body);
        if (error) {
            console.error("Login validation error:", error.details[0].message);
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password } = req.body;

        try {
            const data = await authService.login(email, password);
            return res.status(200).json(data);
        } catch (err) {
            console.error("Login error:", err.message);
            return res.status(400).json({ error: err.message });
        }
    }

    async getMe(req, res) {
        try {
            const user = await authService.getCurrentUser(req.user._id);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new AuthController();
