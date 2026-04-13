import { Router } from "express";
import { createProject, deleteProject, getIssuesByProject, getProjects, getUniqueProject, updateProject } from "./project-controller.js";
const router = Router()
router.post("/", createProject)
router.get("/", getProjects)
router.get("/unique/:projectId", getUniqueProject)
router.delete("/:projectId", deleteProject)
router.patch("/:idProject", updateProject)
router.get("/issue/:projectId", getIssuesByProject)
export default router
