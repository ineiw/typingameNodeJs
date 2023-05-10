import keypress from 'keypress';
import chalk from 'chalk';

let targetCh = 'i am super hero but you are the best hero thats why i am the best hero';
let startTime = new Date().getTime();

let totalCh = '';
let idx = 0

const gameLoop = () => {
    // 게임 로직 처리
    let currentTime = new Date().getTime();
    let deltaTime = currentTime - startTime;
    console.clear();
    
    for (let i=0;i<targetCh.length;i++){
        if (targetCh[i] === totalCh[i] && targetCh[i] !== ' '){
            process.stdout.write((chalk.green(targetCh[i])));
        }
        else if (totalCh.length > i){
            process.stdout.write(chalk.red(targetCh[i]));
        }
        else{
            process.stdout.write(chalk.gray(targetCh[i]));
        }
    }
    console.log();
    if (targetCh === totalCh) {
        console.log('your time : ', (deltaTime/1000)%60, 'sec');
        process.exit();
    }
    console.log(totalCh);
    console.log('deltaTime', (deltaTime/1000)%60);

    // 다음 프레임을 예약합니다.
    setTimeout(gameLoop, 1000 / 60); // 60 FPS로 설정
};
gameLoop(startTime); // 게임 루프 시작

// 표준 입력 스트림을 원시 모드로 설정하여 실시간 입력을 처리할 수 있게 합니다.
process.stdin.setRawMode(true);
process.stdin.resume();

// keypress 이벤트를 사용할 수 있도록 설정합니다.
keypress(process.stdin);

// 키보드 입력을 처리하는 이벤트 핸들러를 등록합니다.
process.stdin.on('keypress', (ch, key) => {
    if (key && key.name === 'backspace') {
        totalCh = totalCh.slice(0, -1);
        if (idx > 0)
            idx -= 1;
    }
    else if (key && key.name === 'enter') {
        totalCh += '\n';
        idx += 1;
    }
    else if (typeof ch === 'string' && ch.length === 1){
        totalCh += ch;
        idx += 1;
    }
    // Ctrl+C 입력 시 종료
    if (key && key.ctrl && key.name === 'c') {
        process.exit();
    }
});
