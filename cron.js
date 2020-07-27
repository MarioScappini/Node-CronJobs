var express = require('express');
var schedule = require('node-schedule');

const app = express();

var counter = 0;
let uniqueJobName = 'test';
var job = schedule.scheduleJob(uniqueJobName,'*/5 * * * * *', function(){
    console.log('The counter is '+counter++);
    test();
});

function test(){
    if (counter>2) {
        let current_job = schedule.scheduledJobs[uniqueJobName];
        current_job.reschedule('*/1 * * * * *');
        
        console.log('done');
    }
}



app.listen(3128);