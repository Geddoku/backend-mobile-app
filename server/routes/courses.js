const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Course = require('../models/course');

router.post('/addCourse', (req, res, next) => {
  const course = new Course({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  });
  course.save()
    .then(result => res.status(200).json({ createdCourse: result }))
    .catch(err => res.status(500).json({ error: err}));
});

router.patch('/updateCourse/:courseId', (req, res, next) => {
  const id = req.params.courseId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.prop] = ops.value;
  }
  Course.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({error: err}));
});

router.get('/allCourses', (req, res, next) => {
  Course.find()
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err => res.status(500).json({error: err}));
});

module.exports = router;
