const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


describe('position.api.getAll', () => {
    
    const newObj = {
        "positionID":"800234543410",
        "aisleID": "8002",
        "row": "3454",
        "col": "3412",
        "maxWeight": 1000,
        "maxVolume": 1000
    };
    it('Get All positions', async function () {
        const postRes = await agent.post('/api/position').send(newObj);
        postRes.should.have.status(201);
        const getRes = await agent.get('/api/positions');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { positionID,aisleID,row,col,maxWeight,maxVolume,occupiedWeight,occupiedVolume } = getRes.body[getRes.body.length - 1];

        positionID.should.be.equal(newObj.positionID);
        aisleID.should.be.equal(newObj.aisleID);
        row.should.be.equal(newObj.row);
        col.should.be.equal(newObj.col);
        maxWeight.should.be.equal(newObj.maxWeight);
        maxVolume.should.be.equal(newObj.maxVolume);
        occupiedWeight.should.be.equal(0);
        occupiedVolume.should.be.equal(0);

        const delRes=await agent.delete('/api/position/' + newObj.positionID);
        delRes.should.have.status(204);

    });
})

describe('position.api.save', () => {
    
    const newObj = {
        "positionID":"800234543413",
        "aisleID": "8002",
        "row": "3454",
        "col": "3413",
        "maxWeight": 1000,
        "maxVolume": 1000
    };
    it('Adding Data', async () => {
        const postRes = await agent.post('/api/position').send(newObj);
        postRes.should.have.status(201);

        const getRes = await agent.get('/api/positions');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { positionID,aisleID,row,col,maxWeight,maxVolume,occupiedWeight,occupiedVolume } = getRes.body.find(x => x.positionID == newObj.positionID);

        getRes.should.have.status(200);
        positionID.should.be.equal(newObj.positionID);
        aisleID.should.be.equal(newObj.aisleID);
        row.should.be.equal(newObj.row);
        col.should.be.equal(newObj.col);
        maxWeight.should.be.equal(newObj.maxWeight);
        maxVolume.should.be.equal(newObj.maxVolume);
        occupiedWeight.should.be.equal(0);
        occupiedVolume.should.be.equal(0);

        const delRes=await agent.delete('/api/position/' + newObj.positionID);
        delRes.should.have.status(204);
    });
})

describe('position.api.update', () => {
    
    const newObj = {
        "positionID":"800234543414",
        "aisleID": "8002",
        "row": "3454",
        "col": "3414",
        "maxWeight": 1000,
        "maxVolume": 1000
    };
    const editedObj = {
        "newAisleID": "8002",
        "newRow": "3454",
        "newCol": "3415",
        "newMaxWeight": 1200,
        "newMaxVolume": 600,
        "newOccupiedWeight": 200,
        "newOccupiedVolume":100
    }

    it('Updating Data', async () => {
        const postRes = await agent.post('/api/position').send(newObj);
        postRes.should.have.status(201);

        const putRes = await agent.put('/api/position/' + newObj.positionID).send(editedObj);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get('/api/positions');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { positionID,aisleID,row,col,maxWeight,maxVolume,occupiedWeight,occupiedVolume } = getRes.body.find(x => x.positionID == (editedObj.newAisleID+editedObj.newRow+editedObj.newCol));


        positionID.should.be.equal(editedObj.newAisleID+editedObj.newRow+editedObj.newCol);
        aisleID.should.be.equal(editedObj.newAisleID);
        row.should.be.equal(editedObj.newRow);
        col.should.be.equal(editedObj.newCol);
        maxWeight.should.be.equal(editedObj.newMaxWeight);
        maxVolume.should.be.equal(editedObj.newMaxVolume);
        occupiedWeight.should.be.equal(editedObj.newOccupiedWeight);
        occupiedVolume.should.be.equal(editedObj.newOccupiedVolume);

        const delRes=await agent.delete('/api/position/' + editedObj.newAisleID+editedObj.newRow+editedObj.newCol);
        delRes.should.have.status(204);
    });
})

describe('position.api.updateId', () => {
    
    const newObj = {
        "positionID":"800234543417",
        "aisleID": "8002",
        "row": "3454",
        "col": "3417",
        "maxWeight": 1000,
        "maxVolume": 1000
    };
    const editedObj = {
        "newPositionID": "800234543418"
    }

    it('Updating Data', async () => {
        const postRes = await agent.post('/api/position').send(newObj);
        postRes.should.have.status(201);

        const putRes = await agent.put('/api/position/' + newObj.positionID+"/changeID").send(editedObj);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get('/api/positions');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { positionID,aisleID,row,col,maxWeight,maxVolume,occupiedWeight,occupiedVolume } = getRes.body.find(x => x.positionID == editedObj.newPositionID);

        const strArray = editedObj.newPositionID.match(/.{1,4}/g);
        const newAisleID=strArray[0];
        const newRow=strArray[1];
        const newCol=strArray[2];
        positionID.should.be.equal(editedObj.newPositionID);
        aisleID.should.be.equal(newAisleID);
        row.should.be.equal(newRow);
        col.should.be.equal(newCol);
        maxWeight.should.be.equal(newObj.maxWeight);
        maxVolume.should.be.equal(newObj.maxVolume);
        occupiedWeight.should.be.equal(0);
        occupiedVolume.should.be.equal(0);
        const delRes=await agent.delete('/api/position/' + editedObj.newPositionID);
        delRes.should.have.status(204);
    });
})

describe('position.api.delete', () => {
    
    const newObj = {
        "positionID":"800234543416",
        "aisleID": "8002",
        "row": "3454",
        "col": "3416",
        "maxWeight": 1000,
        "maxVolume": 1000
    };
    it('Deleting data', async () => {
        const postRes = await agent.post('/api/position').send(newObj);
        postRes.should.have.status(201);

        const delRes = await agent.delete('/api/position/' + newObj.positionID);
        delRes.should.have.status(204);

        const getRes = await agent.get('/api/positions');
        const found = getRes.body.find(x => x.positionID == newObj.positionID) == undefined ?false:true;
        found.should.be.equal(false);

    });
})
