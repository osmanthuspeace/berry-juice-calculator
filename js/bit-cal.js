import conversion from './conversion.js';

export default function () {
    document.addEventListener('DOMContentLoaded', () => {
        const bitToggle = document.querySelector('.bit-toggle');

        generateBitToggle(bitToggle, 1);
        generateBitToggle(bitToggle, 2);
    });
}


const generateBitToggle = (bitToggle, index) => {
    // 动态生成64个0和1的按钮，每四个一组

    const bitSuite = document.createElement('div');
    bitSuite.className = `bit-suite-${index}`;

    const bitTitle = document.createElement('div');
    bitTitle.className = `bit-title-${index}`;
    bitTitle.textContent = `Binary ${index}`;
    bitSuite.appendChild(bitTitle);

    for (let groupIndex = 8; groupIndex > 0; groupIndex--) {
        const bitGroup = document.createElement('div');
        bitGroup.className = `bit-group`;

        for (let i = 0; i < 4; i++) {
            const bitIndex = groupIndex * 4 - i;// 从64到1
            const bitButton = document.createElement('div');
            bitButton.className = 'bit-button';
            bitButton.textContent = '0';
            bitButton.id = `${bitIndex}`;
            // 添加脚注元素
            const footnote = document.createElement('div');
            footnote.className = 'footnote';
            if (bitIndex % 4 === 1 || bitIndex % 4 === 0) {
                footnote.textContent = bitIndex.toString();
            } else {
                footnote.textContent = '\u00A0';//使用空格填充位置
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

                conversion(bitButton.textContent, bitButton.id - 1, index);

            });
        }

        bitSuite.appendChild(bitGroup);
    }
    bitToggle.appendChild(bitSuite);
}
