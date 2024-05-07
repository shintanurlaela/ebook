const express = require(`express`)
const app = express()

app.use(express.json())

const userController = require(`../controllers/user-controller`)


app.get(`/user`, userController.getUser)
app.get(`/user/:role`, userController.roleUser)
app.post(`/user/find`, userController.findUser)
app.post(`/user/save`, userController.addUser)
app.put(`/user/:id`, userController.updateUser)
app.delete(`/user/:id`,userController.deleteUser)

module.exports = app