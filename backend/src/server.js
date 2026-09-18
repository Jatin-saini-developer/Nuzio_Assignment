import "dotenv/config";

import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { validateServerEnv } from "./config/env.js";

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    validateServerEnv();
    await connectDatabase();

    app.listen(port, () => {
      console.log(`API server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start API server:", error.message);
    process.exit(1);
  }
};

startServer();
