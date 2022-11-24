const { userDAL } = require('../../DAL/user.dal');

const dal = new userDAL();

const newSupplierUser = {
    "username":"user1@ezwh.com",
    "name":"John",
    "surname" : "Snow",
    "password" : "testpassword",
    "type" : "supplier"
}

describe('user.DAL.getAllSuppliers', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newSupplierUser);
    });

    afterAll(() => {
        dal.remove(newSupplierUser.username, newSupplierUser.type);
    });


    test('check returned result', async function () {
        const results = await dal.getAllSuppliers();
        const result = results.find(x => x.id == lastId);
        expect(results.length).toBeGreaterThan(0);
        expect(result.email).toEqual(newSupplierUser.username);
        expect(result.name).toEqual(newSupplierUser.name);
        expect(result.surname).toEqual(newSupplierUser.surname);
        expect(result.type).toEqual(newSupplierUser.type);
    });
});

describe('user.DAL.getAllUsersExceptManagers', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newSupplierUser);
    });

    afterAll(() => {
        dal.remove(newSupplierUser.username, newSupplierUser.type);
    });


    test('check returned result', async function () {
        const results = await dal.getAllUsers();
        const result = results.find(x => x.id == lastId);
        expect(results.length).toBeGreaterThan(0);
        expect(result.email).toEqual(newSupplierUser.username);
        expect(result.name).toEqual(newSupplierUser.name);
        expect(result.surname).toEqual(newSupplierUser.surname);
        expect(result.type).toEqual(newSupplierUser.type);
    });
});

describe('user.DAL.newUser', () => {
    let lastId;
    afterAll(() => {
        dal.remove(newSupplierUser.username, newSupplierUser.type);
    });

    test('check returned result', async function () {
        lastId = await dal.add(newSupplierUser);
        const results = await dal.getAllUsers();
        const result = results.find(x => x.id == lastId);
        expect(results.length).toBeGreaterThan(0);
        expect(result.email).toEqual(newSupplierUser.username);
        expect(result.name).toEqual(newSupplierUser.name);
        expect(result.surname).toEqual(newSupplierUser.surname);
        expect(result.type).toEqual(newSupplierUser.type);
    });
});

describe('user.DAL.update', () => {
    let lastId;
    const editedObj = {
        "oldType" : "supplier",
        "newType" : "clerk"
    }

    afterAll(() => {
        dal.remove(newSupplierUser.username, editedObj.newType);
    });

    test('check returned result', async function () {
        lastId = await dal.add(newSupplierUser);
        await dal.update(newSupplierUser.username, editedObj);
        
        const results = await dal.getAllUsers();
        const result = results.find(x => x.id == lastId);
        expect(results.length).toBeGreaterThan(0);
        expect(result.email).toEqual(newSupplierUser.username);
        expect(result.name).toEqual(newSupplierUser.name);
        expect(result.surname).toEqual(newSupplierUser.surname);
        expect(result.type).toEqual(editedObj.newType);
    });
});

describe('user.DAL.remove', () =>{
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newSupplierUser);
    });

    test('check returned result', async function () {
        const results = await dal.getAllUsers();
        const result = results.find(x => x.id == lastId);
        expect(result).not.toBe(undefined);

        const r = await dal.remove(newSupplierUser.username, newSupplierUser.type);
        expect(r.changes).toBe(1);
    });
});
