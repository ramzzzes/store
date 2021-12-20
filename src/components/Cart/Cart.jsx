import {Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import './Cart.css'
import {ProductSizeBox, ProductSizeBoxContainer} from "../Product/Product";
import {addToCart, removeFromCart} from "../../actions/cartActions";
import {calculatePrice} from "../../helpers/price";


const CartTitle = styled.div`
  font-family: 'Raleway',sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1D1F22;
  margin-bottom:59px;
`;

const CartContainer = styled.div`
  display: flex;
  border-top:1px solid #E5E5E5;
  padding:20px 0;
`;

const ProductTitle = styled.div`
  font-family: 'Raleway',sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  display: flex;
  align-items: center;
  color: #1D1F22;
`;

const ProductBrand = styled.div`
  font-family: 'Raleway',sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 27px;
  display: flex;
  align-items: center;
  color: #1D1F22;
  padding-top:16px;
`;


const ProductPrice = styled.div`
  font-family: 'Raleway',sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #1D1F22;
  padding:25px 0 15px 0;
`;


const CartImg = styled.div`
  width:141px;
  height:185px;
  ${props => props.src && `background: url(${props.src}) center center no-repeat;`}
  background-size: contain;
  margin-left:12px;
`;

const CartInfoContainer = styled.div`
   width:80%;
`;

const CartRightContainer = styled.div`
    width:20%;
    display: flex;
    justify-content: flex-end;
`;


const ChangeQtyContainer = styled.div`
  height:185px;
  position: relative;
`;
const IncreaseQty = styled.div`
    width:45px;
    height:45px;
    border: 1px solid #1D1F22;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  cursor: pointer;
`;

const ProductQty = styled.div`
  font-family: Raleway,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  height:95px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DecreaseQty = styled.div`
  width:45px;
  height:45px;
  border: 1px solid #1D1F22;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom:0;
  position: absolute;
  cursor: pointer;
`;



class Cart extends Component {

    handleSizeSetter = (attributes) => {
        if(attributes.filter(a => a.id === 'Size' ).length > 0){
            return attributes.filter(a => a.id === 'Size' )[0]['items']
        }else if(attributes.filter(a => a.id === 'Capacity' ).length > 0){
            return  attributes.filter(a => a.id === 'Capacity' )[0]['items']
        }else{
            return []
        }
    }

    render() {
        return (
           <>
               <CartTitle>
                   Cart
               </CartTitle>

               {this.props?.cart?.map(product => {
                   return (
                       <CartContainer>
                           <CartInfoContainer>
                               <ProductTitle>
                                   {product?.name}
                               </ProductTitle>
                               <ProductBrand>
                                   {product?.brand}
                               </ProductBrand>
                               <ProductPrice>
                                   {calculatePrice(product,this.props.currencies)?.symbol}
                                   {calculatePrice(product,this.props.currencies)?.amount}
                               </ProductPrice>
                               <ProductSizeBoxContainer>
                               {product?.size && this.handleSizeSetter(product?.attributes).map(size => (
                                   <ProductSizeBox active={product.size === size.value && true}>{size.displayValue}</ProductSizeBox>
                               ))}
                               </ProductSizeBoxContainer>
                           </CartInfoContainer>
                           <CartRightContainer>
                               <ChangeQtyContainer>
                                   <IncreaseQty onClick={() => this.props.addToCart(product)}>
                                       +
                                   </IncreaseQty>
                                   <ProductQty>
                                       {product?.quantity}
                                   </ProductQty>
                                   <DecreaseQty onClick={() => this.props.removeFromCart(product)}>
                                       -
                                   </DecreaseQty>
                               </ChangeQtyContainer>
                               <CartImg src={product?.gallery?.length > 0 && product.gallery[0]} />
                           </CartRightContainer>
                       </CartContainer>
                   )
               })}

           </>
        )
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

export default connect(mapStateToProps, {addToCart,removeFromCart})(Cart)