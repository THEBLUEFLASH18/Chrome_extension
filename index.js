let savedInput = [];
const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("button-el");
const ulEl = document.getElementById("ul-el");

function render() {
    ulEl.innerHTML = "";
    for (let i = 0; i < savedInput.length; i++) {
        const item = savedInput[i];
        const li = document.createElement("li");

        const numberSpan = document.createElement("span");
        numberSpan.textContent = (i + 1) + ".";
        numberSpan.className = "number";
        li.appendChild(numberSpan);

        const checkmark = document.createElement("span");
        checkmark.className = "checkmark" + (item.isChecked ? " checked" : "");
        checkmark.textContent = "✔";
        checkmark.addEventListener("click", function () {
            item.isChecked = !item.isChecked;
            render();
        });
        li.appendChild(checkmark);

        const textNode = document.createTextNode(item.text);
        li.appendChild(textNode);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            savedInput.splice(i, 1);
            render();
        });
        li.appendChild(deleteBtn);

        ulEl.appendChild(li);
    }
}

buttonEl.addEventListener("click", function () {
    if (inputEl.value) {
        savedInput.push({ text: inputEl.value, isChecked: false });
        inputEl.value = "";
        render();
    }
});

