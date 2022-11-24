const DatabaseManagement =
  require("./_baseDalFunctionalities").DatabaseManagement;
const creationTableFields =
  require("../Models/creationTableFields.model").creationTableFields;
const insertFields = require("../Models/insertFields.model").insertFields;

var path = require("path");
const { convertToBoolean } = require("../services/otherServices");

function positionDAL() {
  const tableName = "position";

  this._crateTable = async()=> {
    let db = new DatabaseManagement();

    return await db
      .createTable(tableName, [
        new creationTableFields("positionID", "text", false, true, true, false),
        new creationTableFields("aisleID", "text"),
        new creationTableFields("row", "text"),
        new creationTableFields("col", "text"),
        new creationTableFields("maxWeight", "integer"),
        new creationTableFields("maxVolume", "integer"),
        new creationTableFields("occupiedWeight", "integer"),
        new creationTableFields("occupiedVolume", "integer"),
      ]);
  }

  this.getAll = async () => {
    let db = new DatabaseManagement();

    

    const positions = await db.getAllData(tableName);

    if (!positions) return null;

    return positions;
  };

  this.add = async (position) => {
    let db = new DatabaseManagement();
    

    return await db.insertData(tableName, [
      new insertFields("positionID", position.positionID),
      new insertFields("aisleID", position.aisleID),
      new insertFields("row", position.row),
      new insertFields("col", position.col),
      new insertFields("maxWeight", position.maxWeight),
      new insertFields("maxVolume", position.maxVolume),
      new insertFields("occupiedWeight", 0),
      new insertFields("occupiedVolume", 0),
    ]);
  };

  this.remove = async (positionID) => {
    let db = new DatabaseManagement();

    

    const result = await db.deleteByWhereCondition(tableName, `positionID=${positionID}`);
  };

  this.update = async (id, newPosition) => {
    let db = new DatabaseManagement();

    
    const newPositionID = newPosition.newAisleID + newPosition.newRow + newPosition.newCol;

    let rows = [];
    if (convertToBoolean( newPositionID)) rows.push(new insertFields("positionID", newPositionID));
    if (convertToBoolean( newPosition.newAisleID)) rows.push(new insertFields("aisleID", newPosition.newAisleID));
    if (convertToBoolean( newPosition.newRow)) rows.push(new insertFields("row", newPosition.newRow));
    if (convertToBoolean( newPosition.newCol)) rows.push(new insertFields("col", newPosition.newCol));
    if (convertToBoolean( newPosition.newMaxWeight)) rows.push(new insertFields("maxWeight", newPosition.newMaxWeight));
    if (convertToBoolean( newPosition.newMaxVolume)) rows.push(new insertFields("maxVolume", newPosition.newMaxVolume));
    if (convertToBoolean( newPosition.newOccupiedWeight)) rows.push(new insertFields("occupiedWeight", newPosition.newOccupiedWeight));
    if (convertToBoolean( newPosition.newOccupiedVolume)) rows.push(new insertFields("occupiedVolume", newPosition.newOccupiedVolume));

    return await db.updateData(tableName, rows, `positionID = ${id}`);
  };

  this.updateId = async (id,newId) => {
    let db = new DatabaseManagement();

    
    
    let strArray = newId.newPositionID.match(/.{1,4}/g);
    let aisleID=strArray[0];
    let row=strArray[1];
    let col=strArray[2];

    let rows = [];
    if (newId.newPositionID) rows.push(new insertFields("positionID", newId.newPositionID));
    if (aisleID) rows.push(new insertFields("aisleID", aisleID));
    if (row) rows.push(new insertFields("row", row));
    if (col) rows.push(new insertFields("col", col));

    return await db.updateData(tableName, rows, `positionID = ${id}`);
  };
}

exports.positionDAL = positionDAL;