// ===================
// GLOBAL VARIABLES
// ===================
let audioElement = null;
let isPlaying = false;
let currentDemo = null;

// ===================
// INITIALIZATION
// ===================
document.addEventListener('DOMContentLoaded', () => {
    audioElement = document.getElementById('demo-audio');
    observeElements();
    
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
    } else {
        // 如果沒有音頻文件，模擬播放
        setTimeout(() => {
            button.classList.remove('loading');
            button.classList.add('playing');
            playIcon.textContent = '⏸️';
            buttonText.textContent = '播放中...';
            isPlaying = true;
            
            // 模擬播放結束
            setTimeout(() => {
                resetButton();
            }, 5000);
        }, 1000);
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
    buttonText.textContent = '免費試聽個人化分析';
    isPlaying = false;
}

// ===================
// DEMO FUNCTIONALITY
// ===================

/**
 * 播放演示音頻
 * @param {string} demoType - 演示類型 ('aapl', 'fed', 'tsm')
 */
function playDemo(demoType) {
    const allPlayBtns = document.querySelectorAll('.demo-play-btn');
    const currentBtn = Array.from(allPlayBtns).find(btn => 
        btn.onclick && btn.onclick.toString().includes(demoType)
    );
    
    if (!currentBtn) return;
    
    // 停止其他正在播放的演示
    stopAllDemos();
    
    // 設置當前按鈕為播放狀態
    currentBtn.classList.add('playing');
    const playIcon = currentBtn.querySelector('.play-icon');
    const btnText = currentBtn.querySelector('span:last-child');
    const originalText = btnText.textContent;
    
    playIcon.textContent = '⏸️';
    btnText.textContent = '播放中...';
    currentDemo = demoType;
    
    // 追蹤事件
    trackEvent('demo_played', { demo_type: demoType });
    
    // 模擬播放時間（實際應該連接真實音頻）
    setTimeout(() => {
        if (currentDemo === demoType) {
            stopDemo(currentBtn, playIcon, btnText, originalText);
        }
    }, 15000); // 15秒演示
}

/**
 * 停止所有演示
 */
function stopAllDemos() {
    const allPlayBtns = document.querySelectorAll('.demo-play-btn');
    allPlayBtns.forEach(btn => {
        btn.classList.remove('playing');
        const playIcon = btn.querySelector('.play-icon');
        const btnText = btn.querySelector('span:last-child');
        if (playIcon) playIcon.textContent = '▶️';
        if (btnText) btnText.textContent = '試聽';
    });
    currentDemo = null;
}

/**
 * 停止特定演示
 */
function stopDemo(btn, playIcon, btnText, originalText) {
    btn.classList.remove('playing');
    playIcon.textContent = '▶️';
    btnText.textContent = originalText;
    currentDemo = null;
}

/**
 * 預約產品諮詢
 */
function bookConsultation() {
    // 追蹤事件
    trackEvent('consultation_clicked');
    
    // 可以整合 Calendly 或其他預約系統
    const calendlyUrl = 'https://calendly.com/yourpods/15min-consultation';
    
    // 檢查是否在行動裝置上
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 行動裝置直接開啟連結
        window.open(calendlyUrl, '_blank');
    } else {
        // 桌面版可以使用彈窗或內嵌
        window.open(calendlyUrl, 'consultation', 'width=800,height=600,scrollbars=yes,resizable=yes');
    }
    
    // 備用方案：如果沒有 Calendly，可以使用 email
    // window.location.href = 'mailto:hello@yourpods.com?subject=預約產品諮詢&body=我想了解更多關於YourPods的資訊，請安排15分鐘的產品諮詢。';
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
    if (!email || !isValidEmail(email)) {
        showMessage('請輸入有效的 Email 地址', 'error');
        return;
    }
    
    // 檢查是否已經註冊過
    if (await checkEmailExists(email)) {
        showMessage('此 Email 已經在候補名單中了！', 'warning');
        return;
    }
    
    // 設置 loading 狀態
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // 保存到 Firebase Database
        const signupData = {
            email: email,
            timestamp: window.firebaseServerTimestamp ? window.firebaseServerTimestamp() : Date.now(),
            source: 'landing_page_v2',
            utmSource: getUTMParameter('utm_source'),
            utmMedium: getUTMParameter('utm_medium'),
            utmCampaign: getUTMParameter('utm_campaign'),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct',
            pageVersion: '2.0'
        };
        
        // 推送到 Firebase
        if (window.firebaseDatabase && window.firebaseRef && window.firebasePush) {
            const signupsRef = window.firebaseRef(window.firebaseDatabase, 'signups');
            await window.firebasePush(signupsRef, signupData);
        } else {
            // 如果 Firebase 不可用，記錄到 localStorage 作為備用
            const backupData = JSON.parse(localStorage.getItem('yourpods_signups') || '[]');
            backupData.push(signupData);
            localStorage.setItem('yourpods_signups', JSON.stringify(backupData));
        }
        
        // 成功狀態
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        submitBtn.querySelector('.btn-text').textContent = '🎉 已成功加入候補名單！';
        
        // 追蹤成功事件
        trackEvent('signup_completed', { email: email, source: 'landing_page_v2' });
        
        // 顯示成功訊息
        showMessage('歡迎加入YourPods候補名單！我們會在產品上線時第一時間通知您。', 'success');
        
        // 重置表單
        setTimeout(() => {
            emailInput.value = '';
            submitBtn.style.background = '';
            submitBtn.querySelector('.btn-text').textContent = '立即開始7天免費體驗';
        }, 5000);
        
    } catch (error) {
        console.error('Signup error:', error);
        
        // 錯誤處理
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        submitBtn.querySelector('.btn-text').textContent = '註冊失敗，請重試';
        
        // 顯示錯誤訊息
        showMessage('註冊過程中發生錯誤，請檢查網路連線後重試', 'error');
        
        // 5秒後重置按鈕
        setTimeout(() => {
            submitBtn.style.background = '';
            submitBtn.querySelector('.btn-text').textContent = '立即開始7天免費體驗';
        }, 5000);
    }
}

/**
 * 檢查 Email 格式是否有效
 * @param {string} email - 要檢查的 email
 * @returns {boolean} 是否有效
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 檢查 Email 是否已存在
 * @param {string} email - 要檢查的 email
 * @returns {boolean} 是否已存在
 */
async function checkEmailExists(email) {
    try {
        // 檢查 localStorage 備用數據
        const backupData = JSON.parse(localStorage.getItem('yourpods_signups') || '[]');
        const exists = backupData.some(signup => signup.email === email);
        return exists;
    } catch (error) {
        console.error('Check email error:', error);
        return false;
    }
}

/**
 * 顯示訊息提示
 * @param {string} message - 訊息內容
 * @param {string} type - 訊息類型 ('success', 'error', 'warning')
 */
function showMessage(message, type = 'info') {
    // 創建訊息元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}`;
    messageDiv.textContent = message;
    
    // 添加樣式
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#ef4444' : '#f59e0b'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        animation: slideInMessage 0.3s ease-out;
    `;
    
    // 添加動畫樣式
    if (!document.getElementById('message-styles')) {
        const style = document.createElement('style');
        style.id = 'message-styles';
        style.textContent = `
            @keyframes slideInMessage {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 添加到頁面
    document.body.appendChild(messageDiv);
    
    // 3秒後自動移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideInMessage 0.3s ease-out reverse';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
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
function trackEvent(eventName, properties = {}) {
    // 添加通用屬性
    const commonProperties = {
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        ...properties
    };
    
    // Console 記錄
    console.log('Event tracked:', eventName, commonProperties);
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, commonProperties);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName === 'signup_completed' ? 'Lead' : 'ViewContent', commonProperties);
    }
    
    // 其他追蹤工具可以在這裡添加
}

// ===================
// SCROLL ANIMATIONS
// ===================

/**
 * 觀察元素並觸發滾動動畫
 */
function observeElements() {
    const animatedElements = document.querySelectorAll(`
        .pain-point,
        .value-item,
        .work-step,
        .demo-item,
        .authority-item,
        .scenario-item
    `);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 100; // 錯開動畫
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // 初始化動畫元素
    animatedElements.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
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
        }, 8000);
    }
}

// 啟動循環
setTimeout(loopNotification, 8000);
setInterval(loopNotification, 15000);

// ===================
// SMOOTH SCROLLING
// ===================

/**
 * 平滑滾動到元素
 * @param {string} targetId - 目標元素 ID
 */
function scrollToElement(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===================
// PAGE PERFORMANCE
// ===================

/**
 * 頁面載入完成後的性能追蹤
 */
window.addEventListener('load', () => {
    // 追蹤頁面載入時間
    const loadTime = performance.now();
    trackEvent('page_loaded', {
        load_time: Math.round(loadTime),
        page_version: '2.0'
    });
    
    // 預載重要資源
    if (audioElement) {
        // 預載音頻的 metadata
        audioElement.preload = 'metadata';
    }
});

// ===================
// GLOBAL FUNCTIONS (for onclick handlers)
// ===================

// 將函數綁定到全局作用域，以支援 HTML 中的 onclick 事件
window.handleAudioPlay = handleAudioPlay;
window.playDemo = playDemo;
window.handleSignup = handleSignup;
window.bookConsultation = bookConsultation;
window.scrollToElement = scrollToElement;