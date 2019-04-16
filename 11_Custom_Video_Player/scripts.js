/**
 * HTML Audio/Video : https://goo.gl/H4eAIq
 * 事件介紹 ： https://goo.gl/euc2lF
 * js video properties : https://goo.gl/H4eAIq
 */

/* 抓取需要的 element */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer'); // 影片
const progress = player.querySelector('.progress');// 進度條
const progressBar = player.querySelector('.progress__filled');// 進度條
const toggle = player.querySelector('.toggle'); // 暫停播放鍵
const ranges = player.querySelectorAll('.player__slider'); // 聲音 速度
const skipBtns = player.querySelectorAll('[data-skip]'); // 前後快轉

/* 建立 function */
// 播放 & 暫停
function togglePlay(e) {
    
    // 按鍵樣式
    const playicon = '<i class="fas fa-play"></i>';
    const pauseicon = '<i class="fas fa-pause"></i>';
    const icon = video.paused ? pauseicon : playicon;
    console.log(video.paused);
    console.log(icon);
    toggle.innerHTML = icon;
    
    // 影片播放/暫停
    const method = video.paused ? 'play' : 'pause';
    video[method](); // = video.play() & video.pause()
}

// 倒退 & 快轉
function skipUpdate() {
    // currentTime 影片當前秒數
    // parseFloat(str) 將參數轉為數字
    video.currentTime += parseFloat(this.dataset.skip);
}

// 聲音 & 速度
function rangeUpdate() {
    // volume 返回當前音檔/影片檔的音量大小
    // playbackRate 返回當前音檔/影片檔的速度
    video[this.name] = this.value;
}

// 進度條顯示
function progressUpdate() {
    // duration 當前音檔/影片檔的長度(以秒計)
    const precent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${precent}%`;
}

// 進度條操作
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/* 建立監聽 event */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// video.addEventListener('timeupdate', progressUpdate);
video.addEventListener('progress', progressUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

skipBtns.forEach((btn) => {btn.addEventListener('click', skipUpdate)});
ranges.forEach((range) => {range.addEventListener('change', rangeUpdate)});
ranges.forEach((range) => {range.addEventListener('mousemove', rangeUpdate)});

