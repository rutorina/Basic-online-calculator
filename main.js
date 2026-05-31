const display = document.getElementById("display");
const calculator = document.querySelector(".calculator");


calculator.addEventListener("click", (e) => {
    var lastNumber;
    switch (e.target.id) {
        case "clear":
            display.value = "";
            break;
        case "divide":
            replaceOperators("/");
            break;
        case "multiply":
            replaceOperators("*");
            break;
        case "subtract":
            replaceOperators("-");
            break;
        case "add":
            replaceOperators("+");
            break;
        case "equals":
            if (display.value === "" || display.value.endsWith("/") || display.value.endsWith("*") || display.value.endsWith("-") || display.value.endsWith("+")) {
                break;
            }
            try {
                const expression = display.value.replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-");
                const result = evaluateExpression(expression);
                display.value = result;
            } catch (error) {
                display.value = "Error";
            }
            break;
        case "decimal":
            lastNumber = display.value.split(/[\+\-\*\/]/).pop();
            if (!lastNumber.includes(".") && !display.value.endsWith("/") && !display.value.endsWith("*") && !display.value.endsWith("-") && !display.value.endsWith("+") && display.value !== "") {
                display.value += ".";
            }

            break;
        case "one":
            display.value += "1";
            break;
        case "two":
            display.value += "2";
            break;
        case "three":
            display.value += "3";
            break;
        case "four":
            display.value += "4";
            break;
        case "five":
            display.value += "5";
            break;
        case "six":
            display.value += "6";
            break;
        case "seven":
            display.value += "7";
            break;
        case "eight":
            display.value += "8";
            break;
        case "nine":
            display.value += "9";
            break;
        case "zero":
            lastNumber = display.value.split(/[\+\-\*\/]/).pop();
            if (!display.value.endsWith("/")) {
                display.value += "0";
            }
            break;
        default:
            break;

    }
});

function replaceOperators(newOperator) {

    if (display.value.endsWith("/") || display.value.endsWith("*") || display.value === "" && (newOperator === "*" || newOperator === "/")) {
        display.value += newOperator;
    }
    else if (display.value.endsWith("/") || display.value.endsWith("*") || display.value.endsWith("-") || display.value.endsWith("+")) {
        display.value = display.value.slice(0, -1);
        display.value += newOperator;
    }
    else if (display.value !== "") {
        display.value += newOperator;
    }
}

function evaluateExpression(expression) {
    const tokens = expression.match(/\d+(?:\.\d+)?|[+\-*/]/g);

    if (!tokens || tokens.join("") !== expression) {
        throw new Error("Invalid expression");
    }

    const values = [];
    const operators = [];
    const precedence = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    };

    const applyOperator = () => {
        const operator = operators.pop();
        const right = values.pop();
        const left = values.pop();

        if (left === undefined || right === undefined || !operator) {
            throw new Error("Invalid expression");
        }

        if (operator === "+") values.push(left + right);
        if (operator === "-") values.push(left - right);
        if (operator === "*") values.push(left * right);
        if (operator === "/") {
            if (right === 0) throw new Error("Division by zero");
            values.push(left / right);
        }
    };

    for (const token of tokens) {
        if (!Number.isNaN(Number(token))) {
            values.push(Number(token));
            continue;
        }

        while (
            operators.length > 0 &&
            precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
            applyOperator();
        }

        operators.push(token);
    }

    while (operators.length > 0) {
        applyOperator();
    }

    if (values.length !== 1 || !Number.isFinite(values[0])) {
        throw new Error("Invalid expression");
    }

    return values[0];
}