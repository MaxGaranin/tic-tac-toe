const N = 3;
const TIC = 1;
const TAC = 0;
const EMPTY = -1;

const SYMBOLS = new Map([
    [TIC, 'x'],
    [TAC, 'o'],
    [EMPTY, null],
]);

class TicTacToe {
    constructor() {
        this.field = this._createField(N);
        this.current = TIC;
    }

    getCurrentPlayerSymbol() {
        return SYMBOLS.get(this.current);
    }

    nextTurn(rowIndex, columnIndex) {
        if (rowIndex > N - 1 || columnIndex > N - 1) {
            throw new Error('Wrong index');
        }

        if (this.field[rowIndex][columnIndex] == EMPTY) {
            this.field[rowIndex][columnIndex] = this.current;
            this._changePlayer();
        }
    }

    isFinished() {
        return this.noMoreTurns() || this._getWinner() != EMPTY;
    }

    getWinner() {
        let winner = this._getWinner();
        return SYMBOLS.get(winner);
    }

    noMoreTurns() {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (this.field[i][j] == EMPTY) {
                    return false;
                }
            }
        }
        return true;
    }

    isDraw() {
        return this.noMoreTurns() && this._getWinner() == EMPTY;
    }

    getFieldValue(rowIndex, colIndex) {
        return SYMBOLS.get(this.field[rowIndex][colIndex]);
    }

    _createField(n) {
        let a = [];
        for (let i = 0; i < n; i++) {
            let b = [];
            for (let j = 0; j < n; j++) {
                b.push(EMPTY);
            }
            a.push(b);
        }
        return a;
    }

    _changePlayer() {
        if (this.current == TIC) {
            this.current = TAC;
        }
        else {
            this.current = TIC;
        }
    }

    _getWinner() {
        let f = this.field;

        let isNormalDiag = true;
        let lastDnCell = this.field[0][0];

        let isReverseDiag = true;
        let lastDrCell = this.field[0][N - 1];

        for (let i = 0; i < N; i++) {
            let isRow = true;
            let lastRowCell = this.field[i][0];

            let isCol = true;
            let lastColCell = this.field[0][i];

            for (let j = 0; j < N; j++) {
                if (isRow) {
                    let cell = f[i][j];
                    if (cell == EMPTY) {
                        isRow = false;
                    }
                    else {
                        let xorRes = lastRowCell ^ cell;
                        if (xorRes != 0) isRow = false;
                    }
                    lastRowCell = cell;
                }

                if (isCol) {
                    let cell = f[j][i];
                    if (cell == EMPTY) {
                        isCol = false;
                    }
                    else {
                        let xorRes = lastColCell ^ cell;
                        if (xorRes != 0) isCol = false;
                    }
                    lastColCell = cell;
                }
            }

            if (isRow) {
                return f[i][0];
            }
            else if (isCol) {
                return f[0][i];
            }

            if (isNormalDiag) {
                let cell = f[i][i];
                if (cell == EMPTY) {
                    isNormalDiag = false;
                }
                else {
                    let xorRes = lastDnCell ^ cell;
                    if (xorRes != 0) isNormalDiag = false;
                }
                lastDnCell = cell;
            }

            if (isReverseDiag) {
                let cell = f[i][N - 1 - i];
                if (cell == EMPTY) {
                    isReverseDiag = false;
                }
                else {
                    let xorRes = lastDrCell ^ cell;
                    if (xorRes != 0) isReverseDiag = false;
                }
                lastDrCell = cell;
            }
        }

        if (isNormalDiag) {
            return f[0][0];
        }
        else if (isReverseDiag) {
            return f[0][N - 1];
        }
        else {
            return EMPTY;
        }
    }
}

module.exports = TicTacToe;
