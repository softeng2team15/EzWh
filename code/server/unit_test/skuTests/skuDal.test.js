const { skuDAL } = require('../../DAL/sku.dal');
const dal = new skuDAL();

const newSku = {
    "description": "a new sku",
    "weight": 100,
    "volume": 50,
    "notes": "first SKU",
    "price": 10.99,
    "availableQuantity": 50
}
describe('sku.DAL.getAll', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newSku);
    });

    afterAll(async () => {
      await  dal.remove(lastId);
    });


    test('check returned result', async function () {
        const results = await dal.getAll();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x=>x.id ==lastId);
        expect(result.description).toEqual(newSku.description);
        expect(result.weight).toEqual(newSku.weight);
        expect(result.volume).toEqual(newSku.volume);
        expect(result.notes).toEqual(newSku.notes);
        expect(result.price).toEqual(newSku.price);
        expect(result.availableQuantity).toEqual(newSku.availableQuantity);
    });

});

describe('sku.DAL.getById', () => {
    const newSku = {
        "description": "a new sku",
        "weight": 100,
        "volume": 50,
        "notes": "first SKU",
        "price": 10.99,
        "availableQuantity": 50
    }
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newSku);
    });

    afterAll(async () => {
        await dal.remove(lastId);
    });
    test('check returned result', async () => {
        const result = await dal.getById(lastId);
        expect(result.description).toEqual(newSku.description);
        expect(result.weight).toEqual(newSku.weight);
        expect(result.volume).toEqual(newSku.volume);
        expect(result.notes).toEqual(newSku.notes);
        expect(result.price).toEqual(newSku.price);
        expect(result.availableQuantity).toEqual(newSku.availableQuantity);
    });
});
describe('sku.DAL.add', () => {
    let lastId;

    afterAll(async () => {
        await dal.remove(lastId);
    });

    test('check insertion', async () => {
        lastId = await dal.add(newSku);
        const result = await dal.getById(lastId);

        expect(result.description).toEqual(newSku.description);
        expect(result.weight).toEqual(newSku.weight);
        expect(result.volume).toEqual(newSku.volume);
        expect(result.notes).toEqual(newSku.notes);
        expect(result.price).toEqual(newSku.price);
        expect(result.availableQuantity).toEqual(newSku.availableQuantity);
    });

});
describe('sku.DAL.remove', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newSku);
    });


    test('removing', async () => {
        await dal.remove(lastId);
        const result = await dal.getById(lastId);
        expect(!!result).toBe(false);
    });
});
describe('sku.DAL.update', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newSku);
    });
    afterAll(async () => {
        await dal.remove(lastId);
    });


    test('editing', async () => {


        const edited = {
            "description": "edited sku",
            "weight": 90,
            "volume": 30,
            "notes": "edited1 SKU",
            "price": 5.99,
            "availableQuantity": 10
        }


        await dal.update(lastId, edited);
        const result = await dal.getById(lastId);

        expect(result.description).toEqual(edited.description);
        expect(result.weight).toEqual(edited.weight);
        expect(result.volume).toEqual(edited.volume);
        expect(result.notes).toEqual(edited.notes);
        expect(result.price).toEqual(edited.price);
        expect(result.availableQuantity).toEqual(edited.availableQuantity);
    });
});