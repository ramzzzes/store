import {Component} from "react";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import styled from "styled-components";

const ProductContent = styled.div`
    display: flex;
`

const ProductThumbContainer = styled.div`
    margin:20px 0 32px 0;
    cursor: pointer;
`

const ProductMainImage = styled.div`
    width:50%;
    height:511px;
    ${props => props.src && `background: url(${props.src}) center center no-repeat;`}
    background-size: contain;
`

const ProductDetailsContainer = styled.div`
    width:40%;
    margin-left:10%;
`

const ProductThumbList = styled.div`
    width:80px;
    margin-right:50px;
`

const ProductThumb = styled.div`
    ${props => props.src && `background: url(${props.src}) center center no-repeat;`}
    background-size: contain;
    width:80px;
    height:80px;
`


const ProductTitle = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  display: flex;
  align-items: center;
  color: #1D1F22;
`

const ProductBrand = styled.div`
  margin-top:16px;
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 27px;
  display: flex;
  align-items: center;
  color: #1D1F22;
`

const ProductSizeLabel = styled.div`
  margin:43px 0 8px 0;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #1D1F22;
`

const ProductPriceLabel = styled.div`
  margin:40px 0 8px 0;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #1D1F22;
`

const ProductPrice = styled.div`
  ont-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #1D1F22;
  margin-top:20px;
`

const ProductSizeBoxContainer = styled.div`
  display:flex;
`

const AddToCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
  width: 292px;
  background: #5ECE7B;
  margin-top:50px;
  color: #fff;
  cursor: pointer;
`

const ProductDesc = styled.div`
   margin-top:40px;
`

const ProductSizeBox = styled.div`
  ${props => props.active && `background: #1D1F22;color:#fff;`}
  border: 1px solid #A6A6A6;
  box-sizing: border-box;
  width: 63px;
  height: 45px;
  justify-content: center;
  align-items: center;
  display:flex;
  margin-right:12px;
  text-align: center;
  cursor: pointer;
`

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product : {},
            activeImg : null,
            sizes : [],
            activeSize : null
        };
    }

    handleSizeSetter = (attributes) => {
        if(attributes.filter(a => a.id === 'Size' ).length > 0){
            return attributes.filter(a => a.id === 'Size' )[0]['items']
        }else if(attributes.filter(a => a.id === 'Capacity' ).length > 0){
           return  attributes.filter(a => a.id === 'Capacity' )[0]['items']
        }else{
           return []
        }
    }


    fetchProductsById = (id) => {
        const client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache()
        });

        client.query({
            query: gql `
                   query Product {
                        product(id: "${id}") {
                             id,
                              name,
                              description,
                              prices {
                                amount
                              },
                              gallery,
                              brand,
                              attributes {
                                  id,
                                  items {
                                    displayValue,
                                    value
                                  }
                              }
                        }
                         
                   }
                `
        }).then(result => {
            this.setState({
                product : result.data.product,
                activeImg : result.data.product?.gallery.length > 0 && result.data.product.gallery[0],
                sizes : this.handleSizeSetter(result.data.product?.attributes)
            })
        }).catch(e => {
            console.log(e)
        });
    }


    componentDidMount() {
        this.fetchProductsById(this.props.match.params.product)
    }

    render() {
        return (
            <ProductContent>
                <ProductThumbList>
                    {this.state.product.gallery?.map(img => {
                        return (
                            <ProductThumbContainer>
                                <ProductThumb src={img} onClick={() =>   this.setState({
                                    activeImg : img
                                })} />
                            </ProductThumbContainer>
                        )
                    })}
                </ProductThumbList>
                <ProductMainImage src={this.state.activeImg} />
                <ProductDetailsContainer>
                    <ProductTitle>{this.state.product.name}</ProductTitle>
                    <ProductBrand>{this.state.product.brand}</ProductBrand>
                    <ProductSizeLabel>SIZE:</ProductSizeLabel>
                    <ProductSizeBoxContainer>
                        {this.state.sizes?.map(size => {
                            return (
                                <ProductSizeBox onClick={() => this.setState({
                                    activeSize : size.value
                                })} active={this.state.activeSize === size.value && true}>{size.displayValue}</ProductSizeBox>
                            )
                        })}
                    </ProductSizeBoxContainer>
                    <ProductPriceLabel>PRICE:</ProductPriceLabel>
                    <ProductPrice>${this.state.product?.prices && this.state.product?.prices[0]['amount']}</ProductPrice>
                    <AddToCart>ADD TO CART</AddToCart>
                    <ProductDesc dangerouslySetInnerHTML={{__html: this.state.product?.description}} />
                </ProductDetailsContainer>
            </ProductContent>
        );
    }
}

export default Product