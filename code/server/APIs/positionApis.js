"use strict";
const baseApi = require("./_baseApiFunctions").baseApi;
const positionBAL = require("../BAL/position.bal").positionBAL;
const { positionDAL } = require("../DAL/position.dal");

function positionApi(app) {
  const baseURL1 = "/api/position/";
  const baseURL2 = "/api/positions";
  const api = new baseApi(app);
  const dal = new positionDAL();
  const bal = new positionBAL(dal);
  this.init = async () => {
    // await dal._crateTable();
    dal._crateTable();
    this.getAll();
    this.save();
    this.update();
    this.updateId();
    this.delete();
  };

  this.getAll = () => {
    api.get(baseURL2, async () => {
      return await bal.getAll();
    });
  };

  this.save = () => {
    api.post(baseURL1, async (position) => {
      return await bal.save(position);
    });
  };

  this.update = () => {
    api.put(baseURL1 + ":positionID", async (params, data) => {
      return await bal.update(params.positionID, data);
    });
  };

  this.updateId = () => {
    api.put(baseURL1 + ":positionID/changeID", async (params, data) => {
      return await bal.updateId(params.positionID, data);
    });
  };

  this.delete = () => {
    api.delete(baseURL1 + ":positionID", async (params) => {
      return await bal.delete(params.positionID);
    });
  };
}

exports.positionApi = positionApi;
