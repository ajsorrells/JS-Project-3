const bedtimeInput = document.getElementById('bedtime');
const waketimeInput = document.getElementById('waketime');
const logButton = document.getElementById('logSleep');
const sleepLogDisplay = document.getElementById('sleepLog');

let sleepLog = JSON.parse(localStorage.getItem('sleepLog')) || [];

function displayLog(){
    sleepLogDisplay.innerHTML = "<h3>Sleep Log:</h3>";
    sleepLog.forEach(entry => {
        sleepLogDisplay.innerHTML += `<p>${entry.bedtime} - ${entry.waketime}: ${entry.duration}</p>`;
    });
}

function calculateDuration(bedtime, waketime){
    const bedTimeDate = new Date(`2023-01-01T${bedtime}`);
    const wakeTimeDate = new Date(`2023-01-01T${waketime}`);

    let diff = wakeTimeDate - bedTimeDate;
    if (diff < 0) diff += 24 * 60 * 60 * 1000;

    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

    return `${hours} hours and ${minutes} minutes`;
}

logButton.addEventListener('click', () => {
    const bedtime = bedtimeInput.value;
    const waketime = waketimeInput.value;

    if (bedtime && waketime){
        const duration = calculateDuration(bedtime, waketime);
        sleepLog.push({ bedtime, waketime, duration });
        localStorage.setItem('sleepLog', JSON.stringify(sleepLog));
        displayLog();
        bedtimeInput.value = '';
        waketimeInput.value = '';
    } else {
        alert('Please enter both bedtime and wakeup time.');
    }
});

displayLog();