import GlobalState from "./GlobalState.js";

const binaryString1 = "00000000000000000000000000000000"; // 32位二进制值
let bigBit1 = BigInt("0b" + binaryString1);

const binaryString2 = "00000000000000000000000000000000"; // 32位二进制值
let bigBit2 = BigInt("0b" + binaryString2);

const first = document.querySelector('.output .first'); // 第一操作数
const second = document.querySelector('.output .second .num'); // 第二操作数

// 设置特定位为 1
function setBit(bigBit, position) {
    return bigBit | (1n << BigInt(position));
}

// 设置特定位为 0
function clearBit(bigBit, position) {
    return bigBit & ~(1n << BigInt(position));
}

const conversion = (num, id, index) => {

    if (index === 1) {
        if (num === '1') {
            bigBit1 = setBit(bigBit1, id);
        } else {
            bigBit1 = clearBit(bigBit1, id);
        }

        first.textContent = bigBit1.toString(2);
        GlobalState.setState({first: bigBit1});
    } else {
        if (num === '1') {
            bigBit2 = setBit(bigBit2, id);
        } else {
            bigBit2 = clearBit(bigBit2, id);
        }
        second.textContent = bigBit2.toString(2);
        console.log(bigBit2);
        GlobalState.setState({second: bigBit2});
    }
}
export default conversion;
