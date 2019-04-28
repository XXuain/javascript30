## 使用者操作需求：
點擊個區塊後，會做展示的效果動畫。
效果動畫：點擊後放大該區塊接著滑入上下兩個區塊。

## 技術重點：
運用CSS做效果，JS控制
* CSS: flex, transition, transform
* JS: toggle(), transitionend

**流程步驟：**
* CSS樣式處理：
.panels 裡面包了5個 .panel，這裡用的就是一層一層的 flex包下去
  1. 在外成標籤 .panels加上 display:flex; 使內層 .panel呈現水平排列，
    內層 .panel加上 flex:1; 使其平均滿版分配於畫面中
  2. 在 .panel加上 display:flex並且轉換主籌線方向 flex-direction:columnu由水平轉為垂直，
    主軸線置中 justify-content: center;
  3. 沒錯為了讓p裡的字也好對齊，再加上display:flex，主籌線置中 justify-content: center;
    垂直線置中 align-items: center;

* CSS動畫處理：
  1. 再來就是設定好預設，先將上下兩塊用 transform: translateY(xx) 位移到畫面外
  2. 當 添加上 .open-active的時候，又會再移回來 transform: translateY(0) 位移0回到原位
  3. 

* JS控制CSS動畫樣式:
  1. 選取所有的 .panel 監聽click事件 執行toggleOpen() 為該 .panel添加 .open樣式
  2. 並且再多加一個監聽 為transitionend事件，當執行 .open樣式時會觸發並且執行toggleActive() 為該 .panel添加 .open-active樣式


## 小技巧紀錄：
* e.propertyName可以抓到觸發 transitionend的屬性名稱
* includes():
因為transition: flex 0.7s..這段在sarafi是flex，而其他瀏覽器為flex-grow
所以不能用e.property === 'flex'來寫，但可利用.includes('flex')來判斷，只要e.property`有包含到flex的字串就使其通過判斷，加入動畫效果。
```
function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}
```



