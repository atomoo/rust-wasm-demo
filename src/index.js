import("../pkg/index.js").then((module) => {
    console.log(module);
    module.greet('xiaoming');
    const a =module.sort([1,3]);
    console.log(a, typeof a)
}).catch(console.error);

