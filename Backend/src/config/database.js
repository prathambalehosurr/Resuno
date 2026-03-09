const mongoose = require("mongoose");

let cachedConnection = global.mongooseConnection;

if (!cachedConnection) {
    cachedConnection = global.mongooseConnection = {
        connection: null,
        promise: null
    };
}

async function connectToDB() {
    if (cachedConnection.connection) {
        return cachedConnection.connection;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not configured");
    }

    if (!cachedConnection.promise) {
        cachedConnection.promise = mongoose
            .connect(process.env.MONGO_URI)
            .then((mongooseInstance) => mongooseInstance.connection);
    }

    cachedConnection.connection = await cachedConnection.promise;

    return cachedConnection.connection;
}

module.exports = connectToDB;
