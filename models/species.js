'use strict';
module.exports = (sequelize, DataTypes) => {
  const sepecies = sequelize.define('species', {
    name: DataTypes.STRING
  }, {});
  sepecies.associate = function(models) {
    // associations can be defined here
  };
  return sepecies;
};