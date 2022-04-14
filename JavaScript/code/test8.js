// var obj = {
//     a: 2
//   };
  
//   obj.a = 3;
//   obj.a // 3
  
//   Object.defineProperty(obj, 'a', {
//     value: 4,
//     writable: true,
//     configurable: false, //  不可配置
//     enmerable: true,
//   });
  
//   obj.a // 4
//   obj.a = 5
//   obj // 5
  
//   Object.defineProperty(obj, 'a', {
//     value: 6,
//     writable: true,
//     configurable: true,
//     enmerable: true,
//   }); // TypeError: Cannot redefine property: a

var randoms = {
  [Symbol.iterator]: function (){
    return {
      next: function() {
        return {
          value: Math.random()
        }
      }
    }
  }
}

var random_pool = []
for(var n of randoms) {
  random_pool.push(n );
  // 防止无限运行
  if(random_pool.length === 10000) break
}
console.log(random_pool)