import React from 'react';
import Filters from '../Filters/index.js';
import Popup from 'reactjs-popup';
import filteri from '../../icons/filteri.png';
import './style.css';


export default function PopUpFilter() {
  return (
    <Popup
    trigger={<img src={ filteri } alt="filter" className="button" />}
    modal
    nested
    >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <Filters close={ close } />
      </div>
    )}
  </Popup>
  )
}
