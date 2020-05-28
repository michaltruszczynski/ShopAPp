import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../util/ImageSlider';
import CheckBox from './Sections/CheckBox';

const { Meta } = Card;

const LandingPage = () => {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(2);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit
        };
        getProducts(variables);
    }, [])

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                console.log(response.data)
                if (response.data.success) {
                    setProducts([...Products, ...response.data.products])
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fetch product data')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;
        const variables = {
            skip: skip,
            limit: Limit,
            filters: Filters
        }
        getProducts(variables);
        setSkip(skip);
    }

    const showFilteredResult = (filters) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(variables);
        setSkip(0);
    }

    const handleFilters = (filters, category) => {
        const newFilters = {
            ...Filters
        };

        newFilters[category] = filters;

        if (category === 'price') {

        }
        showFilteredResult(newFilters)
        setFilters(newFilters)
    }

    const renderCard = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type='rocket' /></h2>
            </div>

            {/*Filter*/}
            <CheckBox handleFilters={(filters) => handleFilters(filters, 'continents')} />
            {/*Search */}

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div>
                :

                <div>
                    <Row gutter={[16, 16]}>
                        {renderCard}
                    </Row>
                </div>
            }
            <br /><br />
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }

        </div >
    )
}

export default LandingPage
