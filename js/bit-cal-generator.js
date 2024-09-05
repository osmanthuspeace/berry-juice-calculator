import conversion from './conversion.js';

// 创建一个DOM元素，并设置类名和文本内容
const createElement = (tag, className, textContent = '') => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = textContent;
    return element;
};

// 生成单个位按钮及其脚注
const createBitButton = (bitIndex) => {

    //生成单个bit按钮
    const bitButton = createElement('div', 'bit-button', '0');
    bitButton.id = `${bitIndex}`;

    //生成某个bit位的脚注
    const footnote = createElement('div', 'footnote',
        (bitIndex % 4 === 1 || bitIndex % 4 === 0) ? bitIndex.toString() : '\u00A0'
    );

    //生成一个包含bit按钮和脚注的容器
    const bitContainer = createElement('div', 'bit-container');
    bitContainer.appendChild(bitButton);
    bitContainer.appendChild(footnote);

    return bitContainer;
};

// 生成一个包含四个位按钮的组
const createBitGroup = (groupIndex) => {
    const bitGroup = createElement('div', 'bit-group');
    for (let i = 0; i < 4; i++) {
        const bitIndex = groupIndex * 4 - i; // 从64到1
        const bitButtonContainer = createBitButton(bitIndex);
        bitGroup.appendChild(bitButtonContainer);
    }
    return bitGroup;
};

// 为位按钮添加点击事件监听器
const addBitButtonListener = (bitButton, index) => {
    bitButton.addEventListener('click', () => {
        bitButton.textContent = bitButton.textContent === '0' ? '1' : '0';
        conversion(bitButton.textContent, bitButton.id - 1, index);
    });
};

// 生成完整的位组容器，包括标题和位组
const generateBitToggle = (bitToggle, index) => {
    const bitSuite = createElement('div', `bit-suite-${index}`);
    const bitTitle = createElement('div', `bit-title-${index}`, `Binary ${index}`);
    bitSuite.appendChild(bitTitle);

    for (let groupIndex = 8; groupIndex > 0; groupIndex--) {

        const bitGroup = createBitGroup(groupIndex);

        Array.from(bitGroup.children).forEach(container => {
            const bitButton = container.querySelector('.bit-button');
            addBitButtonListener(bitButton, index);
        });
        bitSuite.appendChild(bitGroup);
    }

    bitToggle.appendChild(bitSuite);
};

const clear = () => {
    const bitButtons = document.querySelectorAll('.bit-button');
    bitButtons.forEach(button => button.textContent = '0');
}

export default function () {
    document.addEventListener('DOMContentLoaded', () => {
        const bitToggle = document.querySelector('.bit-toggle');

        generateBitToggle(bitToggle, 1);
        generateBitToggle(bitToggle, 2);
    });
    document.addEventListener('stateClear', () => {
        clear();
    });
}

