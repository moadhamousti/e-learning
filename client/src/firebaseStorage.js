import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './firebaseConfig';

const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };