var mongoose = require('mongoose');

(async function () {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/thullon");
    console.log("Database connected!");

    console.log(conn.models)
  } catch (e) {
    console.log(e);
    throw e;
  }
})();