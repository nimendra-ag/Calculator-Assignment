class Calculator {
  constructor() {
    this.result = 0;
    this.operationQueue = [];
  }

  number(num) {
    this.operationQueue.push(num);
    return this;
  }

  add() {
    this.operationQueue.push("+");
    return this;
  }

  subtract() {
    this.operationQueue.push("-");
    return this;
  }

  multiply() {
    this.operationQueue.push("*");
    return this;
  }

  divide() {
    this.operationQueue.push("/");
    return this;
  }

  calculate() {
    let currentResult = 0;
    let currentOperator = null;

    for (let i = 0; i < this.operationQueue.length; i++) {
      const item = this.operationQueue[i];

      if (typeof item === "number") {
        if (currentOperator === null) {
          currentResult = item;
        } else {
          currentResult = this.performOperation(currentResult, currentOperator, item);
          currentOperator = null;
        }
      } else {
        currentOperator = item;
      }
    }

    this.result = currentResult;
    this.operationQueue = [];
    return this;
  }

  performOperation(num1, operator, num2) {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return 0;
    }
  }

  clear() {
    this.result = 0;
    this.operationQueue = [];
    return this;
  }

  getResult() {
    return this.result;
  }
}

let calculator = new Calculator();

let result = calculator.number(5).multiply(3).subtract(10).divide(2).calculate().getResult();
console.log(result); // Output: -1.5

calculator.clear();
result = calculator.number(4).add().number(2).multiply(3).calculate().getResult();
console.log(result); // Output: 18

