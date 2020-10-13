// Выбираем все кнопки на странице и получаем массив
const btns = document.querySelectorAll("button");
const answer = document.getElementsByClassName("answer")[0];
const equal = document.getElementsByClassName("equal")[0];
let result = 0;
let newCalc = true;
const MAXTEXTLENGTH = 14;

const isNumber = function (char) {
  return Number.isInteger(Number.parseInt(char));
};

// Проходим по массиву
btns.forEach(function (btn) {
  // Вешаем событие клик
  btn.addEventListener("click", function (e) {
    const currentValue = e.target.value;
    if (
      answer.textContent.length === MAXTEXTLENGTH &&
      currentValue !== "back" &&
      currentValue !== "=" &&
      currentValue !== "ac" &&
      !newCalc
    ) {
      return;
    }
    //проверим не число ли введено
    if (isNumber(currentValue)) {
      numberFunction(currentValue);
      newCalc = false;
    } else if (currentValue === "back") {
      answer.textContent =
        answer.textContent.length === 1 ? "0" : answer.textContent.slice(0, -1);

    } else if (currentValue === "ac") {
      answer.textContent = "0";
      newCalc = true;
    } else if (currentValue === "%") {
      answer.textContent = result / 100;
    } else if (currentValue === "=") {
      answer.textContent = String(eval(answer.textContent)).slice(0, MAXTEXTLENGTH);
      newCalc = true;
    } else if (currentValue === "ex") {
      console.log(currentValue);
    } else if (currentValue === ".") {
      const lastDote = answer.textContent.lastIndexOf(".");
      const lastPlus = answer.textContent.lastIndexOf("+");
      const lastMinus = answer.textContent.lastIndexOf("-");
      const lastDivid = answer.textContent.lastIndexOf("/");
      const lastMulti = answer.textContent.lastIndexOf("*");
      const maxPositionSymbol = Math.max(lastPlus, lastMinus, lastDivid, lastMulti);

      if (maxPositionSymbol === answer.textContent.length - 1) {
        answer.textContent += "0" + currentValue;
      }
      else if (maxPositionSymbol >= lastDote) {
       answer.textContent += currentValue;  
       }
    } else {
      const lastSymbol = answer.textContent[answer.textContent.length - 1];

      if (isNumber(lastSymbol)) {
        answer.textContent += currentValue;
      }
    }
    writeEqual();
  });
});

const numberFunction = function (number) {
  answer.textContent = answer.textContent === "0" ? "" : answer.textContent;
  answer.textContent = newCalc ? number : answer.textContent + number;
};

const writeEqual = function () {
  const lastSymbol = answer.textContent[answer.textContent.length - 1];

  if (isNumber(lastSymbol)) {
    equal.textContent = "= " + eval(answer.textContent);
  }
};
