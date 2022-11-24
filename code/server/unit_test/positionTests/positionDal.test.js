const { positionDAL } = require('../../DAL/position.dal');
const dal = new positionDAL();



describe('position.DAL.getAll', () => {

    const newPosition = {
        "positionID": "800234543422",
        "aisleID": "8002",
        "row": "3454",
        "col": "3422",
        "maxWeight": 1000,
        "maxVolume": 1000
    }
    beforeAll(async () => {
        await dal.add(newPosition);
    });

    afterAll(async () => {
        await dal.remove(newPosition.positionID);
    });


    test('check returned result', async () => {
        const results = await dal.getAll();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.positionID == newPosition.positionID);
        expect(result.positionID).toEqual(newPosition.positionID);
        expect(result.aisleID).toEqual(newPosition.aisleID);
        expect(result.row).toEqual(newPosition.row);
        expect(result.col).toEqual(newPosition.col);
        expect(result.maxWeight).toEqual(newPosition.maxWeight);
        expect(result.maxVolume).toEqual(newPosition.maxVolume);
    });


});

describe('position.DAL.add', () => {
    const newPosition = {
        "positionID": "800234543466",
        "aisleID": "8002",
        "row": "3454",
        "col": "3466",
        "maxWeight": 1000,
        "maxVolume": 1000
    }
    afterAll(async () => {
        await dal.remove(newPosition.positionID);
    });

    test('check insertion', async () => {
        await dal.add(newPosition);
        const results = await dal.getAll();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.positionID == newPosition.positionID);
        expect(result.positionID).toEqual(newPosition.positionID);
        expect(result.aisleID).toEqual(newPosition.aisleID);
        expect(result.row).toEqual(newPosition.row);
        expect(result.col).toEqual(newPosition.col);
        expect(result.maxWeight).toEqual(newPosition.maxWeight);
        expect(result.maxVolume).toEqual(newPosition.maxVolume);
    });

});
describe('position.DAL.remove', function () {
    const newPosition = {
        "positionID": "800234543410",
        "aisleID": "8002",
        "row": "3454",
        "col": "3410",
        "maxWeight": 1000,
        "maxVolume": 1000
    }
    beforeAll(async () => {
        await dal.add(newPosition);
    });


    test('removing', async function () {
        await dal.remove(newPosition.positionID);
        const results = await dal.getAll();
        const result = results.find(x => x.positionID == newPosition.positionID);
        expect(!!result).toBe(false);
    });
});

describe('position.DAL.update', () => {
    const newPosition = {
        "positionID": "800234543416",
        "aisleID": "8002",
        "row": "3454",
        "col": "3416",
        "maxWeight": 1000,
        "maxVolume": 1000
    }
    const edited = {
        "newAisleID": "8002",
        "newRow": "3454",
        "newCol": "3415",
        "newMaxWeight": 1200,
        "newMaxVolume": 600,
        "newOccupiedWeight": 200,
        "newOccupiedVolume": 100
    }
    beforeAll(async () => {
        await dal.add(newPosition);
    });
    afterAll(async () => {
        await dal.remove(edited.newAisleID + edited.newRow + edited.newCol);
    });


    test('editing', async () => {

        await dal.update(newPosition.positionID, edited);
        const results = await dal.getAll();
        const result = results.find(x => x.positionID == edited.newAisleID + edited.newRow + edited.newCol);

        expect(result.aisleID).toEqual(edited.newAisleID);
        expect(result.row).toEqual(edited.newRow);
        expect(result.col).toEqual(edited.newCol);
        expect(result.maxWeight).toEqual(edited.newMaxWeight);
        expect(result.maxVolume).toEqual(edited.newMaxVolume);
    });

});
describe('position.DAL.updateId', () => {
    const newPosition = {
        "positionID": "800234543410",
        "aisleID": "8002",
        "row": "3454",
        "col": "3410",
        "maxWeight": 1000,
        "maxVolume": 1000
    }
    const edited = {
        "newPositionID": "800234543417"
    }

    beforeAll(async () => {
        await dal.add(newPosition);
    });
    afterAll(async () => {
        await dal.remove(edited.newPositionID);
    });


    test('editing', async () => {



        await dal.updateId(newPosition.positionID, edited);
        const results = await dal.getAll();
        const result = results.find(x => x.positionID == edited.newPositionID);

        expect(result.positionID).toEqual(edited.newPositionID);
    });

});