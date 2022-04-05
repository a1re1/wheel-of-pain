//
// Shuffle Exercises
//


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

var container = document.getElementById("exercises");
var elementsArray = Array.prototype.slice.call(container.getElementsByClassName('exercise'));
  elementsArray.forEach(function(element){
  container.removeChild(element);
})
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