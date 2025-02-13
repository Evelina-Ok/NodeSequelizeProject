import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from "sequelize";
export class brandModel extends Model {}

brandModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    logo_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    sequelize,
    modelName: "brand", // Modellens navn
    underscored: true, // True: car_brands || False: carBrands
    freezeTableName: true, // True: car || False: cars
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
  }
);