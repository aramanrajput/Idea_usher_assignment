let mongoose = require("mongoose");
const env = process.env
const connect = () => {
  return mongoose.connect(`mongodb+srv://${env.db_user}:${env.db_password}@cluster0.pkzgq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
};

module.exports = { connect };
