const Plot = require('./src/struct/Plot.js');
const values = [59, 10, 14, 81, 7, 8, 59, 18, 2, 30, 2, 5, 13, 8, 4, 8, 31, 1, 2, 3, 5, 2, 1];
const labels = ['Groceries',
    'Tax and Fines',
    'Investment Income',
    'Shopping',
    'Phone',
    'Home',
    'Bonus',
    'Charity',
    'Shipping',
    'Decoration',
    'Service Fee',
    'Cafes and Restaurants',
    'Utilities',
    'Bills',
    'Internet and TV',
    'Bank Fees',
    'Transfer',
    'Books and Supplies',
    'Electronics and Software',
    'Fuel',
    'Dining Out',
    'Hotel',
    'Healthcare'];

Plot.plotPie(values, labels)
    .then(console.log)
    .catch(console.error);
