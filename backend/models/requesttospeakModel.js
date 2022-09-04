import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const RequestToSpeak = db.define('requesttospeak', {
    id:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    user:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.JSON
    },
    updatedAt:{
        type: DataTypes.JSON
    },
    request:{
        type: DataTypes.STRING
    },
    state:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default RequestToSpeak;