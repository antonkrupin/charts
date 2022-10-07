import { useState } from 'react';
import { HexColorPicker } from "react-colorful";

import '../styles/colorPicker.css';

const ColorPicker = () => {
	const [color, setColor] = useState("#aabbcc");
		
  return <HexColorPicker color={color} onChange={setColor} />;
};

export default ColorPicker;