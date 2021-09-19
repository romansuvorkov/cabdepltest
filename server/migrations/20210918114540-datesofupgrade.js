module.exports = {
  async up(db) {
    await db.createCollection("datesOfUpgrade");
  },

  async down(db) {
    await db.collection("datesOfUpgrade").drop();
  },
};
