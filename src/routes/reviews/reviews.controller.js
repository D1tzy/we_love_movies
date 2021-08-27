const service = require("./reviews.service")

async function destroy(req, res, next) {
    const {reviewId} = res.locals
    res.status(204).json({data: await service.delete(reviewId)})
}

async function update(req, res){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.reviewId, 
    };
    console.log(updatedReview, req.body.data)
    await service.update(updatedReview);
    const data = await service.readUpdatedReview(res.locals.reviewId);
    res.json({data});
};

async function reviewExists(req, res, next) {
    const {reviewId} = req.params
    const review = await service.read(reviewId)

    if (review.length > 0) {
        res.locals = {
            reviewId: reviewId,
            review: review,
        }

        return next()
    }

    next({status: 404, error: "Review cannot be found"})
}

module.exports = {
    delete: [reviewExists, destroy],
    update: [reviewExists, update]
}