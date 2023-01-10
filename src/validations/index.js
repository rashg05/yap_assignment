const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const addNoteValidation = require('./add-note.validation');
const updateNoteValidation = require('./update-note.validation');
const recoveryParamsValidation = require('./recovery-params.validation');

module.exports = {
  getListValidation,
  getId,
  addNoteValidation,
  updateNoteValidation,
  recoveryParamsValidation,
};