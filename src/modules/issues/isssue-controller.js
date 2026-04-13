import { createIssueLogic, deleteIssueLogic, updateIssueLogic } from "./issue-service.js";

export const createIssue = async (req ,res)=>{
    const {projectId} =req.params
    const issue = await createIssueLogic(req.body,projectId, res, req)
    res.status(201).json(issue)
} 

export const updateIssue = async (req, res) =>{
    const {issueId} = req.params
    const issue = await updateIssueLogic(req.body, issueId)
    res.json(issue)
}

export const deleteIssue = async (req, res) =>{
    const {issueId} = req.params
      await deleteIssueLogic(issueId)
    res.json(`Message Deleted`)
}