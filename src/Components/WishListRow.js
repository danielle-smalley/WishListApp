import React, { Component } from 'react'

export default class WishListRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.Action}</td>
                <td>
                    <input type="checkbox" checked={this.props.item.Purchased} onChange={() => this.props.callback(this.props.item)} />
                </td>
            </tr>
        )
    }
}
