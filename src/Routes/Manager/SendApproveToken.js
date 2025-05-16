import { HandleApprovalToken } from "../../Utility/HandleApprovalToken.js"
import { TeamleadApproval } from "../../Models/TeamleadApproval.js"

export const ManagerSendApproveToken = async (req, res) => {
    const { requesterEmail, email } = req.body
    return HandleApprovalToken(TeamleadApproval, requesterEmail, email, res, 'Teamlead')
}