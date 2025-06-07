// ===================
// GLOBAL VARIABLES
// ===================
let audioElement = null;
let isPlaying = false;

// ===================
// INITIALIZATION
// ===================
document.addEventListener('DOMContentLoaded', () => {
    audioElement = document.getElementById('demo-audio');
    observeElements();
    updateCountdown();
    
    // 檢查 Firebase 是否正確載入
    setTimeout(() => {
        if (typeof window.firebaseDatabase === 'undefined') {
            console.warn('Firebase 未正確載入，請檢查配置');
        }
    }, 2000);
});

// ===================
// AUDIO FUNCTIONALITY
// ===================

/**
 * 處理主要音頻播放功能
 */
function handleAudioPlay() {
    const button = document.querySelector('.cta-button');
    const playIcon = document.querySelector('.play-icon');
    const buttonText = document.querySelector('.button-text');
    
    // 如果正在播放，暫停音頻
    if (isPlaying) {
        pauseAudio();
        return;
    }
    
    // 顯示 loading 狀態
    button.classList.add('loading');
    buttonText.textContent = '準備中...';
    
    // 重置音頻播放位置
    if (audioElement) {
        audioElement.currentTime = 0;
        
        // 播放音頻
        const playPromise = audioElement.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // 播放成功
                button.classList.remove('loading');
                button.classList.add('playing');
                playIcon.textContent = '⏸️';
                buttonText.textContent = '播放中...';
                isPlaying = true;
            }).catch((error) => {
                // 播放失敗
                console.error('Audio play failed:', error);
                button.classList.remove('loading');
                buttonText.textContent = '播放失敗，請重試';
                setTimeout(() => {
                    resetButton();
                }, 2000);
            });
        }
        
        // 音頻播放結束事件
        audioElement.addEventListener('ended', () => {
            resetButton();
        }, { once: true });
    }
}

/**
 * 暫停音頻播放
 */
function pauseAudio() {
    if (audioElement && isPlaying) {
        audioElement.pause();
        resetButton();
    }
}

/**
 * 重置播放按鈕狀態
 */
function resetButton() {
    const button = document.querySelector('.cta-button');
    const playIcon = document.querySelector('.play-icon');
    const buttonText = document.querySelector('.button-text');
    
    button.classList.remove('loading', 'playing');
    playIcon.textContent = '▶️';
    buttonText.textContent = '好啦我要聽看看';
    isPlaying = false;
}

// ===================
// VOICE DEMO FUNCTIONALITY
// ===================

/**
 * 播放語音風格演示
 * @param {number} voiceType - 語音類型 (1-3)
 */
function playVoiceDemo(voiceType) {
    const buttons = document.querySelectorAll('.play-demo-btn');
    const currentButton = buttons[voiceType - 1];
    
    // 重置所有按鈕
    buttons.forEach(btn => {
        btn.classList.remove('playing');
        btn.innerHTML = `<span class="btn-icon">▶️</span><span>${btn.querySelector('span:last-child').textContent}</span>`;
    });
    
    // 設置當前按鈕為播放狀態
    currentButton.classList.add('playing');
    currentButton.innerHTML = `<span class="btn-icon">⏸️</span><span>播放中...</span>`;
    
    // 模擬播放時間（實際應該連接真實音頻）
    setTimeout(() => {
        currentButton.classList.remove('playing');
        currentButton.innerHTML = `<span class="btn-icon">▶️</span><span>${getOriginalText(voiceType)}</span>`;
    }, 3000);
    
    // UTM 追蹤
    console.log(`Voice demo played: ${voiceType}`);
}

/**
 * 獲取原始按鈕文字
 * @param {number} voiceType - 語音類型
 * @returns {string} 原始文字
 */
function getOriginalText(voiceType) {
    const texts = {
        1: '試聽專業風格',
        2: '試聽老師風格',
        3: '試聽聊天風格'
    };
    return texts[voiceType];
}

// ===================
// FORM HANDLING
// ===================

/**
 * 處理註冊表單提交
 * @param {Event} event - 表單提交事件
 */
async function handleSignup(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    
    // 驗證 Email
    if (!email || !email.includes('@')) {
        alert('請輸入有效的 Email 地址');
        return;
    }
    
    // 檢查是否已經註冊過
    if (await checkEmailExists(email)) {
        alert('此 Email 已經在候補名單中了！');
        return;
    }
    
    // 設置 loading 狀態
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // 保存到 Firebase Database
        const signupData = {
            email: email,
            timestamp: window.firebaseServerTimestamp(),
            source: 'landing_page',
            utmSource: getUTMParameter('utm_source'),
            utmMedium: getUTMParameter('utm_medium'),
            utmCampaign: getUTMParameter('utm_campaign'),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct'
        };
        
        // 推送到 Firebase
        const signupsRef = window.firebaseRef(window.firebaseDatabase, 'signups');
        await window.firebasePush(signupsRef, signupData);
        
        // 成功狀態
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        submitBtn.querySelector('.btn-text').textContent = '已成功加入候補名單！';
        
        // 追蹤成功事件
        console.log('Email saved to Firebase:', email);
        trackEvent('signup_completed', { email: email });
        
        // 重置表單
        setTimeout(() => {
            emailInput.value = '';
            submitBtn.style.background = 'linear-gradient(135deg, #ed8936, #dd6b20)';
            submitBtn.querySelector('.btn-text').textContent = '搶先加入候補名單';
        }, 3000);
        
    } catch (error) {
        console.error('Firebase save error:', error);
        
        // 錯誤處理
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        submitBtn.querySelector('.btn-text').textContent = '註冊失敗，請重試';
        
        // 顯示錯誤訊息
        alert('註冊過程中發生錯誤，請檢查網路連線後重試');
        
        // 5秒後重置按鈕
        setTimeout(() => {
            submitBtn.style.background = 'linear-gradient(135deg, #ed8936, #dd6b20)';
            submitBtn.querySelector('.btn-text').textContent = '搶先加入候補名單';
        }, 5000);
    }
}

/**
 * 檢查 Email 是否已存在
 * @param {string} email - 要檢查的 email
 * @returns {boolean} 是否已存在
 */
async function checkEmailExists(email) {
    try {
        // 這裡可以添加查詢邏輯，檢查 email 是否已存在
        // 由於 Firebase Realtime Database 的查詢限制，
        // 建議在後端實現或使用 Firestore
        return false; // 暫時返回 false
    } catch (error) {
        console.error('Check email error:', error);
        return false;
    }
}

// ===================
// UTILITY FUNCTIONS
// ===================

/**
 * 獲取 UTM 參數
 * @param {string} param - UTM 參數名稱
 * @returns {string} 參數值
 */
function getUTMParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || '';
}

/**
 * 事件追蹤
 * @param {string} eventName - 事件名稱
 * @param {Object} properties - 事件屬性
 */
function trackEvent(eventName, properties) {
    // Google Analytics 或其他追蹤工具整合
    console.log('Event tracked:', eventName, properties);
    
    // 如果有 Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // 如果有 Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', properties);
    }
}

// ===================
// UI UPDATES
// ===================

/**
 * 更新社交證明數據
 */
function updateSocialProof() {
    const proofText = document.querySelector('.proof-text');
    const countdown = document.querySelector('.countdown');
    
    // 更新數字（實際應該從 Firebase 獲取真實數據）
    const currentCount = 87;
    const newCount = currentCount + 1;
    const remaining = 100 - newCount;
    
    proofText.textContent = `已有 ${newCount} 位投資朋友加入候補名單`;
    countdown.textContent = `僅剩 ${remaining} 個名額！`;
    
    // 添加動畫效果
    proofText.style.animation = 'pulse 0.5s ease-in-out';
    countdown.style.animation = 'pulse 0.5s ease-in-out';
}

/**
 * 實時更新倒數
 */
function updateCountdown() {
    const countdown = document.querySelector('.countdown');
    
    // 模擬實時更新（實際應該從 Firebase 獲取真實數據）
    setTimeout(() => {
        countdown.style.color = '#ef4444';
        countdown.style.animation = 'pulse 1s infinite';
    }, 5000);
}

// ===================
// SCROLL ANIMATIONS
// ===================

/**
 * 觀察元素並觸發滾動動畫
 */
function observeElements() {
    const problemCards = document.querySelectorAll('.problem-card');
    const solutionCards = document.querySelectorAll('.solution-card');
    const advantageCards = document.querySelectorAll('.advantage-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay) * 1000 || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.3
    });
    
    [...problemCards, ...solutionCards, ...advantageCards].forEach((card) => {
        observer.observe(card);
    });
}

// ===================
// NOTIFICATION ANIMATIONS
// ===================

/**
 * 通知循環動畫
 */
function loopNotification() {
    const notification = document.querySelector('.notification');
    if (notification) {
        setTimeout(() => {
            notification.style.animation = 'none';
            notification.offsetHeight; // 觸發重繪
            notification.style.animation = 'slideInNotification 0.8s ease-out forwards';
        }, 6000);
    }
}

// 啟動循環
setTimeout(loopNotification, 6000);
setInterval(loopNotification, 10000);

// ===================
// GLOBAL FUNCTIONS (for onclick handlers)
// ===================

// 將函數綁定到全局作用域，以支援 HTML 中的 onclick 事件
window.handleAudioPlay = handleAudioPlay;
window.playVoiceDemo = playVoiceDemo;
window.handleSignup = handleSignup;