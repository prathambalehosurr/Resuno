const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const configuredOrigins = new Set(
    (process.env.FRONTEND_URL || "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
);

const localOrigins = new Set([
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]);

function isSameOriginRequest(req, origin) {
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;

    if (!host || !origin) {
        return false;
    }

    return origin === `${protocol}://${host}`;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors((req, callback) => {
    const origin = req.header("Origin");
    const isAllowedOrigin =
        !origin ||
        localOrigins.has(origin) ||
        configuredOrigins.has(origin) ||
        isSameOriginRequest(req, origin);

    callback(null, {
        origin: isAllowedOrigin,
        credentials: true
    });
}));

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
