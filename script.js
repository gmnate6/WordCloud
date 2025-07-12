document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('showPopupBtn');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('closePopupBtn');

    btn.addEventListener('click', function() {
        popup.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Optional: close popup when clicking outside the content
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
