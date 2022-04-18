import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        console.log("BOARD");
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumer: 0
        };
    }

    handleClick(i) {
        console.log("handle click");
        const history = this.state.history.slice(0, this.state.stepNumer + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
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
    }

    jumpTo(index){
        console.log("jumpTo");
        this.setState({
            stepNumer: index,
            xIsNext: (index % 2) === 0,
        });
    }

    render() {
        console.log("Render GAME");
        //const history = this.state.history;
        const history = this.state.history.slice(0, this.state.stepNumer + 1);
        const current = history[this.state.stepNumer];
        const winner = calculateWinner(current.squares);

        const movies = history.map((step,moveIndex) => {
            const colNumber = (moveIndex % 3)?(moveIndex % 3):3;
            let rowNumber = moveIndex / 3;
            rowNumber=Math.ceil(rowNumber);
            const desc = moveIndex ? "Перейти к ходу " + moveIndex + " Col= "+colNumber+" Row= "+rowNumber+"Sign=" +(moveIndex%2?"X":"O"): "К началу игры";
            return(
                <li key={moveIndex}>
                    <button onClick={()=>this.jumpTo(moveIndex)}>{desc}</button>
                </li>);
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}///////!!!!!!!!
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{movies}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
