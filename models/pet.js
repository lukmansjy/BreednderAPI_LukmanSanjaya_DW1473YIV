'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    sepcies_id: DataTypes.INTEGER,
    age: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    about_pet: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  pet.associate = function(models) {
    // associations can be defined here
    pet.belongsTo(models.species, {
      as: 'speciesId',
      foreignKey: 'species_id',
    })
    pet.belongsTo(models.user, {
      as: 'ageId',
      foreignKey: 'age_id',
    })
    pet.belongsTo(models.user, {
      as: 'userId',
      foreignKey: 'user_id',
    })
  };
  return pet;
};