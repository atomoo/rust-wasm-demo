import('../pkg').then(() => {
    return import('./main');
}).catch(console.error);