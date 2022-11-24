const { skuItemDAL } = require('../../DAL/skuItem.dal');
const dal = new skuItemDAL();

const newSkuItem = {
    "RFID": "12345678901234567890123456789018",
    "SKUId": 1,
    "DateOfStock": "2021/11/29 12:30"
}
describe('skuItem.DAL.getAll', () => {
    beforeAll(async () => {
        await dal.add(newSkuItem);
    });

    afterAll(async () => {
        await dal.remove(newSkuItem.RFID);
    });


    test('check returned result', async () => {
        const results = await dal.getAll();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.RFID == newSkuItem.RFID);
        expect(result.RFID).toEqual(newSkuItem.RFID);
        expect(result.SKUId).toEqual(newSkuItem.SKUId);
        expect(result.DateOfStock).toEqual(newSkuItem.DateOfStock);
    });

});

describe('skuItem.DAL.getByRfid', () => {
    beforeAll(async () => {
        await dal.add(newSkuItem);
    });

    afterAll(async () => {
        await dal.remove(newSkuItem.RFID);
    });
    test('check returned result', async () => {
        const result = await dal.getByRfid(newSkuItem.RFID);
        expect(result.RFID).toEqual(newSkuItem.RFID);
        expect(result.SKUId).toEqual(newSkuItem.SKUId);
        expect(result.DateOfStock).toEqual(newSkuItem.DateOfStock);
    });
});
describe('skuItem.DAL.getById', () => {
    beforeAll(async () => {
        await dal.add(newSkuItem);
        await dal.update(newSkuItem.RFID,{Available:1})
    });

    afterAll(async () => {
      await  dal.remove(newSkuItem.RFID);
    });


    test('check returned result', async () => {
        const results = await dal.getById(newSkuItem.SKUId);
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x=>x.RFID == newSkuItem.RFID);
        expect(result.RFID).toEqual(newSkuItem.RFID);
        expect(result.SKUId).toEqual(newSkuItem.SKUId);
        expect(result.DateOfStock).toEqual(newSkuItem.DateOfStock);
    });

});
describe('skuItem.DAL.add', () => {

    afterAll(async () => {
        await dal.remove(newSkuItem.RFID);
    });

    test('check insertion', async () => {
        await dal.add(newSkuItem);
        const result = await dal.getByRfid(newSkuItem.RFID);

        expect(result.RFID).toEqual(newSkuItem.RFID);
        expect(result.SKUId).toEqual(newSkuItem.SKUId);
        expect(result.DateOfStock).toEqual(newSkuItem.DateOfStock);
    });

});
describe('sku.DAL.remove', () => {
    beforeAll(async () => {
        await dal.add(newSkuItem);
    });


    test('removing', async () => {
        await dal.remove(newSkuItem.RFID);
        const result = await dal.getByRfid(newSkuItem.RFID);
        expect(!!result).toBe(false);
    });
});
describe('skuItem.DAL.update', () => {
    const edited = {
        "RFID": "12345678901234567890123456789020",
        "Available": 1,
        "DateOfStock": "2021/11/29 13:30"
    }


    beforeAll(async () => {
        await dal.add(newSkuItem);
    });
    afterAll(async () => {
        await dal.remove(edited.RFID);
    });


    test('editing', async () => {


        await dal.update(newSkuItem.RFID, edited);
        const result = await dal.getByRfid(edited.RFID);

        expect(result.RFID).toEqual(edited.RFID);
        expect(result.Available).toEqual(edited.Available);
        expect(result.DateOfStock).toEqual(edited.DateOfStock);
    });
});