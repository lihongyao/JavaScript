const heros = ["阿珂", "李白", "貂蝉"];

heros.map((item, index, arr) => {
  console.log(`item:${item}, index:${index}, arr: ${arr}`);
});

/*
item:阿珂, index:0, arr: 阿珂,李白,貂蝉
item:李白, index:1, arr: 阿珂,李白,貂蝉
item:貂蝉, index:2, arr: 阿珂,李白,貂蝉
*/


const flatArray = [1, 2, 3, [4, [1, 2], 6]];
console.log(flatArray.flat(Infinity));

const names = ["张三", "李四", "王五"];
console.log(names.join()); 




const date = new Date();
date.setMilliseconds
date.setSeconds
