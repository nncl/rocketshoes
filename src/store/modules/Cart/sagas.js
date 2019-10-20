import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { addToCartSuccess, updateCart } from './actions';
import api from '../../../services/api';
import { formatPrice } from '../../../utils/format';
import { toast } from 'react-toastify';

function* addToCart({ id }) {
    const productExists = yield select(
        state => state.cart.find(p => p.id === id)
    );

    const stock = yield call(api.get, `/stock/${id}`);
    const stockAmount = stock.data.amount;
    const currentAmount = productExists ? productExists.amount : 0;
    const amount = currentAmount + 1;

    if (amount > stockAmount) {
        return toast.error(`Quantity out of stock`);
    }

    if (productExists) {
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
