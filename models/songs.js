// ******************************************************************************************************
// songs.js [Songs Table Model]
// ******************************************************************************************************

module.exports = function (sequelize, Sequelize) {
  var Song = sequelize.define("Song", {
    sid: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cid: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    song_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    song_url: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    artist: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    requested: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING(10),
      allowNull: false
    }
  }, { timestamps: false });
  return Song;
};