module.exports = {
  async up(db) {
    await db.createCollection("factories");
  },

  async down(db) {
    await db.collection("factories").drop();
  },
};
