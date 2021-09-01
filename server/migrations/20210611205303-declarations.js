module.exports = {
  async up(db) {
    await db.createCollection("declarations");
  },

  async down(db) {
    await db.collection("declarations").drop();
  },
};
