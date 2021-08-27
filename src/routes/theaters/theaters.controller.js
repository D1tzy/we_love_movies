const service = require("./theaters.service")

async function list(req, res, next) {
    const data = await service.list()
    res.json({data: await Promise.all(data.map( async (theater) => { 
        const movies = await service.movieTheaters(theater.theater_id);
        theater.movies = movies;
        return theater}))
    });
}

module.exports = {
    list,
}