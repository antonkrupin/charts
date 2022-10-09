import React from 'react';
import { HexColorPicker } from "react-colorful";

import '../styles/colorPicker.css';

const ColorPicker = ({ color, onChange }) => <HexColorPicker color={color} onChange={onChange} />;

export default ColorPicker;