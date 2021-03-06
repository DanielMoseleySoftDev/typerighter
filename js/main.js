// global variables
var start = 0
var index = 0
var wordArray = []
var sentencesArray = []
var correctWords = []
var wrongWords = []
var authors = [] // TODO could make this a set?
var isWordTest = true;

// set default number of words
window.addEventListener("load", addSpans(50));

// words or sentence options view control
function sentenceView() {
  const wordCountOptions = document.getElementById("wordCountGroup");
  const sentenceCountOptions = document.getElementById("sentenceCountGroup");
  const author = document.getElementById("author");
  author.style.visibility= "visible";
  wordCountOptions.style.display = "none";
  sentenceCountOptions.style.display = "inline-block";
  isWordTest = false;
  resetButton();
}

function wordView() {
  const wordCountOptions = document.getElementById("wordCountGroup");
  const sentenceCountOptions = document.getElementById("sentenceCountGroup");
  const author = document.getElementById("author");
  author.style.visibility= "hidden";
  sentenceCountOptions.style.display = "none";
  wordCountOptions.style.display = "inline-block";
  isWordTest = true;
  resetButton();
}

function getRandomWords(number) {
  var randomWords = [];
  for (var i = 0; i <= number; i++) {
    randomWords.push(arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)]);
  }
  return randomWords;
}

function getRandomSentences(number) {
  var randomSentences = [];
  for (var i = 0; i < number; i++) {
    randomSentences.push(quotes[Math.floor(Math.random() * quotes.length)]);
  }
  return randomSentences;
}

function breakSentences(sentences) {
  var brokenSentences = [];
  var words = [];
  sentences.forEach(sentence => {
    brokenSentences.push(sentence.Quote.split(/\s+/));
    authors.push(" " + sentence.Author);
  });
  brokenSentences.forEach(sentence => {
    sentence.forEach(word => {
      words.push(word);
    })
  })
  return words;
}

function wordTest(number) {
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
    wordArray = randomWords;
  }
}

function sentenceTest(number) {
  var randomSentences = getRandomSentences(number);
  var randomWords = breakSentences(randomSentences);
  $("#author").text("Quote(s) by: " + authors);
  for (var i = 0; i < randomWords.length; i++) {
    var newSpan = document.createElement("span");
    newSpan.setAttribute("id", "span" + i);
    var spanContent = document.createTextNode(randomWords[i] + " ");

    // add word to span
    newSpan.appendChild(spanContent);

    // add new span to div on page
    var parentDiv = document.getElementById("rndmWords");
    parentDiv.appendChild(newSpan);
    wordArray = randomWords;
  }
}

function addSpans(number) {
  if (isWordTest) {
    wordTest(number);
  } else {
    sentenceTest(number)
  }
  $("#inputField").value = "";
  $("#inputField").focus();
}

// reset global variables and empty input field
function reset() {
  index = 0;
  start = 0;
  correctWords = [];
  wrongWords = [];
  authors = [];
  document.getElementById("inputField").value = "";
}

// remove all word spans and reset global variables
function removeSpans() {
  $("#rndmWords").empty();
  reset();
}

function resetButton() {
  // If isWordTest, then we can reset based on the currentWordLength array
  if (isWordTest) {
    var currentWordLength = wordArray.length - 1;
    removeSpans();
    addSpans(currentWordLength);
    // If !isWordTest, then we can manually trigger the onClick of the active radio button label
  } else {
    if ($("#sentenceOption1").hasClass("active")) {
      $("#sentenceOption1").click();
    } else if ($("#sentenceOption2").hasClass("active")) {
      $("#sentenceOption2").click();
    } else if ($("#sentenceOption3").hasClass("active")) {
      $("#sentenceOption3").click();
    } else if ($("#sentenceOption4").hasClass("active")) {
      $("#sentenceOption4").click();
    } else if ($("#sentenceOption5").hasClass("active")) {
      $("#sentenceOption5").click();
    }
  }
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
  var wpm = (chars / 5) / mins;
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
