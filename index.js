import { createStore } from 'redux';

// Action 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// Action 생성 함수
const toggleSwitch = () => ({type: TOGGLE_SWITCH});
const increase = difference => ({type: INCREASE, difference});
const decrease = () => ({type: DECREASE});

// 초기값 설정
const initialState = {
    toggle: false,
    counter: 0
};

// 리듀서 함수 정의
function reducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_SWITCH :
            return {
                ...state,
                toggle: !state.toggle
            };
        case INCREASE :
            return {
                ...state,
                counter: state.counter + action.difference
            };
        case DECREASE :
            return {
                ...state,
                counter: state.counter - 1
            };
        default :
            return state;
    }
}

// 스토어 생성
const store = createStore(reducer);

// DOM 참조
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// render 함수 (상태가 업데이트 될 때마다 호출)
const render = () => {
    const state = store.getState();

    if(state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    counter.innerText = state.counter;
};

render();
// subscribe 사용하여 상태가 바뀔 때마다 render 함수 호출
store.subscribe(render);

// 액션 발생
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
    store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
    store.dispatch(decrease());
};