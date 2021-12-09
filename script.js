/*
      :::::::::  ::::::::::   :::   :::   ::::::::::: ::::    ::: :::::::::: :::    ::: ::::::::: 
     :+:    :+: :+:         :+:+: :+:+:      :+:     :+:+:   :+: :+:        :+:    :+: :+:    :+: 
    +:+    +:+ +:+        +:+ +:+:+ +:+     +:+     :+:+:+  +:+ +:+        +:+    +:+ +:+    +:+  
   +#+    +:+ +#++:++#   +#+  +:+  +#+     +#+     +#+ +:+ +#+ +#++:++#   +#+    +:+ +#++:++#:    
  +#+    +#+ +#+        +#+       +#+     +#+     +#+  +#+#+# +#+        +#+    +#+ +#+    +#+    
 #+#    #+# #+#        #+#       #+#     #+#     #+#   #+#+# #+#        #+#    #+# #+#    #+#     
#########  ########## ###       ### ########### ###    #### ##########  ########  ###    ###
@Tchoow
Github : https://github.com/Tchoow
*/


// 🏳️
// 💣

const gamesize     = 14;
var tableauJeu     = [];
var nbCliques      = 0;
var nbGameFlags    = 0;
var nbGameBombes   = 0;
var GameTimerValue = 000;
var loopActualisation;

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

function updateTopBar() {
   document.querySelector(".bombes").innerHTML = "💣 "+nbGameBombes;
   document.querySelector(".flags").innerHTML = "🏳️ "+nbGameFlags;
   GameTimerValue = GameTimerValue.toString();
   while (GameTimerValue.length < 3) GameTimerValue = "0" + GameTimerValue;
   document.querySelector(".timer").innerHTML = "⏱️ "+GameTimerValue;

   GameTimerValue++;
}

function resetTopBar() {
  nbGameBombes = nbGameFlags = GameTimerValue = 0;
  document.querySelector(".bombes").innerHTML = "💣 --";
  document.querySelector(".flags").innerHTML = "🏳️ --";
  document.querySelector(".timer").innerHTML = "⏱️ ---";
  
  clearInterval(loopActualisation);
}

function initTopBar() {
  loopActualisation = window.setInterval(function(){
    updateTopBar()
  }, 1000);
}



function initBombeTableJeu(row, col) {
    var nbBombe = Math.floor(gamesize * gamesize / 10);
    var nbBombePlaced = 0;
    nbGameBombes = nbGameFlags = nbBombe;
    initTopBar()
    while (nbBombePlaced < nbBombe) {
        var x = Math.floor(Math.random() * gamesize);
        var y = Math.floor(Math.random() * gamesize);
        if (!tableauJeu[x][y].isMine) {
            tableauJeu[x][y].isMine = true;
            nbBombePlaced++;
        }
    }
    try {

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
    } catch (error) {
      console.error(error);
    }

}

function resetGame() {
  nbCliques = 0;
  initDefaultTableJeu();
  resetStyleDefault();
  showTableJeu();
  resetTopBar();
  
  // reset the color of the body
  wrapper.style.background = "#333333";
  wrapper.style.backgroundImage ="url('data:image/svg+xml,%3Csvg width=\"52\" height=\"26\" viewBox=\"0 0 52 26\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')";

}


// Conditions de victoire
function isWin() {
  var bIsWin = true;
  
  for (var i = 0; i < gamesize; i++) {
    for (var j = 0; j < gamesize; j++) {
        if ( !tableauJeu[i][j].isMine && !tableauJeu[i][j].isRevealed  ) bIsWin = false;
    }
  }
  return bIsWin;
}

// Conditions de défaite
function isLoose() {
  
  for (var i = 0; i < gamesize; i++) {
    for (var j = 0; j < gamesize; j++) {
        if (tableauJeu[i][j].isMine && tableauJeu[i][j].isRevealed) {
            revealAll();
            wrapper.style.background = "#e74c3c";
            clearInterval(loopActualisation);
            return true;
      }

    }
  }
  return false;
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


function resetStyleDefault() {
    for (var i = 0; i < gamesize; i++) {
        for (var j = 0; j < gamesize; j++) {
          document.getElementById(i + "-" + j).style.background = "#636e72";
        }
    }
}

function revealBomnbeArround(x, y) {
    
    if (tableauJeu[x][y].isRevealed) return;
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
    var c   = event.target.id.split("-");
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
        if ( ! isLoose() ) {
          if(isWin()) {
            wrapper.style.background = "#27ae60";
            revealAll();
            clearInterval(loopActualisation);
          }
        };
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
      if (nbGameFlags > 0) {
        tableauJeu[row][col].isFlagged = true;
        nbGameFlags--;
      }

    }
    else {
      tableauJeu[row][col].isFlagged = false;
      nbGameFlags++;
    }
    
    showTableJeu();

    event.preventDefault();

  });
}
