## 練習重點
處理陣列常用的方法
* filter()
* map()
* sort()
* reduce()

### Array.prototype.filter() 過濾：
* `filter (item, index, array)`
* 會回傳一個新陣列，透過過濾原陣列，回傳為 true 的
* 適合用在搜尋符合條件的資料
* 不影響原始資料

### Array.prototype.map() ：
* `map (item, index, array)`
* 與 fillter 很像，透過原陣列組合成一個新陣列，回傳數量等於原始陣列的長度
* 如果不回傳則是 undefined
* 適合將原始的變數運算後重新組合一個新的陣列
* 與 forEach() 不同為， forEach 不會回傳新的陣列，需要自己 push

### Array.prototype.sort() 排序：
* `sort(a,b)` 傳入兩個參數去做比較
  * compare(a,b) 回傳值 < 0 則 [ a, b ]
  * compare(a,b) 回傳值 > 0 則 [ b, a ]
  * compare(a,b) 回傳值 = 0 則a,b位置不變
* 詳細: https://goo.gl/26ayvV

### Array.prototype.reduce() 加總：
* `reduce (function(total,value){}, initialTotal)`
* total 累加器是上一次呼叫後，所回傳的累加數值
* value 陣列中正在處理的元素
* initialTotal 初始值
* 詳細：https://goo.gl/wT1jLj

---------------------------------------


## 提供的陣列資料：
* inventors: 發明家的 first(名) last(姓) year(出生時間) passed(過世時間)
* people: 名字中間有逗號做間隔，並且字首大寫 (firstName, lastName)
* data: 有重複的資料在裡面

### 【 題目1 】篩選出出生在1500年間的發明家(year in 1500~1599)：
* 使用 `filter()` 過濾每筆 inventor 為 true 的將會回傳到變數 born 裡成為新的陣列
```
  // *** function寫法 ***
  const born_ = inventors.filter(function(invent){
    if( invent.year >= 1500 && invent.year <= 1599 ) {
      return true;
    } else {
      return false;
    }
  });

  // *** array function 寫法 ***
  const born = inventors.filter((invent) => invent.year >= 1500 && invent.year <= 1599);
  console.table(born);

  // 沒有條件會是空陣列
  var filterEmpty = people.filter(function(item, index, array){ });
  console.log(filterEmpty); // []
```

### 【 題目2 】回傳所有 inventor 的全名 (first + last)：
* 使用 `map()` 將 last 與 first 組合後回傳至變數 fullName
```
  // *** function寫法 ***
  const fullName_ = inventors.map(function(inventor){
    return inventor.first + ' ' + inventor.last;
  });

  // *** array function 寫法 ***
  const fullName = inventors.map((invent) => `${invent.first} ${invent.last}`);
  console.table(fullName);

  // 沒有條件會是空陣列
  var mapEmpty = people.map(function(item, index, array){ });
  console.log(mapEmpty);    // [undefined, undefined, undefined, undefined]
```

### 【 題目3 】依據生日小至大排序所有的 inventor：
* 使用 `sort()`透過比較，原地進行排序，並不會產生新陣列
```
  // *** array function 寫法***
  const birthday = inventors.sort((a, b) => a.year - b.year);

  var numbers = [4, 2, 5, 1, 3];
  numbers.sort(function(a, b) {
    return a - b;
  });
  // 步驟4-2大於0 故 2在4前面
  // 步驟2-5小於0 故 2在5前面.....
  console.log(numbers); // [1, 2, 3, 4, 5]
```

### 【 題目4 】加總所有 inventor 的在世時間：
* 使用 `reduce()` 來做加總，他可以與前一個回傳的值再次作運算 tatol + (year - passed)
```
  //以前使用for迴圈寫法：
  let totalYears = 0;
  for (let i = 0; i < inventors.length; i++) {
      let liveYear = inventors[i].passed - inventors[i].year;
      totalYears += liveYear;
  }
  // *** reduce() 以及 array function寫法***
  const tatol = inventors.reduce((total, inventor) => {
    return total + (inventor.passed - inventor.year);
  }, 0);
```

### 【 題目5 】年齡由大到小排序：
* 使用sort() 先算好年紀(passed - year) 再進行比較並且排序
```
const oldest = inventors.sort(function (a, b) {
        const last = a.passed - a.year;
        const next = b.passed - b.year;
        return last > next ? -1 : 1;
    });
    console.table(oldest);
```


### 【 題目6 】列出巴黎所有包含'de'的路名：
* 練習網址：https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
* 抓取 className 為 mw-category 裡面所有的 a 標籤，array.form() 為真正陣列，使用 map() 抓取該標籤裡的文字，在使用filter()過濾有‘de’字樣的路名
```
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
const de = links
            .map(link => link.textContent)
            .filter(streetName => streetName.includes('de'));
```

###【 題目7 】依據 lastName 排序 people 的資料：
* people的陣列資料名，中間包含逗點，使用 split() 好難唸ＸＤ，來判斷逗點並且切開成兩個陣列用[first, last]來接，再用sort進行排序
```
const alpha = people.sort((a, b) => {
    const [aLast, aFirst] = a.split(', ');
    const [bLast, bFirst] = b.split(', ');
    return aLast[0] > bLast[0] ? 1 : aLast[0] < bLast[0] ? -1 : 0;
});
```

**【 題目8 】分別計算 data 內每個值的數量：**
* 先將 obj 初始值設為空陣列 obj={} 並且判斷這個值是否有了，沒有的話就創立一個空的，有的話就相加
```
const transportation = data.reduce((obj, item) => {
    if (!obj[item]) obj[item] = 1
    else obj[item] +=1
    return obj
}, {});
```

哇嗚 這次的東西有點多  之後這篇還是會陸續整理更新 >"<


