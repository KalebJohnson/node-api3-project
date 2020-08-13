const express = require("express")

const userRouter = require("./users/userRouter")
const postsRouter = require("./posts/postRouter")
const morgan = require("morgan")

const server = express()
const port = 4000

server.use(express.json())

server.use(morgan("combined"))

//connecting router
server.use("/users" , userRouter)
server.use("/posts" , postsRouter)

server.listen(port, () => {
	console.log(`Server running on ${port}`)
})