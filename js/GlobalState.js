const GlobalState = (function () {
    let state = {
        first: 0b0n,
        second: 0b0n,
        operator: 'AND',
    };

    function getState(name) {
        return state[name];
    }

    function setState(newState) {
        state = {...state, ...newState};
        document.dispatchEvent(new CustomEvent('stateChange', {detail: state}));
    }
    function clear() {
        state = {
            first: 0b0n,
            second: 0b0n,
            operator: '',
        };
        document.dispatchEvent(new CustomEvent('stateClear', {detail: state}));
    }

    // 返回闭包
    return {
        getState,
        setState,
        clear
    };
})();//由于 getState 和 setState 形成了闭包，它们能够访问和修改在 IIFE 内部定义的 state 变量。这意味着即使 IIFE 的执行已经结束，只要 GlobalState 这个对象还在被引用，state 变量就会一直存在于内存中

// 监听状态变化
document.addEventListener('stateChange', event => {
    console.log('State changed:', event.detail);
});
export default GlobalState;
