import { RootUser } from "../../Models/RootUser.js";
import { Op } from 'sequelize';
import dotenv from "dotenv";
import { HashPassword } from "../../Utility/HashPassword.js";

dotenv.config();

export const SignUp = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const rootExists = await RootUser.findOne({ where: { 
            [Op.or]: [
                { username: username }, 
                { email: email }
            ]
        } })
        if (rootExists) {
            return res.status(409).json({ message: `Root(Master) user already exists with username - ${username} and email - ${email}` })
        }

        const hashedPassword = await HashPassword(password)
        const createNewRoot = await RootUser.create({
            username: username,
            email: email,
            passwordHash: hashedPassword,
            lastLogin: new Date(),
        })

        return res.status(201).json({ 
            message: 'Root user created.',
            root: {
                username: createNewRoot.username,
                email: createNewRoot.email
            }
         })

    } catch(error) {
        console.error(`ERROR: ${error}`)
        return res.status(500).json({ ERROR: error })
    }
}