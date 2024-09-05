import GlobalState from "./GlobalState.js";
import centerFn from "./center-fn.js";

export default function () {
    const keys = document.querySelectorAll('.key'); // 所有按钮

    const op = document.querySelector('.op');

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.textContent.trim();

            if (value === 'C') {
                GlobalState.clear();
            } else if (value === '=') {
                calculate(GlobalState.getState('operator'));
            } else {
                GlobalState.setState({operator: value});
                // 显示操作符
                op.textContent = value;
                calculate(value);
            }
        })
    })
}
const calculate = (op) => {
    const first = GlobalState.getState('first');
    const second = GlobalState.getState('second');
    const answer = document.querySelector('.ans');

    const binValue = document.querySelector('.bin-value');
    const decValue = document.querySelector('.dec-value');
    const octValue = document.querySelector('.oct-value');
    const hexValue = document.querySelector('.hex-value');
    let result = BigInt(0);// 十进制的BigInt类型
    switch (op) {
        case 'AND':
            result = first & second;
            break;
        case 'OR':
            result = first | second;
            break;
        case 'XOR':
            result = first ^ second;
            break;
        case 'NAND':
            result = ~(first & second) & 0xFFFFFFFFn;
            break;
        case 'NOR':
            result = ~(first | second) & 0xFFFFFFFFn;
            break;
        case 'XNOR':
            result = ~(first ^ second) & 0xFFFFFFFFn;
            break;
        case '+':
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
        default:
            result = first;
            break;
    }
    console.log(first, second, op, result);

    binValue.textContent = result.toString(2);
    decValue.textContent = result.toString(10);
    octValue.textContent = result.toString(8);
    hexValue.textContent = result.toString(16).toUpperCase();

    answer.textContent = result.toString(2);
    centerFn(answer);
}
