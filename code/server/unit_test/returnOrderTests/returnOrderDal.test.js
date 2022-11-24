const { returnOrderDAL } = require('../../DAL/returnOrder.dal');
const dal = new returnOrderDAL();

const newReturnOrder = {
    "returnDate": "2021/11/29 09:33",
    "products": [{ "SKUId": 12, "itemId": 10, "description": "a product", "price": 10.99, "RFID": "12345678901234567890123456789016" },
    { "SKUId": 180, "itemId": 18, "description": "another product", "price": 11.99, "RFID": "12345678901234567890123456789038" }],
    "restockOrderId": 1
}
describe('returnOrder.DAL.getAll', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newReturnOrder);
    });

    afterAll(async () => {
        await dal.delete(lastId);
    });


    test('check returned result', async () => {
        const results = await dal.getAll();
        expect(results.length).toBeGreaterThan(0);
        let result = {
            "id": 0,
            "products": [],
            "restockOrderId": 0,
            "returnDate": 0
        };
        for (const element of results) {
            if (element.id == lastId) {
                result.id = element.id;
                result.products = element.products;
                result.returnDate = element.returnDate;
                result.restockOrderId = element.restockOrderId;
            }
        }
        expect(result.id).toEqual(lastId);
        expect(result.returnDate).toEqual(newReturnOrder.returnDate);
        expect(result.products).toEqual(newReturnOrder.products);
        expect(result.restockOrderId).toEqual(newReturnOrder.restockOrderId);
    });

});
describe('returnOrder.DAL.getById', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newReturnOrder);
    });

    afterAll(async () => {
        await dal.delete(lastId);
    });
    test('check returned result', async () => {
        let result = await dal.getById(lastId);
        expect(result.id).toEqual(lastId);
        expect(result.returnDate).toEqual(newReturnOrder.returnDate);
        expect(result.products).toEqual(newReturnOrder.products);
        expect(result.restockOrderId).toEqual(newReturnOrder.restockOrderId);
    });
});
describe('returnOrder.DAL.add', () => {
    let lastId;

    afterAll(async () => {
        await dal.delete(lastId);
    });

    test('check insertion', async () => {
        lastId = await dal.add(newReturnOrder);
        const result = await dal.getById(lastId);

        expect(result.id).toEqual(lastId);
        expect(result.returnDate).toEqual(newReturnOrder.returnDate);
        expect(result.products).toEqual(newReturnOrder.products);
        expect(result.restockOrderId).toEqual(newReturnOrder.restockOrderId);
    });

});
describe('returnOrder.DAL.delete', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newReturnOrder);
    });


    test('deleting', async () => {
        await dal.delete(lastId);
        const result = await dal.getById(lastId);
        expect(!!result).toBe(false);
    });
});