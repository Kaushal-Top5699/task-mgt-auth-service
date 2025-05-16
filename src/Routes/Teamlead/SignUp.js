import dotenv from "dotenv";
import { Teamlead } from "../../Models/Teamlead.js";
import { TeamleadApproval } from "../../Models/TeamleadApproval.js";
import { HashPassword } from "../../Utility/HashPassword.js";
import { Manager } from "../../Models/Manager.js";

dotenv.config()

export const SignUpTeamlead = async (req, res) => {
    const { username, email, password, reportingManagerEmail, token } = req.body
    try {
        const teamlead = await Teamlead.findOne({ where: { email: email } })
        if (teamlead) {
            return res.status(404).json({ message: `Account with email - ${email} already created. Please login.` })
        }

        const request = await TeamleadApproval.findOne({ where: { email: email, managerEmail: reportingManagerEmail } })
        if (request.token !== token) {
            return res.status(400).json({ message: `Invalid Token! Request a new token.` })
        }

        const manager = await Manager.findOne({ where: { email: reportingManagerEmail } })
        if (!manager) {
            return res.status(404).json({ message: `No manager found with email - ${reportingManagerEmail}. Verify whether reporting manager's email is correct.` })
        }
        
        const hashedPassword = await HashPassword(password)
        const newTeamlead = await Teamlead.create({ 
            username: username,
            email: email,
            passwordHash: hashedPassword,
            reportingManagerId: manager.id,
            lastLogin: new Date()
        })

        await request.update(
            { status: 'approved' },
            { where: { email: email, managerEmail: reportingManagerEmail } }
        )
        
        return res.status(201).json({
            message: 'Teamlead account created.',
            status: 'Approved',
            teamleadDetails: {
                username: newTeamlead.username,
                email: newTeamlead.email,
                lastLogin: newTeamlead.lastLogin
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ ERROR: error })
    }
}