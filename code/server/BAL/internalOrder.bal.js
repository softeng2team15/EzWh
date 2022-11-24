const {
  addPropertiesToObject,
  nullToZero,
} = require("../services/otherServices");
const { internalOrderValidator, idValidator } = require("../services/validators");

const validationModel = require("../Models/validations.model").validationModel;
const apiResponseModel =  require("../Models/apiResponse.model").apiResponseModel;

function internalOrderBAL(internalOrderDAL) {
  this.isTheUserHavingAccess = (methodName) => {
    let userRole = "manager"; // *** warning_comment : should be changed after authentication completed ***
    return new validationModel(true);  /*implement checks with passport */
    switch (methodName) {
      case "getAll":
        if (userRole === "manager") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "getAllIssued":
        if (userRole === "manager" || userRole === "customer") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data."); 
      case "getAllAccepted":
        if (userRole === "manager" || userRole === "delivery employee") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");  
      case "getById":
        if (userRole === "manager" || userRole === "delivery employee") return new validationModel(true); 
        else return new validationModel(false, "You don't have access to these data.");
      case "add":
        if (userRole === "manager" || userRole === "customer") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      case "update":
          if (userRole === "manager" || userRole === "internal customer" || userRole === "delivery employee") return new validationModel(true);
          else return new validationModel(false, "You don't have access to these data.");
      case "delete":
        if (userRole === "manager") return new validationModel(true);
        else return new validationModel(false, "You don't have access to these data.");
      default:
        return new validationModel(false, "Invalid Method name");
    }
  };

  this.getAll = async() => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getAll");
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await internalOrderDAL.getAll());  
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getAllIssued = async() => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getAll");
      if (!hasAccess) return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await internalOrderDAL.getAllIssued());  
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getAllAccepted = async() => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getAll");
      if (!hasAccess) return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await internalOrderDAL.getAllAccepted());  
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getById = async(id) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getById");
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      if (!idValidator(id)) return new apiResponseModel("Unprocessable Entity", 422);
      
      let result = await internalOrderDAL.getById(id);
      if (result) return new apiResponseModel(result);
      else return new apiResponseModel("no item associated to id", 404);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.add = async(data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("add");
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      if (!internalOrderValidator(data)) return new apiResponseModel("validation of request body failed",422);

      return new apiResponseModel(await internalOrderDAL.add(data), 201);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 503);
    }
  };

  this.update = async(id, data) => {
    try{
      let hasAccess = this.isTheUserHavingAccess("update");
      if (!idValidator(id)) return new apiResponseModel("validation of id failed", 422);
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      let internalOrder = await this.getById(id);
      if (internalOrder.httpCode!=200) return new apiResponseModel("no internal order associated to id", 404);
      let {issueDate, newState, products, customerId} = data;
      let newId, newIssueDate, newState1, newProducts, newCustomerId;
      newId = id;
      newIssueDate = issueDate ? issueDate : internalOrder.response.issueDate;
      newState1 = newState ? newState : internalOrder.response.state;
      newProducts = products ? products : internalOrder.response.products;
      newCustomerId = customerId ? customerId : internalOrder.response.customerId;
      // if (!internalOrderValidator({id:newId,issueDate: newIssueDate,state:newState1,products: newProducts,customerId: newCustomerId})) return new apiResponseModel("validation of request body failed", 422);

      return new apiResponseModel(await internalOrderDAL.update(id,data), 200);
    } catch(error){
      console.log(error);
      return new apiResponseModel("Internal Server Error", 503);
    }
  };

  this.delete = async(id) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("delete");
      if (!hasAccess.result) return new apiResponseModel(hasAccess.message, 401);
      let hasId = this.getById(id);
      if (hasId.result) return new apiResponseModel("Unprocessable Entity", 422);
      return new apiResponseModel(await internalOrderDAL.remove(id), 201);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 503);
    }
  };

}

exports.internalOrderBAL = internalOrderBAL;
