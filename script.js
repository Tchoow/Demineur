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
                      document.getElementById(i + "-" + j).style.color = "#2c3e50";
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




initDefaultTableJeu();
initBombeTableJeu();
getBombesArround();


// Reveal Bombes
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



/*

function initBombe() {
  for (var i = 0; i < gamesize; i++) {
    for (var y = 0; y < gamesize; y++) {
        if ( Math.floor(Math.random() * 6) == 1) tableauJeu[i][y] = "B";
        else tableauJeu[i][y] = "0";


    }
  }
}

function initNumbers() {
  for (var i = 0; i < gamesize; i++) {
    for (var y = 0; y < gamesize; y++) {
      if ( tableauJeu[i][y] !== "B") {
        var nbBombeAutour = 0;
        
          if (y > 0) {
            if ( tableauJeu[i][y+1]   == "B" ) nbBombeAutour++;
          }
          
          if (y < gamesize-1) {
            if ( tableauJeu[i][y-1]   == "B" ) nbBombeAutour++;
          }
          
          if (i > 0) {
            if ( tableauJeu[i-1][y]   == "B" ) nbBombeAutour++;
          }
          
          if (i < gamesize-1) {
            if ( tableauJeu[i+1][y]   == "B" ) nbBombeAutour++;
          }
        
          if ( i > 0 && y > 0) {
            if ( tableauJeu[i-1][y-1] == "B" ) nbBombeAutour++;
          }
        
          if (i < gamesize -1 && y < gamesize-1 ) {

            if ( tableauJeu[i+1][y+1] == "B" ) nbBombeAutour++;
          }
        
          if (i > gamesize-1 && y > 0) {
            if ( tableauJeu[i+1][y-1] == "B" ) nbBombeAutour++;
          }
        
          if (i > 0 && y <  gamesize-1) {
            if ( tableauJeu[i-1][y+1] == "B" ) nbBombeAutour++;
          }
        tableauJeu[i][y] = nbBombeAutour;
        
      }

    }
  }
}

function cheat() {
  for (var i = 0; i < gamesize; i++) {
    for (var y = 0; y < gamesize; y++) {
      document.write(tableauJeu[i][y])
    }
    document.write("<br>")
  }
}

// Init plateau;
initBombe();

//initNumbers();
// Init refresh;
cheat()


// Restart game;


const cases = document.querySelectorAll(".case");

for(var i = 0; i < cases.length; i++) {
  cases[i].addEventListener('click', event => {
    //console.log(event.originalTarget)
    revealAllCase(event.originalTarget)
  });
}

function revealOneCase(row, col) {
  var libCase;
  var c = document.getElementById(`${row}-${col}`);
  console.log("row : " + row + " col " + row)
  if (tableauJeu[row][col] !== "B" && col < gamesize -1) {
    switch (tableauJeu[row][col]) {
      case "B" : libCase = "💣"; break;
      case  1  : libCase = 1   ; c.style.color = "#44bd32"; break;
      case  2  : libCase = 2   ; c.style.color = "#487eb0"; break;
      case  3  : libCase = 3   ; c.style.color = "#273c75"; break;
      case  4  : libCase = 4   ; c.style.color = "#ffa502"; break;
      case  5  : libCase = 5   ; c.style.color = "#ff6348"; break;
      case  6  : libCase = 6   ; c.style.color = "#e84118"; break;
      case  7  : libCase = 7   ; c.style.color = "#e84118"; break;
      case  8  : libCase = 8   ; c.style.color = "#e84118"; break;
      default :  libCase = " " ; break;
    }
    c.innerHTML = libCase;
    c.style.background = "#a4b0be";
    
    revealOneCase(row, col+1);
  }

}

function revealAllCase(c) {
    var row = c.id.split("-")[0];
    var col = c.id.split("-")[1];
    
    if (tableauJeu[row][col] !== "B" ) {
      revealOneCase(row, col);
    }

}

function revealCase(c) {
    var libCase;
    var row = c.id.split("-")[0];
    var col = c.id.split("-")[1];
    switch (tableauJeu[row][col]) {
      case "B" : libCase = "💣"; break;
      case  1  : libCase = 1   ; c.style.color = "#44bd32"; break;
      case  2  : libCase = 2   ; c.style.color = "#487eb0"; break;
      case  3  : libCase = 3   ; c.style.color = "#273c75"; break;
      case  4  : libCase = 4   ; c.style.color = "#ffa502"; break;
      case  5  : libCase = 5   ; c.style.color = "#ff6348"; break;
      case  6  : libCase = 6   ; c.style.color = "#e84118"; break;
      case  7  : libCase = 7   ; c.style.color = "#e84118"; break;
      case  8  : libCase = 8   ; c.style.color = "#e84118"; break;
      default :  libCase = " " ;
    }
    c.innerHTML = libCase;
    c.style.background = "#a4b0be"
}

function revealTable() {
  for(var i = 0; i < cases.length; i++) {
    revealCase(cases[i])
  }
}

revealTable();

// Drapeau
window.oncontextmenu = function ()
{
      var x = event.clientX;
      var y = event.clientY;
      var elementMouseIsOver = document.elementFromPoint(x, y);
      var elements = document.querySelectorAll(':hover');
  
      if (elements[4] !== 'undefined' ) {
        if (elements[4].innerHTML == "🏳️") {
          elements[4].innerHTML = "";
          return false;
        }

        if (elements[4].innerHTML == "") {
          elements[4].innerHTML = "🏳️";
          return false;
        }
      }
      return false;
}




function revealBomnbeArround(x, y) {
    

    if (tableauJeu[x][y].isMine) {
        revealAll()
        return;
    }

    if (tableauJeu[x][y].nbMines > 0) {
        tableauJeu[x][y].isRevealed = true;
        return;
    }
    else {
      tableauJeu[x][y].isRevealed = true;
      return;
    }
}

*/