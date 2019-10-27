import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/Cart/actions';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';
import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md';

function Home({ amount, addToCartRequest }) {
    const [products, setProducts] = useState([]);

    // Component did mount
    useEffect(() => {
        async function loadProducts() {
            const results = await api.get(`products`);

            const data = results.data.map(product => ({
                ...product,
                formattedPrice: formatPrice(product.price)
            }));

            setProducts(data);
        }

        loadProducts();
    }, []);

    function handleAddProduct(id) {
        addToCartRequest(id);
    }

    return (
        <ProductList>
            {
                products.map(product => (
                    <li key={product.id}>
                        <img src={product.image}
                             alt={product.title} />
                        <strong>
                            {product.title}
                        </strong>
                        <span>
                                {product.formattedPrice}
                            </span>
                        <button type="button"
                                onClick={() => handleAddProduct(product.id)}>
                            <div>
                                <MdAddShoppingCart
                                    size={16}
                                    color="#fff" />
                                {amount[product.id] || 0}
                            </div>
                            <span>
                                    Add to Cart
                                </span>
                        </button>
                    </li>
                ))
            }
        </ProductList>
    );
}

const mapStateToProps = state => ({
    amount: state.cart.reduce((amount, product) => {
        amount[product.id] = product.amount;
        return amount;
    }, {})
});

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
