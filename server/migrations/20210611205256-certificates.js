module.exports = {
  async up(db) {
    await db.createCollection("certificates");
  },

  async down(db) {
    await db.collection("certificates").drop();
  },
};
