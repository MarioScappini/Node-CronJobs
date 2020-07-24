
var schedule = require('node-schedule');

const app = express();

var counter = 0;
let uniqueJobName = 'test';
var job = schedule.scheduleJob(uniqueJobName,'*/10 * * * * *', function(){
    console.log('The counter is'+counter++);
    test();
});

function test(){
    if (counter>2) {
        let current_job = schedule.scheduledJobs[uniqueJobName];
        current_job.cancel();
        console.log('done');
    }
}



app.listen(3128);