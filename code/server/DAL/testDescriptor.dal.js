const DatabaseManagement =
  require("./_baseDalFunctionalities").DatabaseManagement;
const creationTableFields =
  require("../Models/creationTableFields.model").creationTableFields;
const insertFields = require("../Models/insertFields.model").insertFields;

var path = require("path");
const { convertToBoolean } = require("../services/otherServices");

function testDescriptorDAL() {
  const tableName = "testDescriptor";

  this._crateTable = async () => {
    let db = new DatabaseManagement();
    return await db
      .createTable(tableName, [
        new creationTableFields("id", "integer", false, true, true, true),
        new creationTableFields("name", "text"),
        new creationTableFields("procedureDescription", "text"),
        new creationTableFields("idSKU", "integer")
      ]);
  }

  this.getAll = async () => {
    let db = new DatabaseManagement();


    const testDescriptors = await db.getAllData(tableName);

    if (!testDescriptors) return null;

    return testDescriptors;
  };

  this.getById = async (id) => {
    let db = new DatabaseManagement();


    const testDescriptors = await db.getAllData(tableName, `id = ${id}`);

    if (!testDescriptors[0]) return null;

    return testDescriptors[0];
  };

  this.add = async (testDescriptor) => {
    let db = new DatabaseManagement();

    return await db.insertData(tableName, [
      new insertFields("name", testDescriptor.name),
      new insertFields("procedureDescription", testDescriptor.procedureDescription),
      new insertFields("idSKU", testDescriptor.idSKU)
    ]);
  };

  this.remove = async (id) => {
    let db = new DatabaseManagement();


    const result = await db.delete(tableName, id);
  };

  this.update = async (id, newTestDescriptor) => {
    let db = new DatabaseManagement();

    let rows = [];
    if (convertToBoolean(newTestDescriptor.newName))
      rows.push(new insertFields("name", newTestDescriptor.newName));
    if (convertToBoolean(newTestDescriptor.newProcedureDescription))
      rows.push(new insertFields("procedureDescription", newTestDescriptor.newProcedureDescription));
    if (convertToBoolean(newTestDescriptor.newIdSKU))
      rows.push(new insertFields("idSKU", newTestDescriptor.newIdSKU));
    return await db.updateData(tableName, rows, `id = ${id}`);
  };
}

exports.testDescriptorDAL = testDescriptorDAL;