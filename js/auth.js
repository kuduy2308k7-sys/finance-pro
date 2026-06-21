import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Đợi giao diện tải xong để bắt đầu xử lý sự kiện
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. XỬ LÝ FORM ĐĂNG KÝ / ĐĂNG NHẬP BẰNG USERNAME
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.onsubmit = async function(e) {
            e.preventDefault();
            
            // Lấy Username từ ô input gốc của bạn
            const username = document.getElementById('authUsername').value.trim();
            const password = document.getElementById('authPassword').value;
            
            // MẸO: Tự động chuyển Username thành một Email giả lập để Firebase chịu nhận diện
            // Ví dụ: "duy2308" sẽ thành "duy2308@financepro.local"
            const emailFake = `${username}@financepro.local`;
            
            // Kiểm tra trạng thái form hiện tại (đăng ký hay đăng nhập) dựa theo biến authIsLogin ở file html của bạn
            const isRegisterMode = !window.authIsLogin; 

            if (isRegisterMode) {
                // ĐĂNG KÝ QUA FIREBASE
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, emailFake, password);
                    alert('Đăng ký tài khoản thành công!');
                    
                    // Chuyển sang chế độ Đăng nhập giống như code cũ của bạn
                    window.authIsLogin = true; 
                    if (window.btnToggleAuth) window.btnToggleAuth.click();
                } catch (error) {
                    console.error(error);
                    // Dịch một vài lỗi phổ biến của Firebase sang tiếng Việt cho thân thiện
                    if (error.code === 'auth/email-already-in-use') {
                        alert('Tài khoản này đã tồn tại!');
                    } else if (error.code === 'auth/weak-password') {
                        alert('Mật khẩu quá yếu! Vui lòng nhập từ 6 ký tự trở lên.');
                    } else {
                        alert('Lỗi đăng ký: ' + error.message);
                    }
                }
            } else {
                // ĐĂNG NHẬP QUA FIREBASE
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, emailFake, password);
                    
                    // Khi lưu tên hiển thị, ta cắt bỏ phần đuôi đi để hiển thị lại đúng Username gốc
                    window.loggedUser = username; 
                    localStorage.setItem('v5_logged_user', username);
                    
                    if (typeof window.showPeriodsScreen === "function") {
                        window.showPeriodsScreen();
                    }
                } catch (error) {
                    console.error(error);
                    alert('Sai tài khoản hoặc mật khẩu!');
                }
            }
            authForm.reset();
        };
    }

    // 2. XỬ LÝ ĐĂNG XUẤT (LOGOUT)
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.onclick = async () => {
            try {
                await signOut(auth);
                localStorage.removeItem('v5_logged_user');
                window.loggedUser = null;
                if (typeof window.showAuthScreen === "function") window.showAuthScreen();
            } catch (error) {
                console.error(error);
            }
        };
    }

    // 3. ĐIỀU HƯỚNG GIAO DIỆN CŨ
    const navLogo = document.getElementById('navLogo');
    if (navLogo) {
        navLogo.onclick = () => { if(window.loggedUser) window.showPeriodsScreen(); };
    }

    const btnBackToPeriods = document.getElementById('btnBackToPeriods');
    if (btnBackToPeriods) {
        btnBackToPeriods.onclick = () => window.showPeriodsScreen();
    }

    // 4. ĐỒNG BỘ TRẠNG THÁI ĐĂNG NHẬP KHI TẢI LẠI TRANG
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Lấy email giả lập về và cắt bỏ đuôi để lấy lại Username gốc
            const originalUsername = user.email.split('@')[0];
            window.loggedUser = originalUsername;
            localStorage.setItem('v5_logged_user', originalUsername);
            if (typeof window.showPeriodsScreen === "function") window.showPeriodsScreen();
        } else {
            window.loggedUser = null;
            if (typeof window.showAuthScreen === "function") window.showAuthScreen();
        }
    });
});
