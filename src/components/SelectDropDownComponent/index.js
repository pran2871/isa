import React from 'react';
import { Select } from 'antd';

import {
    filterArray,
} from '../../utils/utilityFunctions'


export default class SelectDropDownField extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onChangeHandler = (value) => {
        this.props.onChangeHandler && this.props.onChangeHandler(value);
    }

    filterOption = (inputValue, option) => {

        const filteredOptionData = filterArray([option.props.children], inputValue);
        return !!filteredOptionData.length;
    }

    render() {

        //  Below commented can be directly passed from the parent

        let {
            value = '',
            options= [],
            // disabled = false,
            // allowClear = false,
            // showArrow = false,
            // showSearch = false,
            // placeholder = '',
            ...restProps
        } = this.props;

        // let temp = { ...a, ...d, b: 'b'};

        // let temp2 = {a: 'a', b: 'b', x: 'x', y: 'y', z: 'z'};

        // let a = temp2.a;
        // let b = temp2.b;
        // let c = temp2.c || 'testing';

        // let { a, b, c = 'testing', ...rest } = temp2;
        // rest = { x: 'x', y: 'y', z: 'z'}

        value = value.toString();

        return (
            <Select
                {...restProps}
                value={value || undefined}
                mode="default"
                style={{ width: '100%' }}
                onChange={this.onChangeHandler}
                filterOption={this.filterOption}
            >
                {options.map(option => (
                    <Select.Option key={`dropdown-options-${option.id || option.key}`} value={option.id && option.id.toString() || option.key && option.key.toString()}>
                        {option.label || option.name}
                    </Select.Option>
                ))}
            </Select>
        );
    }
}
