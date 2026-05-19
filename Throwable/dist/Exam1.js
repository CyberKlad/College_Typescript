"use strict";
//Korbin Gillette 224/220 Exam 1
//my problem domain is throwables that have different interactions with a solid object
//This class represents throwables that would stick to a solid object
class StickyThrowable {
    //construct the sticky object with an initial stickTime
    constructor(stickTime) {
        this.stickTime = stickTime;
    }
    //this public method allows for the sticky objects to be modified for how long they will stick
    changeStickTime(stickmod) {
        this.stickTime += stickmod;
    }
    //this is the overidden method from the interface (hense override is not specified)
    throw() {
        console.log("Sticky throwable was thrown and stuck for", this.stickTime, "seconds.");
    }
}
//This class represents throwables that would bounce off of solids objects
class BouncingThrowable {
    //construct the initial number of bounces
    constructor(numBounces) {
        this.numBounces = numBounces;
    }
    //public method allowing the number of bounces to be changed for an object
    changeBounce(bouncemod) {
        this.numBounces += bouncemod;
    }
    //this is the overidden method from the interface (hense override is not specified)
    throw() {
        console.log("Bouncing throwable was thrown and bounced", this.numBounces, "times.");
    }
}
const arrayOfThrowables = [
    new StickyThrowable(1), new BouncingThrowable(2), new StickyThrowable(3), new BouncingThrowable(4),
    new StickyThrowable(5), new BouncingThrowable(6), new StickyThrowable(7), new BouncingThrowable(8),
    new StickyThrowable(9), new BouncingThrowable(10)
];
for (let throwable of arrayOfThrowables) {
    throwable.throw();
}
