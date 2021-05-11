document.addEventListener("DOMContentLoaded", () => {

    const display = document.getElementById('display');
    const inputKeys = document.getElementsByClassName('inputKey');

    // adds in event listeners for each input key
    for (let i = 0; i < inputKeys.length; i++) {
        inputKeys[i].onclick = () => addToExpression(inputKeys[i].value);
    }

    // deletes last entered item from the display
    document.getElementById('backspace').onclick = () => {
        display.value = (display.value == 'ERR' ? '' : display.value.substring(0, display.value.length-1));
    }

    // clears the display
    document.getElementById('clear').onclick = () => {
        display.value = '';
    }

    // validates result, rounds to 5 decimals, converts to exponential notation if needed
    document.getElementById('equals').onclick = () => {
        if(display.value == '') return;

        let result;
        try {
            result = eval(display.value);
        } catch(err) {
            console.log(err);
            display.value = "ERR";
            return;
        }
    
        if(isInvalid(result)) {
            display.value = 'ERR';
            return;
        }
        if(decimalPlaces(result) > 5) result = result.toFixed(5).trim("0");
        
        display.value = (tooLong(result) ? result.toExponential(2) : result);
    }

    // adds a new character into the expression
    function addToExpression(newVal) {
        display.value = (display.value == 'ERR' ? newVal : display.value + newVal);
    }

    // checks if a value is in indeterminate form
    function isInvalid(num) {
        return (isNaN(num) || num == undefined || num == Infinity);
    }

    // returns t/f on if a number is too long and should be converted to exponential notation
    function tooLong(num) {
        return num.toString().length >= 10;
    }

    // returns the number of decimal places
    function decimalPlaces(num) {
        return (num % 1) ? num.toString().split('.')[1].length : 0;
    }
})
