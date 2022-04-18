var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
    return (React.createElement("button", { className: "square", onClick: props.onClick }, props.value));
}
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Board.prototype.renderSquare = function (i) {
        var _this = this;
        return (React.createElement(Square, { value: this.props.squares[i], onClick: function () { return _this.props.onClick(i); } }));
    };
    Board.prototype.render = function () {
        console.log("BOARD");
        return (React.createElement("div", null,
            React.createElement("div", { className: "board-row" },
                this.renderSquare(0),
                this.renderSquare(1),
                this.renderSquare(2)),
            React.createElement("div", { className: "board-row" },
                this.renderSquare(3),
                this.renderSquare(4),
                this.renderSquare(5)),
            React.createElement("div", { className: "board-row" },
                this.renderSquare(6),
                this.renderSquare(7),
                this.renderSquare(8))));
    };
    return Board;
}(React.Component));
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            history: [{
                    squares: Array(9).fill(null)
                }],
            xIsNext: true,
            stepNumer: 0
        };
        return _this;
    }
    Game.prototype.handleClick = function (i) {
        console.log("handle click");
        var history = this.state.history.slice(0, this.state.stepNumer + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                    squares: squares
                }]),
            stepNumer: history.length,
            xIsNext: !this.state.xIsNext,
        });
    };
    Game.prototype.jumpTo = function (index) {
        console.log("jumpTo");
        this.setState({
            stepNumer: index,
            xIsNext: (index % 2) === 0,
        });
    };
    Game.prototype.render = function () {
        var _this = this;
        console.log("Render GAME");
        //const history = this.state.history;
        var history = this.state.history.slice(0, this.state.stepNumer + 1);
        var current = history[this.state.stepNumer];
        var winner = calculateWinner(current.squares);
        var movies = history.map(function (step, moveIndex) {
            var colNumber = (moveIndex % 3) ? (moveIndex % 3) : 3;
            var rowNumber = moveIndex / 3;
            rowNumber = Math.ceil(rowNumber);
            var desc = moveIndex ? "Перейти к ходу " + moveIndex + " Col= " + colNumber + " Row= " + rowNumber + "Sign=" + (moveIndex % 2 ? "X" : "O") : "К началу игры";
            return (React.createElement("li", { key: moveIndex },
                React.createElement("button", { onClick: function () { return _this.jumpTo(moveIndex); } }, desc)));
        });
        var status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (React.createElement("div", { className: "game" },
            React.createElement("div", { className: "game-board" },
                React.createElement(Board, { squares: current.squares, onClick: function (i) { return _this.handleClick(i); } })),
            React.createElement("div", { className: "game-info" },
                React.createElement("div", null, status),
                React.createElement("ol", null, movies))));
    };
    return Game;
}(React.Component));
// ========================================
ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));
function calculateWinner(squares) {
    var lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (var i = 0; i < lines.length; i++) {
        var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
