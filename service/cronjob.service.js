var schedule = require('node-schedule');
const CronJobs = require('../models/cronjobs.model');
const { json } = require('express');

class CronJob {
    constructor(){
        this.createJob = this.createJob.bind(this);
        this.stopJob = this.stopJob.bind(this);
        this.changeJob = this.changeJob.bind(this);
        this.performJob = this.performJob.bind(this);
    }
    
    createJob(jobId,date){
        let crondate = date.getMinutes()+' '+date.getHours()+' '+date.getDate()+' '+date.getMonth() + ' *';
        schedule.scheduleJob(jobId,crondate,()=>{
            this.performJob(jobId);
            this.stopJob(jobId);
        });
    }

    stopJob(jobId){
        let job = schedule.scheduledJobs[jobId];
        job.cancel();
        console.log('job terminated');
    }

    updateJob(jobId, newdate){
        let newcrondate = newdate.getMinutes()+' '+newdate.getHours()+' '+newdate.getDate()+' '+newdate.getMonth() + ' *';
        let jobToUpdate = schedule.scheduledJobs[jobId];
        jobToUpdate.reschedule(newcrondate);
    }

    performJob(jobId, response){
        CronJobs.findById(jobId)
                .then(job =>{
                    console.log(job.description);//perform job
                    response.json('Cron '+jobId+' updated');
                })
                .catch(err=>{
                    response.status(400).json('Error: '+json);
                });
    }

}

module.exports = CronJob;