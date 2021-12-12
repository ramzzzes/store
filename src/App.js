import './App.css';
import Header from "./components/Header/Header";
import {Route, Switch} from "react-router-dom";
import ProductList from "./components/Product/ProductList";
import Product from "./components/Product/Product";

function App() {
  return (
    <div className="App">
       <Header/>
        <Switch>
            <Route exact path="/">
                <div>
                    <br/>
                    <br/>
                    <br/>
                    hello from main page
                </div>
            </Route>
            <Route exact path="/category/:category" component={ProductList} />
            <Route exact path="/category/:category/product/:product" component={Product} />
        </Switch>
    </div>
  );
}

export default App;
