import GlobalState from "./GlobalState.js";
import centerFn from "./center-fn.js";

const first = document.querySelector('.output .first'); // 第一操作数
const second = document.querySelector('.output .second .num'); // 第二操作数
const op = document.querySelector('.output .second .op'); // 操作符
const ans = document.querySelector('.output .ans'); // 结果

document.addEventListener('stateClear', () => {
    first.textContent = '0';
    second.textContent = '0';
    op.textContent = '';
    ans.textContent = '0';
})

// 设置特定位为 1
function setBit(bigBit, position) {
    return bigBit | (1n << BigInt(position));
}

// 设置特定位为 0
function clearBit(bigBit, position) {
    return bigBit & ~(1n << BigInt(position));
}

//确定更长的二进制数
const len = (len1, len2) => {
    return len1 > len2 ? len1 : len2;
}

//更新长度
const updateLen = (firstValue, secondValue) => {
    let len1 = firstValue.toString(2).length;
    let len2 = secondValue.toString(2).length;
    console.log("len: ", len1, len2);

    first.textContent = firstValue.toString(2).padStart(len(len1, len2), '0');
    second.textContent = secondValue.toString(2).padStart(len(len1, len2), '0');
    centerFn(first);
    centerFn(document.querySelector('.output .second .num'));
    GlobalState.setState({first: firstValue});
    GlobalState.setState({second: secondValue});

}

//每点击一次按钮，就会调用这个函数，更新二进制数
const conversion = (num, id, index) => {

    let firstValue = GlobalState.getState("first");
    let secondValue = GlobalState.getState("second");

    if (index === 1) {
        if (num === '1') {
            firstValue = setBit(firstValue, id);
        } else {
            firstValue = clearBit(firstValue, id);
        }
        console.log("bit: ", firstValue, secondValue);

        updateLen(firstValue, secondValue);

    } else {
        if (num === '1') {
            secondValue = setBit(secondValue, id);
        } else {
            secondValue = clearBit(secondValue, id);
        }
        updateLen(firstValue, secondValue);

    }
}
export default conversion;
