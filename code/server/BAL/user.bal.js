const { apiResponseModel } = require("../Models/apiResponse.model");
const { userAddValidator, userDeleteValidator, userUpdateValidator } = require("../services/validators");
const validationModel = require("../Models/validations.model").validationModel;

function userBAL(userDAL) {
  let user;
  this.isTheUserHavingAccess = (methodName) => {
    return new validationModel(true);  /*implement checks with passport */
    let userRole = "manager"; // *** warning_comment : should be changed after authentication completed ***
    switch (methodName) {
      case "getAllSuppliers":
        if (userRole === "manager") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "getAllUsers":
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

  this.getUserInfo = async () => {
    try {
      if (this.user) {
        /* do not implement user session, it will be done later with passport */
        return this.user;
      } else {
        return new apiResponseModel("not logged in", 401);
      }
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getAllUsers = async () => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getAllUsers");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await userDAL.getAllUsers());
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getAllSuppliers = async () => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getAllSuppliers");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await userDAL.getAllSuppliers());
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

      if (!userAddValidator(data)) {
        return new apiResponseModel("validation of request body failed", 422);
      }
      const user = await userDAL.getByUsernameAndType(data.username, data.type);
      if (user) {
        return new apiResponseModel("Conflict: a user with same email and type already exists", 409);
      }
      return new apiResponseModel(await userDAL.add(data), 201);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.login = async (username, password, type) => {
    try {
      let result = await userDAL.login(username, password, type);
      if (result) {
        this.user = new apiResponseModel(result);
        const info = {
          id: result.id,
          username: result.username,
          name: result.name,
          surname: result.surname
        }
        return new apiResponseModel(info);
      } else {
        return new apiResponseModel("wrong username and/or password", 401);
      }
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }

    /* switch (type) {
       case "manager":
         result =
           username === manager.username && password === manager.password
             ? manager
             : undefined;
         break;
       case "customer":
         result =
           username === customer.username && password === customer.password
             ? customer
             : undefined;
         break;
       case "supplier":
         result =
           username === supplier.username && password === supplier.password
             ? supplier
             : undefined;
         break;
       case "clerk":
         result =
           username === clerk.username && password === clerk.password
             ? clerk
             : undefined;
         break;
       case "qualityEmployee":
         result =
           username === qualityEmployee.username &&
           password === qualityEmployee.password
             ? qualityEmployee
             : undefined;
         break;
       case "deliveryEmployee":
         result =
           username === deliveryEmployee.username &&
           password === deliveryEmployee.password
             ? deliveryEmployee
             : undefined;
         break;
       default:
         result = undefined;
         break;
     }
     */
  };

  this.logout = async () => {
    try {
      if (this.user) {
        this.user = null;
        return new apiResponseModel("Logout", 200);
      }
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.update = async (username, data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("update");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);

      if (!userUpdateValidator(username, data)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      let user = await userDAL.getByUsernameAndType(username, data.oldType);
      if (!user) {
        return new apiResponseModel("404 Not Found", 404);
      }


      return new apiResponseModel(
        await userDAL.update(username, data)
      );
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.delete = async (username, type) => {
    try {
      //check access permissions
      let hasAccess = this.isTheUserHavingAccess("delete");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      //check syntax error in username or type
      if (!userDeleteValidator(username, type)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      /*
      let user = await userDAL.getByUsernameAndType(username, type);
      if (!user) {
        return new apiResponseModel("404 Not Found", 404);
      }
      */
      return new apiResponseModel(
        await userDAL.remove(username, type),
        204
      );
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };
}

exports.userBAL = userBAL;
