document.addEventListener('DOMContentLoaded', () => {
    const loveZoneBtn = document.getElementById('loveZoneBtn');
    const passwordModal = document.getElementById('passwordModal');
    const closeBtn = document.querySelector('.close-btn');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');

    // --- CẤU HÌNH MẬT KHẨU ---
    // Mật khẩu cho "nóc nhà" Thảo đây phải không? :v
    const CORRECT_PASSWORD = "yeuthao123"; 
    // -------------------------

    // ============================================================
    // PHẦN THÊM MỚI: HIỆU ỨNG TRÁI TIM ĐẬP CỰC ĐẸP BY GEMINI
    // ============================================================
    function addBeatingHeartEffect() {
        // 1. Tạo style CSS cho trái tim đập (Heartbeat Animation)
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes realHeartBeat {
                0% { transform: scale(1); }
                14% { transform: scale(1.3); }
                28% { transform: scale(1); }
                42% { transform: scale(1.3); }
                70% { transform: scale(1); }
            }
            
            .pro-heart {
                display: inline-block;
                color: #ff3366; /* Màu hồng đậm quyến rũ */
                margin-right: 8px;
                font-size: 1.2em; /* To hơn chữ một chút */
                animation: realHeartBeat 1.5s infinite ease-in-out; /* Nhịp đập vô cực */
                filter: drop-shadow(0 0 5px rgba(255, 51, 102, 0.8)); /* Phát sáng */
                vertical-align: middle;
            }

            /* Thêm hiệu ứng hover cho nút lung linh hơn */
            #loveZoneBtn {
                transition: all 0.3s ease;
            }
            #loveZoneBtn:hover {
                background-color: #ffe6ea; /* Đổi màu nền nhẹ khi di chuột */
                box-shadow: 0 0 15px rgba(255, 51, 102, 0.4);
                border-color: #ff3366;
            }
        `;
        document.head.appendChild(style);

        // 2. Chèn icon trái tim vào trước chữ trong nút
        if (loveZoneBtn) {
            // Giữ lại text cũ, chỉ thêm trái tim
            const originalText = loveZoneBtn.innerText; 
            loveZoneBtn.innerHTML = `<span class="pro-heart">❤️</span> ${originalText}`;
        }
    }

    // Kích hoạt hiệu ứng ngay
    addBeatingHeartEffect();
    // ============================================================


    // Hàm mở modal
    function openModal() {
        passwordModal.style.display = 'flex'; 
        passwordInput.value = ''; 
        errorMessage.style.display = 'none'; 
        passwordInput.focus(); 
    }

    // Hàm đóng modal
    function closeModal() {
        passwordModal.style.display = 'none';
    }

    // Hàm kiểm tra mật khẩu
    function checkPassword() {
        const password = passwordInput.value;
        if (password === CORRECT_PASSWORD) {
            // Mật khẩu ĐÚNG -> Chuyển hướng
            window.location.href = 'blog.html'; 
        } else {
            // Mật khẩu SAI
            errorMessage.style.display = 'block';
            passwordInput.value = ''; 
            passwordInput.focus();
            
            // Hiệu ứng rung lắc báo lỗi
            const content = passwordModal.querySelector('.modal-content');
            if(content) {
                content.classList.add('shake');
                setTimeout(() => {
                    content.classList.remove('shake');
                }, 500);
            }
        }
    }

    // --- CÁC SỰ KIỆN ---
    if(loveZoneBtn) loveZoneBtn.addEventListener('click', openModal);
    if(closeBtn) closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === passwordModal) {
            closeModal();
        }
    });

    if(submitPasswordBtn) submitPasswordBtn.addEventListener('click', checkPassword);

    if(passwordInput) {
        passwordInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                checkPassword();
            }
        });
    }
});
