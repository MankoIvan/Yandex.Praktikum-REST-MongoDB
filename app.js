const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "5db8ad51ca029d0d443298f1",
  };
  next();
});

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use("/", usersRouter);
app.use("/", cardsRouter);
app.get("*", (req, res) => {
  res.status(404);
  res.send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
