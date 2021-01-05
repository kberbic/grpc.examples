const Statistic = (sequelize, { DataTypes }) => sequelize.define('statistic', {
  name: {
    type: DataTypes.STRING,
  },
});

export default Statistic;
