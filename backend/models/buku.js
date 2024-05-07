'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  buku.init({
    id_buku: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    judul: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    gambar: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'buku',
  });
  return buku;
};