function generateSeatMap(row, col) {
    const mapTable = document.getElementById("seat-map");
    mapTable.innerHTML = "";
    for (let i = 0; i < row; i++) {
        mapTable.innerHTML += `
            <div class="row">
            ${new Array(col <= 12 && col > 0 ? col : 10)
                .fill("")
                .map(
                    (val, j) =>
                        `<div data-row="${i}" data-col="${j}" class="col cell">${val}</div>`
                )
                .join("")}
            </div>
        `;
    }
    const cells = [...document.querySelectorAll("#seat-map .cell")];
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
}

const nextBtns = [...document.querySelectorAll("[data-next]")];
const previousBtns = [...document.querySelectorAll("[data-previous]")];

nextBtns.forEach((btn) => btn.addEventListener("click", handleNextClick));
previousBtns.forEach((btn) =>
    btn.addEventListener("click", handlePreviusClick)
);

function handleCellClick({ target }) {
    if (target.classList.contains("selected")) return;

    target.classList.add("selected");
}

function handlePreviusClick() {
    window.groupIndex--;
    updateVisibleGroup();
}

function handleNextClick() {
    window.groupIndex++;
    updateVisibleGroup();
}

function updateVisibleGroup() {
    formGoups.forEach((group, i) => {
        if (i === groupIndex) {
            group.classList.add("active");
            group.classList.remove("hide");
        } else {
            group.classList.add("hide");
            group.classList.remove("active");
        }
    });
}

const formGoups = [...document.getElementsByClassName("form-group")];
window.groupIndex = 0;

generateSeatMap(6, 10);
updateVisibleGroup();
