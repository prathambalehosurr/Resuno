const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true,"toekn is required to be added in blacklist"]
        },
    }, {
        timestamps: true
    }
)


const tokenBlacklist = mongoose.model("tokenBlacklist", blacklistTokenSchema)




module.exports = tokenBlacklist


