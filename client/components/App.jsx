import React, { Component } from 'react';

import { Switch, Route, Routes } from 'react-router-dom';

import MainContainer from './MainContainer';

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    // this.state = getInitialState();
  }
  
  // handleClick(row, square) {
  //   let { turn, winner } = this.state;
  //   const { rows } = this.state;
  //   const squareInQuestion = rows[row][square];

  //   if (this.state.winner) return;
  //   if (squareInQuestion) return;

  //   rows[row][square] = turn;
  //   turn = turn === 'X' ? 'O' : 'X';
  //   winner = checkWin(rows);

  //   this.setState({
  //     rows,
  //     turn,
  //     winner,
  //   });
  // }

  render() {
    // const { rows, turn, winner, gameList } = this.state;
    // const handleClick = this.handleClick;

    // const rowElements = rows.map((letters, i) => (
    //   <Row key={i} row={i} letters={letters} handleClick={handleClick} />
    // ));

    // let infoDiv;
    // if (winner) {
    //   let winTurn = turn === 'X' ? 'O' : 'X';
    //   infoDiv = (
    //     <div>
    //       <div>Player {winTurn} wins with squares {winner.join(', ')}!</div>
    //     </div>
    //   );
    // } else {
    //   infoDiv = <div>Turn: {turn}</div>;
    // }

    return (
      <Routes>
        <Route 
          path='/'
          element={ <MainContainer />}
        />
        {/* <div>
          {infoDiv}
          <div id="board">
            {rowElements}
          </div>
          <button id="reset" onClick={() => this.setState(getInitialState())}>Reset board</button>
          <GameList gameList={gameList} />
          <Leaders />
        </div> */}
      </Routes>
    );
  }
}

export default App;
