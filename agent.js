onmessage = (e) => {
    chooseMove(e);
}

async function chooseMove(e) {
    console.log("Recieved message from main script");
    let board = e.data[1];
    let playerNumber = e.data[2];
    let otherPlayerNumber = e.data[3];
    let depthLimit = e.data[4];
    let agent = new AlphaBetaPlayer(playerNumber, otherPlayerNumber, depthLimit);
    let move = agent.getAlphaBetaMove(board);
    console.log("Posting message back to main thread");
    postMessage(move);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class AlphaBetaPlayer {
    constructor(playerNumber, otherPlayerNumber, depthLimit) {
        this.playerNumber = playerNumber;
        this.otherPlayerNumber = otherPlayerNumber;
        this.depthLimit = depthLimit;
    }

    getAlphaBetaMove(board) {

        console.log("Base Depth: " + this.depthLimit);

        let possibleDepths = [];

        possibleDepths.push(Number(this.depthLimit));
        if (this.depthLimit < 5) {
            possibleDepths.push(Number(this.depthLimit) + 1);
        }
        if (this.depthLimit > 1) {
            possibleDepths.push(Number(this.depthLimit) - 1);
        }

        this.depthLimit = possibleDepths[Math.floor(Math.random() * possibleDepths.length)];
        
        console.log("Actual depth: " + this.depthLimit);

        // YOUR ALPHA-BETA CODE GOES HERE
        let alpha = Number.NEGATIVE_INFINITY;
        let beta = Number.POSITIVE_INFINITY;
        let moves = this.getValidMoves(board);
        let bestMove = [moves[0], Number.NEGATIVE_INFINITY];

        for (let move of moves) {
            let newBoard = JSON.parse(JSON.stringify(board));
            this.makeMove(newBoard, move, this.playerNumber);
            let utility = this.abRecursive(newBoard, alpha, beta, this.depthLimit, this.otherPlayerNumber);
            console.log("Move: " + move + ", Utility: " + utility);

            if (this.isWinningState(newBoard, this.playerNumber)) {
                // if it's a winning move, just return it
                return move;
            }

            if (utility > bestMove[1]) {
                bestMove = [move, utility];
                alpha = utility;
            }

            if (utility === bestMove[1] && Math.abs(move - 3) < Math.abs(bestMove[0] - 3)) {
                bestMove = [move, utility];
                alpha = utility;
            }
        }

        return bestMove[0];
    }

    abRecursive(board, alpha, beta, depth, currPlayerNumber) {
        if (depth === 0 || this.isWinningState(board, this.playerNumber) || this.isWinningState(board, this.otherPlayerNumber)) {
            let value = this.evaluationFunction(board);
            return value;
        }

        if (currPlayerNumber === this.playerNumber) {
            // maximizing
            let v = Number.NEGATIVE_INFINITY;
            let moves = this.getValidMoves(board);

            for (let move of moves) {
                let newBoard = JSON.parse(JSON.stringify(board));
                let validMoves = this.getValidMoves(board);

                if (validMoves.includes(move)) {
                    this.makeMove(newBoard, move, currPlayerNumber);
                }

                v = Math.max(v, this.abRecursive(newBoard, alpha, beta, depth - 1, this.otherPlayerNumber));

                if (v > beta) {
                    break;
                }

                alpha = Math.max(alpha, v);
            }

            return v;
        } else {
            // minimizing
            let v = Number.POSITIVE_INFINITY;
            let moves = this.getValidMoves(board);

            for (let move of moves) {
                let newBoard = JSON.parse(JSON.stringify(board));
                let validMoves = this.getValidMoves(newBoard);

                if (validMoves.includes(move)) {
                    this.makeMove(newBoard, move, currPlayerNumber);
                }

                v = Math.min(v, this.abRecursive(newBoard, alpha, beta, depth - 1, this.playerNumber));

                if (v < alpha) {
                    break;
                }

                beta = Math.min(beta, v);
            }

            return v;
        }
    }

    getValidMoves(board) {
        const validMoves = [];
        for (let c = 0; c < 7; c++) {
            if (board[c][0] === 0) {
                validMoves.push(c);
            }
        }
        return validMoves;
      }

    makeMove(board, colIndex, playerNumber) {
        if (board[colIndex][0] == 0) {
            let rowIndex = this.getRowForMove(board, colIndex);
            board[colIndex][rowIndex] = playerNumber;
          }
    }

    getRowForMove(board, colIndex) {
        if (board[colIndex][5] == 0) {
          return 5;
        } else if (board[colIndex][4] == 0) {
          return 4;
        } else if (board[colIndex][3] == 0) {
          return 3;
        } else if (board[colIndex][2] == 0) {
          return 2;
        } else if (board[colIndex][1] == 0) {
          return 1;
        } else if (board[colIndex][0] == 0) {
          return 0;
        }
      }

    isWinningState(board, playerNum) {

        const playerWinStr = `${playerNum}${playerNum}${playerNum}${playerNum}`;

        function checkHorizontal(b) {
            for (const row of b) {
                if (row.join('').includes(playerWinStr)) {
                    return true;
                }
            }
            return false;
        }
    
        function checkVertical(b) {
            return checkHorizontal(b[0].map((_, i) => b.map(row => row[i])));
        }
    
        function checkDiagonal(b) {
          for (let op of [null, (board) => [...board].map(row => row.reverse())]) {
              let opBoard = op ? op([...b]) : [...b];
    
              let rootDiag = opBoard.map((row, i) => row[i]).map(Number);
              if (rootDiag.join('').includes(playerWinStr)) {
                  return true;
              }
    
              for (let i = 1; i <= b[0].length - 3; i++) {
                  for (let offset of [i, -i]) {
                      let diag = opBoard.map((row, j) => row[j + offset]).map(Number);
                      if (diag.join('').includes(playerWinStr)) {
                          return true;
                      }
                  }
              }
          }
    
          return false;
        }
    
        return checkHorizontal(board) || checkVertical(board) || checkDiagonal(board);

    }

    evaluationFunction(board) {

        if (this.isWinningState(board, this.otherPlayerNumber)) {
            return -1000;
        };
        if (this.isWinningState(board, this.playerNumber)) {
            return 1000;
        };

        let primaryThreats = this.countPrimaryThreats(board, this.playerNumber, this.otherPlayerNumber);
        let secondaryThreats = this.countSecondaryThreats(board, this.playerNumber, this.otherPlayerNumber);

        return primaryThreats + secondaryThreats;
    }

    countPrimaryThreats(board, playerNum, otherPlayerNum) {

        let utility = 0

        utility += this.countThreats(board, `${playerNum}${playerNum}${playerNum}0`);
        utility += this.countThreats(board, `0${playerNum}${playerNum}${playerNum}`);
        utility += this.countThreats(board, `${playerNum}0${playerNum}${playerNum}`);
        utility += this.countThreats(board, `${playerNum}${playerNum}0${playerNum}`);
        utility += 20 * this.countThreats(board, `0${playerNum}${playerNum}${playerNum}0`);

        utility -= this.countThreats(board, `${otherPlayerNum}${otherPlayerNum}${otherPlayerNum}0`);
        utility -= this.countThreats(board, `0${otherPlayerNum}${otherPlayerNum}${otherPlayerNum}`);
        utility -= this.countThreats(board, `${otherPlayerNum}0${otherPlayerNum}${otherPlayerNum}`);
        utility -= this.countThreats(board, `${otherPlayerNum}${otherPlayerNum}0${otherPlayerNum}`);
        utility -= 20 * this.countThreats(board, `0${otherPlayerNum}${otherPlayerNum}${otherPlayerNum}0`);

        return utility;

    }

    countSecondaryThreats(board, playerNum, otherPlayerNum) {

        let utility = 0

        utility += 0.1 * this.countThreats(board, `${playerNum}${playerNum}0`);
        utility += 0.1 * this.countThreats(board, `0${playerNum}${playerNum}`);
        utility += 0.1 * this.countThreats(board, `${playerNum}0${playerNum}`);
        utility += 0.5 * this.countThreats(board, `0${playerNum}0${playerNum}0`);
        utility += 0.5 * this.countThreats(board, `0${playerNum}${playerNum}0`);

        utility -= 0.1 * this.countThreats(board, `${otherPlayerNum}${otherPlayerNum}0`);
        utility -= 0.1 * this.countThreats(board, `0${otherPlayerNum}${otherPlayerNum}`);
        utility -= 0.1 * this.countThreats(board, `${otherPlayerNum}0${otherPlayerNum}`);
        utility -= 0.1 * this.countThreats(board, `0${otherPlayerNum}0${otherPlayerNum}0$}`);
        utility -= 0.5 * this.countThreats(board, `0${otherPlayerNum}${otherPlayerNum}0`);

        return utility;

    }

    countThreats(board, threat) {
        let threatCount = 0;
        
        function checkHorizontal(b) {
            let count = 0;
            for (const row of b) {
                if (row.join('').includes(threat)) {
                    count += 1;
                }
            }
            return count;
        }
    
        function checkVertical(b) {
            return 0.2 * checkHorizontal(b[0].map((_, i) => b.map(row => row[i])));
        }
    
        function checkDiagonal(b) {
            let count = 0;
            for (let op of [null, (board) => [...board].map(row => row.reverse())]) {
                let opBoard = op ? op([...b]) : [...b];
      
                let rootDiag = opBoard.map((row, i) => row[i]).map(Number);
                if (rootDiag.join('').includes(threat)) {
                    count += 1;
                }
      
                for (let i = 1; i <= b[0].length - 3; i++) {
                    for (let offset of [i, -i]) {
                        let diag = opBoard.map((row, j) => row[j + offset]).map(Number);
                        if (diag.join('').includes(threat)) {
                            count += 1;
                        }
                    }
                }
            }
      
            return count;
        }
    
        threatCount += checkHorizontal(board);
        threatCount += checkVertical(board);
        threatCount += checkDiagonal(board);
    
        return threatCount;
    }


}
