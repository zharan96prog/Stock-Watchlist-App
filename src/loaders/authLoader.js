import { redirect } from 'react-router-dom';
import store from '../redux/store';

export async function authLoader() {
  const { user } = store.getState().auth;

  if (!user) {
    throw redirect('/login');
  }

  return null;
}
