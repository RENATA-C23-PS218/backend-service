"use strict";
const { nanoid } = require("nanoid");
const { Soil } = require("../models");
const plants = require("./soil-plant.json");

const soilType = async (name) => {
  const soil = await Soil.findOne({ where: { name } });
  return soil.id;
};

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
    for (const plant of plants) {
      await queryInterface.bulkInsert("Plants", [
        {
          id: nanoid(10),
          soil_id: await soilType(plant.Tanah),
          name: plant.Tanaman,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Plants", null, {});
  },
};
