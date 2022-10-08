import { HexColorPicker } from "react-colorful";

import '../styles/colorPicker.css';

const ColorPicker = ({ color, onChange }) => {		
  return <HexColorPicker color={color} onChange={onChange} />;
};

export default ColorPicker;