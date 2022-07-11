import React from 'react';
import style from './style.module.css';
import edit from '../../icons/edit.svg';
import trash from '../../icons/trash.svg';

export default function VehiclesCard(props) {
  const { title, price, description, year, color, id, deleteBtn, editBtn, favoriteBtn, check } = props;
  return (
    <div className={ style.vehicleCard } id={ id }>
      <div className={ style.icons }>
        <img className={ style.icon } alt="edit-icon" src={ edit } onClick={ editBtn } />
        <img className={ style.icon } alt="trash-icon" src={ trash } onClick={ deleteBtn } />
        <input id={ style.heart } className={ style.icon } defaultChecked={ check } type="checkbox" onClick={ favoriteBtn } />
      </div>
      <div className={ style.infos }>
        <h2>{ title }</h2>
        <h3>Preço: { price }</h3>
        <p>Descrição: { description }</p>
        <p>Ano: { year }</p>
        <p>Cor: { color }</p>
      </div>
    </div>
  )
}
