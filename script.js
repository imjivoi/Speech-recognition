const listenBtn = document.querySelector(".btn__toggle");
const txtArea = document.getElementById("text");
const recognizer = new webkitSpeechRecognition();
const clear = document.querySelector("#clear");
let recognizing;

recognizer.interimResults = true;

recognizer.continuous = true;

recognizer.lang = "ru-RU";

recognizer.continuous = true;

reset();
recognizer.onend = reset;

recognizer.onresult = function (event) {
  let result = event.results[event.resultIndex];
  if (result.isFinal) {
    txtArea.value += result[0].transcript + " ";
  } else {
    console.log("Промежуточный результат: ", result[0].transcript);
  }
};

function reset() {
  recognizing = false;
  listenBtn.innerText = "Click to Start";
}

listenBtn.addEventListener("click", () => {
  if (recognizing) {
    recognizer.stop();
    reset();
  } else {
    recognizer.start();
    recognizing = true;
    listenBtn.innerText = "Click to Stop";
  }
  listenBtn.classList.toggle("red");
});

clear.addEventListener("click", () => {
  txtArea.value = "";
});
