import React from 'react';
import ReactDOM from 'react-dom';
import App from './imports/ui/App.jsx';

ReactDOM.render(<App.App />, document.getElementById('header'));
ReactDOM.render(<App.Board />, document.getElementById('board'));

var top = $("#board").offset().top + $("#board").height();
var containmentX1 = $("#board").offset().left;
var containmentY1 = $("#board").offset().top;
var containmentX2 =  $("#board").outerWidth();
var containmentY2 = 1000

$('.listdraggable').draggable({
containment:  [containmentX1, containmentY1, containmentX2, containmentY2]
});
