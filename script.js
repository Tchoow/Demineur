/*
      :::::::::  ::::::::::   :::   :::   ::::::::::: ::::    ::: :::::::::: :::    ::: ::::::::: 
     :+:    :+: :+:         :+:+: :+:+:      :+:     :+:+:   :+: :+:        :+:    :+: :+:    :+: 
    +:+    +:+ +:+        +:+ +:+:+ +:+     +:+     :+:+:+  +:+ +:+        +:+    +:+ +:+    +:+  
   +#+    +:+ +#++:++#   +#+  +:+  +#+     +#+     +#+ +:+ +#+ +#++:++#   +#+    +:+ +#++:++#:    
  +#+    +#+ +#+        +#+       +#+     +#+     +#+  +#+#+# +#+        +#+    +#+ +#+    +#+    
 #+#    #+# #+#        #+#       #+#     #+#     #+#   #+#+# #+#        #+#    #+# #+#    #+#     
#########  ########## ###       ### ########### ###    #### ##########  ########  ###    ###
@Tchoow
*/


// Ajout d'un event clique droit sur toute les cases
// 🏳️
// 💣
const gamesize = 14;
var tableauJeu = [];
for (var i = 0; i < gamesize; i++) tableauJeu[i] = [];


function initDefaultTableJeu() {
    for (var i = 0; i < gamesize; i++) {
        for (var j = 0; j < gamesize; j++) {
            tableauJeu[i][j] = {
                "isMine": false,
                "isRevealed": false,
                "isFlagged": false,
                "isQuestion": false,
                "nbMines": 0
            };
        }
    }
}

function initBombeTableJeu() {
    var nbBombe = Math.floor(gamesize * gamesize / 10);
    var nbBombePlaced = 0;
    while (nbBombePlaced < nbBombe) {
        var x = Math.floor(Math.random() * gamesize);
        var y = Math.floor(Math.random() * gamesize);
        if (!tableauJeu[x][y].isMine) {
            tableauJeu[x][y].isMine = true;
            nbBombePlaced++;
        }
    }
}

function getBombesArround() {
    for (var i = 0; i < gamesize; i++) {
        for (var j = 0; j < gamesize; j++) {
            if (tableauJeu[i][j].isMine) {
                if (i > 0) {
                    if (j > 0) tableauJeu[i - 1][j - 1].nbMines++;
                    tableauJeu[i - 1][j].nbMines++;
                    if (j < gamesize - 1) tableauJeu[i - 1][j + 1].nbMines++;
                }
                if (j > 0) tableauJeu[i][j - 1].nbMines++;
                if (j < gamesize - 1) tableauJeu[i][j + 1].nbMines++;
                if (i < gamesize - 1) {
                    if (j > 0) tableauJeu[i + 1][j - 1].nbMines++;
                    tableauJeu[i + 1][j].nbMines++;
                    if (j < gamesize - 1) tableauJeu[i + 1][j + 1].nbMines++;
                }
            }
        }
    }
}

function revealBomnbeArround(x, y) {
    if (tableauJeu[x][y].isMine) {
        tableauJeu[x][y].isRevealed = true;
        return;
    }
    if (tableauJeu[x][y].nbMines > 0) {
        tableauJeu[x][y].isRevealed = true;
        return;
    }


}

function showTableJeu() {
    for (var i = 0; i < gamesize; i++) {
        for (var j = 0; j < gamesize; j++) {
            if (tableauJeu[i][j].isRevealed) {
                if (tableauJeu[i][j].isMine) {
                    document.getElementById(i + "-" + j).innerHTML = "💣";
                    document.getElementById(i + "-" + j).style.background = "#b2bec3";
                } else {
                    document.getElementById(i + "-" + j).innerHTML = tableauJeu[i][j].nbMines;
                    document.getElementById(i + "-" + j).style.background = "#b2bec3";
                    document.getElementById(i + "-" + j).style.color = "#2c3e50";
                }
            } else {
                if (tableauJeu[i][j].isFlagged) {
                    document.getElementById(i + "-" + j).innerHTML = "🏳️";
                } else {
                    document.getElementById(i + "-" + j).innerHTML = "";
                }
            }
        }
    }
}


// sheat mode who reveal all the table
function revealAll() {
    for (var i = 0; i < gamesize; i++) {
        for (var j = 0; j < gamesize; j++) {
            tableauJeu[i][j].isRevealed = true;
        }
    }
    showTableJeu();
}




initDefaultTableJeu();
initBombeTableJeu();
getBombesArround();



const cases = document.querySelectorAll(".case");

for(var i = 0; i < cases.length; i++) {
  cases[i].addEventListener('click', event => {
    var c = event.target.id.split("-");
    var row = parseInt(c[0]);
    var col = parseInt(c[1]);
    revealBomnbeArround(row, col);
    showTableJeu();
  });
}


// Flags
for(var i = 0; i < cases.length; i++) {
  cases[i].addEventListener('contextmenu', event => {
    var c = event.target.id.split("-");
    var row = parseInt(c[0]);
    var col = parseInt(c[1]);
    tableauJeu[row][col].isFlagged = true;
    showTableJeu();
    event.preventDefault();
  });
}
