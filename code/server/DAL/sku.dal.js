const { convertToBoolean } = require("../services/otherServices");

const DatabaseManagement =
  require("./_baseDalFunctionalities").DatabaseManagement;
const creationTableFields =
  require("../Models/creationTableFields.model").creationTableFields;
const insertFields = require("../Models/insertFields.model").insertFields;


function skuDAL() {
  const tableName = "sku";

  this._crateTable = async () => {
    let db = new DatabaseManagement();
    return await db
      .createTable(tableName, [
        new creationTableFields("id", "integer", false, true, true, true),
        new creationTableFields("description", "integer"),
        new creationTableFields("weight", "integer"),
        new creationTableFields("volume", "integer"),
        new creationTableFields("notes", "text"),
        new creationTableFields("position", "text"),
        new creationTableFields("availableQuantity", "integer"),
        new creationTableFields("price", "real"),
        // new creationTableFields("testDescriptors", "integer"),
      ])
      .then(async (val) => {
        await db.createTable("skuTestDescriptorBridge", [
          new creationTableFields("id", "integer", false, true, true, true),
          new creationTableFields("ckuId", "integer"),
          new creationTableFields("testDescriptorId", "integer")
        ]);
      });
  }

  this.getAll = async () => {
    let db = new DatabaseManagement();

    const skus = await db.getAllData(tableName);

    if (!skus) return null;

    for (const element of skus) {
      const testDescriptors = await db.getAllData(
        "skuTestDescriptorBridge",
        `ckuId = ${element.id}`
      );
      element.testDescriptors = testDescriptors.map((x) => x.testDescriptorId);
    }

    return skus;
  };

  this.getById = async (id) => {
    let db = new DatabaseManagement();

    const skus = await db.getAllData(tableName, `id = ${id}`);

    if (!skus) return null;

    for (const element of skus) {
      const testDescriptors = await db.getAllData(
        "skuTestDescriptorBridge",
        `ckuId = ${element.id}`
      );
      element.testDescriptors = testDescriptors.map((x) => x.testDescriptorId);
    }

    return skus[0];
  };

  this.add = async (sku) => {
    let db = new DatabaseManagement()

    return await db.insertData(tableName, [
      new insertFields("description", sku.description),
      new insertFields("weight", sku.weight),
      new insertFields("volume", sku.volume),
      new insertFields("notes", sku.notes),
      new insertFields("position", sku.position),
      new insertFields("availableQuantity", sku.availableQuantity),
      new insertFields("price", sku.price),
    ]);
  };

  this.remove = async (id) => {
    let db = new DatabaseManagement();

    const result = await db.delete(tableName, id);
    const testDescriptors = await db.getAllData(
      "skuTestDescriptorBridge",
      `ckuId = ${id}`
    );
    for (const element of testDescriptors) {
      await db.delete("skuTestDescriptorBridge", element.id);
    }
  };

  this.update = async (id, newSku) => {
    let db = new DatabaseManagement();

    let rows = [];
    if (convertToBoolean(newSku.description))
      rows.push(new insertFields("description", newSku.description));
    if (convertToBoolean(newSku.weight)) rows.push(new insertFields("weight", newSku.weight));
    if (convertToBoolean(newSku.volume)) rows.push(new insertFields("volume", newSku.volume));
    if (convertToBoolean(newSku.notes)) rows.push(new insertFields("notes", newSku.notes));
    if (convertToBoolean(newSku.position))
      rows.push(new insertFields("position", newSku.position));
    if (convertToBoolean(newSku.availableQuantity))
      rows.push(
        new insertFields("availableQuantity", newSku.availableQuantity)
      );
    if (convertToBoolean(newSku.price)) rows.push(new insertFields("price", newSku.price));

    return await db.updateData(tableName, rows, `id = ${id}`);
  };
}

exports.skuDAL = skuDAL;