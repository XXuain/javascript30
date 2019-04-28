![https://ithelp.ithome.com.tw/upload/images/20181010/20111164oH4vIAF0dI.png](https://ithelp.ithome.com.tw/upload/images/20181010/20111164oH4vIAF0dI.png)
## 使用者操作需求
分別操作 Spacing, Blur 滑動桿以及調色盤，來即時變更圖片的 padding, filter 以及主題色

## 技術重點
* 利用資料改變畫面
* 利用 JS 來控制 CSS 變數
* CSS 變數設定 `:root { --baseColor: yellow }`
* CSS 設定變數為值 .className { color: `var(--baseColor)` }
* 使用 `.dataset.*` 取得HTML `data-*` 屬性
* 返回 style 標籤 `document.documentElement.style`
* 設定 CSS 屬性 `style.setProperty`

## 流程步驟
1. 利用 CSS 變數設定樣式
2. JS 選取所有的 input 控制桿
3. 對控制桿添加監聽，並且設定兩種觸發事件 `change` & `mousemove`
4. 觸發時更新到 CSS 變數

## 範例語法備註
### [ :root ]
* CSS變數設定 `:root { --baseColor: yellow }`
* CSS設定變數為值 .className { color: `var(--baseColor)` }
```
:root {
      --base: #ffc600;
      --spacing: 10px;
      --blur: 10px;
    }

    img {
      padding: var(--spacing);
      background: var(--base);
      filter: blur(var(--blur));
    }

    .hl {
      color: var(--base);
    }
```

### [ element.dataset() ]
`HTML5 data-*` 在[第一篇](https://ithelp.ithome.com.tw/articles/10199482)有講到
這邊講的是利用 `.dataset` 選取對象的 `data-*`屬性，跟 `getAttribute` 很像
但是 dataset 還能抓到 data 字串，getAttribute 試了一下好像無法
```
<div id="test" data-no="123" data-name="yy" data-time="00:00"></div>

// 輸出 {no: "123", name: "yy", time: "00:00"}
document.querySelector('#test').dataset

// 皆輸出123
document.querySelector('#test').dataset.no 
document.querySelector('#test ').getAttribute('data-no');
  
```
範例 code 使用 `const suffix = this.dataset.sizing || '' ;`
如果變數不一定取的到值的話就給一個空值

### [ style.setProperty() ]
等同於 cssPropertyName
`style.setProperty('padding', '15px');`
`style.padding = '15px';`

範例 code 中，將 input 的 name 屬性命名為 CSS 屬性名稱來做呼應
```
document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
```





