import GlobalState from "./GlobalState.js";

export default function () {
    const keys = document.querySelectorAll('.key'); // 所有按钮

    const op = document.querySelector('.op');

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.textContent.trim();
            GlobalState.setState({operator: value});
            if (value === 'Lsh' || value === 'Rsh' || value === 'Not') {
                calculate(value);
            } else {
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
    let result;
    switch (op) {
        case 'Lsh':
            result = first << second;
            break;
        case 'Rsh':
            result = first >> second;
            break;
        case 'Not':
            result = ~first;
            break;
        case 'And':
            result = first & second;
            break;
        case 'Or':
            result = first | second;
            break;
        case 'Xor':
            result = first ^ second;
            break;
        default:
            result = first;
            break;
    }
    console.log(first, second, op, result);

    binValue.textContent = result.toString(2);
    decValue.textContent = result.toString(10);
    octValue.textContent = result.toString(8);
    hexValue.textContent = result.toString(16);
    answer.textContent = result.toString(2);
    GlobalState.setState({first: result});
}
