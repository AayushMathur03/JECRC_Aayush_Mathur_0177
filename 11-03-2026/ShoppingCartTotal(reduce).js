const cart = [500, 1200, 800, 1500];

const total = cart.reduce((sum, price) => sum + price, 0);

console.log(total);