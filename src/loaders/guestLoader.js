import { redirect } from 'react-router-dom';
import store from '../redux/store';

export async function guestLoader() {
  const { user, isChecking } = store.getState().auth;

  if (user || isChecking) {
    // If the user is logged in or the authentication check is still in progress,
    // redirect them to the home page
    throw redirect('/');
  }

  return null;
}
