import produce from 'immer';

export default function cart(state = [], action) {
    switch (action.type) {
        case '@cart/ADD':
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.product.id);

                if (productIndex >= 0) {
                    draft[productIndex].amount += 1;
                } else {
                    draft.push({
                        ...action.product,
                        amount: 1,
                    });
                }
            });
        case '@cart/REMOVE':
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);

                if (productIndex >= 0) {
                    draft.splice(productIndex, 1);
                }
            });
        case '@cart/UPDATE_CART':
            return produce(state, draft => {
                if (!action.amount) {
                    return state;
                }

                const productIndex = draft.findIndex(p => p.id === action.id);

                if (productIndex >= 0) {
                    draft[productIndex].amount = action.amount;
                }
            });
        default:
            return state;
    }
}
