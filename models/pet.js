'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    species_id: DataTypes.INTEGER,
    age_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    about_pet: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  pet.associate = function(models) {
    // associations can be defined here
    pet.belongsTo(models.species, {
      as: 'species',
      foreignKey: 'species_id',
    })
    pet.belongsTo(models.age, {
      as: 'age',
      foreignKey: 'age_id',
    })
    pet.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'user_id',
    })
  };
  return pet;
};
