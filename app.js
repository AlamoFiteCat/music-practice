// [Global Variables]
let currentTempo = 0;

const click1 = new Audio('click1.mp3');
const click2 = new Audio('click2.mp3');

let beatsPerMesure = 4;
let count = 0;
let metronome;
let firstBeat = true;
let chordId = 0;
let previousChordId = 0;

const tempoInput = document.querySelector('.tempo-input');
const tempoUp = document.querySelector('.btn-up');
const tempoDown = document.querySelector('.btn-down');
const playBtn = document.querySelector('.btn-play');
const stopbtn = document.querySelector('.btn-stop');
const leftChord = document.querySelector('#left-chord');
const rightChord = document.querySelector('#right-chord');

const chordBook = [
  { id: 0, chord: 'Cmaj7' },
  { id: 1, chord: 'Dmaj7' },
  { id: 2, chord: 'Emaj7' },
  { id: 3, chord: 'Fmaj7' },
  { id: 4, chord: 'Gmaj7' },
  { id: 5, chord: 'Amaj7' },
  { id: 6, chord: 'Bmaj7' },
  { id: 7, chord: 'Cmin' },
  { id: 8, chord: 'Dmin' },
  { id: 9, chord: 'Emin' },
  { id: 10, chord: 'Fmin' },
  { id: 11, chord: 'Gmin' },
  { id: 12, chord: 'Amin' },
  { id: 13, chord: 'Bmin' },
  { id: 14, chord: 'C7' },
  { id: 15, chord: 'D7' },
  { id: 16, chord: 'E7' },
  { id: 17, chord: 'F7' },
  { id: 18, chord: 'G7' },
  { id: 19, chord: 'A7' },
  { id: 20, chord: 'B7' },
  { id: 21, chord: 'Cmin7' },
  { id: 22, chord: 'Dmin7' },
  { id: 23, chord: 'Emin7' },
  { id: 24, chord: 'Fmin7' },
  { id: 25, chord: 'Gmin7' },
  { id: 26, chord: 'Amin7' },
  { id: 27, chord: 'Bmin7' },
  { id: 28, chord: 'C°' },
  { id: 29, chord: 'D°' },
  { id: 30, chord: 'E°' },
  { id: 31, chord: 'F°' },
  { id: 32, chord: 'G°' },
  { id: 33, chord: 'A°' },
  { id: 34, chord: 'B°' },
  { id: 35, chord: 'Cø' },
  { id: 36, chord: 'Dø' },
  { id: 37, chord: 'Eø' },
  { id: 38, chord: 'Fø' },
  { id: 39, chord: 'Gø' },
  { id: 40, chord: 'Aø' },
  { id: 41, chord: 'Bø' },
  { id: 42, chord: 'C7 #11' },
  { id: 43, chord: 'D7 #11' },
  { id: 44, chord: 'E7 #11' },
  { id: 45, chord: 'F7 #11' },
  { id: 46, chord: 'G7 #11' },
  { id: 47, chord: 'A7 #11' },
  { id: 48, chord: 'B7 #11' },
  { id: 49, chord: 'C7 b9b13' },
  { id: 50, chord: 'D7 b9b13' },
  { id: 51, chord: 'Eb7 9b13' },
  { id: 52, chord: 'Fb7 9b13' },
  { id: 53, chord: 'Gb7 9b13' },
  { id: 54, chord: 'Ab7 9b13' },
  { id: 55, chord: 'Bb7 9b13' },
  { id: 56, chord: 'Db maj7' },
  { id: 57, chord: 'Eb maj7' },
  { id: 58, chord: 'Fb maj7' },
  { id: 59, chord: 'Gb maj7' },
  { id: 60, chord: 'Ab maj7' },
  { id: 61, chord: 'Bb maj7' },
  { id: 62, chord: 'Db min' },
  { id: 63, chord: 'Eb min' },
  { id: 64, chord: 'Fb min' },
  { id: 65, chord: 'Gb min' },
  { id: 66, chord: 'Ab min' },
  { id: 67, chord: 'Bb min' },
  { id: 68, chord: 'Cb7' },
  { id: 69, chord: 'Db7' },
  { id: 70, chord: 'Eb7' },
  { id: 71, chord: 'Fb7' },
  { id: 72, chord: 'Gb7' },
  { id: 73, chord: 'Ab7' },
  { id: 74, chord: 'Bb7' },
  { id: 75, chord: 'Cb min7' },
  { id: 76, chord: 'Db min7' },
  { id: 77, chord: 'Eb min7' },
  { id: 78, chord: 'Fb min7' },
  { id: 79, chord: 'Gb min7' },
  { id: 80, chord: 'Ab min7' },
  { id: 81, chord: 'Bb min7' },
  { id: 82, chord: 'Cb°' },
  { id: 83, chord: 'Db°' },
  { id: 84, chord: 'Eb°' },
  { id: 85, chord: 'Fb°' },
  { id: 86, chord: 'Gb°' },
  { id: 87, chord: 'Ab°' },
  { id: 88, chord: 'Bb°' },
  { id: 89, chord: 'Cbø' },
  { id: 90, chord: 'Dbø' },
  { id: 91, chord: 'Ebø' },
  { id: 92, chord: 'Fbø' },
  { id: 93, chord: 'Gbø' },
  { id: 94, chord: 'Abø' },
  { id: 95, chord: 'Bbø' },
  { id: 96, chord: 'Cb7 #11' },
  { id: 97, chord: 'Db7 #11' },
  { id: 98, chord: 'Eb7 #11' },
  { id: 99, chord: 'Fb7 #11' },
  { id: 100, chord: 'Gb7 #11' },
  { id: 101, chord: 'Ab7 #11' },
  { id: 102, chord: 'Bb7 #11' },
  { id: 103, chord: 'Cb7 b9b13' },
  { id: 104, chord: 'Db7 b9b13' },
  { id: 105, chord: 'Eb7 b9b13' },
  { id: 106, chord: 'Fb7 b9b13' },
  { id: 107, chord: 'Gb7 b9b13' },
  { id: 108, chord: 'Ab7 b9b13' },
  { id: 109, chord: 'Bb7 b9b13' },
];

// initial setup
stopbtn.disabled = true;
tempoUp.disabled = false;
tempoDown.disabled = false;
tempoInput.value = 120;

// [Event Listeners]

playBtn.addEventListener('click', () => {
  const bpm = parseInt(tempoInput.value);

  playBtn.disabled = true;
  stopbtn.disabled = false;
  tempoUp.disabled = true;
  tempoDown.disabled = true;

  metronome = new Timer(playClick, 60000 / bpm, {
    immediate: true,
  });
  metronome.start();
});

stopbtn.addEventListener('click', () => {
  playBtn.disabled = false;
  stopbtn.disabled = true;
  tempoUp.disabled = false;
  tempoDown.disabled = false;
  count = 0;
  metronome.stop();
});

tempoUp.addEventListener('click', () => {
  let val = parseInt(tempoInput.value);
  val += 5;
  tempoInput.value = val;
});
tempoDown.addEventListener('click', () => {
  let val = parseInt(tempoInput.value);
  val -= 5;
  tempoInput.value = val;
});

// [Functions]

/**
 * Function that starts the metronome.
 */
function playClick() {
  if (count === beatsPerMesure) {
    count = 0;
  }
  if (count === 0) {
    click2.play();
    drawChordOnScreen();
  } else {
    click1.play();
  }
  count++;
}

/**
 * A function that will write the chords on the screen, randomized.
 */

function drawChordOnScreen() {
  chordId = Math.floor(Math.random() * 109);
  const chordToDraw = chordBook[chordId];

  if (firstBeat) {
    rightChord.innerHTML = chordToDraw.chord;
    previousChordId = chordId;
    firstBeat = false;
  } else {
    rightChord.innerHTML = chordToDraw.chord;
    const previousChord = chordBook[previousChordId];
    leftChord.innerHTML = previousChord.chord;
    previousChordId = chordId;
  }

}

/**
 * Constructor function that creates the metronome. It's self repairing for drift.
 */
function Timer(callback, timeInterval, options) {
  this.timeInterval = timeInterval;

  // Add method to start timer
  this.start = () => {
    // Set the expected time. The moment in time we start the timer plus whatever the time interval is.
    this.expected = Date.now() + this.timeInterval;
    // Start the timeout and save the id in a property, so we can cancel it later
    this.theTimeout = null;

    if (options.immediate) {
      callback();
    }

    this.timeout = setTimeout(this.round, this.timeInterval);
    console.log('Timer Started');
  };
  // Add method to stop timer
  this.stop = () => {
    clearTimeout(this.timeout);
    console.log('Timer Stopped');
  };
  // Round method that takes care of running the callback and adjusting the time
  this.round = () => {
    console.log('timeout', this.timeout);
    // The drift will be the current moment in time for this round minus the expected time..
    let drift = Date.now() - this.expected;
    // Run error callback if drift is greater than time interval, and if the callback is provided
    if (drift > this.timeInterval) {
      // If error callback is provided
      if (options.errorCallback) {
        options.errorCallback();
      }
    }
    callback();
    // Increment expected time by time interval for every round after running the callback function.
    this.expected += this.timeInterval;
    console.log('Drift:', drift);
    console.log('Next round time interval:', this.timeInterval - drift);
    // Run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift.
    this.timeout = setTimeout(this.round, this.timeInterval - drift);
  };
}
