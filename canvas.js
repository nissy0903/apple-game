
const canvas1 = document.getElementById("canvas1"); 
const ctx1 = canvas1.getContext("2d");

//変数の設定と初期化
const target = {x:250, y:100, dir:2};
const apple = [];
apple.push("image/apple0.png","image/apple1.png","image/apple2.png");
const player = {x:250, y:400};
let point = 0;
const scoreMessage = [];
scoreMessage.push("OK","Nice","Great!","Excellent!!");
let gameTime = 60;
let resultTime = 10;
let frag = true,startFrag = false,resultFrag=false;

const targetImage = new Image();
const playerImage = new Image();

targetImage.src = "image/apple0.png";
playerImage.src = "image/player.png";

const audio1 = new Audio();
audio1.src="SE/sampleSE1.mp3";

//値をリセット
function resetAll(){
    player.x = 250;
    player.y = 400;
    setTarget();
    point = 0;
    gameTime = 60;
    resultTime = 10;
    frag = true;
}
//ターゲットの位置を設定
function setTarget(){
    let tmp = Math.floor(Math.random() * 3);
    targetImage.src = apple[tmp];
    target.x = Math.floor(Math.random() * 270) + 25;
    target.y = Math.floor(Math.random()*410) + 45;
}

//game2
function game0() {
    ctx1.clearRect(0,0,320,480);
    //得点
    ctx1.fillStyle = "black";
    ctx1.font = "40px sans-serif ";
    ctx1.fillText("Click!",100,240);
}
//一定時間毎起動させる
setInterval(()=> {
    if(!startFrag)game0();
    else if(frag)game1(50);
    else game2(50);
},50);


//game1関数
function game1(addTime){
    ctx1.clearRect(0,0,320,480);
    ctx1.textAlign = "left";

    //ターゲット
    ctx1.drawImage(targetImage, target.x-25, target.y-25, 50, 50);

    //プレイヤー
    ctx1.drawImage(playerImage, player.x-25, player.y-25, 50, 50);

    //得点、時間
    ctx1.fillStyle = "black";
    ctx1.font = "20px sans-serif ";
    ctx1.fillText(`score: ${point}`,10,30);
    ctx1.fillText(`time: ${gameTime.toFixed(2)}s`,160,30);

    if(player.x < 25)player.x = 26;
    if(295 < player.x)player.x = 294;
    if(player.y < 40)player.y = 41;
    if(455 < player.y)player.y = 455;

    //得点、ターゲット再生成
    if ((Math.abs(target.x - player.x)<25) && (Math.abs(target.y - player.y)<25)){
    point++;
    audio1.play();
    setTarget();
    }
    //時間経過
    gameTime -= addTime/1000;
    if(gameTime <= 0){
    frag = false;
    resultFrag = false;
    }
}

//game2
function game2(addTime) {
    ctx1.clearRect(0,0,320,480);
    //スコアメッセージの設定
    let tmp;
    if(point >= 100)tmp = 3;
    else if(point >= 70)tmp = 2;
    else if(point >= 40)tmp = 1;
    else tmp = 0;

    //得点
    ctx1.fillStyle = "black";
    ctx1.font = "20px sans-serif ";
    ctx1.fillText("Result",30,130);
    ctx1.fillText(`score: ${point}   ${scoreMessage[tmp]}`,30,200);
    ctx1.fillText(`To the next game: ${resultTime.toFixed(0)}s`,30,260);
    ctx1.fillText("↑Click to stop time↑",30,290);
    if(!resultFrag)resultTime -= addTime /1000;
    if(resultTime <= 0){
        resetAll();
    }
}

//playerコントロール
canvas1.addEventListener("mousemove",function(e){
    const rect = e.target.getBoundingClientRect();
    player.x = e.clientX-rect.left;
    player.y = e.clientY-rect.top;
});
canvas1.addEventListener("mousedown",function(e){
    if(!startFrag)startFrag = true;
    else if(!frag){
    resultFrag = !resultFrag;
    }
    
});