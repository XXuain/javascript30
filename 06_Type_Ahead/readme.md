![https://ithelp.ithome.com.tw/upload/images/20181011/20111164CzKHlfTOJU.png](https://ithelp.ithome.com.tw/upload/images/20181011/20111164CzKHlfTOJU.png)

## 使用者操作需求
使用者在輸入框內輸入關鍵字，即時過濾出符合的城市，並且列表的關鍵字上會有螢光筆樣式

## 技術重點
* 使用 `fetch()` 接收資料
* 使用 `promise.then()` 處理 promise 物件
* 正規表達式 `RegExp()`
* 將陣列資料用 join 參數內定義的字串(或符號)，將其連接轉為一個字串 `join()`

## 流程步驟
1. 建立一個空的陣列 `cities` 用來存放資料
2. 使用 `fetch()` 得到 API 資料並存入 `cities`
3. 輸入匡增加監聽 `keyup()` 事件
4. 處理使用者輸入的內容，使用正規表達式 `new RegExp(text, 'gi')` 產出塞選條件
5. 處理資料過濾，依據使用者的輸入，使用 `filter()`
6. 將處理過的資料呈現於畫面上，使用 `map()`

## 範例語法備註
### 


### [ fetch() ]
回傳的事 promise 物件，所以要對 promise 進行操作
[詳細請看](https://goo.gl/ZAwqY2)
範例中有示範這行
```
const prom = fetch(endpoint);
console.log(prom);
// 回傳不是 data 是 promise， 所以要操作promise
```

### [ promise.then() ]
對 promise 物件進行工作，可以接接接像水管一樣
```
// ES6
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

// 原本 function 需要多 return
fetch(endpoint).then(function (res) {
    return res.json();
  }).then(function (data) {
    cities.push(...data);
    console.log(cities);
  })

```
使用 fetch() 取得api 資料後  
用 then() 來操作回傳的 promise 資料  
可以先用 `fetch(endpointen).then(blob=> console.log(blob))`  
印出 Response 會發現需要抓取裡面的 JSON，在 `__photo__:Response/json`  
所以寫成 `.then(blob => blob.json())` 並且逐筆 push 至 cities 中  
data前面的 `...` 就是逐筆的寫法  

### [ keyup() ]
這裡監聽使用者輸入 input 時使用 `keyup` 事件而不是 `change`
因為 `change` 需要等到 unfocus 時才會觸發！

### [ RegExp() ]
正規表達式.. 好複雜呀 大概查了一下
後面的參數 `g` 代表全部，`i` 代表不分大小寫

### [ arrayObj.join() ]
將陣列組合成一個字串，並且以 `join()` 中的參數做為分隔
在這裡因為 `map()` 逐筆回傳的資料都是陣列形式並且中間以逗點區分
但為了要放入HTML中
所以將它轉為字串並且以空格作為每筆的區分
```
const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
```

### [ str.replace(pattern, replacement) ]
回一個新字串，此新字串是透過將原字串與 pattern 比對，以 replacement 取代吻合處而生成
- pattern 可以是字串或 RegExp
- replacement 可以是字串或函式


### 處理百進位逗點function()
```
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
```
