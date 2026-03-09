const app = require("../Backend/src/app");
const connectToDB = require("../Backend/src/config/database");

module.exports = async (req, res) => {
  try {
    await connectToDB();
    return app(req, res);
  } catch (error) {
    console.error("Failed to bootstrap API handler:", error);
    return res.status(500).json({
      message: "Server configuration error"
    });
  }
};
