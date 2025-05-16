import { HandleApprovalToken } from "../../Utility/HandleApprovalToken.js";
import { EmployeeApproval } from "../../Models/EmployeeApproval.js";

export const TeamleadSendApproveToken = async (req, res) => {
    const { requesterEmail, email } = req.body
    return HandleApprovalToken(EmployeeApproval, requesterEmail, email, res, 'Employee')
}