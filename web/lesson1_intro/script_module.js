// Javascript revealing module pattern
// IIFE pattern = Immediately Invoked Function Expression
// IIFE pattern avoids creating ANY global variables at all
/*
 (function() {
    // <program goes in here>
 }());
 */

(function () {


    var createWorker = function () {

        var workCount = 0;

        var task1 = function () {
            workCount += 1;
            console.log("task 1 : count = " + workCount);
        };

        var task2 = function () {
            workCount += 1;
            console.log("task 2 : count = " + workCount);
        };

        return {
            job1: task1,
            job2: task2
        };
    };

    var worker = createWorker();

    worker.job1();
    worker.job2();
    worker.job1();
    worker.job2();
    worker.job1();
    worker.job2();

}());