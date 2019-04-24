![https://ithelp.ithome.com.tw/upload/images/20181010/201111641Ql8MmvBjh.png](https://ithelp.ithome.com.tw/upload/images/20181010/201111641Ql8MmvBjh.png)
## 使用者操作需求
當按下按鍵 A,S,D,F,G,H,K,L 按鍵時，播放對應的不同音效，頁面上對應的區塊會增添短暫樣式


## 技術重點
* 鍵盤事件 `keydown`
* HTML5資料屬性`data-*`
* 取得鍵盤資訊 `e.keyCode`
* 增添樣式 `ClassList.add('')`
* 取消樣式 使用 `forEach()` `addEventListener` 監聽每個 .key
* 將物件或字串轉成陣列的方法 `Array.form()`


## 流程步驟
1. 先定義好 HTML標籤 `data-key`屬性的值
2. 在  window上添加鍵盤 `keydown`事件，取得按鍵 `keyCode`
3. 使用 `querySelector`選取對應的 audio `data-key`屬性的值並且添加 `play()`
4. 用同樣的方式 `querySelector`取得對應的 div `data-key` 並且添加 .playing樣式
5. 為所有 .key添加監聽 `transitionened`事件，抓出改變的樣式區塊將其去除該樣式


## 範例語法備註

### [ HTML5 Audio ]
HTML5標籤`<audio>`用於指定音源檔，增加controls屬性會有基本樣式
```
<audio data-key="65" src="sounds/clap.wav"></audio>
```

透過javascript控制
```
audio.currentTime = 0;
audio.play();
```
`audio/video.play()` 進行播放影片/音源  
`audio/video.currentTime="seconds"` 設置當前影片/音源的位置(以秒計)  
範例中連續快速的音效用法：  
添加play()播放音效時，需要等到音效結束，才能播放下一個音效，無法快速連續播放  
可以在前面添加 `currentTime = 0` 設置音效當前位置為0秒，就可以狂按了  

### [ HTML5 data-* ]
HTML5資料屬性`data-*` 其中的`*`就是一個可以自定義的名稱，可添加自己需要的值  
例如：data-name="yellow" or data-item="123"
```
// div上面
<div data-key="65" class="key">
// audio上面
<audio data-key="65" src="sounds/clap.wav"></audio>
```

透過javascript控制  
之後會講到HTMLElement.dataset  
範例裡面是用選取器，抓取HTML標籤的方式，並且加上ES6變數寫法  
```
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
```

### [ element.classList ]
反回元件的class值(陣列)，如果沒有就回傳空值  
範例中使用add()以及remove()方法  
```
key.classList.add('playing');
```
`classList.add('aaa', 'bbb', 'ccc');`     新增多個 className  
`classList.remove('aaa', 'bbb', 'ccc');`  移除多個 className  
如果已經存在/不存在的 className 則會被忽略。  

### [ arr.prototype.forEach() ]
跟for迴圈很像，單純執行每個陣列內的物件或值，不會額外回傳值
```
// 如果使用 jQuery keys.addEventListener 是無法達成每個key都添加的
keys.forEach( key => key.addEventListener('transitionend', removeTransition));
```
範例中使用 forEach 為每個 key 增加監聽事件 `arr.forEach(function(item, index, array)`
> item物件，index索引，array全部陣列

### [ transitionend 事件 ]
在CSS完成transition後會觸發此事件  
在這裡可以使用e.propertyName看到改變的屬性名稱  
```
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}
```
在範例中發生 transition 樣式屬性不只一個(box-shadow, transform, border-color)會出發3次，  
所以增加判斷 `if(e.propertyName !== 'transform')` return;使每次按鍵事件觸發後只去除一次樣式

### [ Array.form() ]
將物件或字串轉成陣列的方法
```
const keys = Array.from(document.querySelectorAll('.key'));
```
querySelectorAll 反為的是nodeList 而不是Array，  
而nodeList 會少很多array能用的方法。 
在這裡不使用也一樣能運作，只是可能在其他瀏覽器版本會有錯誤出現

