import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/Cart/actions';

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

function Cart({ cart, removeFromCart }) {
    return (
        <Container>
            <ProductTable>
                <thead>
                <tr>
                    <th />
                    <th>
                        Name
                    </th>
                    <th>
                        Qty
                    </th>
                    <th>
                        Subtotal
                    </th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {cart.map(product => (
                    <tr key={product.id}>
                        <td>
                            <img src={product.image}
                                 alt={product.title} />
                        </td>
                        <td>
                            <strong>
                                {product.title}
                            </strong>
                            <span>
                                {product.formattedPrice}
                            </span>
                        </td>
                        <td>
                            <div>
                                <button type="button">
                                    <MdRemoveCircleOutline
                                        size={20}
                                        color="#7159c1" />
                                </button>

                                <input type="number"
                                       readOnly
                                       value={product.amount} />

                                <button>
                                    <MdAddCircleOutline
                                        size={20}
                                        color="#7159c1" />
                                </button>
                            </div>
                        </td>
                        <td>
                            <strong>
                                $ 258,8
                            </strong>
                        </td>
                        <td>
                            <button type="button" onClick={() => removeFromCart(product.id)}>
                                <MdDelete size={20} color="#7159c1" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </ProductTable>

            <footer>
                <button type="button">
                    Pay!
                </button>

                <Total>
                    <span>Total</span>
                    <strong>$ 1920,99</strong>
                </Total>
            </footer>
        </Container>
    );
}

const mapStateToProps = state => ({ cart: state.cart });

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
