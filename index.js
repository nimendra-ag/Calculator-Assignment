class Calculator {
  constructor() {
    this.result = 0;
    this.operationQueue = [];
    this.entryText = "";
  }

  updateEntry(){
    for(let i = 0; i<this.operationQueue.length; i++){
      this.entryText += this.operationQueue[i];
    }
    document.getElementById("entry").value = this.entryText;
    // console.log(this.entryText);
  }

  number(num) {
    this.operationQueue.push(num);
    this.updateEntry();
    return this;
  }

  add() {
    this.operationQueue.push("+");
    this.updateEntry();
    return this;
  }

  subtract() {
    this.operationQueue.push("-");
    this.updateEntry();
    return this;
  }

  multiply() {
    this.operationQueue.push("*");
    this.updateEntry();
    return this;
  }

  divide() {
    this.operationQueue.push("/");
    this.updateEntry();
    return this;
  }

  

  applyBodmas(){
    for(let i = 0; i<this.operationQueue.length; i++){
        console.log("round", i);
      if(this.operationQueue[i] == "*"|| this.operationQueue[i] == "/"){
        var numberToBeReplaced = this.performOperation(this.operationQueue[i-1], this.operationQueue[i], this.operationQueue[i+1])
        console.log(this.operationQueue);
          this.operationQueue[i] = numberToBeReplaced;
        console.log(this.operationQueue);
        this.operationQueue.splice(i+1, 1);
          console.log(this.operationQueue);
        this.operationQueue.splice(i-1, 1);
          console.log(this.operationQueue);
      }
    }
      // console.log(this.operationQueue);
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

var number_1 = document.getElementById("number_1");

number_1.addEventListener("click", () => {
  calculator.number(1);
  // document.getElementById("entry").value = 1;
})

// let result = calculator.number(5).multiply().number(10).divide().number(5).applyBodmas().calculate().getResult();
// console.log(result); // Output: -1.5


// calculator.clear();
// result = calculator.number(4).applyBodmas().calculate().getResult();
// console.log(result); // Output: 18

