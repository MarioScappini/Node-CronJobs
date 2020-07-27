const router = require('express').Router();
let CronJob = require('../models/cronjobs.model');
const job = require('../service/cronjob.service');

router.route('/').get((req,res)=>{// Get all cron jobs
    CronJob.find()  
            .then(jobs=> res.json(jobs))
            .catch(err => res.status(400).json("Error: "+err));
});

router.route('/:id').get((req,res)=>{// Get Cron Job by ID
    CronJob.findById(req.params.id)
            .then(cronjob => res.json(cronjob))
            .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{ // Add Cron Job
    const username = req.body.username;
    const description = req.body.description;
    const date = req.body.date;

    const newCronJob = new CronJob({
        username,
        description,
        date
    });

    newCronJob.save()
            .then(()=> {
                res.json('Cron Job Added');
                let newjob = new job();
                newjob.createJob(newCronJob.id,date); //later change time for crondate var
            })
            .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res)=>{// Update Cron Job
    CronJob.findById(req.body.id)
            .then(cronjob=>{
                var mustUpdateDate = false;
                cronjob.username = req.body.username;
                cronjob.description = req.body.description;
                if(cronjob.date === req.body.date){
                    mustUpdateDate = true;
                    console.log('Check');
                }
                cronjob.date = req.body.date;

                cronjob.save()
                        .then(()=>{
                            if(mustUpdateDate){
                                let updatejob = new job();
                                updatejob.updateJob(req.body.id,req.body.date);
                            }
                            res.json('Job Updated!');
                        }).catch(err=> res.status(400).json('Error: '+err));
            })
            .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{// Delete Cron Job
    CronJob.findByIdAndDelete(req.params.id)
            .then(()=>{
                let newjob = new job();
                newjob.stopJob(req.params.id);
                res.json('Job Deleted!')
            })
            .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;