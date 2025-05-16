import dotenv from "dotenv";
import { Manager } from "../../Models/Manager.js";
import { ManagerApproval } from "../../Models/ManagerApproval.js";
import { HashPassword } from "../../Utility/HashPassword.js";

dotenv.config()

export const SignUpManager = async (req, res) => {
    const { username, email, password, token } = req.body
    try {
        const manager = await Manager.findOne({ where: { email: email } })
        if (manager) {
            return res.status(400).json({ message: 'Account already created, please login.' })
        }

        const request = await ManagerApproval.findOne({ where: { email: email } })
        if (request.token !== token) {
            return res.status(400).json({ message: 'Invalid token! Request new token.' })
        }

        const hashedPassword = await HashPassword(password)
        const newManager = await Manager.create({
            username: username,
            email: email,
            passwordHash: hashedPassword,
            lastLogin: new Date(),
        })

        await request.update(
            { status: 'approved' },
            { where: { email: email } }
        )

        return res.status(201).json({
            message: 'Manager account created.',
            status: 'Approved',
            managerDetails: {
                username: newManager.username,
                email: newManager.email,
                lastLogin: newManager.lastLogin
            }
        })
    } catch(error) {
        console.log(`ERROR: ${error}`)
        return res.status(500).json({ ERROR: error })
    }
}