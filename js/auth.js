import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

export async function register(email,password){

    return await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function login(email,password){

    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function logout(){

    return await signOut(auth);
}

// Đoạn code test tạm thời cho Bước 6
import { auth } from "./firebase.js";

console.log("--- KIỂM TRA KẾT NỐI FIREBASE ---");
console.log(auth);
