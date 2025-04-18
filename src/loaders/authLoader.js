import { redirect } from 'react-router-dom';
import store from '../redux/store';

export async function authLoader() {
  const { user, isChecking } = store.getState().auth;

  if (isChecking) {
    return null;
  }

  if (!user) {
    throw redirect('/login');
  }

  return null;
}
