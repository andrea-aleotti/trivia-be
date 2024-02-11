const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

const indexRouter = require("./routes/index");
const userRouter = require("./routes/api/user");

app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;