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
// Output var climbAttemptAscent: Ascent in meters of actual ascent or indoor climbing route.
// Output var climbDurationAscent: The ascent in meters in indoor climbing.
// Output var climbDurationAscentDescent: The time it takes to complete a route or ascent/descent in indoor climbing.
// main.js var Ascending: Value True o Fasle to detect if is Ascending
// main.js var Descending: Value True o Fasle to detect if is Descending
// main.js var climbAttemptDescent: Descent in meters of actual descent or indoor climbing route.
// main.js var climbTotalAscent: Total training climb minus current climb.
// main.js var climbTotalDescent: Total training decrease minus current decrease.
<<<<<<< HEAD
// Output var climbAttemptAscent: Ascent in meters of actual ascent or indoor climbing route.
// main.js var climbAttemptDescent: Descent in meters of actual descent or indoor climbing route.
// main.js var limbTotalDurationAscent: Total Time Duration Ascent in workout
// main.js var climbTotalDurationDescent: Total Time Duration Descent in workout
// main.js var Ascending: Value True o Fasle to detect if is Ascending
// main.js var Descending: Value True o Fasle to detect if is Descending
=======
// main.js var climbDurationDescent: The time it takes to descend in indoor climbing.
// main.js var limbTotalDurationAscent: Total Time Duration Ascent in workout
// main.js var climbTotalDurationDescent: Total Time Duration Descent in workout
>>>>>>> master
// Watch var DurationAscent: Total time in the workout that the watch calculate Ascent Time.
// Watch var DurationDescent: Total time in the workout that the watch calculate Descent Time.
// Watch var AscentMeters: Total Ascent meters in the workout.
// Watch var DescentMeters: Total Descent meters in the workout.
// .toFixed(0) Without decimals

<<<<<<< HEAD
var Ascending, Descending, climbAttemptDescent, climbTotalAscent, climbTotalDescent, climbDurationDescent, climbTotalDurationAscent, climbTotalDurationDescent, lastClimbingState;

function evaluate(input, output) {  
  output.climbAttemptAscent = (input.AscentMeters || 0).toFixed(0) - (climbTotalAscent || 0);
  climbAttemptDescent = (input.DescentMeters || 0).toFixed(0) - (climbTotalDescent || 0);
  if ((output.climbAttemptAscent > 0) && (climbAttemptDescent == 0)) {
      output.isClimbing = 1;
      lastClimbingState = 1;
      var vSpeed = (input.VerticalSpeed || 0) * 60;
      if (vSpeed < 0) vSpeed = 0;
      output.climbVerticalSpeed = Number(vSpeed.toFixed(0)); 
    // Condition that you can make actions in Ascent period
    output.climbDurationAscent = input.DurationAscent - climbTotalDurationAscent;
    // Use this var to save the data on SA for each lap 
    output.climbDurationAscentDescent = input.DurationAscent + input.DurationDescent; 
    Ascending = true; 
    Descending = false;   
  } else if ((climbAttemptDescent > 0) && (output.climbAttemptAscent > 0)) {
    output.isClimbing = 0;
    if (lastClimbingState == 1) {
       output.recommendedRest = output.climbDurationAscent * 3;
       lastClimbingState = 0;
    }
=======
var Ascending, Descending, climbAttemptDescent, climbTotalAscent, climbTotalDescent, climbDurationDescent,
climbTotalDurationAscent, climbTotalDurationDescent;

function evaluate(input, output) {  
  output.climbAttemptAscent = input.AscentMeters.toFixed(0) - climbTotalAscent;
  climbAttemptDescent = input.DescentMeters.toFixed(0) - climbTotalDescent;  
  if ((output.climbAttemptAscent > 0) && (climbAttemptDescent == 0)) {
    // Condition that you can make actions in Ascent period
    output.climbDurationAscent = input.DurationAscent - climbTotalDurationAscent;
    Ascending = true;
    // Use this var to save the data on SA for each lap 
    output.climbDurationAscentDescent = output.climbDurationAscent;     
  } else if ((climbAttemptDescent > 0) && (output.climbAttemptAscent > 0)){
>>>>>>> master
    // Condition that you can make actions in Descent period
    climbDurationDescent = input.DurationDescent - climbTotalDurationDescent;
    // Use this var to save the data on SA for each lap 
    output.climbDurationAscentDescent = output.climbDurationAscent + climbDurationDescent;
    Descending = true;
    Ascending = false;
<<<<<<< HEAD
  } else {
    output.isClimbing = 0;
    if (lastClimbingState == 1) {
       output.recommendedRest = output.climbDurationAscent * 3;
       lastClimbingState = 0;
    }
    climbTotalDescent = input.DescentMeters.toFixed(0);
    climbTotalDurationDescent = input.DurationDescent;
  }
  
  if (output.isClimbing == 0 && output.recommendedRest > 0) {
    output.recommendedRest = output.recommendedRest - 1;
  }

  // Calculate HR Zone explicitly for emulator support
  var hr = Math.round((input.HeartRate || 0) * 60);
  var maxHR = input.MaxHR || 190;
  var zone = 0;
  if (hr > 0 && maxHR > 0) {
    if (hr >= Math.round(maxHR * 0.87)) zone = 5;
    else if (hr >= Math.round(maxHR * 0.82)) zone = 4;
    else if (hr >= Math.round(maxHR * 0.77)) zone = 3;
    else if (hr >= Math.round(maxHR * 0.72)) zone = 2;
    else zone = 1;
  }
  output.hrZoneNum = zone;

=======
  }else {
    climbTotalDescent = input.DescentMeters;
    climbTotalDurationDescent = input.DurationDescent;
  }
>>>>>>> master
  if ((output.climbAttemptAscent <= climbAttemptDescent) && 
  ((Ascending == false ) && (Descending == true))) {
   // Trigger lap once
   $.put("/Activity/Trigger", 0);
<<<<<<< HEAD
 }  
=======
 }
>>>>>>> master
}
 
function onExerciseStart(input, output) {
  // Initializing Variables 
  output.climbAttempts = 0;
  output.climbDurationAscentDescent = 0;
  output.climbDurationAscent = 0;
  climbDurationDescent = 0;
  climbTotalDescent = 0;
  output.climbAttemptAscent = 0;
  climbAttemptDescent = 0;
<<<<<<< HEAD
  output.climbVerticalSpeed = 0;
  output.isClimbing = 0;
  output.recommendedRest = 0;
  lastClimbingState = 0;
  climbTotalAscent = 0;
  Ascending = false;
  Descending = false;
=======
  Ascending = 'false';
  Descending = 'false';
>>>>>>> master
  climbTotalDurationDescent = 0;
  climbTotalDurationAscent = 0;
}

function onLap(input, output) { 
  // Collect the latest data
  climbDurationDescent = input.DurationDescent - climbTotalDurationDescent;
  // Use this var to save the data on SA for each lap
  output.climbDurationAscentDescent = output.climbDurationAscent + climbDurationDescent;
<<<<<<< HEAD
  
  if (output.climbDurationAscent > 0) {
    output.recommendedRest = output.climbDurationAscent * 3;
  }

  // Initializing Variables for new Ascent and increase output.climbAttempts Variable
  output.climbAttemptAscent = 0;
  climbAttemptDescent = 0;
  output.climbVerticalSpeed = 0;
  output.isClimbing = 0;
  lastClimbingState = 0;
  climbTotalAscent = (input.AscentMeters || 0).toFixed(0);
  climbTotalDescent = (input.DescentMeters || 0).toFixed(0);
  output.climbAttempts = output.climbAttempts + 1;
  Ascending = false;
  Descending = false;
=======
  // Initializing Variables for new Ascent and increase output.climbAttempts Variable
  output.climbAttemptAscent = 0;
  climbAttemptDescent = 0;
  climbTotalAscent = input.AscentMeters.toFixed(0);
  climbTotalDescent = input.DescentMeters.toFixed(0);
  climbTotalDurationAscent = input.DurationDescent;
  climbTotalDurationAscent =input.DurationAscent;
  output.climbAttempts = output.climbAttempts + 1;
  Ascending = 'false';
  Descending = 'false';
>>>>>>> master
  output.climbDurationAscentDescent = 0;
  output.climbDurationAscent = 0;
  climbDurationDescent = 0;
}
 
 function getUserInterface(input, output) {
<<<<<<< HEAD
  return {
    template: 't',
    zn: { input: '/Activity/Zones/HeartRate/CurrentZone' },
    segm: 5
  };
}
=======
   return {
    template: 't'
   };
 }
>>>>>>> master
 
 // This is called also when user backs from exercise start panel without starting
 // exercise. onExerciseEnd() is not working at all as zapp gets disabled before
 // it is called (and it would be called only when exercise is really started).
 function getSummaryOutputs(input, output) {
   return [
     {
      // Save the data of number of times you make a route or ascent/descent in indoor climbing into SA.
      id: 'climbAttempts',
      name: "Nº of Attempts",
      format: 'Count_Threedigits',
      value: output.climbAttempts
     },
   ];
<<<<<<< HEAD
 }
=======
 }
>>>>>>> master
