const knex = require("../../db/connection")
const mapProperties = require("../../utils/map-properties")

const movieConfig = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
})

function list() {
    return knex("movies")
        .select("*")
}

function listShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where("mt.is_showing", "=", true)
        .groupBy("m.movie_id")
}

function read(movieId) {
    return knex("movies")
        .where("movies.movie_id", "=", movieId)
}

function listReviews(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        //.groupBy("r.review_id")
        .select("*")
        .where("movie_id", "=", movieId)
        .then((data) => data.map(movieConfig))
}

function listTheaters(movieId) {
    return knex("movies_theaters as mt")
        .where({"movie_id": movieId})
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("t.*")
}

module.exports = {
    list,
    listShowing,
    read,
    listTheaters,
    listReviews,
}