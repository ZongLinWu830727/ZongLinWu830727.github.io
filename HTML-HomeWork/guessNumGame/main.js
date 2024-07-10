const startbtn = document.querySelector("#start_btn");
const showAnsBtn = document.querySelector('#show_answer_btn')
const restartBtn = document.querySelector("#restart_btn")
const guessHistoryList = document.querySelector("#guess_history_list")
let answer;

const guessInput = document.querySelector('#guess_input')
const geussBtn = document.querySelector('#guess_btn')
const gameMsgToast = document.querySelector("#game_msg_toast")
// 呼叫bootstrap的Toast的第一種作法
const toastBootstrap = new bootstrap.Toast(gameMsgToast, {
    // delay: 500,
    // animation:false
})

const modalBootstrap = new bootstrap.Modal(document.querySelector("#end_game_modal"));

const endGameBtn = document.querySelector('#end_game_btn')
endGameBtn.addEventListener("click", () => {
    modalBootstrap.hide();
    initGame();
});





// 產出與重來、看答案
function initGame() {
    // 產出Answer
    answer = generateAns();
    // 
    guessHistoryList.innerHTML = ''
}

function generateAns() {
    const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    numArr.sort((a, b) => {
        return getRandomArbitrary(-1, 1);//一定要有負值
    })
    return numArr.slice(0, 4).join('')

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


startbtn.addEventListener("click", initGame)

restartBtn.addEventListener("click", initGame)

showAnsBtn.addEventListener("click", () => {
    showHint(`答案是：${answer}`)
})



// 輸入與猜測


geussBtn.addEventListener("click", () => {
    const val = guessInput.value.trim();
    console.log(val)
    //驗證輸入合法性
    if (val === "" || isNaN(val)) {
        showHint("請輸入正確數字!!!")
        guessInput.value = ''
        return
    }

    //驗證輸入的是不重複的4個數字
    if (val.length > 4 || new Set(val).size !== 4) {
        showHint("請確認輸入的數字數量!!!")
        guessInput.value = '';
        return;
    }

    guessInput.value = '';

    //猜a,b的數量
    let a = 0, b = 0;
    for (let i = 0; i < answer.length; i++) {
        if (val[i] === answer[i]) {
            a++;
        } else if (answer.includes(val[i])) {
            b++;
        }
    }
    if (a === 4) {
        // alert('過關');
        modalBootstrap.show();
    }
    guessInput.value = '';
    appendHistory(a, b, val);
})
function appendHistory(a, b, input) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    const span = document.createElement("span");
    const badgeColor = a === 4 ? "bg-success" : "bg-danger";
    span.classList.add("badge", badgeColor);
    span.textContent = `${a}A${b}B`;
    li.append(span, input);
    guessHistoryList.append(li);
}





//下午5:15分左右
function showHint(msg) {
    gameMsgToast.querySelector(".toast-body").textContent = msg;
    // 第二種作法
    // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(gameMsgToast)

    toastBootstrap.show()
}