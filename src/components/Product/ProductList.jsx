import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {Component} from "react";
import styled from "styled-components";
import './ProductList.css'
import {Link} from "react-router-dom";
import {calculatePrice} from "../../helpers/price";
import {connect} from "react-redux";

const ProductListContainer = styled.div`
  margin:80px 0 103px 0;
`

const CategoryName = styled.div`
  font-family: 'RalewayMd',serif;
  font-style: normal;
  font-weight: normal;
  font-size: 42px;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #1D1F22;
  text-transform:capitalize;
`

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width:100%;
`

const ProductItem = styled.div`
  flex: 0 0 calc(33.3% - 60px);
  margin:0 40px 20px 0;
  padding:16px;
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -ms-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
  &:hover{
    cursor: pointer;
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  &:nth-child(3n+3){
    margin-right:0;
  }
`

const ProductImg = styled.div`
  width:100%;
  height:361px;
  border:none;
  ${props => props.img && `background: url(${props.img}) top center no-repeat;`}
  background-size: contain;
`

const ProductTitle = styled.div`
  font-family: RalewayMd;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 160%;
  align-items: center;
  color: #1D1F22;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  padding-top:24px;
`

const ProductPrice = styled.div`
  font-family: RalewayMd;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 160%;
  color: #1D1F22;
  padding-bottom: 16px;
`

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products : [],
        };
    }

    fetchProductsByCategory = (id) => {
        const client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache()
        });

        return client.query({
            query: gql `
                   query Category {
                        category(input : {title: "${id ? id : 'all'}"} ) {
                             name,
                              products {
                              id,
                              name,
                              prices {
                                amount,
                                 currency {
                                  label,
                                  symbol
                                }
                              },
                              gallery
                            }
                        }
                         
                   }
                `
        }).then(result => {
            return result
        }).catch(e => {
        console.log(e)
        });
    }

    fetchAndSetProducts = (id) => {
        this.fetchProductsByCategory(id).then(r =>  this.setState({
            products : r.data.category.products
        }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.category !== prevProps.match.params.category) {
            this.fetchAndSetProducts(this.props.match.params.category)
        }
    }

    componentDidMount() {
        this.fetchAndSetProducts(this.props.match.params.category)
    }



    render() {
        return (
            <ProductListContainer>
                <CategoryName>
                    {this.props.match.params.category}
                </CategoryName>

                <ProductContainer>
                    {this.state.products.map(product => (
                        <ProductItem key={product.id}>
                            <Link to={"/category/" + this.props.match.params.category + "/product/" + product.id}>
                                <ProductImg img={product.gallery[0]}/>
                                <ProductTitle>{product.name}</ProductTitle>
                                <ProductPrice>
                                    {calculatePrice(product,this.props.currencies)?.symbol}
                                    {calculatePrice(product,this.props.currencies)?.amount}
                                </ProductPrice>
                            </Link>
                        </ProductItem>
                    ))}
                </ProductContainer>


            </ProductListContainer>
        );
    }
}

function mapStateToProps(state) {
    const currencies = state.currencies;
    return {
        currencies
    };
}


export default connect(mapStateToProps, null)(ProductList)