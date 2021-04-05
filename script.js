//Class of the calculator containing properties and different methods
class Calculator {
	constructor(previousOperandText, currentOperandText) {
		this.previousOperandText = previousOperandText;
		this.currentOperandText = currentOperandText;
		this.clear()
	}
     //This method is called when the All Clear button is clicked
	clear() {
      this.previousOperand = ''
      this.currentOperand = ''
      this.operation = undefined
	}
     
     //This method is called when the Delete button is clicked
	delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
     
     //This method is called when the number button is clicked, it appends a new number to the current operand
	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return
       this.currentOperand = this.currentOperand.toString() + number.toString();
	}
     
     //This method is called when an operation button is clicked
	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute(); 
		}
       this.operation = operation;
       this.previousOperand = this.currentOperand;
       this.currentOperand = ''
	}
    //This method is called in the above method to compute the calculation depending on the operation.
	compute() {
       let computation;
       const prev = parseFloat(this.previousOperand);
       const current = parseFloat(this.currentOperand);
       if (isNaN(prev) || isNaN(current)) return

       	switch(this.operation) {
       		case '+':
       		computation = prev + current
       		break
       		case '-':
       		computation = prev - current
       		break
       		case '*':
       		computation = prev * current
       		break
       		case '/':
       		computation = prev / current
       		break
       		default:
       		return
       	}
       	this.currentOperand = computation;
       	this.operation = undefined;
       	this.previousOperand = '';
	}
      //This method is used to write decimal numbers on te calculator
	getDisplayNumber(number) {
         const stringNumber = number.toString();
         const integerDigits = parseFloat(stringNumber.split('.')[0])
         const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		if (isNaN(integerDigits)) {
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
	}
    
    //This method is used to updatet the display 
	updateDisplay() {
       this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
         if (this.operation != null) {
             this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
         } else {
         	this.previousOperandText.innerText = '';
         }

      
	}
}
   //Application selectors

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

//Application Event Listeners

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	});
});


operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	});
});

equalsButton.addEventListener('click', () => {
	calculator.compute();
	calculator.updateDisplay()
});

allClearButton.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay()
});

deleteButton.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay()
});
