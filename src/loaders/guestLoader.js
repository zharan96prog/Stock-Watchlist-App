import { redirect } from 'react-router-dom';
import store from '../redux/store';

export async function guestLoader() {
  const { user, isChecking } = store.getState().auth;

  if (isChecking) {
    return null;
  }

  if (user) {
    // If the user is logged in redirect them to the home page
    throw redirect('/');
  }

  return null;
}
