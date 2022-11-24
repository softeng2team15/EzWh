const {
  addPropertiesToObject,
  nullToZero,
} = require("../services/otherServices");
const { returnOrderValidator, idValidator } = require("../services/validators");

const validationModel = require("../Models/validations.model").validationModel;
const apiResponseModel = require("../Models/apiResponse.model").apiResponseModel;

function returnOrderBAL(restockOrderDAL, returnOrderDAL) {
  this.isTheUserHavingAccess = (methodName) => {
  return new validationModel(true);  /*implement checks with passport */
    let userRole = "manager"; // *** warning_comment : should be changed after authentication completed ***
    switch (methodName) {
      case "getAll":
        if (userRole === "manager") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "getById":
        if (userRole === "manager") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "add":
        if (userRole === "manager") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "delete":
        if (userRole === "manager") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      default:
        return new validationModel(false, "Invalid Method name");
    }
  };

  this.getAll = async () => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getAll");
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await returnOrderDAL.getAll());
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getById = async (id) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getById");
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      if (!idValidator(id)) return new apiResponseModel("Unprocessable Entity", 422);
      let result = await returnOrderDAL.getById(id);
      if (result) return new apiResponseModel(result);
      else return new apiResponseModel("no item associated to id", 404);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.add = async (data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("add");
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      if (!returnOrderValidator(data)) return new apiResponseModel("validation of request body failed", 422);
      let restockOrder = await restockOrderDAL.getById(parseInt(data.restockOrderId, 10));
      if (!restockOrder) return new apiResponseModel("404 Not Found", 404);

      return new apiResponseModel(await returnOrderDAL.add(data), 201);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 503);
    }
  };

  this.delete = async (id) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("delete");
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      let hasId = this.getById(id);
      if (hasId.result) return new apiResponseModel("Unprocessable Entity", 422);
      return new apiResponseModel(await returnOrderDAL.delete(id), 201);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 503);
    }
  };
}

exports.returnOrderBAL = returnOrderBAL;
