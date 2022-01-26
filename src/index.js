import('./pkg/index_bg.wasm').then(() => {
    console.log('fff');
    return import('./main');
}).catch(console.error);