import React, { Component } from 'react';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';
import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md';

export default class Home extends Component {
    state = {
        products: [],
    };

    async componentDidMount() {
        const results = await api.get(`products`);

        const data = results.data.map(product => ({
            ...product,
            formattedPrice: formatPrice(product.price)
        }));

        this.setState({ products: data });
    }

    render() {
        const { products } = this.state;

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
                            <button type="button">
                                <div>
                                    <MdAddShoppingCart
                                        size={16}
                                        color="#fff" />
                                    3
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
}
