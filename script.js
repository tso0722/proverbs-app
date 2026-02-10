let proverbs = {};
let currentChapter = 1;
let selected = new Set();

fetch("/api/proverbs")
    .then(res => res.json())
    .then(data => {
        proverbs = data;
        showChapter(1);
    });

function showChapter(ch) {
    currentChapter = ch;
    selected.clear();

    const versesDiv = document.getElementById("verses");
    versesDiv.innerHTML = "";

    document.getElementById("chapterTitle").innerText =
        `잠언 ${ch}장 (개역개정)`;

    const verses = proverbs[ch];

    for (let v in verses) {
        const div = document.createElement("div");
        div.className = "verse";
        div.innerText = `${v}절  ${verses[v]}`;

        div.onclick = () => toggle(div, `${ch}:${v}`);
        versesDiv.appendChild(div);
    }
}

function toggle(el, key) {
    if (selected.has(key)) {
        selected.delete(key);
        el.classList.remove("selected");
    } else {
        selected.add(key);
        el.classList.add("selected");
    }
}

function prevChapter() {
    if (currentChapter > 1)
        showChapter(currentChapter - 1);
}

function nextChapter() {
    if (currentChapter < 31)
        showChapter(currentChapter + 1);
}

function copySelected() {
    if (selected.size === 0) {
        alert("선택된 절이 없습니다");
        return;
    }

    let result = [];
    [...selected].sort().forEach(k => {
        const [ch, v] = k.split(":");
        result.push(`${ch}장 ${v}절  ${proverbs[ch][v]}`);
    });

    navigator.clipboard.writeText(result.join("\n"));
    alert("복사 완료!");
}
