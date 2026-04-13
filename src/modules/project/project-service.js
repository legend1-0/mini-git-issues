import {prisma} from "../../db/client.js"

export const getProjectsLogic = async ()=> {
    return await prisma.project.findMany({
        include: {issues: true}
    })
}
export const getUniqueProjectLogic = async (id) =>{
    return await prisma.project.findUnique({
        where:{id},
        include: {issues: true}
    })
}

export const createProjectLogic = async (data) => {
    return await prisma.project.create({
        data
    })
}

export const updateProjectLogic = async (data,id) => {
    return await prisma.project.update({
    where: {id},
        data,
        include:{
            issues:true
        }
    })
}

export const deleteProjectLogic = async (id) =>{
    return await prisma.project.delete({
        where:{id}
    })
}