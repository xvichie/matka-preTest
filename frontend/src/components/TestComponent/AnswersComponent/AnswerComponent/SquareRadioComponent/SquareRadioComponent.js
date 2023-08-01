import React, { useState } from 'react';
import './SquareRadioComponent.scss';


const SquareRadioButton = ({ value, checked, onChange }) => {
    return (
        <label className="square-radio">
            <input type="radio" value={value} checked={checked} onChange={onChange} />
            <span className="radio-icon">{checked && 'x'}</span>
        </label>
    );
};

export default SquareRadioButton;