
let row = 180;
let column = 180;
let cellSide = 10;
let state = [];


// document.addEventListener("keydown", (e) => {
//     switch (e.key) {
//         case "m":

//             nextGenerationStage()
//             break;

//         case "n":
           
//             break;
//     }

// })

function createUniverseAleatory() {

    let html = `<table id="table">`;
    for (let r = 0; r < row; r++) {
        html += "<tr>"
        for (let c = 0; c < column; c++) {
            let variable = Math.floor(Math.random() * 10)
            if (variable <= 3) {
            
                html += `<td style="background:black" id="cell-${"column " + c + " - " + "row " + r}" onmouseup="changeState(${c}, ${r})">`
                html += "</td>"
                                          
            }
            else {
                html += `<td id="cell-${"column " + c + " - " + "row " + r}" onmouseup="changeState(${c}, ${r})">`
                html += "</td>"

            }
        }
        html += "</tr>"
    }
    html += "</table>"
    let universe = document.getElementById("universeTable");
    universe.innerHTML = html
    let table = document.getElementById("table");
    table.style.width = cellSide * column + "px"
    table.style.height = cellSide * row + "px"
}

function createUniverse() {
    let html = `<table id="table">`;
    for (let r = 0; r < row; r++) {
        html += "<tr>"
        for (let c = 0; c < column; c++) {
            html += `<td id="cell-${"column " + c + " - " + "row " + r}" onmouseup="changeState(${c}, ${r})">`
            html += "</td>"
        }
        html += "</tr>"
    }
    html += "</table>"
    let universe = document.getElementById("universeTable");
    universe.innerHTML = html
    let table = document.getElementById("table");
    table.style.width = cellSide * column + "px"
    table.style.height = cellSide * row + "px"
}

function changeState(c, r) {
    let cell = document.getElementById(`cell-${"column " + c + " - " + "row " + r}`);
    if (cell.style.background != "black") {
        cell.style.background = "black"
    }
    else {
        cell.style.background = ""
    }
}

function actualState() {
    state = []
    for (let c = 0; c < column; c++) {
        state.push([])
        for (let r = 0; r < row; r++) {
            let cell = document.getElementById(`cell-${"column " + c + " - " + "row " + r}`)
            state[c][r] = cell.style.background == "black"
        }
    }
}

function stateCount(c, r) {
    let liveCell = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0)
                continue
            try {
                if (state[c + i][r + j])
                    liveCell++
            } catch (e) { }
            if (liveCell > 3) {
                return liveCell
            }
        }
    }
    return liveCell
}

function nextGenerationStage() {
    actualState()

    for (let c = 0; c < column; c++) {
        for (let r = 0; r < row; r++) {
            let liveCell = stateCount(c, r)
            let cell = document.getElementById(`cell-${"column " + c + " - " + "row " + r}`)

            if (state[c][r]) {
                if (liveCell < 2 || liveCell > 3)
                    cell.style.background = ""
            } else {
                if (liveCell == 3)
                    cell.style.background = "black"
            }
        }
    }
}

// createUniverse()
createUniverseAleatory()
setInterval(() => {
    nextGenerationStage()  
}, 100);