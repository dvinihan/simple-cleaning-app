import "dotenv/config";

export default {
  name: "SimpleCleaningApp",
  version: "1.0.0",
  extra: {
    SIMPLE_CLEANING_APP_API: process.env.SIMPLE_CLEANING_APP_API,
  },
};
