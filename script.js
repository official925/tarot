// =====================
// 状態
// =====================

let selectedCards = [];
let currentCardIndex = null;

// =====================
// 要素
// =====================

const cardSlots = document.getElementById("cardSlots");
const addCardBtn = document.getElementById("addCardBtn");
const interpretation = document.getElementById("interpretation");

const modal = document.getElementById("cardModal");
const closeModal = document.getElementById("closeModal");
const majorArcana = document.getElementById("majorArcana");

// =====================
// カード一覧（大アルカナ ＋ 小アルカナ全56枚を追加）
// =====================

const cards = [

// 大アルカナ（22枚）
"愚者",
"魔術師",
"女教皇",
"女帝",
"皇帝",
"法王",
"恋人",
"戦車",
"力",
"隠者",
"運命の輪",
"正義",
"吊された男", // 辞書データの表記「吊された男」に統一しました
"死神",
"節制",
"悪魔",
"塔",
"星",
"月",
"太陽",
"審判",
"世界",

// 小アルカナ：ワンド（棒 / 14枚）
"ワンドのエース", "ワンドの2", "ワンドの3", "ワンドの4", "ワンドの5",
"ワンドの6", "ワンドの7", "ワンドの8", "ワンドの9", "ワンドの10",
"ワンドのペイジ", "ワンドのナイト", "ワンドのクイーン", "ワンドのキング",

// 小アルカナ：カップ（聖杯 / 14枚）
"カップのエース", "カップの2", "カップの3", "カップの4", "カップの5",
"カップの6", "カップの7", "カップの8", "カップの9", "カップの10",
"カップのペイジ", "カップのナイト", "カップのクイーン", "カップのキング",

// 小アルカナ：ソード：剣 / 14枚）
"ソードのエース", "ソードの2", "ソードの3", "ソードの4", "ソードの5",
"ソードの6", "ソードの7", "ソードの8", "ソードの9", "ソードの10",
"ソードのペイジ", "ソードのナイト", "ソードのクイーン", "ソードのキング",

// 小アルカナ：ペンタクル（金貨 / 14枚）
"ペンタクルのエース", "ペンタクルの2", "ペンタクルの3", "ペンタクルの4", "ペンタクルの5",
"ペンタクルの6", "ペンタクルの7", "ペンタクルの8", "ペンタクルの9", "ペンタクルの10",
"ペンタクルのペイジ", "ペンタクルのナイト", "ペンタクルのクイーン", "ペンタクルのキング"

];

// =====================
// 初期化
// =====================

renderCardList();

// =====================
// カード選択一覧生成
// =====================

function renderCardList(){

    majorArcana.innerHTML = "";

    cards.forEach(card=>{

        const btn =
        document.createElement("div");

        btn.className =
        "card-button";

        btn.textContent =
        card;

        btn.addEventListener(
            "click",
            ()=>selectCard(card)
        );

        majorArcana.appendChild(btn);

    });

}

// =====================
// カード追加
// =====================

addCardBtn.addEventListener(
"click",
()=>{

    selectedCards.push({

        position:"",
        card:null,
        orientation:"upright"

    });

    renderSlots();

}
);

// =====================
// カードスロット描画
// =====================

function renderSlots(){

    cardSlots.innerHTML = "";

    selectedCards.forEach(
    (item,index)=>{

        const slot =
        document.createElement("div");

        slot.className =
        "card-slot";

        slot.innerHTML = `

        <div class="card-number">
            Card ${index + 1}
        </div>

        <input
            class="position-input"
            placeholder="位置名"
            value="${item.position}"
        >

        <div class="card-name">
            ${item.card || "未選択"}
        </div>

        <div class="card-orientation">
            ${
                item.orientation === "upright"
                ? "正位置"
                : "逆位置"
            }
        </div>

        <div class="card-buttons">

            <button class="select-btn">
                カード選択
            </button>

            <button class="delete-btn">
                削除
            </button>

        </div>

        `;

        const positionInput =
        slot.querySelector(
        ".position-input"
        );

        positionInput.addEventListener(
        "input",
        e=>{

            selectedCards[index]
            .position =
            e.target.value;

            updateInterpretation();

        });

        slot
        .querySelector(".select-btn")
        .addEventListener(
        "click",
        ()=>openCardModal(index)
        );

        slot
        .querySelector(".delete-btn")
        .addEventListener(
        "click",
        ()=>deleteCard(index)
        );

        cardSlots.appendChild(slot);

    });

}

// =====================
// モーダル開く
// =====================

function openCardModal(index){

    currentCardIndex =
    index;

    modal.classList.add(
    "show"
    );

}

// =====================
// モーダル閉じる
// =====================

function closeCardModal(){

    modal.classList.remove(
    "show"
    );

}

closeModal.addEventListener(
"click",
closeCardModal
);

// =====================
// カード選択
// =====================

function selectCard(card){

    if(
    currentCardIndex === null
    ) return;

    const orientation =

    document.querySelector(
    'input[name="modalOrientation"]:checked'
    ).value;

    selectedCards[
    currentCardIndex
    ].card = card;

    selectedCards[
    currentCardIndex
    ].orientation =
    orientation;

    renderSlots();

    updateInterpretation();

    closeCardModal();

}

// =====================
// カード削除
// =====================

function deleteCard(index){

    selectedCards.splice(
        index,
        1
    );

    renderSlots();

    updateInterpretation();

}

// =====================
// 解釈表示
// =====================

function updateInterpretation(){

    interpretation.innerHTML = "";

    selectedCards.forEach(item=>{

        if(!item.card) return;

        const tarot =
        tarotData[item.card];

        const box =
        document.createElement("div");

        box.className =
        "meaning-box";

        if(!tarot){

            box.innerHTML = `

            <h3>

            ${item.position || "未設定"}
            ｜

            ${item.card}

            ${
            item.orientation === "upright"
            ?
            "正位置"
            :
            "逆位置"
            }

            </h3>

            <p>

            このカードのデータは未登録です

            </p>

            `;

            interpretation.appendChild(
            box
            );

            return;

        }

        const info =
        tarot[item.orientation];

        box.innerHTML = `

        <h3>

        ${item.position || "未設定"}

        ｜

        ${item.card}

        ${
        item.orientation === "upright"
        ?
        "正位置"
        :
        "逆位置"
        }

        </h3>

        <p>
        <strong>キーワード</strong>
        </p>

        <ul>

        ${
        info.keyword
        .map(
        k =>
        `<li>${k}</li>`
        )
        .join("")
        }

        </ul>

        <p>

        <strong>意味</strong><br>

        ${info.meaning}

        </p>

        <p>

        <strong>恋愛</strong><br>

        ${info.love || "-"}

        </p>

        <p>

        <strong>仕事</strong><br>

        ${info.work || "-"}

        </p>

        <p>

        <strong>対人関係</strong><br>

        ${info.relation || "-"}

        </p>

        <p>

        <strong>アドバイス</strong><br>

        ${info.advice || "-"}

        </p>

        `;

        interpretation.appendChild(
        box
        );

    });

}

// =====================
// 保存機能（ローカルストレージ）
// =====================

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    generateTSV();

    const history = JSON.parse(localStorage.getItem("tarot_history") || "[]");

    history.push(output.value);

    localStorage.setItem("tarot_history", JSON.stringify(history));

    alert("保存しました");
});

const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");

function generateTSV() {

    const date = document.getElementById("date").value;
    const client = document.getElementById("client").value;
    const birth = document.getElementById("birth").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const category = document.getElementById("category").value;

    const situation = document.getElementById("situation").value;
    const question = document.getElementById("question").value;
    const memo = document.getElementById("memo").value;

    const spread = "カスタム";

    const cardsText = selectedCards
        .filter(c => c.card)
        .map(c =>
            `${c.position || "未設定"}:${c.card}(${c.orientation === "upright" ? "正" : "逆"})`
        )
        .join(" | ");

    const interpretationText = interpretation.innerText.replace(/\n/g, " ");

    const tsv = [
        date,
        client,
        birth,
        age,
        gender,
        category,
        situation,
        question,
        spread,
        cardsText,
        interpretationText,
        "",
        "",
        memo
    ].join("\t");

    output.value = tsv;

    // コピー
    navigator.clipboard.writeText(tsv);
}

// ボタン接続
copyBtn.addEventListener("click", generateTSV);

document.getElementById("year").textContent = new Date().getFullYear();