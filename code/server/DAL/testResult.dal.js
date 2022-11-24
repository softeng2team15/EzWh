const { convertToBoolean } = require("../services/otherServices");

const DatabaseManagement =
  require("./_baseDalFunctionalities").DatabaseManagement;
const creationTableFields =
  require("../Models/creationTableFields.model").creationTableFields;
const insertFields = require("../Models/insertFields.model").insertFields;

function testResultDAL() {
  const tableName = "testResult";

  this._crateTable = async () => {
    let db = new DatabaseManagement();
    return await db.createTable(tableName, [
      new creationTableFields("id", "integer", false, true, true, true),
      new creationTableFields("idTestDescriptor", "integer"),
      new creationTableFields("Date", "text"),
      new creationTableFields("Result", "integer"),
      new creationTableFields("rfid", "text"),
    ]);
  }

  this.getAll = async (rfid) => {
    let db = new DatabaseManagement();

    const testResults = await db.getAllData(tableName, `rfid =  + "${rfid}"`);

    if (!testResults) return null;
    return testResults;
  };

  this.getByRfid = async (rfid, id) => {
    let db = new DatabaseManagement();


    const testResult = await db.getAllData(
      tableName,
      `rfid = "${rfid}" and id = ${id}`
    );

    if (!testResult) return null;
    return testResult[0];
  };

  this.add = async (testResult) => {
    let db = new DatabaseManagement();

    return await db.insertData(tableName, [
      new insertFields("rfid", testResult.rfid),
      new insertFields("idTestDescriptor", testResult.idTestDescriptor),
      new insertFields("Date", testResult.Date),
      new insertFields("Result", testResult.Result),
    ]);
  };

  this.remove = async (rfid, id) => {
    let db = new DatabaseManagement();
    return await db.deleteByWhereCondition(tableName, `rfid = "${rfid}" and id = ${id}`);
  };

  this.update = async (rfid, id, newSku) => {
    let db = new DatabaseManagement();

    let rows = [];
    if (convertToBoolean(newSku.newIdTestDescriptor))
      rows.push(new insertFields("idTestDescriptor", newSku.newIdTestDescriptor));
    if (convertToBoolean(newSku.newDate))
      rows.push(new insertFields("Date", newSku.newDate));
      rows.push(new insertFields("Result", !!newSku.newResult));

      return await db.updateData(
      tableName,
      rows,
      `rfid = "${rfid}" and id = ${id}`
    );
  };
}
exports.testResultDAL = testResultDAL;
