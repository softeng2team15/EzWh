const { convertToBoolean } = require("../services/otherServices");

const DatabaseManagement =
  require("./_baseDalFunctionalities").DatabaseManagement;
const creationTableFields =
  require("../Models/creationTableFields.model").creationTableFields;
const insertFields = require("../Models/insertFields.model").insertFields;

function itemDAL() {
  const tableName = "item";

  this._crateTable = async () => {
    let db = new DatabaseManagement();
    return await db.createTable(tableName, [
      new creationTableFields("id", "integer", false, true, true, false),
      new creationTableFields("description", "text"),
      new creationTableFields("price", "real"),
      new creationTableFields("SKUId", "integer"),
      new creationTableFields("supplierId", "integer"),
    ]);
  }

  this.getAll = async () => {
    let db = new DatabaseManagement();


    const items = await db.getAllData(tableName);

    if (!items) return null;
    return items;
  };

  this.getById = async (id, supplierId) => {
    let db = new DatabaseManagement();



    const item = await db.getAllData(tableName, `id = ${id} AND supplierId = ${supplierId}`);

    if (!item) return null;
    return item[0];
  };

  this.add = async (item) => {
    let db = new DatabaseManagement();


    return await db.insertData(tableName, [
      new insertFields("id", item.id),
      new insertFields("description", item.description),
      new insertFields("price", item.price),
      new insertFields("SKUId", item.SKUId),
      new insertFields("supplierId", item.supplierId),
    ]);
  };

  this.update = async (id, supplierId, newItem) => {
    let db = new DatabaseManagement();



    let rows = [];
    if (convertToBoolean(newItem.newDescription))
      rows.push(new insertFields("description", newItem.newDescription));
    if (convertToBoolean(newItem.newPrice))
      rows.push(new insertFields("price", newItem.newPrice));

    return await db.updateData(
      tableName,
      rows,
      `id = ${id} AND supplierId = ${supplierId}`
    );
  };

  this.remove = async (id, supplierId) => {
    let db = new DatabaseManagement();

    return await db.deleteByWhereCondition(tableName, `id = ${id} AND supplierId = ${supplierId}`);
  };

}

exports.itemDAL = itemDAL;
