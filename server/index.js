const jsonServer= require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middleware = jsonServer.defaults()

const PORT = process.env.variable.PORT || 3000