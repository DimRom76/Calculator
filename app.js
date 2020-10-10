// Выбираем все кнопки на странице и получаем массив
const btns = document.querySelectorAll("button");
const answer = document.getElementsByClassName("answer")[0];
const equal = document.getElementsByClassName("equal")[0];
let result = 0;
let newCalc = true;

const isNumber = function (char) {
  return Number.isInteger(Number.parseInt(char));
};

// Проходим по массиву
btns.forEach(function (btn) {
  // Вешаем событие клик
  btn.addEventListener("click", function (e) {
    const currentValue = e.target.value;
    if (
      answer.textContent.length === 14 &&
      currentValue !== "back" &&
      currentValue !== "=" &&
      currentValue !== "ac"
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
      answer.textContent = eval(answer.textContent);
      newCalc = true;
    } else if (currentValue === "ex") {
      console.log(currentValue);
    } else if (currentValue === ".") {
      console.log(currentValue);
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
  answer.textContent = newCalc ? number : answer.textContent + number;
};

const writeEqual = function () {
  const lastSymbol = answer.textContent[answer.textContent.length - 1];

  if (isNumber(lastSymbol)) {
    equal.textContent = "= " + eval(answer.textContent);
  }
};
