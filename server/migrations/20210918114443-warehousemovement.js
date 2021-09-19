module.exports = {
  async up(db) {
    await db.createCollection("warehouseMovement");
  },

  async down(db) {
    await db.collection("warehouseMovement").drop();
  },
};
