const Express = require('express');
const Cors = require('cors');
const Mongoose = require('mongoose');

require('dotenv').config();

let app = Express();

app.use(Cors());
app.use(Express.json());

const port = process.env.PORT || 5000;

Mongoose.connect(process.env.ATLAS_URI,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});

Mongoose.connection.once('open', function(){
    console.log('Mongodb connection established!');
});

const usersRouter = require('./routes/users.route');
const cronJobsRouter = require('./routes/cronjobs.route');

app.use('/users',usersRouter);
app.use('/jobs',cronJobsRouter);

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});