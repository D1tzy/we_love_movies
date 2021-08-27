const service = require("./movies.service")

async function list(req, res, next) {
    const {is_showing = false} = req.query
    if (is_showing === 'true') {
        return res.json({data: await service.listShowing()})
    } else {
        res.json({data: await service.list()})
    }
}

async function read(req, res, next) {
    res.json({data: res.locals.data[0]})
}

async function listTheaters(req, res, next) {
    const {movie_id} = res.locals.data[0]
    res.json({data: await service.listTheaters(movie_id)})
}

async function listReviews(req, res, next) {
    const {movie_id} = res.locals.data[0]
    var data = await service.listReviews(movie_id)

    //data["content"] = "hello"
    res.json({data: data})
}

async function movieExists(req, res, next) {
    const movieId = req.params.movieId
    const data = await service.read(movieId)
    
    if (data.length > 0) {
        res.locals.data = data
        return next()
    } 

    return next({status: 404, error: "Movie cannot be found"})
}

module.exports = {
    list,
    read: [movieExists, read],
    listTheaters: [movieExists, listTheaters],
    listReviews: [movieExists, listReviews],
}