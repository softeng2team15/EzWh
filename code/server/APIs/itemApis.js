"use strict";

const { itemDAL } = require("../DAL/item.dal");

const baseApi = require("./_baseApiFunctions").baseApi;
const itemBAL = require("../BAL/item.bal").itemBAL;

function itemApi(app) {
  const baseURL1 = "/api/items/";
  const baseURL2 = "/api/item/";
  const api = new baseApi(app);
  const dal = new itemDAL()
  const bal = new itemBAL(dal);
  this.init = async () => {
    // await dal._crateTable();
    dal._crateTable();

    this.getAll();
    this.getById();
    this.add();
    this.update();
    this.delete();
  };

  this.getAll = () => {
    api.get(baseURL1, async () => {
      return await bal.getAll();
    });
  };

  this.getById = () => {
    api.get(baseURL1 + ":id/:supplierId", async (params) => {
      return await bal.getById(parseInt(params.id, 10), parseInt(params.supplierId, 10));
    });
  };

  this.add = () => {
    api.post(baseURL2, async (data) => {
      return await bal.add(data);
    });
  };

  this.update = () => {
    api.put(baseURL2 + ":id/:supplierId", async (params, data) => {
      return await bal.update(parseInt(params.id, 10), parseInt(params.supplierId, 10), data);
    });
  };

  this.delete = () => {
    api.delete(baseURL1 + ":id/:supplierId", async (params, data) => {
      return await bal.delete(parseInt(params.id, 10), parseInt(params.supplierId, 10));
    });
  };
}

exports.itemApi = itemApi;
