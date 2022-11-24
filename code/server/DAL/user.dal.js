const DatabaseManagement =
  require("./_baseDalFunctionalities").DatabaseManagement;
const insertFields = require("../Models/insertFields.model").insertFields;
const creationTableFields =
  require("../Models/creationTableFields.model").creationTableFields;
var path = require("path");
const { convertToBoolean } = require("../services/otherServices");
function userDAL() {
  const tableName = "user";

  this._crateTable = async () => {
    let db = new DatabaseManagement();

    const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`

    db.db.all(sql, async (err, data)=> {
      if (err) reject(err);
      else {
        if (!data.length) {
          const f = await db.createTable(tableName, [
            new creationTableFields("id", "integer", false, true, true, true),
            new creationTableFields("name", "text"),
            new creationTableFields("surname", "text"),
            new creationTableFields("email", "text"),
            new creationTableFields("password", "text"),
            new creationTableFields("type", "text"),
          ]);

          await this.seed();
        }
      }
    });
  }

  this.seed = async () => {

    const ddd = await this.add({
      username: 'user1@ezwh.com',
      name: 'john',
      surname: 'snow',
      password: 'testpassword',
      type: 'customer'
    });

    await this.add({
      username: 'qualityEmployee1@ezwh.com',
      name: 'Michael',
      surname: 'snow',
      password: 'testpassword',
      type: 'quality'
    });

    await this.add({
      username: 'clerk1@ezwh.com',
      name: 'john',
      surname: 'Jordan',
      password: 'testpassword',
      type: 'clerk'
    });

    await this.add({
      username: 'deliveryEmployee1@ezwh.com',
      name: 'Michael',
      surname: 'Jordan',
      password: 'testpassword',
      type: 'delivery'
    });

    await this.add({
      username: 'manager1@ezwh.com',
      name: 'Jack',
      surname: 'snow',
      password: 'testpassword',
      type: 'manager'
    });

  }



  this.login = async (username, password, type) => {
    let db = new DatabaseManagement();
    const users = await db.getAllData(tableName, `email = '${username}' AND password = '${password}' AND type='${type}' `);
    if (!users) return null;

    return users[0];
  }
  /*substitute this method with a get all and then filter username and password*/
  this.getByUsernameAndType = async (username, type) => {
    let db = new DatabaseManagement();
    const users = await db.getAllData(tableName, `email = '${username}' AND type='${type}' `);
    if (!users) return null;

    return users[0];
  }
  this.getAllSuppliers = async () => {
    let db = new DatabaseManagement();


    const users = await db.getAllData(tableName, 'type=\'supplier\'');

    if (!users) return null;

    return users;
  };
  this.getAllUsers = async () => {
    let db = new DatabaseManagement();


    const users = await db.getAllData(tableName, 'type<>\'manager\'');

    if (!users) return null;

    return users;
  };

  this.add = async (user) => {
    let db = new DatabaseManagement();

    return await db.insertData(tableName, [
      new insertFields("email", user.username),
      new insertFields("name", user.name),
      new insertFields("surname", user.surname),
      new insertFields("password", user.password),
      new insertFields("type", user.type)
    ]);
  };

  this.remove = async (username, type) => {
    let db = new DatabaseManagement();

    return await db.deleteByWhereCondition(tableName, `email = '${username}' AND type='${type}' `);
  };

  this.update = async (username, newUser) => {
    let db = new DatabaseManagement();


    let rows = [];
    if (convertToBoolean(newUser.newType))
      rows.push(new insertFields("type", newUser.newType));
    return await db.updateData(tableName, rows, `email = '${username}' AND type='${newUser.oldType}' `);
  };
}

exports.userDAL = userDAL;