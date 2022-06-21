const submittedData = [];

function generateSeatMap(row, col) {
    const mapTable = document.getElementById("seat-map");
    mapTable.innerHTML = "<h5>choose a seat (also more than 1)</h5>";
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
const backToForm = document.getElementById("backToForm");
const btnAdmin = document.getElementById("btnAccessoAdmin");
const form = document.getElementById("main-form");
const formGoups = [...document.getElementsByClassName("form-group")];
window.groupIndex = 0;

nextBtns.forEach((btn) => btn.addEventListener("click", handleNextClick));
previousBtns.forEach((btn) =>
    btn.addEventListener("click", handlePreviusClick)
);

backToForm.addEventListener("click", () => {
    window.groupIndex = 0;
    updateVisibleGroup();
});

form.addEventListener("submit", handleSubmit);

btnAdmin.addEventListener("click", handleBtnAdminClick);

formGoups.forEach((form) => {
    form.addEventListener("animationend", () => {
        formGoups[groupIndex].classList.remove("hide");
        form.classList.toggle("hide", !form.classList.contains("active"));
    });
});

function handleSubmit(e) {
    e.preventDefault();
    formGoups[2].classList.add("hide");
    formGoups[2].classList.add("active");

    const cells = [...document.querySelectorAll("#seat-map .cell")];

    cells.forEach((cell) => cell.classList.remove("selected"));
    form.reset();

    window.groupIndex++;
    formGoups[groupIndex].classList.remove("hide");
    updateVisibleGroup();
}

function handleCellClick({ target }) {
    target.classList.toggle("selected");
}

function handlePreviusClick() {
    window.groupIndex--;
    updateVisibleGroup();
}

function handleNextClick() {
    window.groupIndex++;
    if (window.groupIndex == 2) {
        createSummary();
    }
    updateVisibleGroup();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function createSummary() {
    const name = capitalize(document.getElementById("txtName").value);
    const surname = capitalize(document.getElementById("txtSurname").value);
    const birth_date = document.getElementById("dtBirthdate").value;
    const seatCoords = [
        ...document.querySelectorAll("#seat-map  .cell.selected"),
    ]
        .map(
            (seat) =>
                `riga: ${+seat.dataset.row + 1}\ncolonna: ${
                    +seat.dataset.col + 1
                }`
        )
        .join("-");

    const summmary_container = document.getElementById("summary-container");

    summmary_container.innerHTML = "";

    summmary_container.innerHTML += `
        <div>
            <h5>Nome: </h5> ${name || `inserisci un nome valido`}
        </div>
        <div>
            <h5>Cognome: </h5> ${surname || `inserisci un cognome valido`}
        </div>
        <div>
            <h5>Data di nascita: </h5> ${
                birth_date || `inserisci una data di nascita valida`
            }
        </div>
        <div>
            <h5>Posto/i scelto/i: </h5> ${
                seatCoords.replace("-", "\n") || `scegli almeno un posto `
            }
        </div>
    `;

    submittedData.push({
        name: name,
        surname: surname,
        birthDate: birth_date,
        seat: seatCoords,
    });

    console.log(submittedData);
}

function updateVisibleGroup() {
    formGoups.forEach((group, i) => {
        group.classList.toggle("active", i === groupIndex);
    });
}

function handleBtnAdminClick() {
    const container = document.createElement("div");
    container.classList.add("container", "data-container");

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    thead.innerHTML = `
            <tr>
                <th>Nome Completo</th> <th>Data di Nascita</th> <th>Posti selzionati</th>
            </tr>`;

    for (const { name, surname, birthDate, seat } of submittedData) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${
                name + " " + surname
            }</td><td>${birthDate}</td><td><select>${seat
            .split("-")
            .map(
                (seat) => "<option>" + seat.replace("\n", " ") + "</option>"
            )}</select></td>
        `;
        tbody.append(tr);
    }

    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = "chiudi";
    btn.onclick = () => {
        container.remove();
    };

    table.append(thead);
    table.append(tbody);
    container.append(table);
    container.append(btn);
    document.body.append(container);
}

generateSeatMap(8, 8);
updateVisibleGroup();
