class Calculator {
  constructor() {
    this.result = 0;
    this.operationQueue = [];
    this.entryText = "";
    this.IdArray = ["button_1", "button_2", "button_3", "button_=", "button_-"]
  }

  setNegativeValue(){
    for (let i = 0; i < this.operationQueue.length; i++){
      if (this.operationQueue[i] === "-"){
        if(i == 0 || typeof this.operationQueue[i-1] != "number"){
          this.operationQueue[i] = -(this.operationQueue[i+1]);
          this.operationQueue.splice(i+1, 1);
          console.log(this.operationQueue);
        }
      }
    }
    
  }
  reciprocal(){
    this.setTheQue();
    this.setDecimalPoints();
    this.operationQueue[0] = 1/this.operationQueue[0];
    this.updateEntry();
    return this;
  }

  setDecimalPoints() {
    for (let i = 0; i < this.operationQueue.length; i++) {
      if (this.operationQueue[i] === "."){
        var numberOfDigits = this.operationQueue[i+1].toString().length;
        this.operationQueue[i-1] += this.operationQueue[i+1] * Math.pow(10, -numberOfDigits);  
        this.operationQueue.splice(i+1, 1);
      this.operationQueue.splice(i, 1);
      }
      
      console.log("the operation queue: ", this.operationQueue);

    }

    // for (let i = 0; i < this.operationQueue.length; i++) {
    //   if (this.operationQueue[i] === ".") {
    //     var j = i + 1;
    //     var numberArray = [this.operationQueue[j]];
    //     j++;
    //     while (typeof this.operationQueue[j] === "number") {
    //       numberArray.push(this.operationQueue[j]);
    //       j++;
    //     }
    //     console.log("the number array: ", numberArray);

    //     var actualNumber = 0;
    //     // var lengthOfNumber = numberArray.length; 
    //     for (let k = 1; k <= numberArray.length; k++) {
    //       actualNumber += (numberArray[k]) * Math.pow(10, -k);
    //     }

    //     console.log("the actual number: ", actualNumber);
    //     this.operationQueue[i-1] = actualNumber;
    //     console.log("the operation queue: ", this.operationQueue);

    //     for (let n = j ; n > i; n--) {
    //       this.operationQueue.splice(n, 1);
    //     }
    //     console.log("the operation queue: ", this.operationQueue);

    //   }
    // }
    return this;
  }

  setTheQue() {
    for (let i = 0; i < this.operationQueue.length; i++) {
      if (typeof this.operationQueue[i] === "number" && typeof this.operationQueue[i + 1] === "number") {
        var j = i + 1;
        var numberArray = [this.operationQueue[i]];

        while (typeof this.operationQueue[j] === "number") {
          numberArray.unshift(this.operationQueue[j]);
          j++;
        }
        console.log("the number array: ", numberArray);

        var actualNumber = 0;
        // var lengthOfNumber = numberArray.length; 
        for (let k = 0; k < numberArray.length; k++) {
          actualNumber += (numberArray[k]) * Math.pow(10, k);
        }

        console.log("the actual number: ", actualNumber);
        this.operationQueue[i] = actualNumber;
        console.log("the operation queue: ", this.operationQueue);

        for (let n = j - 1; n > i; n--) {
          this.operationQueue.splice(n, 1);
        }

        console.log("the operation queue: ", this.operationQueue);
      }
    }


    return this;
  }

  updateEntry() {
    for (let i = 0; i < this.operationQueue.length; i++) {
      this.entryText += this.operationQueue[i];
    }
    document.getElementById("entry").value = this.entryText;
    // console.log(this.entryText);
    this.entryText = "";
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

  power() {
    this.operationQueue.push("^");
    this.updateEntry();
    return this;
  }

  square_root() {
    this.operationQueue.push("\u221A");
    this.updateEntry();
    return this;
  }

  addZero() {
    if (this.operationQueue.length == 0) {
      this.operationQueue.push(0);
    }

    else {
      if (typeof this.operationQueue[this.operationQueue.length - 1] === "number") {
        console.log("entered the function");
        this.operationQueue[this.operationQueue.length - 1] = (this.operationQueue[this.operationQueue.length - 1]) * 10;
      }
      console.log("the operation queue", this.operationQueue);
    }
    this.updateEntry();
    return this;
  }

  addDoubleZeros() {
    if (this.operationQueue.length != 0) {
      if (typeof this.operationQueue[this.operationQueue.length - 1] === "number") {
        console.log("entered the function");
        this.operationQueue[this.operationQueue.length - 1] = (this.operationQueue[this.operationQueue.length - 1]) * 100;
      }
      console.log("the operation queue", this.operationQueue);
    }
    this.updateEntry();
    return this;
  }

  decimalPoint(){
    this.operationQueue.push(".");
    console.log(this.operationQueue);
    this.updateEntry();
    return this;
  }


  applyBodmas() {
    this.setTheQue();
    this.setDecimalPoints();
    this.setNegativeValue();
    for (let i = 0; i < this.operationQueue.length; i++) {
      if (this.operationQueue[i] == "\u221A") {
        var numberToBeReplaced = this.performOperation(this.operationQueue[i - 1], this.operationQueue[i], this.operationQueue[i + 1]);
        this.operationQueue[i] = numberToBeReplaced;
        this.operationQueue.splice(i + 1, 1);
      }
    }

    for (let i = 0; i < this.operationQueue.length; i++) {
      if (this.operationQueue[i] == "^") {
        var numberToBeReplaced = this.performOperation(this.operationQueue[i - 1], this.operationQueue[i], this.operationQueue[i + 1]);
        console.log(this.operationQueue);
        this.operationQueue[i] = numberToBeReplaced;
        console.log(this.operationQueue);
        this.operationQueue.splice(i + 1, 1);
        console.log(this.operationQueue);
        this.operationQueue.splice(i - 1, 1);
        console.log(this.operationQueue);
      }
    }

    for (let i = 0; i < this.operationQueue.length; i++) {
      if (this.operationQueue[i] == "*" || this.operationQueue[i] == "/") {
        var numberToBeReplaced = this.performOperation(this.operationQueue[i - 1], this.operationQueue[i], this.operationQueue[i + 1]);
        this.operationQueue[i] = numberToBeReplaced;
        this.operationQueue.splice(i + 1, 1);
        this.operationQueue.splice(i - 1, 1);
      }
    }
    // console.log(this.operationQueue);
    return this;
  }
  calculate() {

    this.applyBodmas();
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
    this.entryText = this.result;
    console.log(this.result);
    document.getElementById("entry").value = this.entryText;
    // return this;
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
      case "^":
        return Math.pow(num1, num2);
      case "\u221A":
        return Math.sqrt(num2);
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

var button_1 = document.getElementById("button_1");
var button_2 = document.getElementById("button_2");
var button_3 = document.getElementById("button_3");
var button_4 = document.getElementById("button_4");
var button_5 = document.getElementById("button_5");
var button_6 = document.getElementById("button_6");
var button_7 = document.getElementById("button_7");
var button_8 = document.getElementById("button_8");
var button_9 = document.getElementById("button_9");
var button_0 = document.getElementById("button_0");
var button_00 = document.getElementById("button_00");
var button_dot = document.getElementById("button_dot");
var button_plus = document.getElementById("button_+");
var button_sqrt = document.getElementById("button_sqrt");
var button_equal = document.getElementById("button_=");
var button_minus = document.getElementById("button_-");
var button_reciprocal = document.getElementById("button_1/x");
var button_multiplication = document.getElementById("button_*");
var button_division = document.getElementById("button_/");
var button_percentage = document.getElementById("button_%");
var button_power = document.getElementById("button_power");
var button_plusorminus = document.getElementById("button_+/-");
var button_Mminus = document.getElementById("button_m-");
var button_Mplus = document.getElementById("button_m+");
var button_Mc = document.getElementById("button_mc");
var button_Mr = document.getElementById("button_mr");
var button_Ms = document.getElementById("button_ms");
var button_leftarrow = document.getElementById("button_leftarrow");
var button_ce = document.getElementById("button_ce");
var button_c = document.getElementById("button_c");


button_1.addEventListener("click", () => {
  calculator.number(1);
})

button_2.addEventListener("click", () => {
  calculator.number(2);
})

button_3.addEventListener("click", () => {
  calculator.number(3);
})

button_4.addEventListener("click", () => {
  calculator.number(4);
})

button_5.addEventListener("click", () => {
  calculator.number(5);
})

button_6.addEventListener("click", () => {
  calculator.number(6);
})

button_7.addEventListener("click", () => {
  calculator.number(7);
})

button_8.addEventListener("click", () => {
  calculator.number(8);
})

button_9.addEventListener("click", () => {
  calculator.number(9)
})

button_plus.addEventListener("click", () => {
  calculator.add()
})

button_minus.addEventListener("click", () => {
  calculator.subtract()
})

button_division.addEventListener("click", () => {
  calculator.divide()
})

button_multiplication.addEventListener("click", () => {
  calculator.multiply()
})

button_equal.addEventListener("click", () => {
  calculator.calculate();
})

button_power.addEventListener("click", () => {
  calculator.power();
})

button_sqrt.addEventListener("click", () => {
  calculator.square_root();
})

button_0.addEventListener("click", () => {
  calculator.addZero();
})

button_00.addEventListener("click", () => {
  calculator.addDoubleZeros();
})

button_dot.addEventListener("click", () => {
  calculator.decimalPoint();
})

button_reciprocal.addEventListener("click", () => {
  calculator.reciprocal();
})


// let result = calculator.number(5).multiply().number(10).divide().number(5).applyBodmas().calculate().getResult();
// console.log(result); // Output: -1.5


// calculator.clear();
// result = calculator.number(4).applyBodmas().calculate().getResult();
// console.log(result); // Output: 18

