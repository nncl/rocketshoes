import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/Cart/actions';
import { formatPrice } from '../../utils/format';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

export default function Cart() {
    const total = useSelector(state => formatPrice(
        state.cart.reduce((total, product) => {
            return total + product.price * product.amount
        }, 0)
    ));

    const cart = useSelector(state => state.cart.map(product => ({
        ...product,
        subtotal: formatPrice(product.price * product.amount)
    })));

    const dispatch = useDispatch();

    function increment(product) {
        dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
    }

    function decrement(product) {
        dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
    }

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
                                <button type="button"
                                        onClick={() => decrement(product)}>
                                    <MdRemoveCircleOutline
                                        size={20}
                                        color="#7159c1" />
                                </button>

                                <input type="number"
                                       readOnly
                                       value={product.amount} />

                                <button type="button"
                                        onClick={() => increment(product)}>
                                    <MdAddCircleOutline
                                        size={20}
                                        color="#7159c1" />
                                </button>
                            </div>
                        </td>
                        <td>
                            <strong>
                                {product.subtotal}
                            </strong>
                        </td>
                        <td>
                            <button type="button" onClick={() =>
                                dispatch(CartActions.removeFromCart(product.id))}>
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
                    <strong>{total}</strong>
                </Total>
            </footer>
        </Container>
    );
}

