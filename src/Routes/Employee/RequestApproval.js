import dotenv from "dotenv";
import { HandleApprovalRequest } from "../../Utility/HandleRequestApproval.js";
import { EmployeeApproval } from '../../Models/EmployeeApproval.js'

dotenv.config()

export const RequestApprovalEmployee = async (req, res) => {
    const { email, teamleadEmail } = req.body
    return HandleApprovalRequest(EmployeeApproval, email, teamleadEmail, res, "teamlead")
}