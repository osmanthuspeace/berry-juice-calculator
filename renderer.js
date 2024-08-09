console.log("start render")

const keys = document.querySelectorAll('.key'); // 所有按钮
const output = document.querySelector('.output .cur'); // 当前输出框
const lastOutput = document.querySelector('.output .last'); // 上一次的输出框

// 初始化一个变量来保存当前输入的值
let currentInput = '';

keys.forEach(key => {
    key.addEventListener('click', () => {
        const value = key.textContent.trim();
        console.log("value", value)

        if (value === 'C') {
            // 清空输入
            currentInput = '';
            lastOutput.textContent = '';
        } else if (value === '/') {
            // 删除最后一个字符
            currentInput = currentInput.slice(0, -1);
        } else if (value === '=') {
            // 计算结果并显示
            try {
                lastOutput.textContent = currentInput;
                currentInput = calculate(currentInput).toString();
            } catch {
                currentInput = 'Error';
            }
        } else {
            // 添加按钮内容到输入中
            currentInput += value;
        }

        // 更新输出框
        output.textContent = currentInput;
    })
})

const calculate = (expression) => {
    return eval(expression);
}
document.addEventListener('DOMContentLoaded', () => {
    const switchButton = document.getElementById('switchButton');
    const keyboard = document.querySelector('.keyboard');
    const bitToggle = document.querySelector('.bit-toggle');

    let inputTimer; // 定时器变量


    // 动态生成64个0和1的按钮，每四个一组
    for (let groupIndex = 16; groupIndex > 0; groupIndex--) {
        const bitGroup = document.createElement('div');
        bitGroup.className = 'bit-group';

        for (let i = 0; i < 4; i++) {
            const bitIndex = groupIndex * 4 - i;// 从64到1
            const bitButton = document.createElement('div');
            bitButton.className = 'bit-button';
            bitButton.textContent = '0';

            // 添加脚注元素
            const footnote = document.createElement('div');
            footnote.className = 'footnote';
            if (bitIndex % 4 === 1 || bitIndex % 4 === 0) {
                footnote.textContent = bitIndex.toString();
            } else {
                footnote.textContent = '\u00A0';
            }

            // 包装 bitButton 和 footnote
            const bitContainer = document.createElement('div');
            bitContainer.className = 'bit-container';
            bitContainer.appendChild(bitButton);
            bitContainer.appendChild(footnote);

            bitGroup.appendChild(bitContainer);

            // 添加点击事件，点击后0和1切换
            bitButton.addEventListener('click', () => {
                bitButton.textContent = bitButton.textContent === '0' ? '1' : '0';
                resetInputTimer(); // 重置定时器
            });
        }

        bitToggle.appendChild(bitGroup);
    }

    // 切换功能
    switchButton.addEventListener('click', () => {
        if (keyboard.style.display !== 'none') {
            keyboard.style.display = 'none';
            bitToggle.style.display = 'grid';
        } else {
            bitToggle.style.display = 'none';
            keyboard.style.display = 'grid';
        }
    });

    // 捕获键盘输入
    document.addEventListener('keydown', (event) => {
        handleInput(event.key);
    });

    function handleInput(key) {
        // 如果距离上次输入超过10秒，清空输入
        if (inputTimer && Date.now() - inputTimer > 10000) {
            currentInput = '';
            lastOutput.textContent = '';
        }

        if (!isNaN(key)) {
            // 输入的是数字
            currentInput += key;
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
            // 输入的是运算符
            currentInput += key;
        } else if (key === 'Backspace') {
            // 删除键
            currentInput = currentInput.slice(0, -1);
        } else if (key === 'Enter') {
            // 回车键进行计算
            try {
                lastOutput.textContent = currentInput;
                currentInput = eval(currentInput).toString();
            } catch {
                currentInput = 'Error';
            }
        } else if (key === 'Escape') {
            // 清除输入
            currentInput = '';
            lastOutput.textContent = '';
        }

        // 更新输出框
        output.textContent = currentInput;

        // 重置定时器
        resetInputTimer();
    }

    function resetInputTimer() {
        // 清除之前的定时器
        clearTimeout(inputTimer);
        // 记录当前时间
        inputTimer = Date.now();
    }
});
