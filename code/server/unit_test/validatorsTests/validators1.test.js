const { 
    idValidator,
    isPositiveNumber,
    isDate,
    rfidValidator,
    positionIdValidator,
    productValidator,
  
    skuValidator,
    skuItemValidator,
    positionAddValidator,
    positionUpdateValidator,
    positionUpdateIdValidator } = require("../../services/validators");

/*---------------------idValidator testing---------------------*/
describe('idValidator testing', () => {
    testIdValidator(1, true);
    testIdValidator('2', false);
    testIdValidator(NaN, false);
    testIdValidator(undefined, false);
    testIdValidator(null, false);
    testIdValidator(3.2, false);
    testIdValidator({ id: 1 }, false);
    testIdValidator(Number.POSITIVE_INFINITY, false);
});

function testIdValidator(id, expectedResult) {
    test('test idValidator: ' + id, () => {
        expect(idValidator(id)).toStrictEqual(expectedResult);
    });
}

/*---------------------isPositiveNumber testing---------------------*/
describe('isPositiveNumber testing', () => {
    testIsPositiveNumber("1234", true);
    testIsPositiveNumber(1234, true);
    testIsPositiveNumber("-12345", false);
    testIsPositiveNumber(-1234, false);
    testIsPositiveNumber("string", false);
    testIsPositiveNumber(NaN, false);
    testIsPositiveNumber("NaN", false);
    testIsPositiveNumber("asdf1234", false);
    testIsPositiveNumber("1234asdfa", false);
    testIsPositiveNumber("123sdfg45", false);
    testIsPositiveNumber(null, false);
});

function testIsPositiveNumber(value, expectedResult) {
    test('test isPositiveNumber: ' + value, () => {
        expect(isPositiveNumber(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------isDate testing---------------------*/
describe("isDate testing", () =>{
    testIsDate("2021/11/29 09:33", true);
    testIsDate("2021/11/29", true);
    testIsDate("2021/17/29 09:33", false);
    testIsDate("2021/11/33 09:33", false);
    testIsDate("", false);
    testIsDate("asdfag", false);
    testIsDate(null, false);
});

function testIsDate(value, expectedResult){
    test("test isDate " + value, () => {
        expect(isDate(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------rfidValidator testing---------------------*/
describe("rfidValidator testing", () => {
    testRfidValidator("01234567890123456789012345678901", true);    // 32 digits chars
    testRfidValidator("012345678901234567890123456789012", false);  // 33 digits chars
    testRfidValidator("0123456789012345678901234567890", false);    // 31 digits chars
    testRfidValidator("", false);
    testRfidValidator(null, false);
    testRfidValidator("012345678901234abcd90123456789012", false);
    testRfidValidator("-12345678901234567890123456789012", false);
});

function testRfidValidator(value, expectedResult) {
    test("test rfidValidator: " + value, () => {
        expect(rfidValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------positionIdValidator testing---------------------*/
describe("positionIdValidator testing", () => {
    testPositionIdValidator("800234543412", true);
    testPositionIdValidator("8002345434123", false);
    testPositionIdValidator("-00234543412", false);
    testPositionIdValidator(null, false);
    testPositionIdValidator("asd234543412", false);
    testPositionIdValidator("800234543nbv", false);
    testPositionIdValidator("sa02345434ds", false);
});

function testPositionIdValidator(value, expectedResult) {
    test("test positionIdValidator: " + value, () => {
        expect(positionIdValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------productValidator testing---------------------*/
describe("productValidator testing", () => {
    testProductValidator(
        {
            "SKUId":12,
            "description":"a product",
            "price":10.99
        },
        true
    );
    testProductValidator(
        {
            "SKUId":"12",
            "description":"a product",
            "price":10.99
        },
        false
    );
    testProductValidator(
        {
            "SKUId":-12,
            "description":"a product",
            "price":10.99
        },
        false
    );
    testProductValidator(
        {
            "SKUId":null,
            "description":"a product",
            "price":10.99
        },
        false
    );
    testProductValidator(
        {
            "SKUId":12,
            "description":"",
            "price":10.99
        },
        false
    );
    testProductValidator(
        {
            "SKUId":12,
            "description":1234,
            "price":10.99
        },
        false
    );
    testProductValidator(
        {
            "SKUId":12,
            "description":null,
            "price":10.99
        },
        false
    );
    testProductValidator(
        {
            "SKUId":12,
            "description":"a product",
            "price":-10.99
        },
        false
    );
    testProductValidator(
        {
            "SKUId":12,
            "description":"a product",
            "price":"10.99"
        },
        false
    );
    testProductValidator(
        {
            "SKUId":12,
            "description":"a product",
            "price":null
        },
        false
    );
});

function testProductValidator(value, expectedResult) {
    test("test productValidator " + value, () => {
        expect(productValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------skuValidator testing---------------------*/
describe("skuValidator testing", () => {
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": 100,
            "volume": 50,
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": 50
        },
        true
    );
    testSkuValidator(
        {
            "description": "",
            "weight": 100,
            "volume": 50,
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": 50
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": -100,
            "volume": 50,
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": 50
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": 100,
            "volume": -50,
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": 50
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": 100,
            "volume": 50,
            "notes": "",
            "price": 10.99,
            "availableQuantity": 50
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": 100,
            "volume": 50,
            "notes": "first SKU",
            "price": -10.99,
            "availableQuantity": 50
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": 100,
            "volume": 50,
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": -50
        },
        false
    );
    testSkuValidator(
        {
            "description": null,
            "weight": 100,
            "volume": 50,
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": 50
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": "100",
            "volume": 50,
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": 50
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": 100,
            "volume": "50",
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": 50
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": 100,
            "volume": 50,
            "notes": "first SKU",
            "price": "10.99",
            "availableQuantity": 50
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": 100,
            "volume": 50,
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": "50"
        },
        false
    );
    testSkuValidator(
        {
            "description": "a new sku",
            "weight": 100,
            "volume": 50,
            "notes": "first SKU",
            "price": null,
            "availableQuantity": "50"
        },
        false
    );
});

function testSkuValidator(value, expectedResult) {
    test("test skuValidator: " + value, () => {
        expect(skuValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------skuItemValidator testing---------------------*/
describe("skuItemValidator testing", () => {
    testSkuItemValidator(
        {
            "RFID": "12345678901234567890123456789015",
            "SKUId": 1,
            "DateOfStock": "2021/11/29 12:30"
        },
        true
    );
    testSkuItemValidator(
        {
            "RFID": "123456789012345678901234567890155",    //33 digits
            "SKUId": 1,
            "DateOfStock": "2021/11/29 12:30"
        },
        false
    );
    testSkuItemValidator(
        {
            "RFID": "1234567890123456789012345678901",  //31 digits
            "SKUId": 1,
            "DateOfStock": "2021/11/29 12:30"
        },
        false
    );
    testSkuItemValidator(
        {
            "RFID": "",
            "SKUId": 1,
            "DateOfStock": "2021/11/29 12:30"
        },
        false
    );
    testSkuItemValidator(
        {
            "RFID": null,
            "SKUId": 1,
            "DateOfStock": "2021/11/29 12:30"
        },
        false
    );
    testSkuItemValidator(
        {
            "RFID": "12345678901234567890123456789015",
            "SKUId": "1",
            "DateOfStock": "2021/11/29 12:30"
        },
        false
    );
    testSkuItemValidator(
        {
            "RFID": "12345678901234567890123456789015",
            "SKUId": -1,
            "DateOfStock": "2021/11/29 12:30"
        },
        false
    );
    testSkuItemValidator(
        {
            "RFID": "12345678901234567890123456789015",
            "SKUId": null,
            "DateOfStock": "2021/11/29 12:30"
        },
        false
    );
    testSkuItemValidator(
        {
            "RFID": "12345678901234567890123456789015",
            "SKUId": 1,
            "DateOfStock": "2021/17/29 12:30"   //17th month
        },
        false
    );
});

function testSkuItemValidator(value, expectedResult) {
    test("test skuItemValidator " + value, () => {
        expect(skuItemValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------positionAddValidator testing---------------------*/
describe("positionAddValidator testing", () => {
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        true
    );
    testPositionAddValidator(
        {
            "positionID":"",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":null,
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"80023454341", //11 chars
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"8002345434123",   //13 chars
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": null,
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "80025", //5 chars
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "800",   //3 chars
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": null,
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "34545", //5 chars
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "345",   //3 digits
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "",
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "34123", //5 chars
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "341",   //3 digits
            "maxWeight": 1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": -1000,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": "1000",
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": null,
            "maxVolume": 1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": -1000
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": "1000"
        },
        false
    );
    testPositionAddValidator(
        {
            "positionID":"800234543412",
            "aisleID": "8002",
            "row": "3454",
            "col": "3412",
            "maxWeight": 1000,
            "maxVolume": null
        },
        false
    );
});

function testPositionAddValidator(value, expectedResult){
    test("test positionAddValidator" + value, () => {
        expect(positionAddValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------positionUpdateValidator testing---------------------*/
describe("positionUpdateValidator testing", () => {
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        true
    );
    testPositionUpdateValidator(
        {
            "newAisleID": 8002,
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "80023",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "-002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": null,
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": 3454,
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "-454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": null,
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "-412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "asdf",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": null,
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": "1200",
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": -1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": null,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": "600",
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": -600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": null,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": "200",
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": -200,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": null,
            "newOccupiedVolume":100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":"100"
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":-100
        },
        false
    );
    testPositionUpdateValidator(
        {
            "newAisleID": "8002",
            "newRow": "3454",
            "newCol": "3412",
            "newMaxWeight": 1200,
            "newMaxVolume": 600,
            "newOccupiedWeight": 200,
            "newOccupiedVolume":null
        },
        false
    );
});

function testPositionUpdateValidator(value, expectedResult) {
    test("test positionUpdateValidator" + value, () => {
        expect(positionUpdateValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------positionUpdateIdValidator testing---------------------*/
describe("positionUpdateIdValidator testing", () => {
    testPositionUpdateIdValidator(
        {
            "newPositionID": "800234543412"
        },
        true
    );
    testPositionUpdateIdValidator(
        {
            "newPositionID": "8002345434123"    //13 chars
        },
        false
    );
    testPositionUpdateIdValidator(
        {
            "newPositionID": "80023454341"  //11 chars
        },
        false
    );
    testPositionUpdateIdValidator(
        {
            "newPositionID": "80023asd3412"
        },
        false
    );
    testPositionUpdateIdValidator(
        {
            "newPositionID": ""
        },
        false
    );
    testPositionUpdateIdValidator(
        {
            "newPositionID": null
        },
        false
    );
});

function testPositionUpdateIdValidator(value, expectedResult){
    test("test positionUpdateIdValidator " + value, () => {
        expect(positionUpdateIdValidator(value)).toStrictEqual(expectedResult);
    })
}
