class Asteroid {
    name: string;
    coords: [number, number, number];
    constructor( name: string, x: number, y: number, z: number ) {
        this.name = name;
        this.coords = [x, y, z];
    }
    distance( other: Asteroid ): number {
        return Math.sqrt( 
            Math.pow(this.coords[0]-other.coords[0], 2) + 
            Math.pow(this.coords[1]-other.coords[1], 2) + 
            Math.pow(this.coords[2]-other.coords[2], 2) );
    }
}
let a = new Asteroid( "x01924", 0, 1, 2 );
let b = new Asteroid( "y01240", 100, 200, 300 );
console.log( a.distance(b) );
