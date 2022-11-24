const { testDescriptorDAL } = require('../../DAL/testDescriptor.dal');
const dal = new testDescriptorDAL();

const newTestDescriptor = {
    "name": "test descr 5",
    "procedureDescription": "test description",
    "idSKU": 1
}
describe('testDescriptor.DAL.getAll', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newTestDescriptor);
    });

    afterAll(async () => {
        await dal.remove(lastId);
    });


    test('check returned result', async () => {
        const results = await dal.getAll();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.id == lastId);
        expect(result.name).toEqual(newTestDescriptor.name);
        expect(result.procedureDescription).toEqual(newTestDescriptor.procedureDescription);
        expect(result.idSKU).toEqual(newTestDescriptor.idSKU);
    });

});

describe('testDescriptor.DAL.getById', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newTestDescriptor);
    });

    afterAll(async () => {
        await dal.remove(lastId);
    });
    test('check returned result', async () => {
        const result = await dal.getById(lastId);
        expect(result.name).toEqual(newTestDescriptor.name);
        expect(result.procedureDescription).toEqual(newTestDescriptor.procedureDescription);
        expect(result.idSKU).toEqual(newTestDescriptor.idSKU);
    });
});
describe('testDescriptor.DAL.add', () => {
    let lastId;

    afterAll(async () => {
        await dal.remove(lastId);
    });

    test('check insertion', async () => {
        lastId = await dal.add(newTestDescriptor);
        const result = await dal.getById(lastId);

        expect(result.name).toEqual(newTestDescriptor.name);
        expect(result.procedureDescription).toEqual(newTestDescriptor.procedureDescription);
        expect(result.idSKU).toEqual(newTestDescriptor.idSKU);
    });

});
describe('testDescriptor.DAL.remove', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newTestDescriptor);
    });


    test('removing', async () => {
        await dal.remove(lastId);
        const result = await dal.getById(lastId);
        expect(!!result).toBe(false);
    });
});
describe('testDescriptor.DAL.update', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await dal.add(newTestDescriptor);
    });
    afterAll(async () => {
        await dal.remove(lastId);
    });

    test('editing', async () => {


        const edited = {
            "newName":"test descr edited",
            "newProcedureDescription":"test description edited",
            "newIdSKU":2
        }

        await dal.update(lastId, edited);
        const result = await dal.getById(lastId);

        expect(result.name).toEqual(edited.newName);
        expect(result.procedureDescription).toEqual(edited.newProcedureDescription);
        expect(result.idSKU).toEqual(edited.newIdSKU);
    });
});