module.exports = {
  async up(db) {
    await db.createCollection("interGasCert");
  },

  async down(db) {
    await db.collection("interGasCert").drop();
  },
};
