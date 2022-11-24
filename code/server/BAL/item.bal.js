const { skuBAL } = require("../BAL/Sku.bal");
const { apiResponseModel } = require("../Models/apiResponse.model");
const { idValidator, itemValidator, positionIdValidator } = require("../services/validators");
const { testDescriptorBAL } = require("./testDescriptor.bal");
const validationModel = require("../Models/validations.model").validationModel;
const { positionDAL } = require("../DAL/position.dal");
const { testDescriptorDAL } = require("../DAL/testDescriptor.dal");
const { skuDAL } = require("../DAL/sku.dal");

function itemBAL(itemDAL) {
  this.isTheUserHavingAccess = (methodName) => {
    return new validationModel(true);  /*implement checks with passport */
    let userRole = "supplier"; // *** warning_comment : should be changed after authentication completed ***
    return new validationModel(true);
    /*switch (methodName) {
      case "getAll":
        if (userRole === "manager" || userRole === "supplier") {
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
        if (userRole === "supplier") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "update":
        if (userRole === "supplier") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "delete":
        if (userRole === "supplier") {
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
    }*/
  };



  this.getAll = async () => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getAll");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      return new apiResponseModel(await itemDAL.getAll());
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getById = async (id, supplierId) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getById");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      if (!idValidator(id) || !idValidator(supplierId)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }

      let result = await itemDAL.getById(id, supplierId);
      if (result) {
        return new apiResponseModel(result);
      } else {
        return new apiResponseModel("no item associated to id and supplierId", 404);
      }
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.add = async (data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("save");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      if (!itemValidator(data)) return new apiResponseModel("validation of request body failed", 422);

      const tdDal = new testDescriptorDAL();
      const pDal = new positionDAL();
      const sDal = new skuDAL();


      const skubal = new skuBAL(sDal, tdDal, pDal);
      const sku = await skubal.getById(parseInt(data.SKUId, 10));
      if (sku.httpCode != 200) {
        return new apiResponseModel("404 Not Found", 404);
      }

      const itembal = new itemBAL(itemDAL);
      const itemList = await itembal.getAll();
      if (itemList.httpCode != 200) {
        return new apiResponseModel("404 Not Found", 404);
      }
      itemList.response.forEach((element) => {
        if (element.id == data.id && (element.supplierId == data.supplierId || element.SKUId == data.SKUId))
          return new apiResponseModel("This supplier already sells an item with the same SKUId", 422);
      });

      return new apiResponseModel(await itemDAL.add(data), 201);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.update = async (id, supplierId, data) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("update");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      if (!data.newId && !data.newDescription && !data.newPrice && !data.newSupplierId && !data.newSkuId) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }

      let sku = await itemDAL.getById(id, supplierId);
      if (!sku) {
        return new apiResponseModel("404 Not Found", 404);
      }

      const itembal = new itemBAL(itemDAL);
      const itemList = await itembal.getAll();

      itemList.response.forEach((element) => {
        if (element.id == data.id && (element.supplierId == data.supplierId || element.SKUId == data.SKUId))
          return new apiResponseModel("This supplier already sells an item with the same SKUId", 422);
      });


      return new apiResponseModel(
        await itemDAL.update(id, supplierId, data)
      );
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.delete = async (id, supplierId) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("delete");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);

      if (!idValidator(id) || !idValidator(supplierId)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      return new apiResponseModel(await itemDAL.remove(id, supplierId), 204);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };
}

exports.itemBAL = itemBAL;
