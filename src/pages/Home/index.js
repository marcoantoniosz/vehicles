import React from 'react';
import { useEffect, useContext, useCallback } from 'react';
import { getAll, deleteVehicle, toggleFavorite, getById } from '../../services/API.js';
import VehiclesCard from '../../components/VehiclesCard/index.js';
import SearchBar from '../../components/SearchBar/index.js';
import AppContext  from '../../context/AppContext.js';
import AddButton from '../../components/AddButton/index.js';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();

  const { data, setData } = useContext(AppContext);

  const fetchAllData = useCallback(async () => {
      const response = await getAll();
      setData(response)
  }, [setData]);


  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const deleteBtn = async ( { target} ) => {
    const id = target.parentElement.parentElement.id;
    await deleteVehicle(id);
    fetchAllData();
  };

  const editBtn = async ( { target } ) => {
    const id = target.parentElement.parentElement.id;
    navigate(`/edit/${id}`);
  }

  const favoriteBtn = async ( { target } ) => {
    const id = target.parentElement.parentElement.id;
    const favorite = await getById(id);
    const structure = {
      favorite: !favorite[0].favorited
    }
    await toggleFavorite(structure, id);
  }

  return (

    <main>

        <SearchBar getAllBtn={ fetchAllData } />
        <AddButton />
        <div className={ style.title }>
        {!data.message && data.length > 0 ? <h3>Meus Anúncios</h3> : undefined }
        </div>
      <div className={ style.cardsContainer }> 
      
        { data.message ? 
        <h1 className={ style.error } >{data.message}</h1> 
        :
        data.map(item => 
        <VehiclesCard
          check={item.favorited}
          favoriteBtn={favoriteBtn}
          editBtn={ editBtn }
          deleteBtn={ deleteBtn }
          id={item.id}
          key={item.id}
          title={`${item.brand} ${item.name}`}
          price={item.price}
          description={item.description}
          year={item.year}
          color={item.color}
        />)  }
      </div>
    </main>
  )
}
