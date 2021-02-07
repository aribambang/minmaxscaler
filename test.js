const scaler = require('./index');

const data = scaler.fit_transform([1, 3, 5, 7]);
const X_test = scaler.transform([1.5, 2.3]);
const X_test_inverse = scaler.inverse_transform(X_test);

console.log(data);
console.log(X_test);
console.log(X_test_inverse);
console.log(scaler.get_params());
