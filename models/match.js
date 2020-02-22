'use strict';
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define('match', {
    status: DataTypes.BOOLEAN,
    pet_id: DataTypes.INTEGER,
    pet_like_id: DataTypes.INTEGER
  }, {});
  match.associate = function(models) {
    // associations can be defined here
    match.belongsTo(models.pet, {
      as: 'pet',
      foreignKey: 'pet_id',
    })
    match.belongsTo(models.pet, {
      as: 'pet_liked',
      foreignKey: 'pet_like_id',
    })
  };
  return match;
};