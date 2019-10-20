import React from 'react';
import { connect } from 'react-redux';

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

function Cart({ cart, dispatch }) {
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
                            <button type="button" onClick={() => dispatch({
                                type: 'REMOVE_FROM_CART',
                                id: product.id,
                            })}>
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

export default connect(state => ({
    cart: state.cart,
}))(Cart);
