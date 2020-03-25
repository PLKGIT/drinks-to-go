// ******************************************************************************************************
// songs.js [Songs Table Model]
// ******************************************************************************************************
'use strict';
module.exports = function (sequelize, Sequelize) {
  var Song = sequelize.define("Song", {
    sid: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // cid: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false
    // },
    song_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    song_url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    artist: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    requested: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING(10),
      defaultValue: "Pending",
      allowNull: false
    }
  }, { timestamps: false });
  return Song;
};