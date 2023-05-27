"use strict";
const { nanoid } = require("nanoid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Soil", [
      {
        id: nanoid(10),
        name: "Aluvial",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(10),
        name: "Andosol",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(10),
        name: "Entisol",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(10),
        name: "Humus",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(10),
        name: "Inceptisol",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(10),
        name: "Kapur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(10),
        name: "Laterit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(10),
        name: "Pasir",
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
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Soil", null, {});
  },
};
