import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer"
import { where } from "sequelize";

dotenv.config()

// setup mail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const HandleApprovalToken = async (Model, email, headEmail = null, res, requester = 'manager') => {
    try {
        const whereCondition = headEmail ? { email: email, managerEmail: headEmail } : { email: email }
        const request = await Model.findOne({ where: whereCondition });
        if (!request) {
            return res.status(404).json({ message: 'Approval request not initiated. Request not found.' })
        } else if (request.status === 'approved') {
            return res.status(400).json({ message: 'Request is already approved, advice user to create account.' })
        }

        const newToken = uuidv4();
        await Model.update(
            { status: 'process', token: newToken },
            { where: whereCondition },
        )

        await request.reload()
        
        // send token in email
        await transporter.sendMail({
            from: `"Task Management - Auth Service" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `${requester} Account Approval Token`,
            text: `Here is your approval token: ${newToken}, use this token to create your account.`
        });

        return res.status(200).json({ 
            message: 'Request approval in process, token sent.',
            token: request.token
         })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ ERROR: error })
    }
}