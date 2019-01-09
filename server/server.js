require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const authCtrl = require('./controllers/authController')
const tresCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')

const app = express()

app.use(express.json())
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SECRET
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', tresCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, tresCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, tresCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, tresCtrl.getAllTreasure)

massive(process.env.CONNECTION_STRING)
    .then(connection => {
        app.set('db', connection)
        app.listen(process.env.SERVER_PORT, () => console.log(`listening on port ${process.env.SERVER_PORT}`))
})
.catch((err) => {console.log(err)})