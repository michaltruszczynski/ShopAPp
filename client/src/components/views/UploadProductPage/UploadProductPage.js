import React, { useState } from 'react';
import Axios from 'axios';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../util/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;
const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
]



const UploadProductPage = (props) => {
    const [TitleValue, setTitleValue] = useState('');
    const [DescriptionValue, setDescriptionValue] = useState('');
    const [PriceValue, setPriceValue] = useState(0);
    const [ContinentValue, setContinentValue] = useState(1);

    const [Images, setImages] = useState([]);

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value);
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value);
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value);
    }

    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            constinents: ContinentValue
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded');
                    props.history.push('/');
                } else {
                    alert('Failed to uload product')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Travel Product</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type='number'
                />
                <select onChange={onContinentsSelectChange} value={ContinentValue}>

                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}

                </select>
                <br />
                <br />
                <Button
                    onClick={onSubmit}> Submit
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage;
