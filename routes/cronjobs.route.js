const router = require('express').Router();
let CronJob = require('../models/cronjobs.model');

router.route('/').get((req,res)=>{// Get all cron jobs
    CronJob.find()  
            .then(jobs=> res.json(jobs))
            .catch(err => res.status(400).json("Error: "+err));
});

router.route('/:id').get((req,res)=>{// Get Cron Job by ID
    CronJob.findById(req.param.id)
            .then(cronjob => res.json(cronjob))
            .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{ // Add Cron Job
    const username = req.body.username;
    const description = req.body.description;
    const date = req.body.date;

    const newCronJob = new CronJob(
        username,
        description,
        date
    );

    newCronJob.save()
            .then(()=> res.json('Cron Job Added'))
            .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res)=>{// Update Cron Job
    CronJob.findById(req.body.id)
            .then(cronjob=>{
                cronjob.username = req.body.usernamel;
                cronjob.description = req.body.description;
                cronjob.date = req.body.date;

                cronjob.save()
                        .then(()=>res.json('Job Updated!'))
                        .catch(err=> res.status(400).json('Error: '+err));
            })
            .catch(err => res.status(400).json('Erro: '+err));
});

router.route('/:id').delete((req,res)=>{// Delete Cron Job
    CronJob.findByIdAndDelete(req.param.id)
            .then(()=>res.json('Job Deleted!'))
            .catch(err=>res.status(400).json('Error: '+err));
});