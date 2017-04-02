import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            commentCount: 0,
            cardDesc: ""
        }
    }

    renderComment(cardComments) {
        if (cardComments) {
            return cardComments.map((value, index) => {
                let comment = value.split('-')[0];
                let date = value.split('-')[1];
                return <i key={index}>
                  <div className="col-md-12">
                    <div className="col-xs-4">   {comment} </div>
                    <div className="col-xs-6">  : {date} </div>
                  </div>
                </i>
            });
        }
        var data = localStorage.getItem('comments');
        if (data) {
            data = JSON.parse(data)
            return data.map((value, index) => {
                let comment = value.split('-')[0];
                let date = value.split('-')[1];
                return <i key={index}>
                    <div className="col-md-12">
                      <div className="col-xs-2">  : {comment} </div>
                      <div className="col-xs-6">  : {date} </div>
                    </div>
                </i>
            });
        } else {
            return false;
        }
    }

    addComment(e) {
        var comment = e.target.previousSibling.children[0].value.trim() + "-" + Date().split('GMT')[0];
        if (comment.split('-')[0].length === 0)
            return false;
        if (this.props.id + 1) {
            var data = localStorage.getItem('savedData');
            data = JSON.parse(data);
            let index;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == this.props.id) {
                    index = i;
                }
            }
            data[index].card[this.props.card_id].comments.push(comment);
            localStorage.setItem('savedData', JSON.stringify(data));
        } else {
            var data = localStorage.getItem('comments');
            if (data) {
                data = JSON.parse(data)
            } else {
                var data = [];
            }
            data.push(comment);
            localStorage.setItem('comments', JSON.stringify(data));
        }
        var commentCount = this.state.commentCount
        commentCount++;;
        this.setState({commentCount: commentCount});
    }

    deleteCard() {
        if (this.props.id + 1) {
            var data = localStorage.getItem('savedData');
            data = JSON.parse(data);
            let index;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == this.props.id) {
                    index = i;
                }
            }
            data[index].card.splice(this.props.card_id, 1);
            localStorage.setItem('savedData', JSON.stringify(data));
        } else
            localStorage.removeItem('comments');
        ReactDOM.render(
            <App.Board/>, document.getElementById('board'));
    }

    getCardInfo() {
        var data = localStorage.getItem('savedData');
        data = JSON.parse(data);
        var list;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == this.props.id) {
                list = data[i];
            }
        }
        var card = list.card;
        card = card[this.props.card_id]
        return card;
    }

    saveCard() {
        if (this.props.id + 1) {
            let data = localStorage.getItem('savedData');
            data = JSON.parse(data);
            let index;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == this.props.id) {
                    index = i;
                }
            }
            data[index].card[this.props.card_id].cardDesc = document.getElementById('cardDesc').value.trim();
            localStorage.setItem('savedData', JSON.stringify(data));
            ReactDOM.render(
                <App.Board/>, document.getElementById('board'));
            return;
        }
        let id = parseInt(localStorage.getItem('currentListId'), 10);
        let comments = localStorage.getItem('comments');
        let data = localStorage.getItem('savedData');
        data = JSON.parse(data);
        comments = JSON.parse(comments);
        data.map((obj) => {
            if (obj.id == id) {
                if (obj.cardCount === 0)
                    obj.card = [];
                obj.card.push({
                    cardDesc: document.getElementById('cardDesc').value.trim(),
                    comments: comments
                        ? comments
                        : []
                })
                obj.cardCount++;
            }
        });
        localStorage.setItem('savedData', JSON.stringify(data));
        this.deleteCard();
    }

    handledesc(e) {
        this.setState({cardDesc: e.target.value})
    }

    componentWillMount() {
        if (this.props.id + 1) {
            this.setState({cardDesc: this.getCardInfo().cardDesc.trim()})
        }
    }
    render() {
        if (this.props.id + 1) {
            var cardObj = this.getCardInfo();
            return (
                <div className="board-area col-xs-12">
                    <div id="cCreate" className="col-xs-9">
                        <div id="ctitle" className="col-xs-9">
                            Card title
                        </div>
                        <div id="cdesc" className="col-xs-7 carddiv">
                            <textarea id="cardDesc" rows="3" value={this.state.cardDesc} onChange={this.handledesc.bind(this)}></textarea>
                        </div>
                        <div id="delCard" className="col-xs-2 carddiv addDelHeader" onClick={this.deleteCard.bind(this)}>
                            Delete this card
                        </div>
                        <div id="cComment" className="col-xs-7 carddiv">
                            Comments :
                            <textarea id="cardComm" rows="3"></textarea>
                        </div>
                        <div id="cComment" className="col-xs-2 carddiv addDelHeader" onClick={this.addComment.bind(this)}>
                            Add Comment
                        </div>
                        <div id="commentArea" className="col-xs-9 carddiv">{this.renderComment(cardObj.comments)}</div>
                        <div id="cSave" className="col-xs-9 carddiv Btnfrmt" onClick={this.saveCard.bind(this)}>
                            Save this card
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="board-area col-xs-12">
                <div id="cCreate" className="col-xs-9">
                    <div id="ctitle" className="col-xs-9">
                        Card title
                    </div>
                    <div id="cdesc" className="col-xs-7 carddiv">
                        <textarea id="cardDesc" rows="3"></textarea>
                    </div>
                    <div id="delCard" className="col-xs-2 carddiv addDelHeader" onClick={this.deleteCard.bind(this)}>
                        Delete this card
                    </div>
                    <div id="cComment" className="col-xs-7 carddiv">
                        Comments :
                        <textarea id="cardComm" rows="3"></textarea>
                    </div>
                    <div id="cComment" className="col-xs-2 carddiv addDelHeader" onClick={this.addComment.bind(this)}>
                        Add Comment
                    </div>
                    <div id="commentArea" className="col-xs-9 carddiv">{this.renderComment()}</div>
                    <div id="cSave" className="col-xs-9 carddiv Btnfrmt" onClick={this.saveCard.bind(this)}>
                        Save this card
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;
