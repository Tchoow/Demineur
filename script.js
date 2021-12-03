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
var nbCliques  =  0;


for (var i = 0; i < gamesize; i++) tableauJeu[i] = [];
const wrapper = document.querySelector('body');

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

function initBombeTableJeu(row, col) {
    var nbBombe = Math.floor(gamesize * gamesize / 5);
    var nbBombePlaced = 0;
    while (nbBombePlaced < nbBombe) {
        var x = Math.floor(Math.random() * gamesize);
        var y = Math.floor(Math.random() * gamesize);
        if (!tableauJeu[x][y].isMine) {
            tableauJeu[x][y].isMine = true;
            nbBombePlaced++;
        }
    }
    tableauJeu[row][col].isMine  = false;
    tableauJeu[row][col].nbMines = 0;
    tableauJeu[row+1][col].isMine  = false;
    tableauJeu[row+1][col].nbMines = 0;
    tableauJeu[row][col+1].isMine  = false;
    tableauJeu[row][col+1].nbMines = 0;
    tableauJeu[row-1][col].isMine  = false;
    tableauJeu[row-1][col].nbMines = 0;
    tableauJeu[row][col-1].isMine  = false;
    tableauJeu[row][col-1].nbMines = 0;
    tableauJeu[row+1][col+1].isMine  = false;
    tableauJeu[row+1][col+1].nbMines = 0;
    tableauJeu[row-1][col-1].isMine  = false;
    tableauJeu[row-1][col-1].nbMines = 0;
    tableauJeu[row+1][col-1].isMine  = false;
    tableauJeu[row+1][col-1].nbMines = 0;
    tableauJeu[row-1][col+1].isMine  = false;
    tableauJeu[row-1][col+1].nbMines = 0;
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
    
    if (tableauJeu[x][y].isRevealed) return;
    if (tableauJeu[x][y].isMine) {
        revealAll();
        wrapper.style.background = "#e74c3c";
        return;
    }
    tableauJeu[x][y].isRevealed = true;
    if (tableauJeu[x][y].nbMines == 0) {
        if (x > 0) {
            if (y > 0) revealBomnbeArround(x - 1, y - 1);
            revealBomnbeArround(x - 1, y);
            if (y < gamesize - 1) revealBomnbeArround(x - 1, y + 1);
        }
        if (y > 0) revealBomnbeArround(x, y - 1);
        if (y < gamesize - 1) revealBomnbeArround(x, y + 1);
        if (x < gamesize - 1) {
            if (y > 0) revealBomnbeArround(x + 1, y - 1);
            revealBomnbeArround(x + 1, y);
            if (y < gamesize - 1) revealBomnbeArround(x + 1, y + 1);
        }
    }
    showTableJeu();

}

function styleUpdater(i, j) {

  switch (tableauJeu[i][j].nbMines) {
    case 1:
      document.getElementById(i + "-" + j).style.color = "#2c3e50";
      break;
    case 2:
      document.getElementById(i + "-" + j).style.color = "#27ae60";
      break;
    case 3:
      document.getElementById(i + "-" + j).style.color = "#e67e22";
      break;
    case 4:
      document.getElementById(i + "-" + j).style.color = "#e74c3c";
      break;
    case 5:
      document.getElementById(i + "-" + j).style.color = "#9b59b6";
      break;
    case 6:
      document.getElementById(i + "-" + j).style.color = "#f1c40f";
      break;
    case 7:
      document.getElementById(i + "-" + j).style.color = "#1abc9c";
      break;
    case 8:
      document.getElementById(i + "-" + j).style.color = "#34495e";
      break;
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
                    if (tableauJeu[i][j].nbMines == 0) {
                        document.getElementById(i + "-" + j).innerHTML = "";
                        document.getElementById(i + "-" + j).style.background = "#b2bec3";
                    } else {
                    
                      document.getElementById(i + "-" + j).innerHTML = tableauJeu[i][j].nbMines;
                      document.getElementById(i + "-" + j).style.background = "#b2bec3";
                      styleUpdater(i, j);
                    }
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


// Reveal Bombes
const cases = document.querySelectorAll(".case");
for(var i = 0; i < cases.length; i++) {
  cases[i].addEventListener('click', event => {
    var c = event.target.id.split("-");
    var row = parseInt(c[0]);
    var col = parseInt(c[1]);
    // Reveal the bomb if the case has no flag

    if ( nbCliques == 0 ) {
      initDefaultTableJeu();
      initBombeTableJeu(row, col);
      getBombesArround();
      revealBomnbeArround(row, col);
    }
    else {
      if (!tableauJeu[row][col].isFlagged) {
        revealBomnbeArround(row, col);
      }
    }

    //console.log(nbCliques);

    nbCliques++;
    showTableJeu();
  });
}


// Flags
for(var i = 0; i < cases.length; i++) {
  cases[i].addEventListener('contextmenu', event => {
    var c = event.target.id.split("-");
    var row = parseInt(c[0]);
    var col = parseInt(c[1]);
    if (!tableauJeu[row][col].isFlagged) {
      tableauJeu[row][col].isFlagged = true;
    }
    else {
      tableauJeu[row][col].isFlagged = false;
    }
    
    showTableJeu();
    event.preventDefault();
  });
}