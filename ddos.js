document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ddos-form');
    const ipInput = document.getElementById('ip-address');
    const portInput = document.getElementById('port');
    const typeSelect = document.getElementById('attack-type');
    const output = document.getElementById('output');
    const actionButton = document.getElementById('attack-toggle');
    const countdownDisplay = document.getElementById('countdown-display');
    const attackDurationDisplay = document.getElementById('attack-duration');

    let isAttacking = false;
    let isInDelay = false;
    let attackTimeout;
    let countdownInterval;
    let delayTimeout;
    let delayDuration = 20000; // 20 seconds in milliseconds
    let duration = 3600; // 1 hour in seconds
    let remainingTime;
    let startTime;

    actionButton.addEventListener('click', () => {
        const ip = ipInput.value.trim();
        const port = portInput.value.trim();
        const type = typeSelect.value;
        const ipPort = ip && port ? `${ip}:${port}` : '';

        if (ipPort === '') {
            if (isAttacking || isInDelay) {
                stopAttack();
            } else {
                output.innerHTML = '<br>No IP address and port provided. Please enter both.';
            }
            return;
        }

        if (isAttacking) {
            stopAttack();
        } else if (isInDelay) {
            stopDelay();
        } else {
            startDelay(ipPort, type);
        }
    });

    ipInput.addEventListener('input', () => {
        if (isAttacking && (ipInput.value.trim() === '' || portInput.value.trim() === '')) {
            stopAttack();
        }
    });

    portInput.addEventListener('input', () => {
        if (isAttacking && (ipInput.value.trim() === '' || portInput.value.trim() === '')) {
            stopAttack();
        }
    });

    function startDelay(ipPort, type) {
        output.innerHTML = '<br>Attack will start in 20 seconds...';
        actionButton.classList.add('waiting');
        actionButton.textContent = 'Cancel';

        clearTimeout(delayTimeout);
        clearInterval(countdownInterval);

        isInDelay = true;

        delayTimeout = setTimeout(() => {
            startAttack(ipPort, type);
        }, delayDuration);
    }

    function stopDelay() {
        clearTimeout(delayTimeout);
        clearInterval(countdownInterval);

        output.innerHTML = '<br>Attack cancelled during delay.';
        actionButton.classList.remove('waiting');
        actionButton.textContent = 'Start Attack';
        countdownDisplay.innerHTML = 'Countdown cancelled.';

        isInDelay = false;
    }

    function startAttack(ipPort, type) {
        if (ipPort.trim() === '') {
            stopAttack();
            return;
        }
    
        output.innerHTML = '<br>Initiating attack...';
        actionButton.classList.add('active');
        actionButton.textContent = 'Stop Attack';
        isAttacking = true;
        isInDelay = false;
        startTime = Date.now();
        remainingTime = duration;
    
        fetch('/start-attack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ipPort, type })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            if (data.success) {
                output.innerHTML += `<br>${data.message || 'Attack successfully started.'}`;
                startCountdown();
            } else {
                output.innerHTML += '<br>Failed to start attack: ' + (data.message || 'Unknown error');
                stopAttack();
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            output.innerHTML += '<br>Failed to start attack. Please try again.';
            stopAttack();
        });

        attackTimeout = setTimeout(() => {
            stopAttack();
        }, duration * 1000);
    }

    function stopAttack() {
        output.innerHTML += '<br>Attack stopped.';
        clearTimeout(attackTimeout);
        clearInterval(countdownInterval);
        clearTimeout(delayTimeout);
        actionButton.classList.remove('active', 'waiting');
        actionButton.textContent = 'Start Attack';
        isAttacking = false;
        isInDelay = false;

        if (startTime) {
            const totalDuration = (Date.now() - startTime) / 1000;
            attackDurationDisplay.innerHTML = `Total Attack Duration: ${formatDuration(totalDuration)}`;
        }

        remainingTime = duration;
        countdownDisplay.innerHTML = 'Attack stopped.';
    }

    function startCountdown() {
        countdownDisplay.innerHTML = `Time remaining: ${formatDuration(remainingTime)}`;
        
        countdownInterval = setInterval(() => {
            if (remainingTime <= 0) {
                stopAttack();
                return;
            }

            remainingTime--;
            countdownDisplay.innerHTML = `Time remaining: ${formatDuration(remainingTime)}`;
        }, 1000);
    }

    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}m ${secs}s`;
    }
});
