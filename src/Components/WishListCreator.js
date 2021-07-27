import React, { Component } from 'react'

export default class WishListCreator extends Component {
    constructor(props){
        super(props);
        this.state = { newItemText: ''}

        }
        updateNewTextValue = (event) => {
            this.setState({ newItemText: event.target.value })
    }
    
    createNewWishList = () => {
        this.props.callback(this.state.newItemText);
        this.setState({newItemText : ''});
    }

    render() {
        return (
            <div className="my-1">
                <input className="form-control" value={this.state.newItemText} onChange={ this.updateNewTextValue} />
                <button className="btn btn-primary mt-1" onClick={this.createNewWishList}>Add</button>
            </div>
        )
    }
}
