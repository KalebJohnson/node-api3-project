require('dotenv').config();
const express = require("express")

const userRouter = require("./users/userRouter")
const postsRouter = require("./posts/postRouter")
//const morgan = require("morgan")
const logger = require("./users/logger")


const server = express()
const port = process.env.PORT || 4000;

server.use(express.json())

//server.use(morgan("combined"))
server.use(logger())

//connecting routers
server.use("/users" , userRouter)
server.use("/posts" , postsRouter)

server.listen(port, () => {
	console.log(`Server running on ${port}`)
})