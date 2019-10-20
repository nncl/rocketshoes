import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { addToCartSuccess, updateCart } from './actions';
import api from '../../../services/api';
import { formatPrice } from '../../../utils/format';

function* addToCart({ id }) {
    const productExists = yield select(
        state => state.cart.find(p => p.id === id)
    );

    if (productExists) {
        const amount = productExists.amount + 1;
        yield put(updateCart(id, amount));
    } else {
        const response = yield call(api.get, `/products/${id}`);

        const data = {
            ...response.data,
            amount: 1,
            formattedPrice: formatPrice(response.data.price),
        };

        yield put(addToCartSuccess(data));
    }
}

export default all([
    takeLatest('@cart/ADD_REQUEST', addToCart),
]);
