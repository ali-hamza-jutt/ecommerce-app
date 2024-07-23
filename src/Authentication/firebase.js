import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// dotenv-config.js



const app = initializeApp({
    apiKey: "AIzaSyAQuB3AtXIcIwEpR68u5k27i69u5UdnWAo",
    authDomain: "asos-19555.firebaseapp.com",
    projectId: "asos-19555",
    storageBucket: "asos-19555.appspot.com",
    messagingSenderId: "549816589718",
    appId: "1:549816589718:web:db3d24260c04bafee711b7",
    measurementId: "G-29T6Q3YTW3"
});

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
