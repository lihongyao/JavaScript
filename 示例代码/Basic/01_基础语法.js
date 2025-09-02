var value = 2;
var foo = {
  value: 1,
};
function bar(name, job) {
  return {
    value: this.value,
    name,
    job,
  };
}

// var r = bar.call(foo, "Alice", "Web Front-end Engineer");
// console.log(r); // → { value: 1, name: 'Alice', job: 'Web Front-end Engineer' }

var r = bar.apply(this, ["Alice", "Web Front-end Engineer"]); /** this 指向window, 所以this.value = 2 */
console.log(r); // → {value: 2, name: 'Alice', job: 'Web Front-end Engineer'}

// var func = bar.bind(foo, "Alice", "Web Front-end Engineer"); /** 返回新函数 */
// console.log(func()); // → { value: 1, name: 'Alice', job: 'Web Front-end Engineer' }
