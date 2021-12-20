import {Component} from "react";
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
import styled from "styled-components";
import './Header.css'
import Logo from "./assets/Logo";
import ArrowDown from "./assets/ArrowDown";
import Basket from "./assets/Basket";
import ArrowUp from "./assets/ArrowUp";
import {Link, NavLink} from "react-router-dom";
import { connect } from "react-redux";
import {setActiveCurrency} from "../../actions/currencyActions";
import {calculatePrice, calculatePriceSum} from "../../helpers/price";
import {addToCart, removeFromCart} from "../../actions/cartActions";


const HeaderContainer = styled.div`
  display: flex;
  margin-bottom:50px;
`;

const HeaderItem = styled.div`
  display: flex;
  width:33.3%;
`;

const LogoWrapper = styled.div`
  margin:0 auto;
  cursor: pointer;
`;

const MenuItem = styled.div`
  padding:0 16px;
`;

const MenuText = styled.div`
  font-family: 'Raleway',serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #1D1F22;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -ms-transition: all .3s;
  -o-transition: all .3s;
  transition: all .3s;
  &:hover{
    color:#5ECE7B;
    cursor: pointer;
  }
`;

const HeaderRightSide = styled.div`
  width:33.3%;
  display: flex;
  justify-content: flex-end;
`

const CurrencySwitcherContainer = styled.div`
  display: flex;
`

const CurrencySwitcher = styled.div`
  font-family: 'Raleway',serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  color: #1D1F22;
  display: flex;
  position: relative;
  &:hover{
    cursor: pointer;
  }
`

const SwitcherArrow = styled.div`
  padding-left:10px;
  padding-right:22px
`

const CartWrapper = styled.div`
  display: flex;
`

const BasketWrapper = styled.div`
  padding-top:2px;
`

const CurrencyDropdown = styled.div`
  position: absolute;
  left:-32px;
  box-shadow: 0 4px 35px rgba(168, 172, 176, 0.19);
  width:94px;
  height:auto;
  background: #fff;
  top:36px;
  padding:20px;
`

const CartDropdown = styled.div`
  z-index: 10;
  position: absolute;
  left:-300%;
  box-shadow: 0 4px 35px rgba(168, 172, 176,0.19);
  width: 325px;
  height: auto;
  top:36px;
  padding:8px 16px;
  background: #fff;
`

const CartTitle = styled.div`
  font-family: Raleway,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 160%;
  text-align: left;
  color: #1D1F22;
`

const CartContent = styled.div`
    padding:23px 0 70px 0;
`

const CartTotalContainer = styled.div`
    display: flex;
    font-family: Raleway,sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    align-items: center;
`

const CartTotalLabel = styled.div`
    width:50%;
`

const CartTotalValue = styled.div`
    width:50%;
  text-align: right;
`

const CartItem = styled.div`
    display: flex;
  margin-bottom: 40px;
`

const CartInfo = styled.div`
    width:50%;
`

const CartActions = styled.div`
    width:24px;
  height:137px;
`

const CartIncrement = styled.div`
    width:24px;
    height:24px;
    border: 1px solid #1D1F22;
    box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

`

const CartCount = styled.div`
    height:86px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CartDecrement = styled.div`
    width:24px;
    height:24px;
    border: 1px solid #1D1F22;
    box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;


`

const CartSidebar = styled.div`
    width:40%;
`


const CartImg = styled.div`
    width:100%;
    height:137px;
    ${props => props.src && `background: url(${props.src}) center center no-repeat;`}
    background-size: contain;
    margin-left:12px;
`


const CartItemTitle = styled.div`
  font-family: Raleway,sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #1D1F22;
`

const CartItemPrice = styled.div`
  font-family: Raleway,sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  padding-top:10px;
  line-height: 160%;
  color: #1D1F22;
`

const CartFooter = styled.div`
  position: absolute;
  bottom:20px;
  width:100%;
`

const CartFooterContainer = styled.div`
  display: flex;
`

const ViewCart = styled.div`
  background: #FFFFFF;
  height: 43px;
  width:44%;
  margin-right:2px;
  border: 1px solid #1D1F22;
  box-sizing: border-box;
  font-family: Raleway,sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #1D1F22;
`

const Checkout = styled.div`
  background: #5ECE7B;
  height: 43px;
  width:44%;
  margin-left:2%;
  border: 1px solid #5ECE7B;
  box-sizing: border-box;
  font-family: Raleway,sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  right:0;
`

const CurrencyItem = styled.div`
  padding-bottom: 21px;
`

const CartQty = styled.div`
  width:25px;
  height:25px;
  background: #1D1F22;
  border-radius: 60px;
  color:white;
  font-size: 14px;
  margin:-10px 0 0 -7px;
`

const CartQtyText = styled.div`
  font-family: 'Raleway',serif;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  margin-top: -2px;
`


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            currencyVisible : false,
            cartVisible : false,
        };
    }


    componentDidMount() {
        const client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache()
        });

        client.query({
                query: gql`
                    query categories {
                      categories {
                        name,
                        products {
                          name
                        }
                      }
                }
                `
            })
            .then(result => this.setState({
                menu : result.data.categories
            })).catch(e => {
                console.log(e)
        });

    }


    render() {
        return (
            <HeaderContainer>
                <HeaderItem>
                    {this.state.menu.map((menu,index) => (
                            <NavLink key={index} to={"/category/" + menu.name} activeClassName="active-category">
                                <MenuItem key={menu.name}>
                                    <MenuText>{menu.name}</MenuText>
                                </MenuItem>
                            </NavLink>
                    ))}
                </HeaderItem>

                <HeaderItem>
                    <LogoWrapper>
                        <Link to="/">
                            <Logo/>
                        </Link>
                    </LogoWrapper>
                </HeaderItem>

                <HeaderRightSide >
                    <CurrencySwitcher >
                        <CurrencySwitcherContainer onClick={() => this.setState({
                            currencyVisible : !this.state.currencyVisible
                        })}>
                            <div>{this.props.currencies.find(currency => currency.active === true)?.symbol}</div>
                            <SwitcherArrow >
                                {this.state.currencyVisible ? <ArrowUp/> : <ArrowDown/>}
                            </SwitcherArrow>
                        </CurrencySwitcherContainer>

                        <div>
                            <CartWrapper onClick={() => this.setState({
                                cartVisible : !this.state.cartVisible
                            })}>
                                <BasketWrapper >
                                    <Basket/>
                                </BasketWrapper>
                                <CartQty>
                                    <CartQtyText>{this.props?.cart?.length}</CartQtyText>
                                </CartQty>
                            </CartWrapper>
                            {this.state.cartVisible &&
                                <CartDropdown>
                                    <CartTitle>
                                        My Bat, {this.props?.cart?.length} items
                                    </CartTitle>
                                    <CartContent>
                                        {this.props.cart.map((product,index) => (
                                            <CartItem key={index}>
                                                <CartInfo>
                                                    <CartItemTitle>
                                                        {product.name}
                                                        <br/>
                                                        {product.brand}
                                                    </CartItemTitle>
                                                    <CartItemPrice>
                                                        {calculatePrice(product,this.props.currencies)?.symbol}
                                                        {calculatePrice(product,this.props.currencies)?.amount}
                                                    </CartItemPrice>
                                                </CartInfo>
                                                <CartActions>
                                                    <CartIncrement  onClick={() => this.props.addToCart(product)}>+</CartIncrement>
                                                    <CartCount>{product.quantity}</CartCount>
                                                    <CartDecrement  onClick={() => this.props.removeFromCart(product)}>-</CartDecrement>
                                                </CartActions>
                                                <CartSidebar>
                                                    <CartImg src={product?.gallery?.length > 0 && product.gallery[0]} />
                                                </CartSidebar>
                                            </CartItem>
                                        ))}
                                        <CartTotalContainer>
                                            <CartTotalLabel>Total</CartTotalLabel>
                                            <CartTotalValue>
                                                {this.props.currencies.find(currency => currency.active === true)?.symbol}
                                                {calculatePriceSum(this.props?.cart,this.props.currencies)}
                                            </CartTotalValue>
                                        </CartTotalContainer>
                                    </CartContent>
                                    <CartFooter>
                                        <CartFooterContainer>
                                            <ViewCart>
                                                <Link to="/cart">
                                                    View Bag
                                                </Link>
                                            </ViewCart>
                                            <Checkout>Checkout</Checkout>
                                        </CartFooterContainer>
                                    </CartFooter>
                                </CartDropdown>
                            }
                        </div>
                        {this.state.currencyVisible &&
                            <CurrencyDropdown>
                                {this.props.currencies.map((currency,index) => (
                                    <CurrencyItem key={index} onClick={() => {
                                        this.props.setActiveCurrency(currency)
                                        this.setState({currencyVisible : false})
                                    }}>{currency.symbol} {currency.label}</CurrencyItem>
                                ))}
                            </CurrencyDropdown>
                        }
                    </CurrencySwitcher>
                </HeaderRightSide>
            </HeaderContainer>
        );
    }

}

function mapStateToProps(state) {
    const cart = state.cart;
    const currencies = state.currencies;
    return {
        cart,
        currencies
    };
}


export default connect(mapStateToProps,{setActiveCurrency,addToCart,removeFromCart})(Header);