const { 
   nullToZero,
    addPropertiesToObject,
    convertToBoolean  } = require("../../services/otherServices");

describe('nullToZero testing', () => {
    testNullToZero(null,0);
    testNullToZero(1,1);
});

function testNullToZero(val,expectedResult) {
    test('test nullToZero: ' + val, () => {
        expect(nullToZero(val)).toStrictEqual(expectedResult);
    });
}

describe('convertToBoolean testing', () => {
    testConvertToBoolean(null,false);
    testConvertToBoolean(1,true);
    testConvertToBoolean(0,true);
    testConvertToBoolean("Prova",true);
    testConvertToBoolean(1000,true);
});

function testConvertToBoolean(val,expectedResult) {
    test('test convertToBoolean: ' + val, () => {
        expect(convertToBoolean(val)).toStrictEqual(expectedResult);
    });
}

describe('addPropertiesToObject testing', () => {
    const obj = {"integer":1,"string":"Ciao","newInteger":1,"newString":"Ciao"};
    const _obj = {"integer":1,"string":"Ciao"};
    testAddPropertiesToObject(_obj,obj);
});
function testAddPropertiesToObject(val,expectedResult) {
    test('test addPropertiesToObject: ' + val, () => {
        const value = addPropertiesToObject(val);
        expect(value).toStrictEqual(expectedResult);
    });
}