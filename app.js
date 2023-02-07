const passwordDisplay = document.querySelector(".password");
const copyButton = document.querySelector(".btn-one");
const charCount = document.querySelector(".char-length");
const charSlider = document.querySelector("input[type=range]");
const uppercaseLetters = document.getElementById("chk1");
const lowercaseLetters = document.getElementById("chk2");
const incluceNumbers = document.getElementById("chk3");
const includeSymbols = document.getElementById("chk4");
const form = document.querySelector("#passwordGeneratorForm");
const strengthValue = document.querySelector(".value");
const generateButton = document.querySelector(".generator");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const value3 = document.getElementById("value3");
const value4 = document.getElementById("value4");
const indicatorValue = document.querySelector(".indicator-value");

charSlider.addEventListener("input", syncCharacterAmount);
function syncCharacterAmount(e) {
  const value = e.target.value;
  charSlider.value = value;
  charCount.innerHTML = value;
  const min = charSlider.min;
  const max = charSlider.max;
  const val = charSlider.value;

  charSlider.style.backgroundSize =
    ((val - min) * 100) / (max - min) + "% 100%";
}

const uppercaseCharCode = arrayFromLowToHigh(65, 90);
const lowercaseCharCode = arrayFromLowToHigh(97, 122);
const numbersCharCode = arrayFromLowToHigh(48, 57);
const symbolsCharCode = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const checkboxCount = document.querySelectorAll(
    "input[type=checkbox]:checked"
  ).length;
  let characterLength = Math.floor(charSlider.value / 4);
  const total = characterLength + checkboxCount;
  indicatorValue.style.visibility = "visible";
  if (total <= 3) {
    indicatorValue.innerText = "Too Weak";
    value1.className = "status-too-weak";
    value2.className = "";
    value3.className = "";
    value4.className = "";
  } else if (total < 5) {
    indicatorValue.innerText = "Weak";
    value1.className = "status-weak";
    value2.className = "status-weak";
    value3.className = "";
    value4.className = "";
  } else if (total < 6) {
    indicatorValue.innerText = "Medium";
    value1.className = "status-medium";
    value2.className = "status-medium";
    value3.className = "status-medium";
    value4.className = "";
  } else {
    indicatorValue.innerText = "Strong";
    value1.className = "status-strong";
    value2.className = "status-strong";
    value3.className = "status-strong";
    value4.className = "status-strong";
  }
  console.log(total);
  if (
    !uppercaseLetters.checked &&
    !lowercaseLetters.checked &&
    !incluceNumbers.checked &&
    !includeSymbols.checked
  ) {
    alert("Please select at least one checkbox.");
    return;
  }

  const characterAmount = charSlider.value;
  const uppercase = uppercaseLetters.checked;
  const lowercase = lowercaseLetters.checked;
  const numbers = incluceNumbers.checked;
  const symbols = includeSymbols.checked;
  const password = generatePassword(
    characterAmount,
    uppercase,
    lowercase,
    numbers,
    symbols
  );
  passwordDisplay.innerText = password;

  console.log(password);
});

function generatePassword(
  characterAmount,
  uppercase,
  lowercase,
  numbers,
  symbols
) {
  let charCodes = [];
  if (lowercase) charCodes = charCodes.concat(lowercaseCharCode);
  if (uppercase) charCodes = charCodes.concat(uppercaseCharCode);
  if (numbers) charCodes = charCodes.concat(numbersCharCode);
  if (symbols) charCodes = charCodes.concat(symbolsCharCode);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

const copyBtn = document.querySelector(".copy-icon");
const alertText = document.querySelector(".copy-alert");
copyBtn.addEventListener("click", () => {
  const copyText = passwordDisplay.innerText;
  navigator.clipboard.writeText(copyText).then(
    () => {
      alertText.classList.add("show-copy-alert");
      setTimeout(() => {
        alertText.classList.remove("show-copy-alert");
      }, 1500);
    },
    () => {
      alert("Copy failed.");
    }
  );
});
