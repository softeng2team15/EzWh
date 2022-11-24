const { apiResponseModel } = require("../Models/apiResponse.model");
const { idValidator, testDescriptorValidator } = require("../services/validators");
const validationModel = require("../Models/validations.model").validationModel;

function testDescriptorBAL(testDescriptorDAL, skuDAL) {
  this.isTheUserHavingAccess = (methodName) => {
    return new validationModel(true);  /*implement checks with passport */
    let userRole = "manager"; // *** warning_comment : should be changed after authentication completed ***
    switch (methodName) {
      case "getAll":
        if (userRole === "manager" || userRole === "qualityEmployee") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "getById":
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
        if (userRole === "manager") {
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
      return new apiResponseModel(await testDescriptorDAL.getAll());
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
      if (!idValidator(id)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      let result = await testDescriptorDAL.getById(id);
      if (result) {
        return new apiResponseModel(result);
      } else {
        return new apiResponseModel("no item associated to id", 404);
      }
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.save = async (data) => {
    try {

      if (!testDescriptorValidator(data)) {
        return new apiResponseModel("validation of request body failed", 422);
      }
      let hasAccess = this.isTheUserHavingAccess("save");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      console.log(data);
      let sku = await skuDAL.getById(data.idSKU);
      if (!sku) {
        return new apiResponseModel("404 Not Found", 404);
      }

      return new apiResponseModel(await testDescriptorDAL.add(data), 201);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.update = async (id, data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("update");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);

      if (!idValidator(id) || (!data.newName && !data.newProcedureDescription && !data.newIdSKU)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }

      let testDescriptor = await testDescriptorDAL.getById(id);
      let sku = await skuDAL.getById(data.newIdSKU);
      if (!testDescriptor || !sku) {
        return new apiResponseModel("404 Not Found", 404);
      }


      return new apiResponseModel(
        await testDescriptorDAL.update(id, data)
      );
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.delete = async (id) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("delete");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);

      if (!idValidator(id)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      return new apiResponseModel(
        await testDescriptorDAL.remove(id),
        204
      );
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };
}

exports.testDescriptorBAL = testDescriptorBAL;
