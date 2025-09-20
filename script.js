// Card Generator Class
class CardGenerator {
    constructor() {
        this.bin = "";
        this.form = {
            cvv: "",
            expirationDateMonth: "",
            expirationDateYear: "",
            quantity: 5,
            currency: "USD",
            balance: "500-1000"
        };
        this.items = [];
        this.isGenerating = false;
    }

    generateCardNumber(bin) {
        let cardNumber = "";
        for (let attempts = 500; attempts >= 1; attempts--) {
            cardNumber = this.substituteStringSpecialRandom(bin, "x", "0123456789");
            let cleanNumber = this.substituteString(cardNumber, " -/abcdefghijklmnopqrstuvwyzABCDEFGHIJLMNOPQRSTUVWYZ");
            let luhnCheck = this.checkLuhn(cleanNumber);
            let checksumCheck = this.checkCardChecksum(cleanNumber, this.random(0, 9));
            
            if (luhnCheck && checksumCheck) {
                break;
            }
        }
        return cardNumber;
    }

    generateCvv() {
        let cvvLength = this.bin.length < 16 ? 4 : 3;
        let cvv = this.form.cvv || "";
        
        if (cvv.length === 1 && cvvLength === 3) {
            for (let i = 0; i < 2; i++) {
                cvv += this.random(0, 9);
            }
        }
        
        while (cvv.length < cvvLength) {
            cvv += this.random(0, 9);
        }
        
        return cvv.substring(0, cvvLength);
    }

    generateExpirationMonth() {
        return ("0" + (parseInt(this.form.expirationDateMonth) || this.random(1, 12))).slice(-2);
    }

    generateExpirationYear() {
        let currentYear = new Date().getFullYear();
        return (parseInt(this.form.expirationDateYear) || this.random(currentYear, currentYear + 8)).toString();
    }

    generateBalance() {
        let balanceRange = this.form.balance.split("-");
        let minBalance = parseInt(balanceRange[0], 10);
        return (100 * Math.ceil((Math.random() * (parseInt(balanceRange[1], 10) - minBalance) + minBalance) / 100)).toString();
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    substituteStringSpecialRandom(str, specialChars, replacementChars) {
        if (!replacementChars) {
            replacementChars = "0123456789";
        }
        
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let char = str.substring(i, i + 1);
            if (specialChars.indexOf(char) === -1) {
                result += char;
            } else {
                result += this.midString(replacementChars, Math.floor(Math.random() * (replacementChars.length - 1)) + 1, 1);
            }
        }
        return result;
    }

    substituteString(str, charsToRemove) {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let char = str.substring(i, i + 1);
            if (charsToRemove.indexOf(char) === -1) {
                result += char;
            }
        }
        return result;
    }

    checkLuhn(cardNumber) {
        let isEvenLength = this.isDivisible(cardNumber.length, 2);
        let sum = 0;
        
        for (let i = 1; i <= cardNumber.length; i++) {
            let digit = parseInt(this.midString(cardNumber, i, 1));
            if (this.isDivisible(i, 2) !== isEvenLength) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
        }
        
        return this.isDivisible(sum, 10);
    }

    checkCardChecksum(cardNumber, checksum) {
        let result = "";
        let multiplier = 1;
        
        for (let i = 1; i < cardNumber.length; i++) {
            let digit = parseInt(this.midString(cardNumber, i, 1)) * parseInt(this.midString("21", multiplier, 1));
            result += this.sumDigits(digit);
            if (++multiplier > 2) {
                multiplier = 1;
            }
        }
        
        let sum = this.sumDigits(result, -1);
        return (10 * this.sumDigits(sum, -1) - sum) % 10 === parseInt(this.rightString(cardNumber, 1));
    }

    midString(str, start, length) {
        if (!length) {
            length = str.length;
        }
        start = parseInt(start.toString());
        length = parseInt(length.toString());
        if (start < 0) start++;
        return str.substring(start - 1, start - 1 + length);
    }

    rightString(str, length) {
        return length >= 1 ? str.substring(str.length - length, str.length) : "";
    }

    isDivisible(number, divisor = 2) {
        number = parseInt(number.toString());
        divisor = parseInt(divisor.toString());
        return number / divisor === Math.floor(number / divisor);
    }

    sumDigits(number, digits = 1) {
        number = number.toString();
        
        if (digits > 0) {
            while (number.length > digits) {
                let sum = 0;
                for (let i = 1; i <= number.length; i++) {
                    sum += parseInt(this.midString(number.toString(), i, 1));
                }
                number = sum.toString();
            }
        } else {
            for (let i = 1; i <= Math.abs(digits); i++) {
                let sum = 0;
                for (let i = 1; i <= number.length; i++) {
                    sum += parseInt(this.midString(number.toString(), i, 1));
                }
                number = sum.toString();
            }
        }
        
        return parseInt(number.toString());
    }

    generate(bin) {
        if (bin.length < 6) {
            return [];
        }
        
        this.isGenerating = true;
        this.bin = bin;
        this.items = [];
        
        let quantity = parseInt(this.form.quantity.toString()) || 5;
        
        for (let i = 0; i < quantity; i++) {
            this.items.push({
                card_number: this.generateCardNumber(bin),
                expiration_month: this.generateExpirationMonth(),
                expiration_year: this.generateExpirationYear(),
                cvv: this.generateCvv(),
                currency: this.form.currency || "USD",
                balance: this.generateBalance()
            });
        }
        
        this.isGenerating = false;
        return this.items;
    }
}

// Global variables
let cardGenerator = new CardGenerator();
let cards = [];
let copiedIndex = null;

// Tab functionality
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Generate cards function
function generateCards() {
    const generateBtn = document.getElementById('generateBtn');
    const cardsGrid = document.getElementById('cardsGrid');
    
    // Show loading state
    generateBtn.innerHTML = '<i class="fas fa-sync-alt loading-spinner"></i><span>Đang tạo thẻ...</span>';
    generateBtn.disabled = true;
    
    // Generate cards after delay
    setTimeout(() => {
        cardGenerator.form.quantity = 5;
        cardGenerator.form.currency = "USD";
        cardGenerator.form.balance = "500-1000";
        
        const generatedCards = cardGenerator.generate("41546444014xxxxx").map(card => ({
            number: card.card_number,
            expMonth: card.expiration_month,
            expYear: card.expiration_year,
            cvv: card.cvv
        }));
        
        cards = generatedCards;
        renderCards();
        
        // Reset button
        generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i><span>Tạo thẻ mới</span>';
        generateBtn.disabled = false;
    }, 1000);
}

// Render cards function
function renderCards() {
    const cardsGrid = document.getElementById('cardsGrid');
    cardsGrid.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'virtual-card';
        cardElement.innerHTML = `
            <div class="card-header">
                <div class="card-info">
                    <div class="card-icon">
                        <i class="fas fa-credit-card"></i>
                    </div>
                    <div>
                        <div class="card-title">Thẻ #${index + 1}</div>
                        <div class="card-subtitle">Visa Virtual Card</div>
                    </div>
                </div>
                
                <button class="copy-btn" onclick="copyCard(${index})" title="Sao chép thông tin thẻ">
                    <i class="fas ${copiedIndex === index ? 'fa-check' : 'fa-copy'}"></i>
                </button>
            </div>

            <div class="card-details">
                <div class="card-detail">
                    <i class="fas fa-credit-card card-detail-icon"></i>
                    <span class="card-detail-label">Số thẻ:</span>
                    <span class="card-detail-value">****${card.number.slice(-4)}</span>
                </div>
                
                <div class="card-detail">
                    <i class="fas fa-calendar card-detail-icon"></i>
                    <span class="card-detail-label">Hết hạn:</span>
                    <span class="card-detail-value">${card.expMonth}/${card.expYear}</span>
                </div>
                
                <div class="card-detail">
                    <i class="fas fa-shield-alt card-detail-icon"></i>
                    <span class="card-detail-label">CVV:</span>
                    <span class="card-detail-value">***</span>
                </div>
            </div>

            ${copiedIndex === index ? `
                <div class="copy-success">
                    <i class="fas fa-check"></i>
                    <span>Đã sao chép thông tin thẻ!</span>
                </div>
            ` : ''}
        `;
        
        cardsGrid.appendChild(cardElement);
    });
}

// Copy card function
function copyCard(index) {
    const card = cards[index];
    const cardInfo = `${card.number}|${card.expMonth}|${card.expYear}|${card.cvv}`;
    
    navigator.clipboard.writeText(cardInfo).then(() => {
        copiedIndex = index;
        renderCards();
        
        // Reset copied state after 2 seconds
        setTimeout(() => {
            copiedIndex = null;
            renderCards();
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Không thể sao chép. Vui lòng thử lại.');
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Add click event listener to generate button
    document.getElementById('generateBtn').addEventListener('click', generateCards);
    
    // Generate initial cards
    generateCards();
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Add fade in animation for elements
function fadeIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.virtual-card, .step-item, .info-box');
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            fadeIn(element);
        }, index * 100);
    });
});
