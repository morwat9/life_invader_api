const usersService = require("../services/users.service");

let apiPrefix;

module.exports = (apiPrefix) => {
  _apiPrefix = apiPrefix;

  return {
    read: _read,
    readById: _readById,
    create: _create,
    update: _update,
    deactivate: _deactivate,
    login: _login,
  };
};

async function _read(req, res) {
  try {
    const users = await usersService.read();
    res.json(users);
  } catch (error) {
    res.send(error);
  }
}

async function _readById(req, res) {
  try {
    const user = await usersService.readById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function _create(req, res) {
  try {
    const user = await usersService.create(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}
async function _update(req, res) {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function _deactivate(req, res) {
  try {
    const user = await usersService.deactivate(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function _login(req, res) {
  try {
    const token = await usersService.login(req.body);
    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
