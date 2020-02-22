'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    no_rek: DataTypes.INTEGER,
    proof_of_transfer: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
    payment.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'user_id',
    })
  };
  return payment;
};