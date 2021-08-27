if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const moviesRouter = require("./routes/movies/movies.router")
const reviewsRouter = require("./routes/reviews/reviews.router")
const theatersRouter = require("./routes/theaters/theaters.router")

app.use(cors())
app.use(express.json())

app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)

app.use((req, res, next) => {
  next({status: 404, message: "Not found"})
})

app.use((err, req, res, next) => {
  const {status = 500, error = "Internal server error"} = err
  res.status(status).json({error: error})
})

module.exports = app;
