"use strict";
const baseApi = require("./_baseApiFunctions").baseApi;
const apiResponseModel =
  require("../Models/apiResponse.model").apiResponseModel;
const restockOrderBAL = require("../BAL/restockOrder.bal").restockOrderBAL;
const restockOrderDAL = require("../DAL/restockOrder.dal").restockOrderDAL;

function restockOrderApi(app) {
  const baseURL1 = "/api/restockOrders";
  const baseURL2 = "/api/restockOrder";
  const api = new baseApi(app);
  const dal = new restockOrderDAL();
  const bal = new restockOrderBAL(dal);
  this.init = async () => {
     dal._createTable();
    this.getAll();
    this.getAllIssued();
    this.getById();
    this.getReturned();
    this.add();
    this.changeState();
    this.addSkuItems();
    this.addTransportNote();
    this.delete();
  };

  this.getAll = () => {
    api.get(baseURL1, async () => {
      return await bal.getAll();
    });
  };

  this.getAllIssued = () => {
    api.get(baseURL1 + "Issued", async () => {
      return await bal.getAllIssued();
    });
  };

  this.getById = () => {
    api.get(baseURL1 + "/:id", async (params) => {
      return await bal.getById(parseInt(params.id, 10));
    });
  };

  this.getReturned = () => {
    api.get(baseURL1 + "/:id/returnItems", async (params) => {
      return await bal.getReturned(parseInt(params.id, 10));
    });
  };

  this.add = () => {
    api.post(baseURL2, async (restockOrder) => {
      return await bal.add(restockOrder);
    });
  };

  this.changeState = () => {
    api.put(baseURL2 + "/:id", async (params, data) => {
      return await bal.changeState(parseInt(params.id, 10), data);
    });
  };

  this.addSkuItems = () => {
    api.put(baseURL2 + "/:id/skuItems", async (params, data) => {
      return await bal.addSkuItems(parseInt(params.id, 10), data);
    });
  }

  this.addTransportNote = () => {
    api.put(baseURL2 + "/:id/transportNote", async (params, data) => {
      return await bal.addTransportNote(parseInt(params.id, 10), data);
    });
  }

  this.delete = () => {
    api.delete(baseURL2 + "/:id", async (params) => {
      return await bal.delete(parseInt(params.id, 10));
    });
  };


}

exports.restockOrderApi = restockOrderApi;
