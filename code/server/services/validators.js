const { validationModel } = require("../Models/validations.model");

function idValidator(id) {
  //if (!id) return false;
  //if (!Number.isInteger(+id)) return false; //if id is not an integer
  if (!Number.isInteger(id)) return false; //if id is not an integer
  if (id < 0) return false;
  return true;
}

function isPositiveNumber(stringValue) {
  let isPositiveNumber = /^\d+$/.test(stringValue);
  return isPositiveNumber;
}

function isDate(value) {
  if (!value) return false;
  if (isNaN(Date.parse(value))) return false;
  return true;
}

function rfidValidator(rfid) {
  // if it is not 32 char long and digit chars
  if (!rfid) return false;
  if (rfid.length !== 32) return false;
  if (!isPositiveNumber(rfid)) return false;

  return true;
}

function positionIdValidator(positionId) {
  // if it is not 12 char long and digit chars
  if (!positionId) return false;
  if (positionId.length !== 12) return false;
  if (!isPositiveNumber(positionId)) return false;

  return true;
}

function productValidator(product) {
  /*
  {
    "SKUId": 180,
    "description": "another product",
    "price": 11.99,
  }
  */
  if (!idValidator(product.SKUId)) return false;
  if (!product.description) return false;
  if (typeof (product.description) !== "string") return false;
  if (typeof (product.price) !== "number") return false;
  if (product.price < 0) return false;
  return true;
}

function skuValidator(data) {
  if (!data.description) return false;
  if (typeof (data.description) !== "string") return false;
  if (typeof (data.weight) !== "number") return false;
  if (data.weight < 0) return false;
  if (typeof (data.volume) !== "number") return false;
  if (data.volume < 0) return false;
  if (!data.notes) return false;
  if (typeof (data.notes) !== "string") return false;
  if (typeof (data.availableQuantity) !== "number") return false;
  if (data.availableQuantity < 0) return false;
  if (typeof (data.price) !== "number") return false;
  if (data.price < 0) return false;
  if (!Number.isInteger(data.availableQuantity) || !Number.isInteger(data.volume) || !Number.isInteger(data.weight)) return false;
  return true;
}

function skuItemValidator(data) {
  /*
  const { RFID, SKUId, availability, DateOfStock } = data;
  let result = true;
  let timestamp = Date.parse(DateOfStock);
  result &= !isNaN(timestamp);
  result &= rfidValidator(RFID);
  return result;
  */
  /*
 {
   "RFID":"12345678901234567890123456789015",
   "SKUId":1,
   "DateOfStock":"2021/11/29 12:30"
     }
  */
  if (!rfidValidator(data.RFID)) return false;
  if (!idValidator(data.SKUId)) return false;
  if (!isDate(data.DateOfStock)) return false;
  return true;
}

function positionAddValidator(data) {
  /*const { positionID, aisleID, row, col, maxWeight, maxVolume } = data;
  result &= (positionIdValidator(positionID));
  result &= (('' + aisleID).length === 4) ? true : false;
  result &= (('' + row).length === 4) ? true : false;
  result &= (('' + col).length === 4) ? true : false;
  result &= (('' + aisleID + row + col) === positionID) ? true : false;
  result &= maxWeight > 0 ? true : false;
  result &= maxVolume > 0 ? true : false;
  return result;*/

  /*
  {
    "positionID":"800234543412",
    "aisleID": "8002",
    "row": "3454",
    "col": "3412",
    "maxWeight": 1000,
    "maxVolume": 1000
  }
  */
  if (!positionIdValidator(data.positionID)) return false;
  //check aisleID
  if (!data.aisleID) return false;
  if (typeof (data.aisleID) !== "string") return false;
  if (data.aisleID.length !== 4) return false;
  if (!isPositiveNumber(data.aisleID)) return false;
  //check row
  if (!data.row) return false;
  if (typeof (data.row) !== "string") return false;
  if (data.row.length !== 4) return false;
  if (!isPositiveNumber(data.row)) return false;
  //check col
  if (!data.col) return false;
  if (typeof (data.col) !== "string") return false;
  if (data.col.length !== 4) return false;
  if (!isPositiveNumber(data.col)) return false;
  //check maxWeight
  if (!Number.isInteger(data.maxWeight)) return false;
  if (data.maxWeight <= 0) return false;
  //check maxVolume
  if (!Number.isInteger(data.maxVolume)) return false;
  if (data.maxVolume <= 0) return false;
  return true;
}

function positionUpdateValidator(data) {
  /*let result = true;
  const { newAisleID, newRow, newCol, newMaxWeight, newMaxVolume, newOccupiedWeight, newOccupiedVolume } = data;
  result &= (('' + newAisleID).length === 4) ? true : false;
  result &= (('' + newRow).length === 4) ? true : false;
  result &= (('' + newCol).length === 4) ? true : false;
  result &= newMaxWeight > 0 ? true : false;
  result &= newMaxVolume > 0 ? true : false;
  result &= newOccupiedWeight ? (newOccupiedWeight > 0 ? true : false) : true;
  result &= newOccupiedVolume ? (newOccupiedVolume > 0 ? true : false) : true;
  return result;*/
  /*
  {
    "newAisleID": "8002",
    "newRow": "3454",
    "newCol": "3412",
    "newMaxWeight": 1200,
    "newMaxVolume": 600,
    "newOccupiedWeight": 200,
    "newOccupiedVolume":100
  }
  */
  //check newAisleID
  if (!data.newAisleID) return false;
  if (typeof (data.newAisleID) !== "string") return false;
  if (data.newAisleID.length !== 4) return false;
  if (!isPositiveNumber(data.newAisleID)) return false;
  //check newRow
  if (!data.newRow) return false;
  if (typeof (data.newRow) !== "string") return false;
  if (data.newRow.length !== 4) return false;
  if (!isPositiveNumber(data.newRow)) return false;
  //check newCol
  if (!data.newCol) return false;
  if (typeof (data.newCol) !== "string") return false;
  if (data.newCol.length !== 4) return false;
  if (!isPositiveNumber(data.newCol)) return false;
  //check newMaxWeight
  if (!Number.isInteger(data.newMaxWeight)) return false;
  if (data.newMaxWeight <= 0) return false;
  //check newMaxVolume
  if (!Number.isInteger(data.newMaxVolume)) return false;
  if (data.newMaxVolume <= 0) return false;
  //check newOccupiedWeight
  if (!Number.isInteger(data.newOccupiedWeight)) return false;
  if (data.newOccupiedWeight <= 0) return false;
  //check newOccupiedVolume
  if (!Number.isInteger(data.newOccupiedVolume)) return false;
  if (data.newOccupiedVolume <= 0) return false;
  return true;
}

function positionUpdateIdValidator(data) {
  /*const { newPositionID } = data;
  result &= (positionIdValidator(newPositionID));
  return result;*/
  /*
  {
    "newPositionID": "800234543412"
  }
  */
  if (!positionIdValidator(data.newPositionID)) return false;
  return true;
}

function testDescriptorValidator(data) {
  /*const { name, procedureDescription, idSKU } = data;

  let result = true;
  result &= (name.length > 0 && name != " ") ? true : false;
  result &= (procedureDescription.length > 0 && procedureDescription != " ") ? true : false;
  result &= idSKU > 0 ? true : false;

  return result;*/
  /*
  {
    "name":"test descriptor 3",
    "procedureDescription":"This test is described by...",
    "idSKU" :1
  }
  */
  try {
    if (!data.name) return false;
    if (typeof (data.name) !== "string") return false;
    if (!data.procedureDescription) return false;
    if (typeof (data.procedureDescription) !== "string") return false;
    if (!idValidator(data.idSKU)) return false;
    return true;
  } catch (error) {
    return false
  }
}

function testResultValidator(data) {
  /*
  {
    "rfid":"12345678901234567890123456789016",
    "idTestDescriptor":12,
    "Date":"2021/11/28",
    "Result": true
  }
 */
  if (!rfidValidator(data.rfid)) return false;
  if (!idValidator(data.idTestDescriptor)) return false;
  if (!isDate(data.Date)) return false;
  if (typeof (data.Result) !== "boolean") return false;

  return true;
}

function userAddValidator(data) {
  /*const { username, name, surname, password, type } = data;
  let result = true;
  const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const nameregex = /^[a-z ,.'-]+$/i;
  result &= emailregex.test(username);
  result &= nameregex.test(name);
  result &= nameregex.test(surname);
  result &= (type !== "manager");
  result &= (type === "customer" || type === "qualityEmployee" || type === "clerk" || type === "deliveryEmployee" || type === "supplier");
  result &= password.length >= 8;
  return result;*/
  /*
  {
    "username":"user1@ezwh.com",
    "name":"John",
    "surname" : "Smith",
    "password" : "testpassword",
    "type" : "customer"
  }
  */
  const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const nameregex = /([a-zA-Z]{3,30}\s*)+/;
  if (!data.username) return false;
  if (!emailregex.test(data.username)) return false;
  if (!data.name) return false;
  if (!nameregex.test(data.name)) return false;
  if (!data.surname) return false;
  if (!nameregex.test(data.surname)) return false;
  //if(data.type !== "manager") return false;
  if (!data.type) return false;
  if (!(data.type === "customer" || data.type === "qualityEmployee" || data.type === "clerk" || data.type === "deliveryEmployee" || data.type === "supplier")) return false;
  if (!data.password) return false;
  if (data.password.length < 8) return false;
  return true;
}

function userUpdateValidator(username, data) {
  /*
  let result = true;
  const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  result &= emailregex.test(username);
  const { oldType, newType } = data;
  result &= (oldType !== "manager");
  result &= (oldType === "customer" || oldType === "qualityEmployee" || oldType === "clerk" || oldType === "deliveryEmployee" || oldType === "supplier");
  result &= (newType !== "manager");
  result &= (newType === "customer" || newType === "qualityEmployee" || newType === "clerk" || newType === "deliveryEmployee" || newType === "supplier");
  return result;
  */
  /*
   {
     "oldType" : "qualityEmployee",
     "newType" : "clerk"
   }
   */
  const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!emailregex.test(username)) return false;
  if (!(data.oldType === "customer" || data.oldType === "qualityEmployee" || data.oldType === "clerk" || data.oldType === "deliveryEmployee" || data.oldType === "supplier")) return false;
  if (!(data.newType === "customer" || data.newType === "qualityEmployee" || data.newType === "clerk" || data.newType === "deliveryEmployee" || data.newType === "supplier")) return false;
  return true;
}

function userDeleteValidator(username, type) {
  /*let result = true;
  const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  result &= emailregex.test(username);
  result &= (type !== "manager");
  result &= (type === "customer" || type === "qualityEmployee" || type === "clerk" || type === "deliveryEmployee" || type === "supplier");
  return result;*/
  const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!emailregex.test(username)) return false;
  if (!(type === "customer" || type === "qualityEmployee" || type === "clerk" || type === "deliveryEmployee" || type === "supplier")) return false;
  return true;
}

function restockOrderProductValidator(data) {
  if (!productValidator(data)) return false;
  if (!Number.isInteger(data.qty)) return false;
  if (data.qty <= 0) return false;
  return true;
}

function restockOrderValidator(data) {
  /*
  const { issueDate, products, supplierId } = data;
  let result = true;
  let timestamp = Date.parse(issueDate);
  result &= !isNaN(timestamp);
  result &= +products.length !== 0 ? true : false;
  result &= idValidator(+supplierId);

  return result;
  */
  /*
  {
    "issueDate":"2021/11/29 09:33",
    "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
         {"SKUId":180,"description":"another product","price":11.99,"qty":20},...],
     "supplierId" : 1
   }
  */
  if (!isDate(data.issueDate)) return false;
  if (!data.products) return false;
  if (data.products.length === 0) return false;
  for (prod of data.products) {
    if (!restockOrderProductValidator(prod)) return false;
  }
  if (!data.supplierId) return false;
  if (!idValidator(data.supplierId)) return false;
  return true;
}

function returnOrderProductValidator(product) {
  /* from returnOrder products
  {
    "SKUId":12,
    "description":"a product",
    "price":10.99,
    "RFID":"12345678901234567890123456789016"
  }
  */
  if (!productValidator(product)) return false;
  if (!rfidValidator(product.RFID)) return false;
  return true;
}

function returnOrderValidator(data) {
  /*
  {
    "returnDate":"2021/11/29 09:33",
    "products": [
      {
        "SKUId":12,
        "description":"a product",
        "price":10.99,
        "RFID":"12345678901234567890123456789016"
      },
      {
        "SKUId":180,
        "description":"another product",
        "price":11.99,
        "RFID":"12345678901234567890123456789038"
      },
      ...
    ],
    "restockOrderId" : 1
}*/
  if (isNaN(Date.parse(data.returnDate))) return false;
  if (!data.products) return false;
  if (data.products.length === 0) return false;
  for (prod of data.products) {
    if (!returnOrderProductValidator(prod)) return false;
  }
  if (!idValidator(data.restockOrderId)) return false;
  return true;
}

function internalOrderProductValidator(data) {
  if (!productValidator(data)) return false;
  if (!Number.isInteger(data.qty)) return false;
  if (data.qty <= 0) return false;
  return true;
}

function internalOrderValidator(data) {
  /*const { id, issueDate, state, products, customerId } = data;
  let result = !!Date.parse(issueDate);
  return result;*/

  /*
  {
    "issueDate":"2021/11/29 09:33",
    "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                {"SKUId":180,"description":"another product","price":11.99,"qty":3},...],
    "customerId" : 1
  }
  */
  if (!isDate(data.issueDate)) return false;
  if (!data.products) return false;
  if (data.products.length === 0) return false;
  for (prod of data.products) {
    if (data.state === "COMPLETED") {
      if (!rfidValidator(prod.RFID)) return false;
      if (!idValidator(prod.SkuID)) return false;
    }
    else {
      if (!internalOrderProductValidator(prod)) return false;
    }
  }
  if (!data.customerId) return false;
  if (!idValidator(data.customerId)) return false;
  return true;
}

function itemValidator(data) {
  /*     {
        "id" : 12,
        "description" : "a new item",
        "price" : 10.99,
        "SKUId" : 1,
        "supplierId" : 2
    }*/
  if (!idValidator(data.id)) return false;
  if (!data.description) return false;
  if (typeof (data.description) !== "string") return false;
  if (typeof (data.price) !== "number") return false;
  if (data.price < 0) return false;
  if (!data.SKUId || !idValidator(data.SKUId)) return false;
  if (!idValidator(data.supplierId)) return false;
  return true;
}

module.exports = {
  idValidator,
  isPositiveNumber,
  isDate,
  rfidValidator,
  positionIdValidator,
  productValidator,

  skuValidator,
  skuItemValidator,
  positionAddValidator,
  positionUpdateValidator,
  positionUpdateIdValidator,
  testDescriptorValidator,
  testResultValidator,
  userAddValidator,
  userUpdateValidator,
  userDeleteValidator,
  restockOrderProductValidator,
  restockOrderValidator,
  returnOrderProductValidator,
  returnOrderValidator,
  internalOrderProductValidator,
  internalOrderValidator,
  itemValidator
};
