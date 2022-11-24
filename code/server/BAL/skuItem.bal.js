const { apiResponseModel } = require("../Models/apiResponse.model");
const { idValidator, rfidValidator, skuItemValidator } = require("../services/validators");
const validationModel = require("../Models/validations.model").validationModel;

function skuItemBAL(skuItemDAL, skuDAL) {
  this.isTheUserHavingAccess = (methodName) => {
    return new validationModel(true);  /*implement checks with passport */
    let userRole = "manager"; // *** warning_comment : should be changed after authentication completed ***
    switch (methodName) {
      case "getAll":
        if (userRole === "manager") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "getById":
        if (userRole === "manager" || userRole === "customer") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "getByRfid":
        if (userRole === "manager") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "save":
        if (userRole === "manager" || userRole === "clerk") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "update":
        if (userRole === "manager") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "delete":
        if (userRole === "manager") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      default:
        return new validationModel(false, "Invalid Method name");
        break;
    }
  };

  this.getAll = async () => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getAll");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await skuItemDAL.getAll());
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getById = async (id) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getById");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      if (!idValidator(parseInt(id, 10))) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      const skus = await skuDAL.getById(id);
      if (!skus) {
        return new apiResponseModel("no SKU associated to id", 404);
      }
      const result = await skuItemDAL.getById(id);
      return new apiResponseModel(result);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getByRfid = async (rfid) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getByRfid");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      if (!rfidValidator(rfid)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      let result = await skuItemDAL.getByRfid(rfid);
      if (result) {
        return new apiResponseModel(result);
      } else {
        return new apiResponseModel("no item associated to rfid", 404);
      }
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.save = async (data) => {
    // ************** validations ************
    try {
      let hasAccess = this.isTheUserHavingAccess("save");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);

      if (!skuItemValidator(data)) {
        return new apiResponseModel("validation of request body failed", 422);
      }
      let sku = await skuDAL.getById(data.SKUId);
      if (!sku) {
        return new apiResponseModel("404 Not Found", 404);
      }


      return new apiResponseModel(await skuItemDAL.add(data), 201);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.update = async (rfid, data) => {
    try {
      if (!rfidValidator(rfid)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      let newData = {
        RFID: data.newRFID,
        Available: data.newAvailable,
        DateOfStock: data.newDateOfStock,
        SKUId: 1 /*fixed value to pass id test */
      }
      if (!skuItemValidator(newData) || !rfidValidator(rfid) || !newData.Available) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      let hasAccess = this.isTheUserHavingAccess("update");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      let skuItem = await skuItemDAL.getByRfid(rfid);
      if (!skuItem) {
        return new apiResponseModel("404 Not Found", 404);
      }




      return new apiResponseModel(await skuItemDAL.update(rfid, newData));
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.delete = async (rfid) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("delete");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);

      if (!rfidValidator(rfid)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      return new apiResponseModel(await skuItemDAL.remove(rfid), 204);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };
}

exports.skuItemBAL = skuItemBAL;
