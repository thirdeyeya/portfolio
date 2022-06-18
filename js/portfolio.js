let itemList = [];      // 楽曲一覧

//--- データの定義 ---
// 大分類
let cate1 = [];

// 小分類
let cate2 = [];

let cate3 = [];

//--- 共通で使用する要素を取得 ---
// 大分類のselectをid属性により取得
let cate1Element = document.getElementById('mainMenu');

// 小分類のselectをid属性により取得
let cate2Element = document.getElementById('subMenu1');

let cate3Element = document.getElementById('subMenu2');

// 楽曲リストを表示する要素を取得
let itemListElement = document.getElementById('itemList');

//--- 定義した関数 ---
// 大分類のoptionを追加する関数
function setMainMenu() {
    // 取得したselectの子要素（option）を空白にすることによってすべて削除
    cate1Element.innerHTML = "";

    // 大分類の配列に保存されている数だけoptionとして追加する
    for (let i = 0; i < cate1.length; i++) {
        // option要素を新規に作成
        let option = document.createElement('option');
        option.value = cate1[i];    // optionの値に配列の値を代入
        option.text = cate1[i];     // optionの表示文字列に配列の値を代入
        cate1Element.appendChild(option); // select要素の子要素としてoption要素を追加        
    }
}

// 小分類のoptionを追加する関数
function setSubMenu1(idx) {
    // 取得したselectの子要素（option）を空白にすることによってすべて削除
    cate2Element.innerHTML = "";

    // 大分類の配列に保存されている数だけoptionとして追加する
    for (let i = 0; i < cate2[idx].length; i++) {
        // option要素を新規に作成
        let option = document.createElement('option');
        option.value = cate2[idx][i];    // optionの値に配列の値を代入
        option.text = cate2[idx][i];     // optionの表示文字列に配列の値を代入
        cate2Element.appendChild(option); // select要素の子要素としてoption要素を追加        
    }
}

function setSubMenu2(idx) {
    // 取得したselectの子要素（option）を空白にすることによってすべて削除
    cate2Element.innerHTML = "";

    // 大分類の配列に保存されている数だけoptionとして追加する
    for (let i = 0; i < cate3[idx].length; i++) {
        // option要素を新規に作成
        let option = document.createElement('option');
        option.value = cate3[idx][i];    // optionの値に配列の値を代入
        option.text = cate3[idx][i];     // optionの表示文字列に配列の値を代入
        cate3Element.appendChild(option); // select要素の子要素としてoption要素を追加        
    }
}

// 楽曲一覧をtableとして表示
function viewItemList(tag) {
    console.log(tag);
    let target = document.getElementById('itemList');

    // 楽曲一覧を削除
    target.innerHTML = "";

    if (tag !== undefined) {
        let html = "";
        html += "<table>";
        let count = 0;
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].tags.some(t => t === tag)) {
                if (count === 0) {
                  html += "<tr>";
                }

                // 楽曲情報
                html += "<td>";
                html += '<img src="" alt="cdジャケット" width="180" height="180" />';
                html += '<p>曲名：&nbsp;' + itemList[i].name + '</p>';
                html += '<p>' + itemList[i].price + '</p>';
                html += '<p>' + "公式サイト" + '</p>';
                html += '<a href=''>公式サイト</a>';
                html += "</td>";

                if (count == 5)  {   // 商品を横に５つ並べたら次の行に変更
                    html += "</tr>";
                    count = 0;
                } else {
                    count++;
                }
            }
        }
        if (count > 0) html += "</tr>"; // 最後に閉じる
        html += "</table>";
        target.innerHTML = html;
    }
}

//--- イベントリスナーの定義 ---
// 大分類の選択された時のイベントリスナー
cate1Element.addEventListener('change', function(){
    // 選択されば番号を取得
    let idx = cate1Element.selectedIndex;
    // 大分類の選択に合わせて、小分類の生成
    setSubMenu1(idx);
    //　小分類が選択されたときに、最初に表示される値
    viewItemList(cate2[idx][0]);
});

// 小分類の選択された時のイベントリスナー
cate2Element.addEventListener('change', function(){
    
    let idx = cate2Element.selectedIndex;
    
    setSubMenu2(idx);
    
    viewItemList(cate3[idx][0]);
});

cate3Element.addEventListener('change', function(){
    // 選択されば値を取得
    let val = cate3Element.value;
    viewItemList(val);
});
   

// 商品一覧をファイルから取得
$(function () {
    $.ajax({
        url: 'json/item.json',
        dataType: 'json'
    })
    .done(function (data) {
        itemList = data;
        // 大分類の生成
        setMainMenu(); 
    })
    .fail(function () {
        alert("ファイルが読み込めませんでした");
    });
});

$(function () {
    $.ajax({
        url: 'json/cate1.json',
        dataType: 'json'
    })
    .done(function (data) {
        cate1 = data;
        
        setMainMenu();
    })
    .fail(function () {
        alert("ファイルが読み込めませんでした");
    });
});

$(function () {
    $.ajax({
        url: 'json/cate2.json',
        dataType: 'json'
    })
    .done(function (data) {
        cate2 = data;
        
        setMainMenu();
    })
    .fail(function () {
        alert("ファイルが読み込めませんでした");
    });
});