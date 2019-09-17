
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const TasksModel = require('./models/TasksModel')


const app = express();
app.use(cors({
  origin: 'http://localhost:8080'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));


// this is our MongoDB database
const dbRoute =
  'mongodb://mongo:27017/tasker';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

jsonResponseByUsername = async (req, res) => {
  const tasks = await TasksModel.find({ username: req.params.username});
  res.json({
    username: req.params.username,
    tasks: tasks
  });
}

app.get('/:username', jsonResponseByUsername);

app.put('/:username', async (req, res) =>
{
  let newTask = new TasksModel({ username: req.params.username, task: req.body.content});

  newTask.save( async (err, newTask) => {
    if (err) {
      res.status(500);
      res.json({
        task: newTask,
        err: err
      });
      return
    }
    jsonResponseByUsername(req, res)
  });
});

app.delete('/:username/:taskId', async (req, res) =>
{
  const searchForData = { _id: req.params.taskId, username: req.params.username };
  if(!await TasksModel.exists(searchForData)) {
    res.status(404);
    res.json({
      _id: req.params.taskId, 
      username: req.params.username
    });
    return
  }

  TasksModel.deleteOne(searchForData, (err) => {
    if (err) {
      res.status(500);
      res.json({
        _id: req.params.taskId, 
        username: req.params.username,
        err: err
      });
      return
    }
    res.json({
      _id: req.params.taskId, 
      username: req.params.username
    });
  });
});
console.log(process.env.PORT)
app.listen(process.env.PORT)