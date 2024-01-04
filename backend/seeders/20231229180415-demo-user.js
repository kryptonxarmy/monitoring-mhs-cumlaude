"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        user_id: 1202213054,
        password: "danu",
        role: "mahasiswa",
        name: "Ahmad Syahid Danu Wardana",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1202210371,
        password: "jentra",
        role: "mahasiswa",
        name: "Jentra Sukma Asruli",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1202213026,
        password: "ilham",
        role: "mahasiswa",
        name: "Rakha Putra Pebri Yandra",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1202213134,
        password: "rakha",
        role: "mahasiswa",
        name: "Ahmad Syahid Danu Wardana",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 14830024,
        password: "ayahanda",
        role: "kaprodi",
        name: "Taufik Nur Adi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
