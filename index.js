let words = [
  { hint: "This is to a SOLUTION, what KEY is to a LOCK", word: "Problems" },
  {
    hint: "A programming term for set of instructions for a task",
    word: "Algorithms"
  },
  { hint: "A OTT Platform", word: "Netflix" },
  { hint: "THE GAME", word: "Hangman" },
  { hint: "Messanging and VoIP app for gamers", word: "Discord" },
  { hint: "The JAVA of HTML", word: "JavaScript" },
  { hint: "A word on this page", word: "Attempts" },
  { hint: "What are you typing from?", word: "Keyboard" },
  { hint: "Subject in which Walter White excelled in", word: "Chemistry" },
  { hint: "Subject in which Aryabhata excelled in", word: "Mathematics" },
  { hint: "Most famous video sharing platform", word: "Youtube" },
  {
    hint: "American microblogging and social networking service",
    word: "Twitter"
  },
  {
    hint: "American multimedia messaging app developed by Snap Inc.",
    word: "Snapchat"
  },
  {
    hint:
      "American photo and video sharing social networking service owned by Facebook",
    word: "Instagram"
  },
  { hint: "Music streaming platform", word: "Spotify" },
  { hint: "A month", word: "September" }
];
let index = null;
let word = null;
let attempts = null;
let score = null;
let pressed = null;
let redToBlackTimeout = null;
function onPlay(e) {
  // alert(score);
  if (attempts <= 0) return;
  let arr = document.getElementsByClassName(e.key.toUpperCase());
  if (pressed.includes(e.key.toUpperCase()) || arr.length === 0) {
    let att = document.getElementById("attempts");
    att.innerText = `${--attempts} Attempts Remaining`;
    att.style.color = "red";
    if (redToBlackTimeout) {
      clearTimeout(redToBlackTimeout);
    }
    redToBlackTimeout = setTimeout(() => {
      att.style.color = "black";
    }, 2000);
  } else {
    pressed.push(e.key.toUpperCase());
    for (let item of arr) {
      score++;
      item.value = e.key.toUpperCase();
      item.setAttribute("disabled", true);
      item.classList.remove("blank");
    }
  }
  if (attempts <= 0) {
    let inputs = document.getElementsByClassName("blank");
    for (let item of inputs) {
      item.value = item.className.split(" ")[2];
      item.setAttribute("disabled", true);
    }
    let result = document.getElementById("result");
    result.innerText = `You Lost`;
    result.style.color = "red";
    attempts = 0;
  } else if (score === word.length) {
    let result = document.getElementById("result");
    result.innerText = `You won`;
    attempts = 0;
    result.style.color = "rgb(65, 182, 65)";
  }
}
function init() {
  index = Math.floor(Math.random() * (words.length - 1));
  word = words[index].word;
  document.getElementById("hint").innerText = `Hint: ${words[index].hint}`;
  attempts = Math.floor(word.length / 2);
  score = Math.ceil(word.length / 2);
  pressed = [];
  document.getElementById("result").innerText = ``;
  document.getElementById(
    "attempts"
  ).innerText = `${attempts} Attempts Remaining`;
  let game = document.getElementById("game");
  let inputContainer = document.createElement("div");
  let show = true;
  word
    .toUpperCase()
    .split("")
    .forEach((c) => {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("class", "letter");
      input.setAttribute("answer", c);
      input.addEventListener("input", function (e) {
        e.target.value = e.target.value
          .charAt(e.target.value.length - 1)
          .toUpperCase();
      });
      if (show) {
        input.setAttribute("value", c);
        input.setAttribute("disabled", true);
      } else {
        input.classList.add("blank");
        input.classList.add(c);
      }
      show = !show;
      inputContainer.appendChild(input);
    });
  game.appendChild(inputContainer);
  document.addEventListener("keydown", onPlay);
}
init();
document.getElementById("reset").addEventListener("click", () => {
  let inputContainer = document.getElementById("game").firstElementChild;
  game.removeChild(inputContainer);
  init();
});

const onKeyClicked = (e) => {
  let fakeEvent = {
    key: e.target.innerText
  };
  onPlay(fakeEvent);
};

let keys = document.getElementById("keys");

for (let i = 0; i < 26; i++) {
  let key = document.createElement("button");
  key.innerText = String.fromCharCode("A".charCodeAt(0) + i);
  key.style.margin = "10px";
  key.onclick = onKeyClicked;
  keys.appendChild(key);
}
