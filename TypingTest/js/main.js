const arrayOfWords = [
  "a",
  "about",
  "all",
  "also",
  "and",
  "as",
  "at",
  "be",
  "because",
  "but",
  "by",
  "can",
  "come",
  "could",
  "day",
  "do",
  "even",
  "find",
  "first",
  "for",
  "from",
  "get",
  "give",
  "go",
  "have",
  "he",
  "her",
  "here",
  "him",
  "his",
  "how",
  "I",
  "if",
  "in",
  "into",
  "it",
  "its",
  "just",
  "know",
  "like",
  "look",
  "make",
  "man",
  "many",
  "me",
  "more",
  "my",
  "new",
  "no",
  "not",
  "now",
  "of",
  "on",
  "one",
  "only",
  "or",
  "other",
  "our",
  "out",
  "people",
  "say",
  "see",
  "she",
  "so",
  "some",
  "take",
  "tell",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "thing",
  "think",
  "this",
  "those",
  "time",
  "to",
  "two",
  "up",
  "use",
  "very",
  "want",
  "way",
  "we",
  "well",
  "what",
  "when",
  "which",
  "who",
  "will",
  "with",
  "would",
  "year",
  "you",
  "your"
]
// global variables
var start = 0
var index = 0
var wordArray = []
var correctWords = []
var wrongWords = []

// set default number of words
window.addEventListener("load", addSpans(50));

function getRandomWords(number) {
  var randomWords = [];
  for (var i = 0; i <= number; i++) {
    randomWords.push(arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)]);
  }
  return randomWords;
}

function addSpans(number) {
  var randomWords = getRandomWords(number);

  for (var i = 0; i <= number; i++) {
    // create new span and create content for it using random word array
    var newSpan = document.createElement("span");
    newSpan.setAttribute("id", "span" + i);
    var spanContent = document.createTextNode(randomWords[i] + " ");

    // add word to span
    newSpan.appendChild(spanContent);

    // add new span to div on page
    var parentDiv = document.getElementById("rndmWords");
    parentDiv.appendChild(newSpan);
  }
  wordArray = randomWords;
  document.getElementById("inputField").focus();
}

// reset global variables and empty input field
function reset() {
  index = 0;
  start = 0;
  correctWords = [];
  wrongWords = [];
  document.getElementById("inputField").value = "";
}

// remove all word spans and reset global variables
function removeSpans() {
  $("#rndmWords").empty();
  reset();
}

function resetButton() {
  var currentWordLength = wordArray.length - 1;
  removeSpans();
  addSpans(currentWordLength);
}

document.querySelector("#inputField").addEventListener('keydown', e => {

  if (index == 0 && document.querySelector("#inputField").value == '') {
    start = Date.now();
  }

  if (e.key === ' ') {
    e.preventDefault();

    // contents of input field and current text span
    var contents = document.querySelector("#inputField").value;
    var textSpan = document.querySelector("#span" + index);

    // compares contents of input field to position in global array
    if (contents === wordArray[index]) {
      textSpan.setAttribute("class", "word-correct");
      correctWords.push(contents);
    } else {
      textSpan.setAttribute("class", "word-wrong");
      wrongWords.push(wordArray[index]);
    }

    // if current word is last word in list, stop timer and calc wpm and acc
    if (index == (wordArray.length - 1)) {
      lastWord();
    }

    // increment index to allow comparison of next word and clear input field
    index++;
    document.querySelector("#inputField").value = '';

  }
})

function lastWord() {
   // diff in time in seconds for typing
   var diff = (Date.now() - start) / 1000;
   var mins = diff / 60;

   // calculate wpm and acc
   var chars = correctChars();
   var wpm = (chars/5) / mins;
   var acc = (correctWords.length / wordArray.length) * 100;

   document.getElementById("wpm").innerHTML = "WPM : " + Math.round(wpm);
   document.getElementById("acc").innerHTML = "Accuracy : " + Math.floor(acc) + "%";

   reset();
}

function correctChars() {
  var count = 0;
  for (i = 0; i < correctWords.length; i++) {
    count += correctWords[i].length;
  }
  return count;
}

function wrongChars() {
  var count = 0;
  for (i = 0; i < wrongWords.length; i++) {
    count += wrongWords[i].length;
  }
  return count;
}

function allChars() {
  var count = 0;
  for (i = 0; i < wordArray.length; i++) {
    count += wordArray[i].length;
  }
  return count;
}
