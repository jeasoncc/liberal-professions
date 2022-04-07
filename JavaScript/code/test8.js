var obj = {
    a: 2
  };
  
  obj.a = 3;
  obj.a // 3
  
  Object.defineProperty(obj, 'a', {
    value: 4,
    writable: true,
    configurable: false, //  不可配置
    enmerable: true,
  });
  
  obj.a // 4
  obj.a = 5
  obj // 5
  
  Object.defineProperty(obj, 'a', {
    value: 6,
    writable: true,
    configurable: true,
    enmerable: true,
  }); // TypeError: Cannot redefine property: a