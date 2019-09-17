const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({
    username:  String,
    task: String
});
  
module.exports = mongoose.model('Tasks', tasksSchema)