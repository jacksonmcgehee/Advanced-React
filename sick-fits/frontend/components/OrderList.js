import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';

const USER_ORDERS_QUERY = gql`
    query USER_ORDERS_QUERY {
        orders(orderBy: createdAt_DESC) {
            id
            total
            createdAt
            items {
                id
                title
                price
                description
                quantity
                image
            }
        }
    }
`;

const OrderUl = styled.ul`
    display: grid;
    grid-gap: 4rem;
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

class OrderList extends Component {
    render() {
        return (
            <Query query={USER_ORDERS_QUERY}>
                {({data: { orders }, error, loading}) => {
                    if (error) return <Error error={error} />
                    if (loading) return <p>Loading...</p>
                    console.log('>>>>>>> Orders List orders: ', orders)
                    return (
                        <div>
                            <h2>You have {orders.length} orders.</h2>
                            <OrderUl >
                                {orders.map(order => (
                                    <OrderItemStyles key={order.id}>
                                        <Link href={{pathname: '/order', query: { id: order.id } }}>
                                            <a>
                                                <div>
                                                    <h3>Order number: {order.id}</h3>
                                                </div>
                                                <div className='order-meta'>
                                                    <p> Created {formatDistance(order.createdAt, new Date())} ago.</p>
                                                    <p>
                                                        {order.items.reduce((amount, tally) => {
                                                            return amount + tally.quantity
                                                        }, 0)} Items
                                                    </p>
                                                    <p>Total: {formatMoney(order.total)}</p>
                                                </div>
                                                <div className="images">
                                                    {order.items.map(item => (
                                                        <img src={item.image} alt={item.title} />
                                                    ))}
                                                </div>
                                            </a>
                                        </Link>
                                    </OrderItemStyles>
                                ))}
                            </OrderUl>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default OrderList;