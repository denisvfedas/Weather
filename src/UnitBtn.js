import React from 'react';
import './UnitBtn.css';

function UnitBtn ({handleClick, unit}) {
  return(
    <button className="City-loaded-units-btn" onClick={() => handleClick()}>
      {unit ? "°C" : "°F"}
    </button>
  );
}

export default UnitBtn;
