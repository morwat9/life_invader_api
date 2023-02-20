const likesService = require("../services/likes.service");

let apiPrefix;

module.exports = (apiPrefix) => {
  _apiPrefix = apiPrefix;

  return {
    postAdd: _postAdd,
    postRemove: _postRemove,
    commentAdd: _commentAdd,
    commentRemove: _commentRemove,
  };
};

async function _postAdd(req, res) {
  try {
    const result = await likesService.postAdd(req.params.id, req.body.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
}

async function _postRemove(req, res) {
  try {
    const result = await likesService.postRemove(req.params.id, req.body.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
}

async function _commentAdd(req, res) {
  try {
    const result = await likesService.commentAdd(req.params.id, req.body.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
}

async function _commentRemove(req, res) {
  try {
    const result = await likesService.commentRemove(req.params.id, req.body.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
}
