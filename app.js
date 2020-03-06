const Task = require('./task');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const errorLog = require('./logger').errorlog;
const successlog = require('./logger').successlog;
var taskList = [{title: 'Task 1', dueDate: '01/10/2020'}]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*" );
  res.setHeader("Access-Control-Request-Headers", "*" );
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();

});

app.post('/api/tasks', (req, res,next) => {
  const task = new Task({
  title: req.body.title,
  dueDate: req.body.dueDate
  });
  taskList.push(task);
  res.status('201').json({
    message: 'Task added successfully',
  });
  successlog.info('Task added successfully: ' +task);
  console.log('Task added successfully: ' +task);
});

app.put("/api/tasks/:title", (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    dueDate: req.body.dueDate
  });
  index = taskList.findIndex(x => x.title ===req.params.title);
  if (index){
    taskList[index] ={title: task.title, dueDate: task.dueDate};
    res.status(200);
    console.log("Task Found: " +task);
    successlog.info("Task Found: " +task);
  } else{
    res.status(404).json( {message: 'Task Not Found!'});
    errorLog.error('Task Not Found!' +taskList);
  }

})

app.get('/api/tasks',(req, res, next) => {
  res.status(200).json( taskList);
});

app.get("/api/tasks/:title", (req, res, next) => {
  index = taskList.findIndex(x => x.title ===req.params.title);
  if (index){
    taskList.splice(index, 1);
    res.status(200);
    console.log("Task Found: :" +taskList[index]);
    successlog.info("Task Found: :" +taskList[index]);
  } else{
    res.status(404).json( {message: 'Task Not Found!'});
    console.log('Task Not Found!');
    errorLog.error("Task Update -> Task Not Found!" +taskList[index]);
  }

});
app.delete("/api/tasks/:title", (req, res, next) => {
  index = taskList.findIndex(x => x.title ===req.params.title);
  if (index){
    taskList.splice(index, 1);
    res.status(200).json( {message: 'Task Deleted!'});
    console.log('Task Deleted!');
    successlog.info("Task Deleted:" +taskList[index]);
  } else{
    res.status(404).json( {message: 'Task Not Found!'});
    console.log('Task Not Found!');
    errorLog.error("Task Delete -> Task Not Found!" +taskList[index]);
  }
});

module.exports = app;
