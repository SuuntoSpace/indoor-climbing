/*
 function onLap() { trace('--- onLap ---'); }
 function onAutoLap() { trace('--- onAutoLap ---'); }
 function onInterval() { trace('--- onInterval ---'); }
 function onPoolLength() { trace('--- onPoolLength ---'); }
 function onExerciseStart() { trace('--- onExerciseStart ---'); }
 function onExercisePause() { trace('--- onExercisePause ---'); }
 function onExerciseContinue() { trace('--- onExerciseContinue ---'); }
 function onExerciseEnd() { trace('--- onExerciseEnd ---'); }
 function onExercisePause() { trace('--- onExerciseEnd ---'); }
 function onExerciseContinue() { trace('--- onExerciseEnd ---'); }
 */

// Output var climbAttempts: Number of times you make a route or ascent/descent in indoor climbing.
// Output var climbDurationAscentDescent: The time it takes to complete a route or ascent/descent in indoor climbing.
// Output var climbDurationAscent: The ascent in meters in indoor climbing.
// main.js var climbDurationDescent: The time it takes to descend in indoor climbing.
// main.js var climbTotalAscent: Total training climb minus current climb.
// main.js var climbTotalDescent: Total training decrease minus current decrease.
// Output var climbAttemptAscent: Ascent in meters of actual ascent or indoor climbing route.
// main.js var climbAttemptDescent: Descent in meters of actual descent or indoor climbing route.
// main.js var limbTotalDurationAscent: Total Time Duration Ascent in workout
// main.js var climbTotalDurationDescent: Total Time Duration Descent in workout
// main.js var Ascending: Value True o Fasle to detect if is Ascending
// main.js var Descending: Value True o Fasle to detect if is Descending
// Watch var DurationAscent: Total time in the workout that the watch calculate Ascent Time.
// Watch var DurationDescent: Total time in the workout that the watch calculate Descent Time.
// Watch var AscentMeters: Total Ascent meters in the workout.
// Watch var DescentMeters: Total Descent meters in the workout.
// .toFixed(0) Without decimals

var Ascending, Descending, climbAttemptDescent, climbTotalAscent, climbTotalDescent, climbDurationDescent, climbDistanceAttempAscent,
    climbDistanceStartAttempAscent, climbRightTriangle, climbTotalDurationAscent, climbTotalDurationDescent, attemptDistanceAnchored;

function evaluate(input, output) {  
  output.climbAttemptAscent = input.AscentMeters.toFixed(0) - climbTotalAscent;
  climbAttemptDescent = input.DescentMeters.toFixed(0) - climbTotalDescent;
  if ((output.climbAttemptAscent > 0) && (climbAttemptDescent == 0)) {
      if (!attemptDistanceAnchored) {
     // Save the distance when start the Ascent
     climbDistanceStartAttempAscent = input.Distance;
     attemptDistanceAnchored = true;
    } else {
     // Save the Distance in meters when ascensing because later generate the angle of each Attempt
     climbDistanceAttempAscent = input.Distance - climbDistanceStartAttempAscent;
     
     var H = output.climbAttemptAscent;
     var D = climbDistanceAttempAscent;
     
     if (D > 0) {
       var ratio = H / D;
       if (ratio > 1.0) ratio = 1.0;
       if (ratio < -1.0) ratio = -1.0;
       output.climbAngleAscent = Math.asin(ratio) * (180 / Math.PI);
     } else {
       // If no distance has been registered but height increased, it's effectively 90 degrees
       if (H > 0) {
         output.climbAngleAscent = 90;
       } else {
         output.climbAngleAscent = 0;
       }
     }
    } 
    // Condition that you can make actions in Ascent period
    output.climbDurationAscent = input.DurationAscent - climbTotalDurationAscent;
    // Use this var to save the data on SA for each lap 
    output.climbDurationAscentDescent = input.DurationAscent + input.DurationDescent; 
    Ascending = true; 
    Ascending = false;   
  } else if ((climbAttemptDescent > 0) && (output.climbAttemptAscent > 0)) {
    // Condition that you can make actions in Descent period
    climbDurationDescent = input.DurationDescent - climbTotalDurationDescent;
    // Use this var to save the data on SA for each lap 
    output.climbDurationAscentDescent = output.climbDurationAscent + climbDurationDescent;
    Descending = true;
    Ascending = false;
  }else {
    climbTotalDescent = input.DescentMeters.toFixed(0);
    climbTotalDurationDescent = input.DurationDescent;
  }
  if ((output.climbAttemptAscent <= climbAttemptDescent) && 
  ((Ascending == false ) && (Descending == true))) {
   // Trigger lap once
   $.put("/Activity/Trigger", 0);
 }  
}
 
function onExerciseStart(input, output) {
  // Initializing Variables 
  output.climbAttempts = 0;
  output.climbDurationAscentDescent = 0;
  output.climbDurationAscent = 0;
  climbDurationDescent = 0;
  climbTotalAscent = 0;
  climbTotalDescent = 0;
  output.climbAttemptAscent = 0;
  climbAttemptDescent = 0;
  climbDistanceAttempAscent = 0;
  climbDistanceStartAttempAscent = 0;
  output.climbAngleAscent = 0;
  climbRightTriangle = 0;
  Ascending = 'false';
  Descending = 'false';
  climbTotalDurationDescent = 0;
  climbTotalDurationAscent = 0;
  attemptDistanceAnchored = false;
}

function onLap(input, output) { 
  // Collect the latest data
  climbDurationDescent = input.DurationDescent - climbTotalDurationDescent;
  // Use this var to save the data on SA for each lap
  output.climbDurationAscentDescent = output.climbDurationAscent + climbDurationDescent;
  climbDistanceAttempAscent = input.Distance - climbDistanceStartAttempAscent;

  // Initializing Variables for new Ascent and increase output.climbAttempts Variable
  output.climbAttemptAscent = 0;
  climbAttemptDescent = 0;
  climbDistanceAttempAscent = 0;
  climbDistanceStartAttempAscent = 0;
  output.climbAngleAscent = 0;
  climbRightTriangle = 0;
  climbTotalAscent = input.AscentMeters.toFixed(0);
  climbTotalDescent = input.DescentMeters.toFixed(0);
  output.climbAttempts = output.climbAttempts + 1;
  Ascending = 'false';
  Descending = 'false';
  output.climbDurationAscentDescent = 0;
  output.climbDurationAscent = 0;
  climbDurationDescent = 0;
  attemptDistanceAnchored = false;
}
 
 function getUserInterface(input, output) {
   return {
    template: 't'
   };
 }
 
 // This is called also when user backs from exercise start panel without starting
 // exercise. onExerciseEnd() is not working at all as zapp gets disabled before
 // it is called (and it would be called only when exercise is really started).
 function getSummaryOutputs(input, output) {
   return [
     {
      // Save the data of number of times you make a route or ascent/descent in indoor climbing into SA.
      id: 'climbAttempts',
      name: "Number of Ascent",
      format: 'Count_Threedigits',
      value: output.climbAttempts
     },

   ];
 }