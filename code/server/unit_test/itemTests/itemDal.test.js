const { itemDAL } = require('../../DAL/item.dal');
const dal = new itemDAL();

const newItem = {
    "description": "a new item",
    "price": 10.99,
    "SKUId": 1,
    "supplierId": 2
}
describe('item.DAL.getAll', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newItem);
    });

    afterAll(async () => {
        await dal.remove(lastId, newItem.supplierId);
    });


    test('check returned result', async () => {
        const results = await dal.getAll();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.id == lastId);
        expect(result.id).toEqual(lastId);
        expect(result.description).toEqual(newItem.description);
        expect(result.price).toEqual(newItem.price);
        expect(result.SKUId).toEqual(newItem.SKUId);
        expect(result.supplierId).toEqual(newItem.supplierId);
    });

});

describe('item.DAL.getById', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newItem);
    });

    afterAll(async () => {
        await dal.remove(lastId, newItem.supplierId);
    });
    test('check returned result', async () => {
        const result = await dal.getById(lastId, newItem.supplierId);
        expect(result.id).toEqual(lastId);
        expect(result.description).toEqual(newItem.description);
        expect(result.price).toEqual(newItem.price);
        expect(result.SKUId).toEqual(newItem.SKUId);
        expect(result.supplierId).toEqual(newItem.supplierId);
    });
});
describe('item.DAL.add', () => {
    let lastId;

    afterAll(async () => {
        await dal.remove(lastId, newItem.supplierId);
    });

    test('check insertion', async () => {
        lastId = await dal.add(newItem);
        const result = await dal.getById(lastId, newItem.supplierId);

        expect(result.id).toEqual(lastId);
        expect(result.description).toEqual(newItem.description);
        expect(result.price).toEqual(newItem.price);
        expect(result.SKUId).toEqual(newItem.SKUId);
        expect(result.supplierId).toEqual(newItem.supplierId);
    });

});
describe('item.DAL.remove', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newItem);
    });


    test('removing', async () => {
        await dal.remove(lastId, newItem.supplierId);
        const result = await dal.getById(lastId, newItem.supplierId);
        expect(!!result).toBe(false);
    });
});
describe('item.DAL.update', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newItem);
    });
    afterAll(async () => {
        await dal.remove(lastId, newItem.supplierId);
    });


    test('editing', async () => {


        const edited = {
            "newDescription": "a new sku",
            "newPrice": 10.99
        }

        await dal.update(lastId, newItem.supplierId, edited);
        const result = await dal.getById(lastId, newItem.supplierId);

        expect(result.description).toEqual(edited.newDescription);
        expect(result.price).toEqual(edited.newPrice);
    });
});