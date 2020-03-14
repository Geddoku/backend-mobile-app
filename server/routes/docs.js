const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const fs = require('fs');

const Doc = require('../models/doc');

router.post('/pdfUpload', (req, res) => {
  const doc = new Doc({
    _id: new mongoose.Types.ObjectId,
    anchor: req.body.anchor
  });
  doc.save()
    .then(result => res.status(200).json({ anchor: result }))
    .catch(err => res.status(500).json({ error: err}));
});

router.get('/pdfUpload/:uploadId', (req, res) => {
  const id = req.params.uploadId;
  console.log(req.params.uploadId);
  Doc.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
        console.log(JSON.stringify(doc.anchor));
        let file = fs.createReadStream(`./public/${doc.anchor}`);
        file.pipe(res);
      } else {
        res.status(500).json({ error: err});
      }
    })
    .catch(err => res.status(500).json({ error: err}));
});

module.exports = router;
