const { internalOrderDAL } = require('../../DAL/internalOrder.dal');
const dal = new internalOrderDAL();

const newIOrder = {
    "issueDate":"2021/11/29 09:33",
    "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
    "customerId" : 1
}

describe('internalOrder.DAL.getAll', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newIOrder);
    });

    afterAll(async () => {
        await dal.remove(lastId);
    });

    test('check returned result', async () => {
        const results = await dal.getAll();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.id == lastId);
        expect(result.id).toEqual(lastId);
        expect(result.issueDate).toEqual(newIOrder.issueDate);
        expect(result.products).toEqual(newIOrder.products);
        expect(result.customerId).toEqual(newIOrder.customerId);
    });

});

describe('internalOrder.DAL.getAllIssued', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newIOrder);
    });

    afterAll(async () => {
        await dal.remove(lastId);
    });

    test('check returned result', async () => {
        const results = await dal.getAllIssued();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.id == lastId);
        expect(result.id).toEqual(lastId);
        expect(result.issueDate).toEqual(newIOrder.issueDate);
        expect(result.products).toEqual(newIOrder.products);
        expect(result.customerId).toEqual(newIOrder.customerId);
    });

});

describe('internalOrder.DAL.getAllAccepted', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newIOrder);
        await dal.update(lastId, {"newState" : "ACCEPTED"});
    });

    afterAll(async () => {
        await dal.remove(lastId);
    });

    test('check returned result', async () => {
        const results = await dal.getAllAccepted();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.id == lastId);
        expect(result.id).toEqual(lastId);
        expect(result.issueDate).toEqual(newIOrder.issueDate);
        expect(result.products).toEqual(newIOrder.products);
        expect(result.customerId).toEqual(newIOrder.customerId);
    });

});

describe('internalOrder.DAL.getById', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newIOrder);
    });

    afterAll(async () => {
        await dal.remove(lastId);
    });

    test('check returned result', async () => {
        const result = await dal.getById(lastId);
        expect(result.id).toEqual(lastId);
        expect(result.issueDate).toEqual(newIOrder.issueDate);
        expect(result.products).toEqual(newIOrder.products);
        expect(result.customerId).toEqual(newIOrder.customerId);
    });

});

describe('internalOrder.DAL.add', () => {
    let lastId;

    afterAll(async () => {
        await dal.remove(lastId);
    });

    test('check returned result', async () => {
        lastId = await dal.add(newIOrder);
        const result = await dal.getById(lastId);
        expect(result.id).toEqual(lastId);
        expect(result.issueDate).toEqual(newIOrder.issueDate);
        expect(result.products).toEqual(newIOrder.products);
        expect(result.customerId).toEqual(newIOrder.customerId);
    });

});

describe('internalOrder.DAL.update', () => {
    let lastId;

    afterAll(async () => {
        await dal.remove(lastId);
    });

    test('check returned result', async () => {
        lastId = await dal.add(newIOrder);
        await dal.update(lastId, {"newState" : "ACCEPTED"});
        const result = await dal.getById(lastId);
        expect(result.id).toEqual(lastId);
        expect(result.issueDate).toEqual(newIOrder.issueDate);
        expect(result.products).toEqual(newIOrder.products);
        expect(result.customerId).toEqual(newIOrder.customerId);
        expect(result.state).toEqual("ACCEPTED");
    });

});

describe('internalOrder.DAL.remove', () => {
    let lastId;

    test('check returned result', async () => {
        lastId = await dal.add(newIOrder);
        await dal.remove(lastId);
        const result = await dal.getById(lastId);
        expect(!!result).toBe(false);
    });

});