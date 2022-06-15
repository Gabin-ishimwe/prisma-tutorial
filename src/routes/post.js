import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const route = Router()
const { post, user } = new PrismaClient()

route.get('/', async (req, res) => {
  const posts = await post.findMany()
  return res.status(200).json(posts)
})

route.post("/", async (req, res) => {
  const { title, content, userId } = req.body
  const userExist = await user.findUnique({
    where: {
      id: userId
    }
  })
  if (!userExist) {
    return res.status(400).json({
      message: "user doesn't exist"
    })
  }
  const postCreate = await post.create({
    data: {
      title,
      content,
      userId
    }
  })
  return res.status(200).json(postCreate)
})

export default route