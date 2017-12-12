import configureStore from './configureStore.js';
import { createOnStorage } from './storageMiddleware';

const store = configureStore();
const onStorage = createOnStorage(store);
window.addEventListener('storage', onStorage);
export default store;
