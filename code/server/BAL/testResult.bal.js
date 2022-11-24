const { addPropertiesToObject } = require("../services/otherServices");
const {
  idValidator,
  testResultValidator,
  rfidValidator,
} = require("../services/validators");
const { skuItemBAL } = require("./skuItem.bal");
const { testDescriptorBAL } = require("./testDescriptor.bal");
const validationModel = require("../Models/validations.model").validationModel;
const apiResponseModel =
  require("../Models/apiResponse.model").apiResponseModel;

function testResultBAL(testResultDAL, skuItemDAL, skuDAL, testDescriptorDAL) {
  this.isTheUserHavingAccess = (methodName) => {
    return new validationModel(true);  /*implement checks with passport */
    let userRole = "manager"; // *** warning_comment : should be changed after authentication completed ***
    switch (methodName) {
      case "getAllByRfid":
        if (userRole === "manager" || userRole === "qualityemployee") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "getById":
        if (userRole === "manager" || userRole === "qualityemployee") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "save":
        if (userRole === "manager" || userRole === "qualityemployee") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "save":
        if (userRole === "manager" || userRole === "qualityemployee") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "update":
        if (userRole === "manager" || userRole === "qualityemployee") {
          return new validationModel(true);
        } else {
          return new validationModel(
            false,
            "You don't have access to these data."
          );
        }
        break;
      case "delete":
        if (userRole === "manager" || userRole === "qualityemployee") {
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

  this.getAllByRfid = async (rfid) => {
    try {
      //check user permissions
      let hasAccess = this.isTheUserHavingAccess("getAllByRfid");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
        //check if rfid is valid
      if (!rfidValidator(rfid)) {
        return new apiResponseModel("validation of rfid failed", 422);
      }
      //check if rfid exists
      const skuItemBal = new skuItemBAL(skuItemDAL, skuDAL);
      const skuItem = await skuItemBal.getByRfid(rfid);
      if (skuItem.httpCode == 404) {
        return new apiResponseModel("no sku item associated to rfid", 404);
      } else if (skuItem.httpCode != 200) {
        return new apiResponseModel("Internal Server Error", 500);
      }
      let results = await testResultDAL.getAll(rfid);
      return new apiResponseModel(results);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.getByRfid = async (rfid, id) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("getById");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      if (!rfidValidator(rfid)) return new apiResponseModel("validation of rfid failed", 422);

      let results = await testResultDAL.getByRfid(rfid, id);
      if (!results)
        return new apiResponseModel(
          "no test result associated to id or no sku item associated to rfid",
          404
        );

      return new apiResponseModel(results);
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
      if (!testResultValidator(data) || !rfidValidator(data.rfid)) {
        return new apiResponseModel(
          "validation of request body or of rfid failed",
          422
        );
      }
      //*********************** no sku item associated to rfid or no test descriptor associated to idTestDescriptor */
      const skuItemBal = new skuItemBAL(skuItemDAL, skuDAL);
      const skuItem = await skuItemBal.getByRfid(data.rfid);
      if (skuItem.httpCode == 404) {
        return new apiResponseModel("no sku item associated to rfid", 404);
      } else if (skuItem.httpCode != 200) {
        return new apiResponseModel("Service Unavailable", 503);
      }

      const testDedcBal = new testDescriptorBAL(testDescriptorDAL, skuDAL);
      const testDesc = await testDedcBal.getById(data.idTestDescriptor);
      if (testDesc.httpCode == 404) {
        return new apiResponseModel(
          "no test descriptor associated to idTestDescriptor",
          404
        );
      } else if (skuItem.httpCode != 200) {
        return new apiResponseModel("Service Unavailable", 503);
      }

      /*********************************************************** */
      return new apiResponseModel(await testResultDAL.add(data), 201);
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.update = async (rfid, id, rawData) => {
    try {

      if (!rfidValidator(rfid) || !idValidator(id)) {
        return new apiResponseModel(
          "validation of request body or of rfid failed",
          422
        );
      }
      const oldData = await this.getByRfid(rfid, id);
      if (oldData.httpCode == 404) {
        return new apiResponseModel("no test descriptor associated to rfid", 404);
      }
      const data = {
        rfid: rawData.newRfid ? rawData.newRfid : oldData.response.rfid,
        idTestDescriptor: rawData.newIdTestDescriptor ? rawData.newIdTestDescriptor : oldData.response.idTestDescriptor,
        Date: rawData.newDate ? rawData.newDate : oldData.response.Date,
        Result: rawData.newResult ? rawData.newResult : !!oldData.response.Result,
      };
      if (!testResultValidator(data)) {
        return new apiResponseModel(
          "validation of request body or of rfid failed",
          422
        );
      }
      let hasAccess = this.isTheUserHavingAccess("save");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);




      //*********************** no sku item associated to rfid or no test descriptor associated to idTestDescriptor */
      const skuItemBal = new skuItemBAL(skuItemDAL, skuDAL);
      const skuItem = await skuItemBal.getByRfid(rfid);
      if (skuItem.httpCode != 200) {
        return new apiResponseModel("no sku item associated to rfid", skuItem.httpCode);
      }

      const testDedcBal = new testDescriptorBAL(testDescriptorDAL, skuDAL);
      const testDesc = await testDedcBal.getById(data.idTestDescriptor);
      if (testDesc.httpCode != 200) {
        return new apiResponseModel(
          "no test descriptor associated to idTestDescriptor",
          testDesc.httpCode
        );
      }
      /*********************************************************** */
      return new apiResponseModel(
        await testResultDAL.update(rfid, id, addPropertiesToObject(data))
      );
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.delete = async (rfid, id) => {
    try {
      let hasAccess = this.isTheUserHavingAccess("save");
      if (!hasAccess.result)
        return new apiResponseModel(hasAccess.message, 401);
      if (!rfidValidator(rfid) || !idValidator(id)) {
        return new apiResponseModel("validation of id or of rfid failed", 422);
      }

      return new apiResponseModel(
        await testResultDAL.remove(rfid, id),
        204
      );
    } catch (error) {
      console.log(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };
}

exports.testResultBAL = testResultBAL;
