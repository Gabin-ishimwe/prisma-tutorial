import express from "express"
import users from "../src/routes/user.js"
import posts from "../src/routes/post.js"
const app = express()

app.use(express.json())
app.use("/users", users)
app.use("/posts", posts)

app.listen(5000, () => {
  console.log("listening on port " + 5000)
})