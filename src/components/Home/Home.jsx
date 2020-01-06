import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store";
import ShopItems from '../Cards/FaCard/ShopItems/ShopItems'
import sunglasses from '../../assets/shopItems/sunglasses.jpg'
import rock from '../../assets/shopItems/rock.jpg';
import blanket from '../../assets/shopItems/blanket.jpg';
const items = [sunglasses, rock, blanket];
console.log(items)


// const shopItems = items.map((item, i) => { 
//   return <ShopItems image={item} description={item.description} title={item.title} />;
// })

class Home extends Component {
  constructor(props) {
    super(props);
      this.state = {
        authenticated: false
    };
  }

    componentDidMount = () => {
        const { authenticated } = store.getState();
        !authenticated && this.props.history.push('/signup')
  };
  render() {
    return (
      <div>
        {/* <ShopItems image={sunglasses} title = 'sunglasses' description = 'cool sunglasses to make your friends jelous' /> */}
        {/* {shopItems} */}
      </div>
    ) 
  }
}

const mapStateToProps = ({ authenticated }) => ({ authenticated });

export default connect(mapStateToProps)(Home);
// export default Home;
