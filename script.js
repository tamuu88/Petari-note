const addButton = document.getElementById("addButton");
const memoList = document.getElementById("memoList");

let memos = JSON.parse(localStorage.getItem("memos") || "[]");

function saveMemos() {
  localStorage.setItem("memos", JSON.stringify(memos));
}

function showMemos() {
  memoList.innerHTML = "";

  memos.forEach((memo) => {
    const memoElement = document.createElement("div");
    memoElement.className = "memo";

    memoElement.innerHTML = `
      <button class="deleteButton">×</button>
      <textarea>${memo.text}</textarea>
    `;

    const textarea = memoElement.querySelector("textarea");
    const deleteButton = memoElement.querySelector(".deleteButton");

    textarea.addEventListener("input", () => {
      memo.text = textarea.value;
      saveMemos();
    });

    deleteButton.addEventListener("click", () => {
      memos = memos.filter((item) => item.id !== memo.id);
      saveMemos();
      showMemos();
    });

    memoList.appendChild(memoElement);
  });
}

addButton.addEventListener("click", () => {
  memos.push({
    id: Date.now(),
    text: ""
  });

  saveMemos();
  showMemos();
});

showMemos();
