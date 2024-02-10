const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const indexRouter = require("./routes/index");
const userRouter = require("./routes/api/user");

app.use("/", indexRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;