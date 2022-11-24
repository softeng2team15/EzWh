const {
  addPropertiesToObject,
  nullToZero,
} = require("../services/otherServices");
const { restockOrderValidator, idValidator, skuItemValidator, productValidator } = require("../services/validators");
const dayjs = require('dayjs');

const validationModel = require("../Models/validations.model").validationModel;
const apiResponseModel = require("../Models/apiResponse.model").apiResponseModel;

function restockOrderBAL(restockOrderDAL) {
  this.isTheUserHavingAccess = (methodName) => {
    return new validationModel(true);  /*implement checks with passport */
    let userRole = "manager"; // *** warning_comment : should be changed after authentication completed ***
    switch (methodName) {
      case "getAll":
        if (userRole === "manager" || userRole === "clerk" || userRole === "quality employee") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "getAllIssued":
        if (userRole === "manager" || userRole === "supplier") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "getById":
        if (userRole === "manager") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "getReturned":
        if (userRole === "manager") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "add":
        if (userRole === "manager" || userRole === "supplier") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "changeState":
        if (userRole === "manager" || userRole === "clerk") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "addSkuItems":
        if (userRole === "manager" || userRole === "clerk") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "addTransportNote":
        if (userRole === "manager" || userRole === "supplier") return new validationModel(true);
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
      if (!hasAccess) return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await restockOrderDAL.getAll());
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getAllIssued = async () => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getAll");
      if (!hasAccess) return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await restockOrderDAL.getAllIssued());
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
      let result = await restockOrderDAL.getById(id);
      if (result) return new apiResponseModel(result);
      else return new apiResponseModel("no item associated to id", 404);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getReturned = async (id) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getReturned");
      if (!hasAccess) return new apiResponseModel(hasAccess.message, 401);
      let hasId = await this.getById(id);
      if (hasId.httpCode !== 200) return new apiResponseModel("Unprocessable Entity", 422);
      let restockOrder = await restockOrderDAL.getById(id);
      if (restockOrder.state != "COMPLETEDRETURN") return new apiResponseModel("restock order state != COMPLETEDRETURN", 422);
      const result = await restockOrderDAL.getReturned(id);
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
      if (!hasAccess) return new apiResponseModel(hasAccess.message, 401);
      if (!restockOrderValidator(data)) return new apiResponseModel("validation of request body failed", 422);

      return new apiResponseModel(await restockOrderDAL.add(data), 201);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 503);
    }
  };

  this.changeState = async (id, data) => {
    try {
      let hasAccess = await this.isTheUserHavingAccess("changeState");
      if (!hasAccess) return new apiResponseModel(hasAccess.message, 401);
      if (!idValidator(id) || !data.newState) return new apiResponseModel("Unprocessable Entity", 422);
      let restockOrder = await this.getById(id);
      if (restockOrder.httpCode!=200) return new apiResponseModel("Not found", 404);
      return new apiResponseModel(await restockOrderDAL.changeState(id, data), 200);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 503);
    }
  };

  this.addSkuItems = async (id, data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("addSkuItems");
      if (!hasAccess) return new apiResponseModel(hasAccess.message, 401);
      if (!idValidator(id)) return new apiResponseModel("Validation of Id failed", 422);
      if (!data || !Object.keys(data).length) return new apiResponseModel("Validation of Id failed", 422);
      let restockOrder = await this.getById(id);
      if (restockOrder.httpCode != 200) return new apiResponseModel("Not found", 404);
      if (restockOrder.response.state !== "DELIVERED") return new apiResponseModel("Order state != DELIVERED", 422);

      return new apiResponseModel(await restockOrderDAL.addSkuItems(id, data), 200);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 503);
    }

  };

  this.addTransportNote = async (id, data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("addTransportNote");
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      if (!idValidator(id)) return new apiResponseModel("Validation of Id failed", 422);
      if (!data.transportNote) return new apiResponseModel("Validation of request body failed", 422);

      let restockOrder = await this.getById(id);
      if (restockOrder.httpCode != 200) return new apiResponseModel("Not found", 404);
      if (restockOrder.response.state !== "DELIVERY") return new apiResponseModel("Order state != DELIVERED", 422);
      if (dayjs(data.deliveryDate).isBefore(restockOrder.response.issueDate)) return new apiResponseModel("deliveryDate is before issueDate", 422)

      return new apiResponseModel(restockOrderDAL.addTransportNote(id, data), 200);
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
      return new apiResponseModel(await restockOrderDAL.delete(id), 201);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 503);
    }
  };
}

exports.restockOrderBAL = restockOrderBAL;