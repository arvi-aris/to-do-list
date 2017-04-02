import React from 'react';
import List from './List.jsx';
import ReactDOM from 'react-dom';

class App extends React.Component {
   render() {
      return (
      <div>
        <div className="header">
          <div className="headerInfo">
             <span className="sqIcon"><img/></span>
             <div>
               To-Do App
             </div>
           </div>
         </div>
      </div>
      );
   }
}

class Board extends React.Component {
   render() {
      return (
         <div className="board-area col-md-12">
            <List.List/>
         </div>
      );
   }
}

export default {
  App : App,
  Board : Board
}
