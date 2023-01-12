const postsService = require('../services/posts.service')

let apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix

    return {
        read: _read,
        readById: _readById,
        create: _create,
        update: _update,
        deactivate: _deactivate
    }
}

async function _read(req, res) {
    try {
        const posts = await postsService.read()
        res.json(posts)
    } catch (error) {
        res.send(error)
    }
}

async function _readById(req, res){
    try {
        const post = await postsService.readById(req.params.id)
        res.json(post)
    } catch (error) {
        res.send(error)
    }
}

async function _create(req, res) {
    try {
        const post = await postsService.create(req.body)
        res.send(post)
    } catch (error) {
        res.status(400).send(error)
    }
}

async function _update(req, res) {
    try {
        const post = await postsService.update(req.params.id, req.body)
        res.json(post)
    } catch (error) {
        res.status(400).send(error)
    }
}

async function _deactivate(req, res) {
    try {
        const result = await postsService.deactivate(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}