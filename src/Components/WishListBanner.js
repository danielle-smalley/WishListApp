import React, {Component} from 'react';

export default class WishListBanner extends Component{
    render = () =>
    <h4 className="bg-dark text-success text-center p-3">
        {this.props.name}'s Wish List
        ({ this.props.items.filter(i => !i.Purchased).length } items to buy)
    </h4>
}