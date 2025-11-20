let savedInput = [];
const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("button-el");
const ulEl = document.getElementById("ul-el");
const downloadBtn = document.getElementById("download-btn");

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

        const link = document.createElement("a");
        link.href = item.text;
        link.textContent = item.text;
        link.target = "_blank";
        li.appendChild(link);

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

downloadBtn.addEventListener("click", function () {
    let csvContent = "data:text/csv;charset=utf-8,Job Link\n";
    savedInput.forEach(function (item) {
        csvContent += item.text + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "job_links.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

