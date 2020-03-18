module.exports = function (sequelize, Sequelize) {
  var Song = sequelize.define("Song", {
    sid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    song_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    song_url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    requested: {
      type: Sequelize.DATE,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, { timestamps: false });
  return Song;
};