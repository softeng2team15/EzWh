"use strict";
const baseApi = require("./_baseApiFunctions").baseApi;
const userBAL = require("../BAL/user.bal").userBAL;
const { userDAL } = require("../DAL/user.dal");

function userApi(app) {
  const api = new baseApi(app);
  const userDal = new userDAL();
  const bal = new userBAL(userDal);
  this.init = async () => {
    userDal._crateTable();

    this.getUserInfo();
    this.getAllSuppliers();
    this.getAllUsersExceptManagers();
    this.newUser();
    this.managerSession();
    this.customerSession();
    this.supplierSession();
    this.clerkSession();
    this.qualityEmployeeSession();
    this.deliveryEmployeeSession();
    this.logout();
    this.update();
    this.delete();
  };

  this.getUserInfo = () => {
    api.get("/api/userinfo", async () => {
      return await bal.getUserInfo();
    });
  };

  this.getAllSuppliers = () => {
    api.get("/api/suppliers", async () => {
      return await bal.getAllSuppliers();
    });
  };

  this.getAllUsersExceptManagers = () => {
    api.get("/api/users", async () => {
      return await bal.getAllUsers();
    });
  };

  this.newUser = () => {
    api.post("/api/newUser", async (user) => {
      return await bal.save(user);
    });
  };

  this.managerSession = () => {
    api.post("/api/managerSessions", async (user) => {
      return await bal.login(user.username, user.password, "manager");
    });
  };

  this.customerSession = () => {
    api.post("/api/customerSessions", async (user) => {
      return await bal.login(user.username, user.password, "customer");
    });
  };
  this.supplierSession = () => {
    api.post("/api/supplierSessions", async (user) => {
      return await bal.login(user.username, user.password, "supplier");
    });
  };

  this.clerkSession = () => {
    api.post("/api/clerkSessions", async (user) => {
      return await bal.login(user.username, user.password, "clerk");
    });
  };

  this.qualityEmployeeSession = () => {
    api.post("/api/qualityEmployeeSessions", async (user) => {
      return await bal.login(user.username, user.password, "qualityEmployee");
    });
  };

  this.deliveryEmployeeSession = () => {
    api.post("/api/deliveryEmployeeSessions", async (user) => {
      return await bal.login(user.username, user.password, "deliveryEmployee");
    });
  };

  this.logout = () => {
    api.post("/api/logout", async () => {
      return await bal.logout();
    });
  };

  this.update = () => {
    api.put("/api/users/:username", async (params, data) => {
      return await bal.update(params.username, data);
    });
  };

  this.delete = () => {
    api.delete("/api/users/:username/:type", async (params) => {
      return await bal.delete(params.username, params.type);
    });
  };
}

exports.userApi = userApi;
