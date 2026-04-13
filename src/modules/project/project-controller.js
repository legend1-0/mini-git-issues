import { getIssuesByProjectLogic } from "../issues/issue-service.js";
import { createProjectLogic, deleteProjectLogic, getProjectsLogic, getUniqueProjectLogic } from "./project-service.js";

export const createProject =async (req, res) =>{
    const projects = await createProjectLogic(req.body)
    res.status(201).json(projects)
}

export const getProjects = async (req, res)=>{
    const projects = await getProjectsLogic()
    res.json(projects)
}
export const getUniqueProject = async (req, res) =>{
    const {projectId} = req.params
    const project = await getUniqueProjectLogic(Number(projectId))
    res.json(project)
}
export const updateProject = async (req, res) =>{
    const {idProject} = req.params
    const project = await updateProject(req.body, idProject)
    res.json(project)
}

export const getIssuesByProject = async (req, res) =>{
    const {projectId} = req.params
    const issue = await getIssuesByProjectLogic(projectId)
    res.json(issue)
}

export const deleteProject = async (req, res) =>{
    const {projectId} = req.params
    await deleteProjectLogic(Number(projectId))
    res.json(`Project Deleted`)
}