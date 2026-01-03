const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository.js");

class AuthService {
    async register(name, email, password) {
        const doesUserAlreadyExist = await userRepository.findByEmail(email);

        if (doesUserAlreadyExist) {
            throw new Error(`A user with that email [${email}] already exists.`);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        const result = { ...newUser._doc };
        delete result.password;
        return result;
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            console.log(`Login failed: User not found for email ${email}`);
            throw new Error("Invalid email or password!");
        }

        const doesPasswordMatch = await bcrypt.compare(password, user.password);
        if (!doesPasswordMatch) {
            console.log(`Login failed: Password mismatch for email ${email}`);
            throw new Error("Invalid email or password!");
        }

        const payload = { _id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        const userData = { ...user._doc };
        delete userData.password;
        return { token, user: userData };
    }

    async getCurrentUser(userId) {
        return await userRepository.findById(userId);
    }
}

module.exports = new AuthService();
