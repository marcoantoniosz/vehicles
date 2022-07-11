import React from 'react';
import style from './style.module.css';

export default function AddButton() {
  const sendUserToNew = () => {
    window.location.href = '/new';
  }
  return (
    <div className={ style.addButton }>
      <button onClick={ sendUserToNew }>
        ADICIONAR
        </button>
    </div>
  )
}
