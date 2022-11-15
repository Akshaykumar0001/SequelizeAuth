module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allownull: false,
      },
      email: {
        type: DataTypes.STRING,
        allownull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allownull: false,
      },
      password: {
        type: DataTypes.STRING,
        allownull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "userdetails",
      timestamps: false,
    }
  );
  return User;
};
