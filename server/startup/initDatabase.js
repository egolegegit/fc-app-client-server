// 1. У любого пользователей будет набор данных qualities & professions
// 2. Они равны mock данным

const Profession = require("../models/Professions");
const Qualities = require("../models/Qualities");
const professionMock = require("../mock/professions.json");
const qualitiesMock = require("../mock/qualities.json");

module.exports = async () => {
  const professions = await Profession.find();
  if (professions.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock);
  }

  const qualities = await Qualities.find();
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Qualities, qualitiesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        console.log(error);
        return error;
      }
    })
  );
}
