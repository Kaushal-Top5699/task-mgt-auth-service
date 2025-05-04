import { ManagerApproval } from "../../Models/ManagerApproval.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer"

dotenv.config()

// setup mail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const SendApproveToken = async (req, res) => {
    const { email } = req.body
    try {
        const request = await ManagerApproval.findOne({ where: { email: email } })
        if (!request) {
            return res.status(404).json({ message: 'Approval request not initiated.' })
        } else if (request.status === 'approved') {
            return res.status(400).json({ message: 'Request is already approved, please create or login to your account.' })
        }

        const newToken = uuidv4();

        await ManagerApproval.update(
            { status: 'process', token: newToken },
            { where: { email: email } },
        )

        await request.reload()

        // send token in email
        await transporter.sendMail({
            from: `"Narvee Tech" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Manager Account Approval Token",
            text: `Here is your approval token: ${newToken}`
        });

        return res.status(200).json({ 
            message: 'Request approval in process, token sent.',
            token: request.token
         })
    } catch (error) {
        console.log(`ERROR: ${error}`)
        return res.status(500).json({ ERROR: error })
    }
}