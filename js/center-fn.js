export default function (element) {

    const numStr = element.textContent.trim();

    element.textContent = '';

    let i = numStr.length % 4;
    if (i > 0) {
        createGroup(numStr.slice(0, i), element);
    }
    for (; i < numStr.length; i += 4) {
        createGroup(numStr.slice(i, i + 4), element);
    }

}

const createGroup = (numStr, element) => {
    const group = document.createElement('div');
    group.className = 'group';

    for (let j = 0; j < numStr.length; j++) {
        const char = document.createElement('span');
        char.textContent = numStr[j];
        group.appendChild(char);
    }

    element.appendChild(group);
}
