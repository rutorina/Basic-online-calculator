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
                display.value += "0";
            // }
            break;
        default:
            break;

    }
});

function replaceOperators(newOperator) {

    if (newOperator === "*" || newOperator === "/") {
        if (!display.value.endsWith("/") && !display.value.endsWith("*") && !display.value.endsWith("-") && !display.value.endsWith("+") && display.value !== "") {
            display.value += newOperator;
        }
        if (display.value.endsWith("/") && newOperator === "*") {
            display.value = display.value.slice(0, -1);
            display.value += newOperator;
        }
        if (display.value.endsWith("*") && newOperator === "/") {
            display.value = display.value.slice(0, -1);
            display.value += newOperator;
        }
    }
    if (newOperator === "+" || newOperator === "-") {
        if (!display.value.endsWith("-") && !display.value.endsWith("+")) {
            display.value += newOperator;
        }
        if (display.value.endsWith("-") && newOperator === "+") {
            display.value = display.value.slice(0, -1);
            display.value += newOperator;
        }
        if (display.value.endsWith("+") && newOperator === "-") {
            display.value = display.value.slice(0, -1);
            display.value += newOperator;
        }
    }
}

function evaluateExpression(expression) {
    const rawTokens = expression.match(/\d+(?:\.\d+)?|[+\-*/]/g);

    if (!rawTokens || rawTokens.join("") !== expression) {
        throw new Error("Invalid expression");
    }

    const isOperator = (token) => token === "+" || token === "-" || token === "*" || token === "/";
    const tokens = [];

    for (let i = 0; i < rawTokens.length; i++) {
        const token = rawTokens[i];
        const prevToken = rawTokens[i - 1];

        // Treat +/- as unary sign at the start or right after another operator.
        if ((token === "+" || token === "-") && (i === 0 || isOperator(prevToken))) {
            const nextToken = rawTokens[i + 1];

            if (!nextToken || isOperator(nextToken)) {
                throw new Error("Invalid expression");
            }

            tokens.push(token + nextToken);
            i++;
            continue;
        }

        tokens.push(token);
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