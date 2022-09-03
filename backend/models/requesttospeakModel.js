import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const RequestToSpeak = db.define('requesttospeak', {
    id:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    uid:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.STRING
    },
    updatedAt:{
        type: DataTypes.STRING
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