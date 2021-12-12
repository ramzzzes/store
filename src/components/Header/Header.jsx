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

const BasketWrapper = styled.div`
  padding-top:2px;
`

const CurrencyDropdown = styled.div`
  position: absolute;
  left:-32px;
  box-shadow: 0 4px 35px rgba(168, 172, 176, 0.19);
  width:94px;
  height:129px;
  top:36px;
  padding:20px;
`

const CurrencyItem = styled.div`
  padding-bottom: 21px;
`


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            currencyVisible : false
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

    // activeCategory = (category) => {
    //     if (window.location.href.indexOf(category) > -1) {
    //         alert(category);
    //     }
    // }



    render() {
        return (
            <HeaderContainer>
                <HeaderItem>
                    {this.state.menu.map(menu => (

                            <NavLink to={"/category/" + menu.name} activeClassName="active-category">
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

                <HeaderRightSide>
                    <CurrencySwitcher onClick={() => this.setState({
                        currencyVisible : !this.state.currencyVisible
                    })}>
                        <div>$</div>
                        <SwitcherArrow>
                            {this.state.currencyVisible ? <ArrowUp/> : <ArrowDown/>}
                        </SwitcherArrow>
                        <BasketWrapper>
                            <Basket/>
                        </BasketWrapper>
                        {this.state.currencyVisible &&
                            <CurrencyDropdown>
                                <CurrencyItem>$ USD</CurrencyItem>
                                <CurrencyItem>€ EUR</CurrencyItem>
                                <CurrencyItem>¥ JPY</CurrencyItem>
                            </CurrencyDropdown>
                        }
                    </CurrencySwitcher>
                </HeaderRightSide>
            </HeaderContainer>
        );
    }
}

export default Header