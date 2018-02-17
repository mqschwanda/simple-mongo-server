const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true})) // handle json in response

const MongoClient = require('mongodb').MongoClient
let db

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) return console.log(err)
  db = client.db('simple-mongo-server') // connect to database

  const tasks = [{label: 'example 1'}, {label: 'example 2'}, {label: 'example 3'}]
  tasks.forEach(task => db.collection('tasks').insert(task))

  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/tasks', function (req, res) {
  db.collection('tasks').find().toArray(function (err, results) {
    if (err) console.log(err)
    console.log(results) // do whatever you want with the data on the server
    res.json(results) // send the data back to the user
  })
})
