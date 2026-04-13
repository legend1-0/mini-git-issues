import {prisma} from "../../db/client.js"

export const createIssueLogic = async (data, projectId, res, req) =>{
    const {description, title} = data
  const Project = await prisma.project.findUnique({
    where: {id: projectId}
  })
  if(!Project){
      return res.json(`not found Project`)
    }
    
    const existingIssue = await prisma.issue.findUnique({
      where: {userId_projectId: {
        userId: req.user.id,
        projectId: projectId,
      }}
    })
  if(existingIssue){
      return res.json(`issue exists`)
    }

    const issueItems = await prisma.issue.create({
        data: {
            userId: req.user.id,
            projectId,
            title,
            description
        }
    })

    res.status(201).json(issueItems)
}
export const getIssuesByProjectLogic = async (projectId) =>{
    return await prisma.issue.findMany({
        where:{projectId}
    })
}
export const updateIssueLogic = async (data, id) =>{
    return await prisma.issue.update({
        where:{id},
        data
    })
}

export const deleteIssueLogic = async (id) =>{
    return await prisma.issue.delete({
        where: {id}
    })
}