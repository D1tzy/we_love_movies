const knex = require("../../db/connection")
const mapProperties = require("../../utils/map-properties");

const addCritic = mapProperties({
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname"
});

function destroy(reviewId) {
    return knex("reviews")
        .where({"review_id": reviewId})
        .del()
}

function update(updatedReview){
    return knex("reviews")
        .select("r.content", "r.rating")
        .where({review_id: updatedReview.review_id})
        .update(updatedReview);
};

function read(reviewId) {
    return knex("reviews")
        .where({"review_id": reviewId})
}

function readUpdatedReview(review_id){
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id" )
        .select("*")
        .where({review_id})
        .first()
        .then(addCritic);
};

module.exports = {
    delete: destroy,
    read,
    update,
    readUpdatedReview
}