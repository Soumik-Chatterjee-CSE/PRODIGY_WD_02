let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

document.getElementById('startStop').addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        this.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 1000);
        isRunning = true;
        this.textContent = 'Pause';
    }
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
    lapCounter = 1;
});

document.getElementById('lap').addEventListener('click', function() {
    if (isRunning) {
        const lapTime = document.getElementById('display').textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        document.getElementById('laps').appendChild(lapItem);
        lapCounter++;
    }
});

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById('display').textContent =
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}
