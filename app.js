let answer = ""
function answerGenerator(){
    answer = String(Math.floor(Math.random()*10));
    while (answer.length < 4){
        let random = String(Math.floor(Math.random()*10));
        let re = new RegExp(random);
        if (re.test(answer)){
            continue;
        }
        answer = answer + random;
    }
}

function checkAnswer(){
    let input = document.querySelector("input.answer-input").value.trim();
    let countA = 0;
    let times = document.querySelectorAll("p.output").length + 1;
    if (/(\d)(?=.*?\1)/.test(input) == true){
        alert("數字不能重複");
        return;
    }
    if (/[^0-9]/.test(input) == true || input.length != 4){
        alert("請輸入四位數字");
        return;
    }
    if (input == answer){
        document.querySelector("section.interaction").style.display = "none";
        let firstOutput = document.querySelectorAll("p.output")[0];
        let container = document.querySelector("section.output-container");
        let elResultP = document.createElement("p");
        elResultP.classList.add("result");
        if (times == 1){
            elResultP.innerText = `${times}次就猜對了，是不是作弊阿!?`;
        }else if (times <= 4){
            elResultP.innerText = `厲害！${times}次就猜對了`;
        }else if (times <= 9){
            elResultP.innerText = `答對了！總共猜了${times}次`;
        }else{
            elResultP.innerText = `再接再厲，總共猜了${times}次`;
        }
        container.insertBefore(elResultP, firstOutput);
        let elResetButton = document.createElement("button");
        elResetButton.classList.add("reset");
        elResetButton.innerText = "再玩一次";
        container.insertBefore(elResetButton, elResultP);
        let resetButton = document.querySelector("button.reset");
        resetButton.addEventListener("click", reset);
    }
    for (let i = 0; i < 4;i++){
        if (input[i] == answer[i]){
            countA++;
        }
    }
    let re = new RegExp(`${answer[0]}|${answer[1]}|${answer[2]}|${answer[3]}`,"g");
    let countB = input.match(re);
    let container = document.querySelector("section.output-container");
    let elP = document.createElement("p");
    elP.classList.add("output");
    if (countB == null){
       let countB = 0;
       elP.innerHTML = `<span class="input">${input}</span> ${countA}<span class="a">A</span>${countB}<span class="b">B</span>`;
       container.appendChild(elP);
       return;
    }
    countB = countB.length - countA;
    elP.innerHTML = `<span class="input">${input}</span> ${countA}<span class="a">A</span>${countB}<span class="b">B</span>`;
    container.appendChild(elP);
}

function reset(){
    document.querySelector("input.answer-input").value = "";
    document.querySelector("section.interaction").style.display = "flex";
    let allOutputs = document.querySelectorAll("p.output");
    let i = allOutputs.length;
    while (i > 0){
    allOutputs[i-1].remove();
    i--;
    }
    let resetButton = document.querySelector("button.reset");
    let resultP = document.querySelector("p.result");
    resetButton.remove();
    resultP.remove();
    answerGenerator();
}

let submitButton = document.querySelector("button.submit");
submitButton.addEventListener("click", checkAnswer);
answerGenerator();
let answerInput = document.querySelector("input.answer-input");
answerInput.addEventListener("keyup", (enterKey)=>{
    if (enterKey.key == "Enter"){
        submitButton.click();
    }
})
