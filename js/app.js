const ulList = document.querySelector(".deck");
const header = document.querySelector("header");
const h1 = document.querySelector("h1");
const infoText = document.querySelector(".info");
const span = document.getElementsByTagName("span");
const restart = document.getElementById("restart");
const timer = document.getElementById("timer");
const stars = document.getElementById("stars");
const counterBox = document.getElementById("moves");
const modal = document.getElementById("modal");

// information how to play
infoText.innerHTML =
  "Start the game by clicking any card.";

// setting the starting values for clicks counter and timer
let clicks = 0;
let m = 0;
let s = 0;
let timerStart = true;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// array with set of cards
let names = [
  "card1",
  "card1",
  "card2",
  "card2",
  "card3",
  "card3",
  "card4",
  "card4",
  "card5",
  "card5",
  "card6",
  "card6",
  "card7",
  "card7",
  "card8",
  "card8"
];

// definition of array with names of variable
let arrayList = [names];

// shuffle the cards in array
names = shuffle(names);
arrayList = shuffle(arrayList);

// create a list that holds all cards
function game(item, index, array) {
  ulList.innerHTML +=
    '<li class="card"><span class="lid"></span><span class="item"></span></li>';
  document.querySelector(".item").className = item;
}

// make loop of cards from random array with use function 'game'
arrayList[0].forEach(game);

// add event listener 'click' for element ul for function startGame
ulList.addEventListener("click", startGame, false);

// add event listener 'click' for element with class name lid for function timerGameStart
const clickedCard = document.querySelectorAll(".lid");
for (let i = 0; i < clickedCard.length; i++) {
  clickedCard[i].addEventListener("click", timerGameStart, false);
}

// start the game function
function startGame(e) {

  // stop propagation for click event
  e.stopPropagation();

  // set variable for one event target
  let clickedCard = e.target;

  // set variable for tag name on event target
  let cardCheck = e.target.tagName;

  // check if span class name is 'lid' and if tag name isn't 'UL'
  if (clickedCard.className == "lid" && cardCheck != "UL") {

    // if check is correct change class of element for 'open'
    clickedCard.className = "open";

    // call to functions: clicksCounter, cardMatchList and rating
    clicksCounter();
    cardMatchList();
    rating();

    // display the  icon for restart game
    restart.innerHTML = '<span class="restart-span">↻</span>';
  }
}

// variable that handles cards which are currently open
let listOpenCards = [];

// variable that handles cards which are matched
let listMatchedCards = [];

// function that creates a list of matched cards
function cardMatchList() {

  // variable that handles length of currently open cards
  let noOfCards = listOpenCards.length;

  // variable that handles length of currently matched cards
  let noOfMatchedCards = listMatchedCards.length;

  // check if some element span in document has class with name 'open'
  if ((span.className = "open")) {

    // add to array with open elements span elements with class name 'open'
    listOpenCards[noOfCards] = document.getElementsByClassName("open");

    // check if array has 2 open elements
    if (listOpenCards.length == 2) {
      // loop on elements in array with open elements
      for (const openCard of listOpenCards) {
        // set variables which handle these two elements from array with open span elements
        let openCard1 = openCard[0];
        let openCard2 = openCard[1];

        // check if these two elements have the same class name
        if (
          openCard1.nextSibling.className === openCard2.nextSibling.className
        ) {
          // add to siblings of these elements transform of property rotate - this animate these elements
          openCard1.nextSibling.style.transform = "rotate(360deg)";
          openCard2.nextSibling.style.transform = "rotate(360deg)";

          // add to siblings of these elements class mame 'matched'
          openCard1.nextSibling.className += " matched";
          openCard2.nextSibling.className += " matched";

          // remove from these elements class name 'open'
          openCard1.classList.remove("open");
          openCard2.classList.remove("open");

          // add to array with matched elements these two elements
          listMatchedCards.length = listMatchedCards.length + 2;

          // reset quantity of elements in array with open elements to 0
          listOpenCards.length = 0;

          // check if the user got all the matches, if so, call function to finish the game
          if (listMatchedCards.length == 16) {
            finishGame();
          }
        } else {

          // if these two elements haven't the same class change the class name of previous sibling element of these elements for 'lid' after 550 miliseconds
          setTimeout(function() {
            openCard1.className = "lid";
            openCard2.className = "lid";
          }, 600);

          // reset quantity of elements in array with open elements to 0
          listOpenCards.length = 0;
        }
      }
    }
  }
}

// click counter function
function clicksCounter() {

  // counting clicks in cards
  clicks = clicks + 1;
  counterBox.innerHTML = "Moves: " + clicks;

  // remove event listener 'click' for function timerGameStart
  if (clicks == 1) {
    for (let i = 0; i < clickedCard.length; i++) {
      clickedCard[i].removeEventListener("click", timerGameStart, false);
    }
  }
}

// stars rating function
function rating() {
  if (clicks <= 24) {
    stars.innerHTML =
      'Star rating: <i class="star1">*</i><i class="star2">*</i><i class="star3">*</i>';
  } else if (clicks > 24 && clicks < 36) {
    stars.innerHTML =
      'Star rating: <i class="star1">*</i><i class="star2">*</i>';
  } else if (clicks > 36) {
    stars.innerHTML = 'Star rating: <i class="star1">*</i>';
  }
}

// function that starts timer on the first click
function timerGameStart() {
  setInterval("count()", 1000);
}

// function that stops timer on win/reset
function timerGameStop() {
  timerStart == false;
}

// function that counts time
function count() {
  if (timerStart == true) {
    s.value = s;
    m.value = m;
    s++;
    if (s == 60) {
      m++;
      s = 0;
    }
  } else {
    s = 0;
    m = 0;
  }
  timer.innerHTML = "Time: " + m + " min " + s + " sec";
}

// restart function
function reload() {
  window.location.reload();
  arrayList[0].forEach(game);
}

// add event listener 'click' to element which is handle in variable with name 'restart' which call to function reload
restart.addEventListener("click", reload, false);

// displays popup window after you win the game
function finishGame() {

  // variables that handle current game time and stars
  let gameTime = m + " min " + s + " sec";
  let gameRating = stars.innerHTML;

  // don't display ul list with cards
  ulList.style.display = "none";

  // display popup window with information about scores
  modal.style.visibility = "visible";
  header.style.visibility = "hidden";
  infoText.innerHTML = "Matched photos!";
  modal.innerHTML =
    '<p><span class="modal-title">Congratulations!</span><br><br><span class="score">Your score:</span><br><br>Time: ' +
    gameTime +
    "<br>" +
    gameRating +
    "<br>Moves: " +
    clicks +
    '<br><br><button id="next-game">Play again?</button></p>';

  // stops the timer and sets it back to 0
  timerStart = false;
  timer.innerHTML = "Time: 0 min 0 sec";

  // sets variable next-game which handle button with id nextGame and adds event listener on click
  nextGame = document.getElementById("next-game");
  nextGame.addEventListener("click", reload, false);
}
