import React from 'react';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

export default function AddButton() {
  const navigate = useNavigate();
  const sendUserToNew = () => {
    navigate('/new');
  }
  return (
    <div className={ style.addButton }>
      <button onClick={ sendUserToNew }>
        ADICIONAR
        </button>
    </div>
  )
}
