import React, { Component } from "react";
import WishListBanner from "./Components/WishListBanner";
import WishListCreator from "./Components/WishListCreator";
import Axios from "axios";
import WishListRow from "./Components/WishListRow";
import VisibilityControl from "./Components/VisibilityControl";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Danielle",
      wishlistItems: [
        { Action: "Test", Purchased: false, WishlistID: 1 },
        { Action: "Test 2", Purchased: false, WishlistID: 2 },
      ],
      showPurchased: true,
    };
  }

  createNewWishList = (task) => {
    // alert(task); just used this for testing

    if (!this.state.wishlistItems.find((x) => x.Action === task)) {
      let newItem = {
        Action: task,
        Purchased: false,
      };

      //npm install axios
      Axios.post("http://localhost:55264/api/wishlistitems", newItem).then(
        (response) => {
          //TODO - come back here and edit URL
          let updatedItems = this.state.wishlistItems;
          updatedItems.push(response.data);
          this.setState({ wishlistItems: updatedItems });
        }
      );
    }
  };

  wishlistTableRows = (purchasedValue) =>
    this.state.wishlistItems
      .filter((item) => item.Purchased === purchasedValue)
      .map((item) => (
        <WishListRow
          item={item}
          callback={this.toggleWishList}
          key={item.WishlistID}
        />
      ));

  toggleWishList = (wishlist) => {
    wishlist.Purchased = !wishlist.Purchased;
    Axios.put("http://localhost:55264/api/wishlistitems", wishlist).then(
      (response) => {
        let updatedItems = this.state.wishlistItems;
        let index = updatedItems.findIndex(
          (x) => x.WishlistID === wishlist.WishlistID
        );
        updatedItems[index] = wishlist;
        this.setState({
          wishlistItems: updatedItems,
        });
      }
    );
  };

  componentDidMount = () => {
    Axios.get("http://localhost:55264/api/wishlistitems").then((response) => {
      console.log(response.data);
      this.setState({ wishlistItems: response.data });
    });
  };

  render = () => (
    <div>
      <WishListBanner
        name={this.state.userName}
        items={this.state.wishlistItems}
      />
      <div className="container-fluid">
        <WishListCreator callback={this.createNewWishList} />
        {/* items not purchased yet table */}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Purchased</th>
            </tr>
          </thead>
          <tbody>{this.wishlistTableRows(false)}</tbody>
        </table>

        <div className="bg-secondary text-white text-center p-2">
          {

          }

<VisibilityControl description="Purchased Items" isChecked={this.state.showPurchased} callback={(checked) => this.setState({showPurchased: checked})}/>
          {/* <VisibilityControl
            description="Purchased Items"
            isChecked={this.state.showPurchased}
            callback={(checked) => this.setState({ showPurchased: checked })}
          /> */}
        </div>

        {this.state.showPurchased && 
                <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Purchased</th>
                  </tr>
                </thead>
                <tbody>{this.wishlistTableRows(true)}</tbody>
              </table>}
      </div>
    </div>
  );
}
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
