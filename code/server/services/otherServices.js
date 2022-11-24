function addPropertiesToObject(obj) {
  let _obj = Object.assign({}, obj);
  for (let oldName in _obj) {
    let propName = oldName.charAt(0).toUpperCase() + oldName.slice(1);
    _obj["new" + propName] = _obj[oldName];
  }
  return _obj;
}

function nullToZero(val) {
  if (!val) return 0;
  return val;
}

function convertToBoolean(val) {
  if (val === 0) return true;
  return !!val;
}

module.exports = { nullToZero, addPropertiesToObject, convertToBoolean };
