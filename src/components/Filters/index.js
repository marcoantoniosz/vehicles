import React, { useState, useEffect, useContext } from 'react';
import { getAll } from '../../services/API';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { getByFilters } from '../../services/API';
import AppContext from '../../context/AppContext.js';
import style from './style.module.css';

export default function Filters(props) {

  const { close } = props;

  const { setData } = useContext(AppContext);

  const schema = yup.object({
    brand: yup.string().required('É necessário que o campo de marca seja preenchido'),
    color: yup.string().required('É necessário que o campo de cor seja preenchido'),
    year: yup.string().required('É necessário que o campo de ano seja preenchido'),
    min: yup.number().positive().integer().required(),
    max: yup.number().positive().integer().required(),
  }).required();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data) => {
    const filteredData = await getByFilters(data.brand, data.color, data.year, data.min, data.max);
    setData(filteredData);
    close();
  };

  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [years, setYeats] = useState([]);

  const getFilters = async () => {
    const response = await getAll();
    setBrands(response.map((item) => item.brand));
    setColors(response.map((item) => item.color));
    setYeats(response.map((item) => item.year));
  }

  useEffect(() => {
    getFilters();
  }, []);

  return (
    <main>
      <form className={ style.form } onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h6>Marca:</h6>
          <select {...register("brand", { required: true })}>
            <option></option>
            {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </div>
        <div>
          <h6>Ano:</h6>
          <select {...register("year", { required: true })}>
            <option></option>
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
        <div>
          <h6>Cor:</h6>
          <select {...register("color", { required: true })}>
            <option></option>
            {colors.map((color) => <option key={color} value={color}>{color}</option>)}
          </select>
        </div>
        <div className={ style.price }>
          <div>
            <h6>Preço mín.</h6>
            <input type="number" {...register("min", { min: 1, required:true })} />
          </div>
          <div>
            <h6>Preço máx.</h6>
            <input type="number" {...register("max", { min: 1, required:true })} />
          </div>
        </div>
        <button className={ style.submitBtn } type="submit">Filtrar</button>
    </form>
    </main>
  )
}
