import React, { useState, useEffect, useCallback } from 'react';
import { getById } from '../../services/API';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { updateVehicle } from '../../services/API';
import style from './style.module.css';
const { useNavigate } = require('react-router-dom');

export default function Edit() {

  const navigate = useNavigate();

  const { id } = useParams();
  const [vehicle, setVehicle] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await getById(id);
    setVehicle(response);
  }, [id]);

  const schema = yup.object({
    name: yup.string().max(50, 'Limite de 50 caracteres').required('É necessário que o campo de nome seja preenchido'),
    brand: yup.string().max(50, 'Limite de 50 caracteres').required('É necessário que o campo de marca seja preenchido'),
    color: yup.string().max(50, 'Limite de 50 caracteres').required('É necessário que o campo de cor seja preenchido'),
    year: yup.number().min(1000).max(2999).required('É necessário que o campo de ano seja preenchido'),
    plate: yup.string().min(7, 'A placa deve possuir 7 caracteres').max(7, 'A placa deve possuir 7 caracteres').required('É necessário que o campo de placa seja preenchido'),
    description: yup.string().max(500, 'Limite de 500 caracteres').required('É necessário que o campo de descrição seja preenchido'),
    price: yup.number().required('É necessário que o campo de preço seja preenchido'),
  }).required();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const structure = {
      name: data.name,
      brand: data.brand,
      color: data.color,
      year: data.year,
      plate: data.plate,
      description: data.description,
      price: data.price,
      favorite: vehicle[0].favorited,
    }
    await updateVehicle(structure, id);
    navigate('/');
  };

  const backToHome = () => {
    navigate('/');
  };


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main>
      <form className={ style.form }  onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h6>Nome:</h6>
            <input {...register("name", { required: true, maxLength: 50 })} />
          </div>
          <div>
            <h6>Marca:</h6>
            <input {...register("brand", { required: true, maxLength: 50 })} />
          </div>
          <div>
            <h6>Cor:</h6>
            <input {...register("color", { required: true, maxLength: 50 })} />
          </div>
          <div>
            <h6>Ano:</h6>
            <input type="number" {...register("year", { required: true })} />
          </div>
          <div>
            <h6>Placa:</h6>
            <input {...register("plate", { required: true, minLength:7, maxLength: 7 })} />
          </div>
          <div>
            <h6>Descrição:</h6>
            <input {...register("description", { required: true })} />
          </div>
          <div>
            <h6>Preço:</h6>
            <input type="number" {...register("price", { required: true })} />
          </div>
          <div className={ style.buttons }>
            <button className={ style.button } type="submit">Salvar</button>
            <button onClick={ backToHome } className={ style.button }>Voltar</button>
          </div>
      </form>
    </main>
  )
}
