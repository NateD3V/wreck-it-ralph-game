const state = {
    views: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft:document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },

    values: {
        
        hitPosition:0,
        result: 0,
        currentTime:60,
    },

    actions: {
        timeId:setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown,1000),
    }
}

function countDown(){
    state.values.currentTime--;
    state.views.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert("Game Over! Seu score foi: " + state.values.result)
    }
}

function playSound(audioFile){
    let audio = new Audio(`./src/audio/${audioFile}.m4a`);
    audio.volume = 0.2;
    audio.playbackRate = 1.7;
    audio.play();
}

function randomSquare(){
    state.views.squares.forEach((square)=>{
        square.classList.remove('enemy')
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.views.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}



function addListenerHitbox(){
    state.views.squares.forEach((square)=> {
        square.addEventListener("mousedown",()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.views.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    });
}

function init(){
    addListenerHitbox();
}

init();