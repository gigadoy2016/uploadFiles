"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
var Time = /** @class */ (function () {
    function Time() {
        this.date = new Date();
    }
    Time.prototype.getFormattedDateTime = function (now) {
        var year = now.getFullYear();
        var month = (now.getMonth() + 1).toString().padStart(2, '0');
        var day = now.getDate().toString().padStart(2, '0');
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var seconds = now.getSeconds().toString().padStart(2, '0');
        return "".concat(year).concat(month).concat(day, "_").concat(hours).concat(minutes).concat(seconds);
    };
    Time.prototype.getDate = function (date) {
        return this.getFormattedDateTime(date);
    };
    return Time;
}());
exports.Time = Time;
