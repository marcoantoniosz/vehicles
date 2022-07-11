export const getAll = async () => {
  const response = await fetch('https://vehicles-challenge-backend.herokuapp.com/ads');
  const data = await response.json();
  return data;
};

export const getById = async (id) => {
  const response = await fetch(`https://vehicles-challenge-backend.herokuapp.com/ads/${id}`);
  const data = await response.json();
  return data;
};

export const getByQuery = async (query) => {
  const response = await fetch(`https://vehicles-challenge-backend.herokuapp.com/ads/search?q=${query}`);
  const data = await response.json();
  return data;
}

export const getByFilters = async (b, c, y, min, max) => {
  const response = await fetch(`https://vehicles-challenge-backend.herokuapp.com/ads/filters?b=${b}&c=${c}&y=${y}&min=${min}&max=${max}`);
  const data = await response.json();
  return data;
}

export const createNewVehicle = async (vehicle) => {
  const response = await fetch('https://vehicles-challenge-backend.herokuapp.com/ads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  });
  const data = await response.json();
  return data;
}

export const deleteVehicle = async (id) => {
  const response = await fetch(`https://vehicles-challenge-backend.herokuapp.com/ads/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};

export const updateVehicle = async (vehicle, id) => {
  const response = await fetch(`https://vehicles-challenge-backend.herokuapp.com/ads/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  });
  const data = await response.json();
  return data;
};

export const toggleFavorite = async (favorite, id) => {
  const response = await fetch(`https://vehicles-challenge-backend.herokuapp.com/ads/favorite/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favorite),
  });
  const data = await response.json();
  return data;
};