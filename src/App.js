import './App.css';
import Header from "./components/Header/Header";
import {Route, Switch} from "react-router-dom";
import ProductList from "./components/Product/ProductList";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {Component} from "react";
import {connect} from "react-redux";
import {setActiveCurrency, setCurrencies} from "./actions/currencyActions";

class App extends Component{

    componentDidMount() {
        const client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache()
        });

        return client.query({
            query: gql `
                   query Category {
                        currencies {
                              label,
                              symbol
                        }
                         
                   }
                `
        }).then(result => {
            const currencies = result.data.currencies
            this.props.setCurrencies(currencies)
            currencies.forEach((currency,index) => {
                if(index === 0){
                    this.props.setActiveCurrency(currency)
                }
            })
        }).catch(e => {
            console.log(e)
        });
    }


    render(){
      return (
          <div className="App">
              <Header/>
              <Switch>
                  <Route exact path="/" component={ProductList} />
                  <Route exact path="/category/:category" component={ProductList} />
                  <Route exact path="/category/:category/product/:product" component={Product} />
                  <Route exact path="/cart" component={Cart} />
              </Switch>
          </div>
      );
  }
}

export default connect(null, {setCurrencies,setActiveCurrency})(App)
