/* eslint-disable prettier/prettier */
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const INCREASE_AGE = 'INCREASE_AGE';
export const FETCH_CITIES = 'FETCH_CITIES';
export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};
export const setAge = age => dispatch => {
  dispatch({
    type: SET_USER_AGE,
    payload: age,
  });
};
export const increaseAge = age => dispatch => {
  dispatch({
    type: INCREASE_AGE,
    payload: age,
  });
};

const url = 'https://mocki.io/v1/0fee23f3-451f-49ef-b57e-879ed9d0adcf';

export const fetchCities = () => {
  return async dispatch => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      console.log('hi');
      const data = await res.json();
      if (data) {
        dispatch({
          type: FETCH_CITIES,
          payload: data,
        });
      } else {
        console.log('Cannot fetch data');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
