let timer = 10;

// Utilities

const random = (length) => Math.floor(Math.random() * length);

const uniqueId = () => Math.random().toString(36).substr(2, 9);

const randomize = (array) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

// Sentences

const pickSentences = () => {
  let picked = [];
  picked.push(SENTENCES["bad"][random(SENTENCES["bad"].length)]);
  picked.push(SENTENCES["bad"][random(SENTENCES["bad"].length)]);
  picked.push(SENTENCES["good"][random(SENTENCES["good"].length)]);
  picked.push(SENTENCES["good"][random(SENTENCES["good"].length)]);
  return picked;
};

const checkboxTemplate = (sentence) => {
  const id = uniqueId();
  return `<label for="option-${id}" aria-hidden="true" class="flex mt-1">
               <input type="checkbox" name="traps[]" id="option-${id}" aria-hidden="true" class="mt-1 mr-1"  value="${sentence}"/>
                ${sentence}
            </label>`;
};

const validateForm = () => {
  let traps = document.querySelectorAll('[name="traps[]"]:checked');
  if (traps.length != 2) {
    return false;
  }
  let validates = [...traps].filter((e) =>
    SENTENCES.good.some((goodSentence) => goodSentence === e.value)
  );
  console.log(validates);
  if (validates.length != 2) {
    return false;
  }

  return true;
};

// INIT

const init = () => {
  randomize(pickSentences()).map((sentence) => {
    let el = document.createElement("span");
    el.innerHTML = checkboxTemplate(sentence);
    document.getElementsByClassName("js-options")[0].appendChild(el);
  });
};

init();

document.getElementById("submit-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateForm()) {
    alert("¡Pardiez! Un humano");
  } else {
    alert("Aléjate de mi infesto bot");
  }
});

let interval = setInterval(() => {
  timer--;
  if (timer == 5) {
    document.getElementById("countdown").classList.add("countdown-danger");
  }
  document.getElementById("countdown-digit").innerHTML = timer;
}, 1000);

setTimeout(() => {
  clearInterval(interval);
  document.querySelector("button.validate").disabled = true;
}, 10000);
