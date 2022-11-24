const { apiResponseModel } = require("../Models/apiResponse.model");
const { positionIdValidator, positionAddValidator, positionUpdateValidator, positionUpdateIdValidator } = require("../services/validators");
const validationModel = require("../Models/validations.model").validationModel;

function positionBAL(positionDAL) {
  this.isTheUserHavingAccess = (methodName) => {
    return new validationModel(true);  /*implement checks with passport */
    let userRole = "manager"; // *** warning_comment : should be changed after authentication completed ***
    switch (methodName) {
      case "getAll":
        if (userRole === "manager" || userRole === "clerk") {
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
        if (userRole === "manager" || userRole === "clerk") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "updateId":
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
      return new apiResponseModel(await positionDAL.getAll());
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };
  this.save = async (data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("save");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);

      if (!positionAddValidator(data)) {
        return new apiResponseModel("validation of request body failed", 422);
      }

      return new apiResponseModel(await positionDAL.add(data), 201);
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
      if (!positionUpdateValidator(data) || !positionIdValidator(id)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      const allPositions = await positionDAL.getAll();
      let position = allPositions.find((x) => x.positionID == id);
      if (!position) {
        return new apiResponseModel("404 Not Found", 404);
      }


      return new apiResponseModel(await positionDAL.update(id, data));
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };
  this.updateId = async (id, data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("update");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
        
      if (!positionUpdateIdValidator(data) || !positionIdValidator(id)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      const allPositions = await positionDAL.getAll();
      let position = allPositions.find((x) => x.positionID == id);
      if (!position) {
        return new apiResponseModel("404 Not Found", 404);
      }



      return new apiResponseModel(await positionDAL.updateId(id, data));
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

      if (!positionIdValidator(id)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      return new apiResponseModel(await positionDAL.remove(id), 204);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };
}

exports.positionBAL = positionBAL;
