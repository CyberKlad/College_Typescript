var Asteroid = /** @class */ (function () {
    function Asteroid(name, x, y, z) {
        this.name = name;
        this.coords = [x, y, z];
    }
    Asteroid.prototype.distance = function (other) {
        return Math.sqrt(Math.pow(this.coords[0] - other.coords[0], 2) +
            Math.pow(this.coords[1] - other.coords[1], 2) +
            Math.pow(this.coords[2] - other.coords[2], 2));
    };
    return Asteroid;
}());
var a = new Asteroid("x01924", 0, 1, 2);
var b = new Asteroid("y01240", 100, 200, 300);
console.log(a.distance(b));
