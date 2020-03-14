const mongoose = require('mongoose');

const doc = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  anchor: { required: true, type: String }
});

module.exports = mongoose.model('Doc', doc);
