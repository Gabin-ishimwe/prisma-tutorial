import { Router } from "express";
import { PrismaClient } from "@prisma/client"

const routes = Router()
const { user } = new PrismaClient()
routes.get("/", async (req, res) => {
  const users = await user.findMany({
    select: {
      username: true,
      post: true
    }
  })
  return res.status(200).json(users)
})

routes.post("/", async (req, res) => {
  const { username } = req.body
  const userExist = await user.findUnique({
    where: {
      username
    }
  })
  if (userExist) {
    return res.status(400).json({
      message: "user already exist"
    })
  }
  const userCreate = await user.create({
    data: {
      username
    },
    select: {
      username: true
    }
  })
  return res.status(200).json(userCreate)
})

export default routes