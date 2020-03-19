const express = require('express');
const Tasks = require('../db/models/Ops/Tasks');

const router = express.Router();

//---------------------------------------------------------- New task from user form ----------------------------------------------------------//
// @route: Post /api/tasks/new_task;
// @desc: create new task from user form
// @ access: Public  *ToDo make private once tenants begin to log on on the software.
router.post('/new_task', async (req, res) => {

    const task = await new Tasks(req.body)
    await task.save();
    res.status(200).send(task)
})

// @route: Get /api/tasks/;
// @desc: get all open tasks
// @ access: Public  *ToDo make private.
router.get('/', async (req, res) => {
    const tasks = await Tasks.find({ 'task.status': { $ne: 'closed' } });
    res.status(200).send(tasks)
})

// @route: Get /api/tasks/branch/:task_id;
// @desc: create new branch associated with task
// @ access: Public  *ToDo make private.

//
//increment level
//is parrent set to true


// @route: Get /api/tasks/;
// @desc: get all open tasks
// @ access: Public  *ToDo make private.




module.exports = router;
