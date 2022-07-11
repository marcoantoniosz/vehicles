import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { getByQuery, getAll } from '../../services/API';
import PopUpFilters from '../PopUp';
import style from './style.module.css';
import searchi from '../../icons/search.svg';


export default function SearchBar(props) {

  const { getAllBtn } = props;

  const [term, setTerm] = useState('');
  const { setData } = useContext(AppContext);

  const handleInputChange = async (e) => {
    setTerm(e.target.value);
    if (e.target.value === '') {
      const response = await getAll();
      setData(response);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (term !== '') {
      const response = await getByQuery(term);
      setData(response);
    }
  }

  return (
    <form className={ style.nav }>
      <input 
        className={ style.input }
        type="text" 
        placeholder="&#xf002; Buscar"
        onChange={handleInputChange}
      />
      <input type="submit" className={ style.searchi } src={ searchi } alt="search-icon" onClick={ handleSubmit } />
      <PopUpFilters />
      <button onClick={ getAllBtn }>Exibir todos</button>
    </form>
  )
}
