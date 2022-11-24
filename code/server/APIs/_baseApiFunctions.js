"use strict";

function baseApi(app) {
  /**
   * Base http Get function
   *
   * @param {string} url The URL of API.
   * @param {(param:urlParams)=>apiResponseModel} callBack The call back.
   */
  this.get = (url, callBack) => {
    try {
      return app.get(url, async (req, res) => {
        const params = req.params;
        const result = await callBack(params);
        let body =
          typeof result.response === "string"
            ? result.response
            : JSON.stringify(result.response);
        return res.status(result.httpCode).type(typeof result.response === "string" ? 'text' : 'json').send(body);
      });
    } catch (error) {
      console.log("Get Error: " + error);
    }
  };

  /**
   * Base http Post function
   *
   * @param {string} url The URL of API.
   * @param {(e:httpBody)=>apiResponseModel} callBack The call back.
   */
  this.post = (url, callBack) => {
    try {
      app.post(url, async (req, res) => {
        let data = req.body;
        const result = await callBack(data);
        let body =
          typeof result.response === "string"
            ? result.response
            : JSON.stringify(result.response);
        res.status(result.httpCode).type(typeof result.response === "string" ? 'text' : 'json').send(body);
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Base http Get function
   *
   * @param {string} url The URL of API.
   * @param {(param:urlParams)=>apiResponseModel} callBack The call back.
   */
  this.delete = (url, callBack) => {
    try {
      app.delete(url, async (req, res) => {
        const params = req.params;
        const result = await callBack(params);
        let body =
          typeof result.response === "string"
            ? result.response
            : JSON.stringify(result.response);
        res.status(result.httpCode).type(typeof result.response === "string" ? 'text' : 'json').send(body);
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Base http Get function
   *
   * @param {string} url The URL of API.
   * @param {(param:urlParams,data:httpBody)=>apiResponseModel} callBack The call back.
   */
  this.put = (url, callBack) => {
    try {
      app.put(url, async (req, res) => {
        const params = req.params;
        let data = req.body;
        const result = await callBack(params, data);
        let body =
          typeof result.response === "string"
            ? result.response
            : JSON.stringify(result.response);
        res.status(result.httpCode).type(typeof result.response === "string" ? 'text' : 'json').send(body);
      });
    } catch (error) {
      console.log(error);
    }
  };
}

exports.baseApi = baseApi;
