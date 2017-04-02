import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card.jsx';

class CreateNewList extends React.Component {
  render() {
    return(
    <div><ListElement/></div>
    );
  }
}

class ListElement extends React.Component {

  viewCard(e){
    let id = parseInt($(e.target).closest('div.newList').attr('id'),10);
    let card_id = parseInt($(e.target).closest('div.cardView').attr('id'),10);
    ReactDOM.render(<Card id={id} card_id={card_id} />,document.getElementById('board'))
  }

  createCard(e){
    let id = parseInt(e.target.parentElement.getAttribute('id'),10);
    localStorage.setItem('currentListId',id)
    ReactDOM.render(<Card/>,document.getElementById('board'))
  }

  render(){
    return (
        <div className="col-xs-3 newList listHead listdraggable" id={this.props.id}>
            <span className="col-xs-3 addHeader"> List {this.props.id}</span>
            <span className="addDelHeader" onClick={this.props.onDelete}> Delete this list.. </span>
            {this.props.card ? this.props.card.map((obj,value) => {
              return <div key={value}><div id={value} onClick={this.viewCard.bind(this)} className="cardView col-xs-9" ><div className="cvDesc">{obj.cardDesc}</div><br/><div className="cvDesc cvComment"><i>comments:<span className="commentSect">{obj.comments.length ? obj.comments.join(',') : "No comments"}</span></i></div></div></div>

            }) : false}
            <div className="card col-xs-6 addCard" onClick={this.createCard.bind(this)}>
              Add new card..
            </div>
        </div> );
  }
}

class List extends React.Component {

  constructor(){
    super()
    this.state = {
      ListId : []
    }
  }

  saveList(id,cardCount){
    var data = localStorage.getItem('savedData');
    if(!data){
      var data = [];
      data.push({id:id,cardCount:cardCount});
      localStorage.setItem('savedData',JSON.stringify(data));
      return;
    }
    data = JSON.parse(data)
    data.push({id:id,cardCount:cardCount});
    localStorage.setItem('savedData',JSON.stringify(data));
  }


  deleteList(e){
    let id = parseInt(e.target.parentElement.getAttribute('id'),10);
    var data = localStorage.getItem('savedData');
    if(!data){
      return false;
    }else{
      data = JSON.parse(data);
      let newdata = data.filter((object) => {
        return object.id != id;
      });
      localStorage.setItem('savedData',JSON.stringify(newdata));
    }
    var idArr = this.state.ListId;
    let index = idArr.indexOf(id);
    idArr.splice(index,1);
    this.setState({
      ListId : idArr
    })

  }
  componentWillMount(){
    localStorage.removeItem('comments');
  }
  componentDidUpdate() {
  localStorage.removeItem('comments');
  var containmentX1 = $("#board").offset().left;
  var containmentY1 = $("#board").offset().top;
  var containmentX2 =  $("#board").outerWidth();
  var containmentY2 = 10000

  $('.listdraggable').draggable({
    containment:  [containmentX1, containmentY1, containmentX2, containmentY2]
});
  }

  componentWillMount(){
    this.getLists()
  }

  getLists(){
    var data = localStorage.getItem('savedData');
    if(!data){
    return false;
    }
    data = JSON.parse(data);
    var idArr = [];
    data.map(function(object){
      idArr.push(object.id);
    })
    this.setState({ListId : idArr})
  }


  addList(){
    let idArrLen = this.state.ListId.length;
    if(idArrLen === 0){
      var data = [];
      data.push({id:idArrLen+1,cardCount:0});
      localStorage.setItem('savedData',JSON.stringify(data));
    }else{
      var data = localStorage.getItem('savedData');
      data = JSON.parse(data)
      idArrLen = data[data.length-1].id;
      data.push({id:idArrLen+1,cardCount:0});
      localStorage.setItem('savedData',JSON.stringify(data));
    }
    var idArr = this.state.ListId;
    idArr.push(idArrLen+1)
    this.setState({
      ListId : idArr
    })
  }

  renderLists(){
      var ListId = this.state.ListId;
      if(!ListId.length) return false;
      let lists = localStorage.getItem('savedData');
      lists = JSON.parse(lists)
      return lists.map((object) => { console.log(object)
        return <ListElement id={object.id} key={object.id} cardCount={object.cardCount} card={object.card} onDelete={this.deleteList.bind(this)}/>
      })
  }

   render() {
     localStorage.removeItem('comments');
      return (
        <div>
          {this.renderLists()}
          <div className="col-xs-3 listCss">
            <div className="addList listHead listdraggable" onClick={this.addList.bind(this)} >Add new list</div>
          </div>
         </div>
      );
   }
}


export default {
  List : List
}
