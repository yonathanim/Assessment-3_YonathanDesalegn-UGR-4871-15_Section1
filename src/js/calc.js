class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.buttons = document.querySelectorAll('.btn');
        this.displayValue = '';
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButton(button));
        });
    }

    handleButton(button) {
        const value = button.dataset.value;

        if (button.id === 'clear') {
            this.clear();
        } else if (button.id === 'equals') {
            this.calculate();
        } else {
            this.appendValue(value);
        }
    }

    appendValue(value) {
        // Prevent multiple operators in a row
        const lastChar = this.displayValue.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value)) {
            this.displayValue = this.displayValue.slice(0, -1) + value;
        } else {
            this.displayValue += value;
        }
        this.updateDisplay();
    }

    calculate() {
        try {
            // Replace any invalid expressions
            if (['+', '-', '*', '/'].includes(this.displayValue.slice(-1))) {
                this.displayValue = this.displayValue.slice(0, -1);
            }
            
            // Safely evaluate the expression
            let result = Function('return ' + this.displayValue)();
            
            // Handle division by zero
            if (!isFinite(result)) {
                this.displayValue = 'Error';
            } else {
                // Round to prevent floating point issues
                result = Math.round(result * 1000000) / 1000000;
                this.displayValue = result.toString();
            }
        } catch (error) {
            this.displayValue = 'Error';
        }
        this.updateDisplay();
    }

    clear() {
        this.displayValue = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.displayValue || '0';
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
}); 