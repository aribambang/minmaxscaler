/**
 * Description  : Transform features by scaling each feature to a given range.
 * Author       : Ari Bambang K.
 **/

var fs = require('fs');
var X_min = 0;
var X_max = 0;
var min_ = 0;
var max_ = 1;

/**
 * Write the minimum and maximum to be used for later scaling to a file.
 * Use the values for future transformation of data before model prediction.
 **/
function write_params() {
  var fs = require('fs');
  var path = require('path');
  // Data which will write in a file.
  var data = { X_max: X_max, X_min: X_min, max_: max_, min_: min_ };

  return fs.writeFileSync(path.resolve(__dirname, 'minmaxscaler.json'), JSON.stringify(data));
}

/**
 * Compute the minimum and maximum to be used for later scaling.
 * @param {Array} X - input data.
 * @param {integer} min - minimum value of the feature range.
 * @param {integer} max - maximum value of the feature range.
 * @return {Array} X_scaled - Final scaled array fitted within Feature Range.
 **/
function fit(X, min = 0, max = 1) {
  X_max = Math.max.apply(null, X);
  X_min = Math.min.apply(null, X);
  min_ = min;
  max_ = max;

  var X_minArr = X.map(function (values) {
    return values - X_min;
  });
  // X_std = (X - X.min()) / (X.max() - X.min())
  var X_std = X_minArr.map(function (values) {
    return values / (X_max - X_min);
  });
  // X_scaled = X_std * (max - min) + min
  var X_scaled = X_std.map(function (values) {
    return values * (max - min) + min;
  });

  return X_scaled;
}

/**
 * Fit to data, then transform it.
 * @param {Array} data - array of objects.
 * @param {integer} min - minimum value of the feature range.
 * @param {integer} max - maximum value of the feature range.
 * @return {Array} train_scaled - Final scaled array fitted within Feature Range.
 **/
function fit_transform(data, min = 0, max = 1) {
  var train_scaled = fit(data, min, max);
  write_params();

  return train_scaled;
}

/**
 * Scale features of X according to feature range.
 * @param {Array} result - array of objects.
 * @return {Array} X_scaled - Final scaled array fitted within Feature Range.
 **/
function transform(result) {
  var fit = get_params();

  var X_minArr = result.map(function (values) {
    return values - fit.X_min;
  });
  var X_std = X_minArr.map(function (values) {
    return values / (fit.X_max - fit.X_min);
  });
  var X_scaled = X_std.map(function (values) {
    return values * (fit.max_ - fit.min_) + fit.min_;
  });

  return X_scaled;
}

/**
 * Undo the scaling of X according to feature range.
 * @param {Array} input - Scaled array according to feature_range.
 * @param {integer} min - minimum value of the feature range.
 * @param {integer} max - maximum value of the feature range.
 * @return {Array} X_ - Inverse Scaled Array.
 **/
function inverse_transform(input, min = 0, max = 1) {
  var fit = get_params();

  var X = input.map(function (values) {
    return (values - min) / (max - min);
  });
  var X_ = X.map(function (values) {
    return values * (fit.X_max - fit.X_min) + fit.X_min;
  });

  return X_;
}

/**
 * Get parameters for this estimator.
 * @return {Object} params
 */
function get_params() {
  var params = require('./minmaxscaler.json');

  return params;
}

module.exports = { fit_transform, transform, inverse_transform, get_params };
