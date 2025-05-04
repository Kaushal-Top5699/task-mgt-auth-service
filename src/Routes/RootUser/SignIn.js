import { RootUser } from "../../Models/RootUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { GenerateToken } from "../../Utility/GenerateToken.js";

dotenv.config();

export const SignIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const rootUser = await RootUser.findOne({ where: { email: email } })
        if (!rootUser) {
            return res.status(404).json({ message: 'Root user not found.' })
        }
        const isValidPassword = await bcrypt.compare(password, rootUser.passwordHash)
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password.' })
        }

        // Creating JWT token.
        const token = GenerateToken(rootUser.id, rootUser.email)

        await RootUser.update(
            { lastLogin: new Date() },
            { where: { id: rootUser.id } }
        )

        await rootUser.reload();

        return res.status(200).json({
            message: 'Root log in successful.',
            root: {
                email: rootUser.email,
                token: token,
                lastLogin: rootUser.lastLogin
            }
        })
    } catch(error) {
        console.log(`ERROR: ${error}`)
        return res.status(500).json({ ERROR: error })
    }
}