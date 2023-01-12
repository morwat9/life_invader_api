const commentsService = require("../services/comments.service");

let apiPrefix;

module.exports = (apiPrefix) => {
  _apiPrefix = apiPrefix;

  return {
    read: _read,
    readById: _readById,
    create: _create,
    update: _update,
    deactivate: _deactivate,
  };
};

async function _read(req, res) {
  try {
    const comments = await commentsService.read();
    res.json(comments);
  } catch (error) {
    res.send(error);
  }
}

async function _readById(req, res) {
  try {
    const comment = await commentsService.readById(req.params.id);
    res.json(comment);
  } catch (error) {
    res.send(error);
  }
}

async function _create(req, res) {
  try {
    const comment = await commentsService.create(req.body);
    res.send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function _update(req, res) {
  try {
    const comment = await commentsService.update(req.params.id, req.body);
    res.json(comment);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function _deactivate(req, res) {
  try {
    const result = await commentsService.deactivate(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
}
