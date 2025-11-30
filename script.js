document.addEventListener('DOMContentLoaded', () => {
    // --- KHAI BÁO CÁC PHẦN TỬ ---
    const loveZoneBtn = document.getElementById('loveZoneBtn');
    const passwordModal = document.getElementById('passwordModal');
    // Tìm modal-content để lát nữa nhét trái tim to vào
    const modalContent = passwordModal ? passwordModal.querySelector('.modal-content') : null;
    const closeBtn = document.querySelector('.close-btn');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');

    // --- CẤU HÌNH MẬT KHẨU ---
    const CORRECT_PASSWORD = "yeuthao123"; 
    // -------------------------

    // ============================================================
    // PHẦN 1: CHUẨN BỊ CSS VÀ CÁC HIỆU ỨNG TRÁI TIM (BY GEMINI)
    // ============================================================
    function injectHeartStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Định nghĩa nhịp tim đập "thật" */
            @keyframes realHeartBeat {
                0% { transform: scale(1); }
                14% { transform: scale(1.3); }
                28% { transform: scale(1); }
                42% { transform: scale(1.3); }
                70% { transform: scale(1); }
            }
            
            /* Style cho trái tim nhỏ ở nút bấm (yêu cầu trước) */
            .btn-heart {
                display: inline-block;
                color: #ff3366;
                margin-right: 8px;
                font-size: 1.2em;
                animation: realHeartBeat 1.5s infinite ease-in-out;
                filter: drop-shadow(0 0 5px rgba(255, 51, 102, 0.8));
            }

            /* --- MỚI THÊM: Style cho trái tim TO ở trong modal --- */
            .modal-big-heart {
                font-size: 80px; /* Kích thước Siêu To */
                text-align: center;
                display: block;
                margin: 0 auto 20px auto; /* Căn giữa và cách ô nhập một chút */
                color: #ff0040; /* Màu đỏ hồng rực rỡ */
                /* Dùng lại hiệu ứng đập ở trên nhưng chậm hơn chút cho nó "thấm" */
                animation: realHeartBeat 2s infinite ease-in-out; 
                filter: drop-shadow(0 0 15px rgba(255, 0, 64, 0.6)); /* Phát sáng mạnh hơn */
            }
        `;
        document.head.appendChild(style);
    }

    // Hàm thêm trái tim nhỏ vào nút bấm ban đầu
    function addButtonHeart() {
        if (loveZoneBtn && !loveZoneBtn.querySelector('.btn-heart')) {
            const originalText = loveZoneBtn.innerText;
            loveZoneBtn.innerHTML = `<span class="btn-heart">❤️</span> ${originalText}`;
        }
    }

    // Chạy ngay khi load trang
    injectHeartStyles();
    addButtonHeart();
    // ============================================================


    // ============================================================
    // PHẦN 2: LOGIC MODAL VÀ MẬT KHẨU
    // ============================================================

    // Hàm mở modal (Đã nâng cấp thêm trái tim to)
    function openModal() {
        if (!passwordModal) return;

        // 1. Hiển thị modal
        passwordModal.style.display = 'flex'; 
        passwordInput.value = ''; 
        errorMessage.style.display = 'none'; 

        // 2. --- MỚI THÊM: Chèn trái tim TO vào modal nếu chưa có ---
        if (modalContent && !modalContent.querySelector('.modal-big-heart')) {
            // Tạo thẻ div chứa trái tim
            const bigHeartDiv = document.createElement('div');
            bigHeartDiv.className = 'modal-big-heart';
            bigHeartDiv.innerHTML = '💖'; // Dùng icon trái tim lấp lánh này cho đẹp

            // Chèn vào đầu tiên trong modal-content (trên cùng)
            // Nếu muốn nó nằm dưới nút đóng (x), hãy thay đổi vị trí chèn ở đây.
            modalContent.insertBefore(bigHeartDiv, modalContent.firstChild);
        }
        // -----------------------------------------------------------
        
        passwordInput.focus(); 
    }

    // Hàm đóng modal
    function closeModal() {
        if (passwordModal) passwordModal.style.display = 'none';
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
            if(modalContent) {
                modalContent.classList.add('shake');
                setTimeout(() => {
                    modalContent.classList.remove('shake');
                }, 500);
            }
        }
    }

    // --- CÁC SỰ KIỆN (Bảo vệ kiểm tra null để tránh lỗi) ---
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
