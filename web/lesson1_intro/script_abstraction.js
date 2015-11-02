// 1. functions as abstraction
var work = function() {
    var name = "*** WORK FUNCTION ***";
    console.log(name + "\nworking hard!");
}

var play = function() {
    var name = "*** PLAY FUNCTION ***";
    console.log(name + "\nPLAYING hard !");
}

var doIt = function(f) {
    console.log("<<< BEGIN doIt(f) >>> " + Date() );
    f(); // also can add try-catch block here for error-handling
    console.log("<<< END doIt(f) >>> " + Date() );
};

doIt(work);
doIt(play);