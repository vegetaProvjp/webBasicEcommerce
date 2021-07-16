const helpers = {
  checkNext: function (a, options) {
    //trang hiện tại không có data
    return a == "0" ? "disabled" : "";
  },
  checkPrev: function (a, options) {
    //Nếu trang hiện tại đang là 1;
    return a == "1" ? "disabled" : "";
  },
  isActive: function (a){
    return a === 0 ? 'active' : '';
  },
};


module.exports = helpers;   