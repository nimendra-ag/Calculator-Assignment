class Calculator {
    constructor() {
      this.result = 0;
    }
  
    add(num) {
      this.result += num;
      return this;
    }
  
    subtract(num) {
      this.result -= num;
      return this;
    }
  
    multiply(num) {
      this.result *= num;
      return this;
    }
  
    divide(num) {
      if (num !== 0) {
        this.result /= num;
      } else {
        console.log("Error: Division by zero");
      }
      return this;
    }
  
    clear() {
      this.result = 0;
      return this;
    }
  
    getResult() {
      return this.result;
    }
  }
  
  // Usage
  let calculator = new Calculator();
  
  let result = calculator.add(5).multiply(3).subtract(10).divide(2).getResult();
  console.log(result); // Output: 5
  
  calculator.clear();
  result = calculator.add(10).divide(0).getResult();
  console.log(result); // Output: Error: Division by zero
  