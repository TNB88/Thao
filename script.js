document.addEventListener('DOMContentLoaded', () => {
    const loveZoneBtn = document.getElementById('loveZoneBtn');
    const passwordModal = document.getElementById('passwordModal');
    const closeBtn = document.querySelector('.close-btn');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');

    // --- CẤU HÌNH MẬT KHẨU ---
    // Bạn hãy thay đổi mật khẩu ở đây nhé!
    const CORRECT_PASSWORD = "yeuthao123"; 
    // -------------------------

    // Hàm mở modal
    function openModal() {
        passwordModal.style.display = 'flex'; // Sử dụng Flex để căn giữa
        passwordInput.value = ''; // Xóa mật khẩu cũ
        errorMessage.style.display = 'none'; // Ẩn lỗi cũ
        passwordInput.focus(); // Tự động focus vào ô nhập
    }

    // Hàm đóng modal
    function closeModal() {
        passwordModal.style.display = 'none';
    }

    // Hàm kiểm tra mật khẩu
    function checkPassword() {
        const password = passwordInput.value;
        if (password === CORRECT_PASSWORD) {
            // Mật khẩu ĐÚNG -> Chuyển hướng đến trang blog
            window.location.href = 'blog.html'; 
        } else {
            // Mật khẩu SAI -> Hiển thị thông báo lỗi
            errorMessage.style.display = 'block';
            passwordInput.value = ''; // Xóa mật khẩu sai
            passwordInput.focus();
            // Hiệu ứng rung lắc báo lỗi
            passwordModal.querySelector('.modal-content').classList.add('shake');
            setTimeout(() => {
                passwordModal.querySelector('.modal-content').classList.remove('shake');
            }, 500);
        }
    }

    // --- CÁC SỰ KIỆN ---
    // Click nút "Nhịp Đập Tình Yêu"
    loveZoneBtn.addEventListener('click', openModal);

    // Click nút đóng (x)
    closeBtn.addEventListener('click', closeModal);

    // Click ra ngoài vùng modal để đóng
    window.addEventListener('click', (event) => {
        if (event.target === passwordModal) {
            closeModal();
        }
    });

    // Click nút "MỞ KHÓA"
    submitPasswordBtn.addEventListener('click', checkPassword);

    // Nhấn phím Enter trong ô nhập mật khẩu
    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkPassword();
        }
    });
});
