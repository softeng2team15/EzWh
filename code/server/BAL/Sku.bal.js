const {
  addPropertiesToObject,
  nullToZero,
} = require("../services/otherServices");
const { skuValidator, idValidator, positionIdValidator } = require("../services/validators");
const { testDescriptorBAL } = require("./testDescriptor.bal");
const positionBAL = require("./position.bal").positionBAL;
const validationModel = require("../Models/validations.model").validationModel;
const apiResponseModel =
  require("../Models/apiResponse.model").apiResponseModel;

function skuBAL(skuDAL, testDescriptorDAL, positionDAL) {
  this.isTheUserHavingAccess = (methodName) => {
  return new validationModel(true);  /*implement checks with passport */
    let userRole = "manager"; // *** warning_comment : should be changed after authentication completed ***
    switch (methodName) {
      case "getAll":
        if (
          userRole === "manager" ||
          userRole === "customer" ||
          userRole === "clerk"
        ) {
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

      case "updatePosition":
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
      if (!hasAccess)
        return new apiResponseModel(hasAccess.message, 401);

      let result = await skuDAL.getAll();

      let testDescriptors = await new testDescriptorBAL(testDescriptorDAL, skuDAL).getAll();

      if (testDescriptors.httpCode == 200) {

        for (const element of result) {
          element.testDescriptors = testDescriptors.response
            .filter((x) => x.idSKU == element.id)
            .map((x) => x.id);
        }
      }

      return new apiResponseModel(result);
    } catch (error) {
      console.error(error);
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
      let result = await skuDAL.getById(id);
      if (result) {
        let testDescriptors = await new testDescriptorBAL(testDescriptorDAL, skuDAL).getAll();

        if (testDescriptors.httpCode == 200) {
          result.testDescriptors = testDescriptors.response
            .filter((x) => x.idSKU == result.id)
            .map((x) => x.id);
        }
        return new apiResponseModel(result);
      } else {
        return new apiResponseModel("no SKU associated to id", 404);
      }
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Internal Server Error", 500);
    }
  };

  this.save = async (data) => {
    try {
      if (!skuValidator(data)) {
        return new apiResponseModel("validation of request body failed", 422);
      }
      let hasAccess = this.isTheUserHavingAccess("save");
      if (!hasAccess)
        return new apiResponseModel(hasAccess.message, 401);

      let result = await skuDAL.add(data);
      return new apiResponseModel(result, 201);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.update = async (id, newData) => {
    try {
      /**************************************   validations  **************************/

      let updatedSku = {
        description: newData.newDescription,
        weight: newData.newWeight,
        volume: newData.newVolume,
        notes: newData.newNotes,
        price: newData.newPrice,
        availableQuantity: newData.newAvailableQuantity,
      };

      if (!idValidator(id)) {
        return new apiResponseModel(
          "Unprocessable Entity :",
          422
        );
      }
      if (!skuValidator(updatedSku)) {
        return new apiResponseModel("validation of request body failed", 422);
      }

      let hasAccess = this.isTheUserHavingAccess("update");
      if (!hasAccess)
        return new apiResponseModel(hasAccess.message, 401);

      /****************************************  updating positions  ***************** */
      const oldSKU = await skuDAL.getById(id);
      if (!oldSKU) return new apiResponseModel("not found", 404);
      if (oldSKU.position) {
        const weightDeff = nullToZero(updatedSku.weight) - nullToZero(oldSKU.weight);
        const volumeDeff = nullToZero(updatedSku.volume) - nullToZero(oldSKU.volume);

        const _positionBAL = new positionBAL(positionDAL);
        const positions = (await _positionBAL.getAll()).response;
        const position = positions.find((x) => x.positionID == oldSKU.position);

        if (!position) {
          return new apiResponseModel(
            "Service Unavailable: position does not exists",
            503
          );
        }
        position.occupiedWeight =
          nullToZero(position.occupiedWeight) + weightDeff;
        position.occupiedVolume =
          nullToZero(position.occupiedVolume) + volumeDeff;
        if (
          position.occupiedVolume > position.maxVolume ||
          position.occupiedWeight > position.maxWeight
        ) {
          return new apiResponseModel(
            "newAvailableQuantity position is not capable enough in weight or in volume",
            422
          );
        }

        const pUpdateResult = await _positionBAL.update(position.positionID, addPropertiesToObject(position));
        if (pUpdateResult.httpCode != 200) {
          return new apiResponseModel("Service Unavailable", 503);
        }
      }
      /***************************************************************************** */
      let result = await skuDAL.update(id, updatedSku);
      if (result.changes) {
        return new apiResponseModel(result);
      } else {
        return new apiResponseModel("SKU not existing", 404);
      }
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.updatePosition = async (id, data) => {
    try {
      /**************************************   validations  **************************/
      let hasAccess = this.isTheUserHavingAccess("updatePosition");
      if (!hasAccess)
        return new apiResponseModel(hasAccess.message, 401);
      if(!positionIdValidator(data.position)){
        return new apiResponseModel(
          "Invalid position id",
          422
        );
      }
      let sku = (await this.getById(id)).response;
      if (!sku)
        return new apiResponseModel(
          "Position not existing or SKU not existing",
          404
        );

      if (sku.position == data.position) {
        return new apiResponseModel(
          "old position and new position are the same"
        );
      }

      const _positionBAL = new positionBAL(positionDAL);
      const positions = (await _positionBAL.getAll()).response;
      const newPosition = positions.find((x) => x.positionID == data.position);
      if (!newPosition)
        return new apiResponseModel(
          "Position not existing or SKU not existing",
          404
        );

      /****************************************  updating positions  ***************** */

      newPosition.occupiedVolume =
        nullToZero(newPosition.occupiedVolume) + sku.volume;
      newPosition.occupiedWeight =
        nullToZero(newPosition.occupiedWeight) + sku.weight;

      if (
        newPosition.occupiedVolume > newPosition.maxVolume ||
        newPosition.occupiedWeight > newPosition.maxWeight
      ) {
        return new apiResponseModel(
          "newAvailableQuantity position is not capable enough in weight or in volume",
          422
        );
      }
      const newPositionUpdateResult = await _positionBAL.update(
        newPosition.positionID,
        addPropertiesToObject(newPosition)
      );
      if (newPositionUpdateResult.httpCode != 200) {
        return new apiResponseModel("Service Unavailable", 503);
      }

      if (sku.position) {
        let oldPosition = positions.find((x) => (x.positionID = sku.position));
        oldPosition.occupiedVolume =
          nullToZero(oldPosition.occupiedVolume) - sku.volume;
        oldPosition.occupiedWeight =
          nullToZero(oldPosition.occupiedWeight) - sku.weight;
        const oldPositionUpdateResult = await _positionBAL.update(
          oldPosition.positionID,
          addPropertiesToObject(oldPosition)
        );
        if (oldPositionUpdateResult.httpCode != 200) {
          return new apiResponseModel("Service Unavailable", 503);
        }
      }

      /***************************************************************************** */

      sku.position = data.position;
      let result = await skuDAL.update(id, sku);
      return new apiResponseModel(result);
    } catch (error) {
      console.error(error);
      return new apiResponseModel("Service Unavailable", 503);
    }
  };

  this.delete = async (id) => {
    try {
      if (!idValidator(id)) {
        return new apiResponseModel("Unprocessable Entity", 422);
      }
      let hasAccess = this.isTheUserHavingAccess("delete");
      if (!hasAccess)
        return new apiResponseModel(hasAccess.message, 401);
      /********************************************* update position *******************/
      return new apiResponseModel(await skuDAL.remove(id), 204);
    } catch (error) {
      return this.sendErrorResponse(error);
    }
  };
}

exports.skuBAL = skuBAL;
