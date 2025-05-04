import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Manager } from "../../Models/Manager.js";
import { GenerateToken } from "../../Utility/GenerateToken.js";

dotenv.config()

export const SignInManager = async (req, res) => {
    const { email, password } = req.body
    try {
        const manager = await Manager.findOne({ where:{ email: email } })
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found.' })
        }
        const isValidPassword = await bcrypt.compare(password, manager.passwordHash)
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password.' })
        }

        // Creating JWT token.
        const token = GenerateToken(manager.id, manager.email)

        await Manager.update(
            { lastLogin: new Date() },
            { where: { id: manager.id } }
        )

        await manager.reload();

        return res.status(200).json({
            message: 'Manager log in successful.',
            root: {
                email: manager.email,
                token: token,
                lastLogin: manager.lastLogin
            }
        })
    } catch (error) {
        console.log(`ERROR: ${error}`)
        return res.status(500).json({ ERROR: error })
    }
}