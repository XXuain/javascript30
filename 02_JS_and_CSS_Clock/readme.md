![https://ithelp.ithome.com.tw/upload/images/20181010/20111164e4v4a2M2PQ.png](https://ithelp.ithome.com.tw/upload/images/20181010/20111164e4v4a2M2PQ.png)
## 使用者操作需求
雙眼看著它，取得目前時間資訊

## 技術重點
* 更改角度 `transform: rotate(90deg)`
* 更改物件中心點位置，預設為中心 `transform-oragin:50% ` 在這更改為 100%(right)
* 更改動畫曲線 `transition-timing-function: cubic-bezier()`
* 計時器：`setInterval(function, mins)`
    * `setInterval` 設定間格 持續執行
    * `setTimeout` 設定延遲 持行一次
    * `requestAnimationFrame` 
* 取得當前時間函式，要搭配new使用，`new.Date();`
    * `getSeconds()` 取得秒數
    * `getMinutes()` 取得分數
    * `getHours()` 取得時數

## 流程步驟
1. 用`transform`預設好秒分時針的角度
2. 使用定時器`setInterval` 每秒取得當前時間
3. 利用當前時間來計算出角度

// css部分
```
    .hand {
      width: 50%;
      height: 6px;
      background: black;
      position: absolute;
      top: 50%;

      transform-origin: 100%; /* 改變物件中心點位置 */
      transform: rotate(90deg); /* 預設角度 */
      transition: all 0.05s;
      transition-timing-function: cubic-bezier(0, 2.69, 0.58, 1); /* 動畫曲線 */
    }
```

//JS部分
```
  <script>
    const secondHand = document.querySelector('.second-hand');
    const minHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    function setDate(){
      // 取得時間
      const now = new Date();
      
      // 取得秒數
      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
      
      // 取得分數
      const mins = now.getMinutes();
      const minsDegrees = ((mins / 60) * 360) + 90;
      minHand.style.transform = `rotate(${minsDegrees}deg)`;
      
      // 取得時數
      const hour = now.getHours();
      const hourDegrees = ((hour / 12) * 360) + 90;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    // 設定定時器
    setInterval(setDate, 1000);

  </script>
```