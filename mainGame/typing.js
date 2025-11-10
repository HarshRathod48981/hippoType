// ===============================
// Typing Game Logic - HippoType
// ===============================

// Word source: long list of random words for variety
const words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');
const wordsCount = words.length;

// Game runs for 10 seconds
const gameTime = 10 * 1000;

// Globals for timer tracking
let timer = null;
let gameStart = null;

// -----------------------
// Helper Functions
// -----------------------
function addClass(el, name) {
  el.classList.add(name);
}

function removeClass(el, name) {
  el.classList.remove(name);
}

function randomWord() {
  return words[Math.floor(Math.random() * wordsCount)];
}

function formatWord(word) {
  // Each word is split into span.letter for per-letter styling
  return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

// -----------------------
// Start a New Game
// -----------------------
function newGame() {
  const gameDiv = document.getElementById('game');
  gameDiv.classList.remove('over');
  gameDiv.focus(); // Keep typing box focused

  // Reset all text
  const wordsDiv = document.getElementById('words');
  wordsDiv.innerHTML = '';
  for (let i = 0; i < 200; i++) {
    wordsDiv.innerHTML += formatWord(randomWord());
  }

  // Highlight first word and first letter
  addClass(document.querySelector('.word'), 'current');
  addClass(document.querySelector('.letter'), 'current');

  // Reset timer and text
  document.getElementById('info').innerHTML = gameTime / 1000;
  clearInterval(timer);
  timer = null;
  gameStart = null; // ✅ Important: fixes timer bug
  document.getElementById('words').style.marginTop = '0px'; // reset scroll

  // ✅ Move cursor to first letter instantly
  const cursor = document.getElementById('cursor');
  const firstLetter = document.querySelector('.letter.current');
  if (firstLetter) {
    const rect = firstLetter.getBoundingClientRect();
    cursor.style.top = rect.top + 2 + 'px';
    cursor.style.left = rect.left + 'px';
  }
}

// -----------------------
// Calculate WPM (Words Per Minute)
// -----------------------
function getWpm() {
  const allWords = [...document.querySelectorAll('.word')];
  const lastTypedWord = document.querySelector('.word.current');
  const lastIndex = allWords.indexOf(lastTypedWord) + 1;

  const typedWords = allWords.slice(0, lastIndex);
  const correct = typedWords.filter(word => {
    const letters = [...word.children];
    const incorrectLetters = letters.filter(l => l.classList.contains('incorrect'));
    return incorrectLetters.length === 0;
  });

  return Math.round((correct.length / gameTime) * 60000);
}

// -----------------------
// End Game and Show Results
// -----------------------
function gameOver() {
  clearInterval(timer);
  addClass(document.getElementById('game'), 'over');

  // Calculate WPM
  const wpm = getWpm();

  // Calculate Accuracy
  const allLetters = document.querySelectorAll('.letter.correct, .letter.incorrect');
  const correctLetters = document.querySelectorAll('.letter.correct');
  const accuracy = allLetters.length > 0
    ? ((correctLetters.length / allLetters.length) * 100).toFixed(1)
    : 0;

  // Show Results
  document.getElementById('info').innerHTML = `WPM: ${wpm} | Accuracy: ${accuracy}%`;

  // Save result to localStorage leaderboard
  const username = localStorage.getItem("loggedInUser");
  if (username) {
    const date = new Date().toISOString().split("T")[0];
    let leaderboard = JSON.parse(localStorage.getItem("leaderboardData")) || [];
    leaderboard.push({ username, wpm, accuracy, date });
    localStorage.setItem("leaderboardData", JSON.stringify(leaderboard));
  }
}

// -----------------------
// Typing Logic (Main Event)
// -----------------------
document.getElementById('game').addEventListener('keyup', ev => {
  const key = ev.key;
  const currentWord = document.querySelector('.word.current');
  const currentLetter = document.querySelector('.letter.current');
  const expected = currentLetter?.innerHTML || ' ';
  const isLetter = key.length === 1 && key !== ' ';
  const isSpace = key === ' ';
  const isBackspace = key === 'Backspace';
  const isFirstLetter = currentLetter === currentWord?.firstChild;

  if (document.querySelector('#game.over')) return;

  // Start timer on first key press
  if (!timer && isLetter) {
    timer = setInterval(() => {
      if (!gameStart) gameStart = Date.now();
      const elapsed = Date.now() - gameStart;
      const secondsLeft = Math.round((gameTime - elapsed) / 1000);
      if (secondsLeft <= 0) return gameOver();
      document.getElementById('info').innerHTML = secondsLeft;
    }, 1000);
  }

  // Typing letters
  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
      removeClass(currentLetter, 'current');
      if (currentLetter.nextSibling) addClass(currentLetter.nextSibling, 'current');
    }
  }

  // Space pressed → move to next word
  if (isSpace) {
    removeClass(currentWord, 'current');
    addClass(currentWord.nextSibling, 'current');
    if (currentLetter) removeClass(currentLetter, 'current');
    addClass(currentWord.nextSibling.firstChild, 'current');
  }

  // Handle Backspace
  if (isBackspace && currentLetter) {
    const prev = currentLetter.previousSibling;
    if (prev) {
      removeClass(currentLetter, 'current');
      addClass(prev, 'current');
      removeClass(prev, 'incorrect');
      removeClass(prev, 'correct');
    }
  }

  // Move cursor position with next letter
  const nextLetter = document.querySelector('.letter.current');
  const nextWord = document.querySelector('.word.current');
  const cursor = document.getElementById('cursor');
  const rect = (nextLetter || nextWord).getBoundingClientRect();
  cursor.style.top = rect.top + 2 + 'px';
  cursor.style.left = rect[nextLetter ? 'left' : 'right'] + 'px';
});

// -----------------------
// Restart Button
// -----------------------
document.getElementById('newGameBtn').addEventListener('click', () => {
  clearInterval(timer); // stop running timer
  newGame();             // restart clean
});

// -----------------------
// Initialize Game
// -----------------------
newGame();