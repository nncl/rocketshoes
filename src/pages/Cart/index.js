import React from 'react';

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

export default function Cart() {
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
                <tr>
                    <td>
                        <img src="http://dummyimage.com/600x600"
                             alt="Show" />
                    </td>
                    <td>
                        <strong>
                            Freakni Awesome Shoe
                        </strong>
                        <span>
                            $ 129,9
                        </span>
                    </td>
                    <td>
                        <div>
                            <button type="button">
                                <MdRemoveCircleOutline
                                    size={20}
                                    color="#7159c1" />
                            </button>

                            <input type="number" readOnly value={1} />

                            <button>
                                <MdAddCircleOutline
                                    size={20}
                                    color="#7159c1" />
                            </button>
                        </div>
                    </td>
                    <td>
                        <strong>
                            2
                        </strong>
                    </td>
                    <td>
                        <strong>
                            $ 258,8
                        </strong>
                    </td>
                    <td>
                        <button type="button">
                            <MdDelete size={20} color="#7159c1" />
                        </button>
                    </td>
                </tr>
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
