import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Teamlead } from "../../Models/Teamlead.js";
import { GenerateToken } from "../../Utility/GenerateToken.js";

dotenv.config()

export const SignInTeamlead = async (req, res) => {
    const { email, password } = req.body
    try {
        const teamlead = await Teamlead.findOne({ where: { email: email } })
        if (!teamlead) {
            return res.status(404).json({ message: `Account with email - ${email} not found.` })
        }
        const isValidPassword = await bcrypt.compare(password, teamlead.passwordHash)
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password.' })
        }

        const token = GenerateToken(teamlead.id, teamlead.email)
        await Teamlead.update(
            { lastLogin: new Date() },
            { where: { id: teamlead.id } }
        )

        await teamlead.reload();

        return res.status(200).json({
            message: 'Teamlead log in successful.',
            root: {
                email: teamlead.email,
                token: token,
                lastLogin: teamlead.lastLogin
            }
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ ERROR: error })
    }
}