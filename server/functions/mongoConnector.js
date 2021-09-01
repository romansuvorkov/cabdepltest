const MongoClient = require( 'mongodb' ).MongoClient;

let _db;

// let _client;

module.exports = {

  connectToServer: async () => {
    try {
      _db = await MongoClient.connect( process.env.DB_URI, {
        useUnifiedTopology: true,
        maxPoolSize: 10,
      })
      // _client = _db.db("testlib");
      return 'connected';
    } catch (err) {
      return err;
    }

  },

  getDb: () => {
    return _db;
  },

  // getClient: () => {
  //   return _client;
  // }
};
