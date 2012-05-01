var expert = exports;

expert.compute = function (a, b) {
  return a * b;
};

expert.minus = function (a, b) {
  return a - b;
};

expert.quickCompute = function(a, b, callback) {
    setTimeout(callback, 1000, a*b);
};