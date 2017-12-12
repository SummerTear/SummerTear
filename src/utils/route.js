import history from '../history';

export function route(url, replace = false) {
  if (replace) {
    history.replace(url);
  } else {
    history.push(url);
  }
}
