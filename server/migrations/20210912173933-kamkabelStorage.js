module.exports = {
  async up(db) {
    await db.createCollection("kamkabelStorage");
  },

  async down(db) {
    await db.collection("kamkabelStorage").drop();
  },
};
