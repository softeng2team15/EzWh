const DatabaseManagement =
  require("./_baseDalFunctionalities").DatabaseManagement;
const creationTableFields =
  require("../Models/creationTableFields.model").creationTableFields;
const insertFields = require("../Models/insertFields.model").insertFields;

const { convertToBoolean } = require("../services/otherServices");

function skuItemDAL() {
  const tableName = "skuItem";

  this._crateTable = async () => {
    let db = new DatabaseManagement();
    return await db.createTable(tableName, [
      new creationTableFields("RFID", "text", false, true, true, false),
      new creationTableFields("SKUId", "integer"),
      new creationTableFields("Available", "boolean"),
      new creationTableFields("DateOfStock", "date"),
    ]);
  }

  this.getAll = async () => {
    let db = new DatabaseManagement();



    const skuItems = await db.getAllData(tableName);

    if (!skuItems) return null;

    return skuItems;
  };

  this.getById = async (id) => {
    let db = new DatabaseManagement();



    const skuItems = await db.getAllData(
      tableName,
      `SKUId = ${id} AND Available = 1`
    );


    return skuItems;
  };

  this.getByRfid = async (rfid) => {
    let db = new DatabaseManagement();



    const skuItems = (await db.getAllData(tableName, `RFID = "${rfid}"`))[0];

    if (!skuItems) return null;

    return skuItems;
  };

  this.add = async (skuItem) => {
    let db = new DatabaseManagement();


    return await db.insertData(tableName, [
      new insertFields("RFID", skuItem.RFID),
      new insertFields("SKUId", skuItem.SKUId),
      new insertFields("Available", 0),
      new insertFields("DateOfStock", skuItem.DateOfStock),
    ]);
  };

  this.remove = async (rfid) => {
    let db = new DatabaseManagement();



    const result = await db.deleteByWhereCondition(tableName, `RFID = '${rfid}'`);
  };

  this.update = async (rfid, newSkuItem) => {
    let db = new DatabaseManagement();

    let rows = [];
    if (convertToBoolean(newSkuItem.RFID))
      rows.push(new insertFields("RFID", newSkuItem.RFID));
    if (convertToBoolean(newSkuItem.Available))
      rows.push(new insertFields("Available", newSkuItem.Available));
    if (convertToBoolean(newSkuItem.DateOfStock))
      rows.push(new insertFields("DateOfStock", newSkuItem.DateOfStock));

    return await db.updateData(tableName, rows, `RFID = "${rfid}"`);
  };
}

exports.skuItemDAL = skuItemDAL;
