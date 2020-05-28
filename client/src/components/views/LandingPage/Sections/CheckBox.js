import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';
import { continents } from './data';

const { Panel } = Collapse

const CheckBox = (props) => {

    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        console.log('test')
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked);
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }

    const renderCheckboxLists = () => (
        continents.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox
                    checked={Checked.indexOf(value._id) === -1 ? false : true }
                    onChange={() => handleToggle(value._id)}
                    type='checkbox'
                />&nbsp;&nbsp;
                <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </React.Fragment>
        ))
    )


    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
