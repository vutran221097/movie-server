const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Back End chạy thành công");
});

//routes
require("./routes/movie.js")(app);

// 404 not found route
app.use((req, res, next) => {
  res.status(404).send({
    errorMessage: "Route not found",
  });
});

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
