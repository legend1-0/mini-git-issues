import { Router } from "express";
import { createIssue, deleteIssue, updateIssue } from "./isssue-controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createIssueSchema } from "../../validators/issueValidators.js";
const router = Router()
router.use(authMiddleware)
router.post("/project/:projectId/Issue",validateRequest(createIssueSchema), createIssue)
router.patch("/project/:issueId/Issue", updateIssue)
router.delete("/project/:issueId/Issue", deleteIssue)


export default router