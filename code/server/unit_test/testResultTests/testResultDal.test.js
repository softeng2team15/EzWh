const { testResultDAL } = require('../../DAL/testResult.dal');

const dal = new testResultDAL();

const newTest = {
    "rfid": "12345678901234567890123456789016",
    "idTestDescriptor": 4,
    "Date": "2021/11/28",
    "Result": true
}


describe('testResult.DAL.getAll', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newTest);
    });

    afterAll(async () => {
        await dal.remove(newTest.rfid, lastId);
    });


    test('check returned result', async function () {
        const results = await dal.getAll(newTest.rfid);
        const result = results.find(x => x.id == lastId);
        expect(results.length).toBeGreaterThan(0);
        expect(result.Date).toEqual(newTest.Date);
        expect(!!result.Result).toEqual(newTest.Result);
        expect(result.idTestDescriptor).toEqual(newTest.idTestDescriptor);
        expect(result.rfid).toEqual(newTest.rfid);
    });

});

describe('testResult.DAL.getByRfid', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newTest);
    });

    afterAll(async () => {
        await dal.remove(newTest.rfid, lastId);
    });


    test('check returned result', async function () {
        const result = await dal.getByRfid(newTest.rfid, lastId);
        expect(result).not.toBe(undefined);
        expect(result.Date).toEqual(newTest.Date);
        expect(!!result.Result).toEqual(newTest.Result);
        expect(result.idTestDescriptor).toEqual(newTest.idTestDescriptor);
        expect(result.rfid).toEqual(newTest.rfid);
    });

});


describe('testResult.DAL.add', () => {
    let lastId;

    afterAll(async () => {
        await dal.remove(newTest.rfid, lastId);
    });


    test('check returned result', async function () {
        lastId = await dal.add(newTest);
        const result = await dal.getByRfid(newTest.rfid, lastId);
        expect(result).not.toBe(undefined);
        expect(result.Date).toEqual(newTest.Date);
        expect(!!result.Result).toEqual(newTest.Result);
        expect(result.idTestDescriptor).toEqual(newTest.idTestDescriptor);
        expect(result.rfid).toEqual(newTest.rfid);
    });

});

describe('testResult.DAL.remove', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newTest);
    });

    test('check returned result', async function () {
        const result = await dal.getByRfid(newTest.rfid, lastId);
        expect(result).not.toBe(undefined);

        const r = await dal.remove(newTest.rfid, lastId);

        expect(r.changes).toBe(1);


    });

});


describe('testResult.DAL.update', () => {
    let lastId;

    const editedObj = {
        "newIdTestDescriptor": 1,
        "newDate": "1995/11/28",
        "newResult": false
    }


    beforeAll(async () => {
        lastId = await dal.add(newTest);
    });

    afterAll(async () => {
        await dal.remove(newTest.rfid, lastId);
    });


    test('check returned result', async function () {
        const r = await dal.update(newTest.rfid, lastId, editedObj);
        const result = await dal.getByRfid(newTest.rfid, lastId);
        expect(result).not.toBe(undefined);
        expect(result.Date).toEqual(editedObj.newDate);
        expect(!!result.Result).toEqual(editedObj.newResult);
        expect(result.idTestDescriptor).toEqual(editedObj.newIdTestDescriptor);
    });

});
