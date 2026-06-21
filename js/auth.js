import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

export async function register(email, password){
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password){
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout(){
    return await signOut(auth);
}

// === ĐOẠN CODE TEST BƯỚC 6 (ĐÃ XÓA DÒNG IMPORT TRÙNG) ===
console.log("--- KIỂM TRA KẾT NỐI FIREBASE ---");
console.log(auth);
