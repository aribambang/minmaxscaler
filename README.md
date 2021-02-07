# MinMaxScaler

## What is this?

Transform features by scaling each feature to a given range. Reference from [scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MinMaxScaler.html#sklearn.preprocessing.MinMaxScaler)

## Installation

`npm i minmaxscaler`

## Usage

```
const scaler = require('minmaxscaler');

const data = scaler.fit_transform([1, 3, 5, 7]);
const X_test = scaler.transform([1.5, 2.3]);
const X_test_inverse = scaler.inverse_transform(X_test);

console.log(data);
console.log(X_test);
console.log(X_test_inverse);
console.log(scaler.get_params());

// Output
// [ 0, 0.3333333333333333, 0.6666666666666666, 1 ]
// [ 0.08333333333333333, 0.21666666666666665 ]
// [ 1.5, 2.3 ]
// { X_max: 7, X_min: 1, max_: 1, min_: 0 }
```
