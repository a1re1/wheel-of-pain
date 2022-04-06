//
// Randomize Exercises
//

exerciseList = [
  // ["name", "reps", weight],
  ["pushups", "20", 5],
  ["pushups", "50", 1],
  ["burpees", "5", 5],
  ["burpees", "10", 3],
  ["situps", "10", 5],
  ["situps", "20", 5],
  ["situps", "50", 2],
  ["pullups", "5", 5],
  ["pullups", "10", 2],
  ["pullups", "20", 1],
  ["dumbell bench", "5", 5],
  ["dumbell bench", "10", 6],
  ["dumbell bench", "20", 5],
  ["dumbell curl", "5", 5],
  ["dumbell curl", "10", 5],
  ["dumbell curl", "20", 5],
  ["jumping jack", "10", 5],
  ["jumping jack", "20", 5],
  ["dumbell squat", "10", 5],
  ["dumbell squat", "20", 2],
];

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function createExercise(name, reps) {
  let exercise = document.createElement("div");
  exercise.className = "exercise";
  exercise.innerText = name;

  let repsElement = document.createElement("span");
  repsElement.innerText = "(" + reps + ")";

  exercise.appendChild(repsElement)
  return exercise;
}

var container = document.getElementById("exercises");
let elementsArray = []
exerciseList.forEach(exercise => {
  weight = exercise[2];
  for(let i = 0; i < 5; i++) {
    exerciseElement = createExercise(exercise[0], exercise[1]);
    elementsArray.push(exerciseElement);
  }
});

shuffleArray(elementsArray);
elementsArray.forEach(function(element){
  container.appendChild(element);
})


//
// RUN WHEEL
//


let exercises = document.getElementsByClassName('exercise')

function wipeIn(element) {
  element.classList.add('wipe-in')
}

function wipeOut(element) {
  element.classList.add('wipe-out')
  delay(200).then(() => reset(element))
}

function reset(element) {
  element.classList = 'exercise'
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function* carousel(elements) {   
   for (let i = 0; i >= 0; i++) {
     if (i === 0) {
       wipeIn(elements[i])
       yield
     }
     
     wipeOut(elements[i % elements.length])
     wipeIn(elements[(i + 1) % elements.length])
     yield
   }
}

function runCarousel(genObj) {
  pickExercise = Math.floor(Math.random() * 4500) + 500;
  if (!genObj.next().done) {
    id = setTimeout(runCarousel, 200, genObj)
    setTimeout(() => clearTimeout(id), pickExercise)
  }
}

runCarousel(carousel(exercises))