function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if this cookie string begins with the name we want
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
// Example for saving a plant
    function savePlant(status, image, date, time) {
        const formData = new FormData();
        formData.append('status', status);
        formData.append('image', image);
        formData.append('date', date);
        formData.append('time', time);

        fetch('/save-plant/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')  // Ensure you include CSRF token
            }
        })
            .then(response => {
                if (response.ok) {
                   console.log('Plant saved successfully'); // Handle success
                } else {
                   console.error('Error saving plant:', response.statusText); // Handle error
                }
            })
        .catch(error => console.error('Error saving plant:', error));
    }

// Example for saving an allowlist
    function saveAllowlist(url) {
        fetch('/save-allowlist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({url: url})
        })
            .then(response => {
                if (response.ok) {
                    // Handle success
                } else {
                    // Handle error
                }
            });
    }

// Example for saving a blocklist
    function saveBlocklist(url) {
        fetch('/save-blocklist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({url: url})
        })
            .then(response => {
                if (response.ok) {
                    // Handle success
                } else {
                    // Handle error
                }
            });
    }

function fetchAllowlist() {
    fetch('/api/my-allowlist/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Allowlist data:', data); // Log the fetched data
            const allowlistContainer = document.getElementById('allowlistContainer');
            allowlistContainer.innerHTML = ''; // Clear existing content
            if (data.length === 0) {
                allowlistContainer.innerHTML = '<li>No URLs in allowlist.</li>'; // Display message if empty
            } else {
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.url; // Access the 'url' property of the object
                    allowlistContainer.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Error fetching allowlist:', error));
}

function fetchBlocklist() {
    fetch('/api/my-blocklist/')
        fetch('/api/my-blocklist/')
            .then(response => response.json())
            .then(data => {
                const blocklistContainer = document.getElementById('blocklistContainer');
                blocklistContainer.innerHTML = ''; // Clear existing content
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.url; // Access the 'url' property of the object
                    blocklistContainer.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching blocklist:', error));
    }
// Function to fetch and display plants
    function fetchPlants() {
        fetch('/api/my-plants/')
            .then(response => response.json())
            .then(data => {
                const plantsContainer = document.getElementById('plantsContainer');
                plantsContainer.innerHTML = ''; // Clear existing content
                data.forEach(plant => {
                    const plantElement = document.createElement('div');
                    plantElement.className = 'flex items-center space-x-4';
                    plantElement.innerHTML = `
                        <img alt="${plant.status} tree" class="w-16 h-16 rounded-full" src="${plant.image}" />
                        <div>
                            <p>Ekish sanasi(Date of Planting): ${plant.date}</p>
                            <p>Sarflangan vaqt(Time Taken): ${plant.time} minut(minutes)</p>
                        </div>
                    `;
                    plantsContainer.appendChild(plantElement);
                });
            })
            .catch(error => console.error('Error fetching plants:', error));
    }


function initializeForest() {
    console.log("forest");
    const forestElement = document.getElementById('forest');
    let currentTreeIndex = 0; // Initialize to the first tree index

    // // Fetch the allowlist and blocklist when the forest page is loaded
    // fetchAllowlist();
    // fetchBlocklist();
    // const healthyTreeImages = [
    // "{% static 'img/trees/0/7.png' %}", // Healthy image for tree 0
    // "{% static 'img/trees/1/7.png' %}", // Healthy image for tree 1
    // "{% static 'img/trees/2/7.png' %}", // Healthy image for tree 2
    // "{% static 'img/trees/3/7.png' %}", // Healthy image for tree 3
    // "{% static 'img/trees/4/7.png' %}", // Healthy image for tree 4
    // "{% static 'img/trees/5/7.png' %}", // Healthy image for tree 5
    // "{% static 'img/trees/6/7.png' %}", // Healthy image for tree 6
    // ];
    const treeImagePath = forestElement.getAttribute('data-tree-image-path');

    const deadTreeImage = [
        treeImagePath + 'trees/0/dead.png',
        treeImagePath + 'trees/1/dead.png',
        treeImagePath + 'trees/2/dead.png',
        treeImagePath + 'trees/3/dead.png',
        treeImagePath + 'trees/4/dead.png',
        treeImagePath + 'trees/5/dead.png',
        treeImagePath + 'trees/6/dead.png'
    ];
    // Create an array to store image paths for each tree
    const treeImages = [
        [
            treeImagePath + 'trees/0/0.png',
            treeImagePath + 'trees/0/1.png',
            treeImagePath + 'trees/0/2.png',
            treeImagePath + 'trees/0/3.png',
            treeImagePath + 'trees/0/4.png',
            treeImagePath + 'trees/0/5.png',
            treeImagePath + 'trees/0/6.png',
            treeImagePath + 'trees/0/7.png'
        ],
        [
            treeImagePath + 'trees/1/0.png',
            treeImagePath + 'trees/1/1.png',
            treeImagePath + 'trees/1/2.png',
            treeImagePath + 'trees/1/3.png',
            treeImagePath + 'trees/1/4.png',
            treeImagePath + 'trees/1/5.png',
            treeImagePath + 'trees/1/6.png',
            treeImagePath + 'trees/1/7.png'
        ],
        [
            treeImagePath + 'trees/2/0.png',
            treeImagePath + 'trees/2/1.png',
            treeImagePath + 'trees/2/2.png',
            treeImagePath + 'trees/2/3.png',
            treeImagePath + 'trees/2/4.png',
            treeImagePath + 'trees/2/5.png',
            treeImagePath + 'trees/2/6.png',
            treeImagePath + 'trees/2/7.png'
        ],
        [
            treeImagePath + 'trees/3/0.png',
            treeImagePath + 'trees/3/1.png',
            treeImagePath + 'trees/3/2.png',
            treeImagePath + 'trees/3/3.png',
            treeImagePath + 'trees/3/4.png',
            treeImagePath + 'trees/3/5.png',
            treeImagePath + 'trees/3/6.png',
            treeImagePath + 'trees/3/7.png'
        ],
        [
            treeImagePath + 'trees/4/0.png',
            treeImagePath + 'trees/4/1.png',
            treeImagePath + 'trees/4/2.png',
            treeImagePath + 'trees/4/3.png',
            treeImagePath + 'trees/4/4.png',
            treeImagePath + 'trees/4/5.png',
            treeImagePath + 'trees/4/6.png',
            treeImagePath + 'trees/4/7.png'
        ],
        [
            treeImagePath + 'trees/5/0.png',
            treeImagePath + 'trees/5/1.png',
            treeImagePath + 'trees/5/2.png',
            treeImagePath + 'trees/5/3.png',
            treeImagePath + 'trees/5/4.png',
            treeImagePath + 'trees/5/5.png',
            treeImagePath + 'trees/5/6.png',
            treeImagePath + 'trees/5/7.png'
        ],
        [
            treeImagePath + 'trees/6/0.png',
            treeImagePath + 'trees/6/1.png',
            treeImagePath + 'trees/6/2.png',
            treeImagePath + 'trees/6/3.png',
            treeImagePath + 'trees/6/4.png',
            treeImagePath + 'trees/6/5.png',
            treeImagePath + 'trees/6/6.png',
            treeImagePath + 'trees/6/7.png'
        ]
    ];
    //  initialize the tree image
    const treeImageElement = document.getElementById('treeImage');
    treeImageElement.src = treeImages[currentTreeIndex][0];// Display the initial image for the first tree
    console.log('treeimage src:', treeImageElement.src)
    console.log('Current Tree Index:', currentTreeIndex);
    console.log('Setting tree image source to:', treeImages[currentTreeIndex][0]);

    const times = ['03:00', '05:00', '10:00', '15:00', '30:00', '60:00', '120:00'];
    let currentTimeIndex = 2;
    const timeElement = document.getElementById('time');

    const messages = ["Keep up going", "You can do it", "Keep working", "Stay focused", "It's almost done"];
    const messageElement = document.getElementById('message');

    const buttons = document.querySelectorAll('.control-button');
    const giveUpButton = document.getElementById('giveUpButton');

    const allowlist = [];
    const blocklist = [];
    const plants = [];

    let totalFocusedTime = 0; // in minutes
    function startTimer(duration) {
        initialTimerValue = duration;
        elapsedTime = 0;
        // Add the disabled class to buttons and images
        document.querySelectorAll('.control-button').forEach(button => {
            button.classList.add('disabled');
        });
        treeImageElement.classList.add('disabled'); // Disable the image


        timerInterval = setInterval(() => {
            elapsedTime += 1;
            if (elapsedTime >= initialTimerValue) {
                stopTimer(false);
            }
        }, 1000);

    }

    function toggleButtons(disabled, disableControlButtons = false) {
        buttons.forEach(button => {
            button.disabled = disabled;
            if (disabled) {
                button.classList.add('opacity-90', 'cursor-not-allowed',);
            } else {
                button.classList.remove('opacity-90', 'cursor-not-allowed');
            }
        });
        giveUpButton.disabled = !disabled;
        if (!disabled) {
            giveUpButton.classList.add('opacity-90', 'cursor-not-allowed');
        } else {
            giveUpButton.classList.remove('opacity-90', 'cursor-not-allowed');
        }
        // Disable/enable control buttons (tree navigation and timer control)
        const controlButtons = [document.getElementById('prevTree'), document.getElementById('nextTree'), document.getElementById('prevTime'), document.getElementById('nextTime')];
        controlButtons.forEach(button => {
            button.disabled = disableControlButtons;
            if (disableControlButtons) {
                button.classList.add('opacity-90', 'cursor-not-allowed');
            } else {
                button.classList.remove('opacity-90', 'cursor-not-allowed');
            }
        });
    }

    function updateAchievementIcon() {
        const achievementIcon = document.getElementById('achievementIcon');
        if (totalFocusedTime >= 7 * 24 * 60) {
            achievementIcon.className = 'fas fa-crown text-white text-2xl';
            achievementIcon.title = 'Adept Planter';
        } else if (totalFocusedTime >= 3 * 24 * 60) {
            achievementIcon.className = 'fas fa-medal text-white text-2xl';
            achievementIcon.title = 'Apprentice Planter';
        } else if (totalFocusedTime >= 4 * 60) {
            achievementIcon.className = 'fas fa-seedling text-white text-2xl';
            achievementIcon.title = 'Novice Planter';
        } else {
            achievementIcon.className = 'fas fa-trophy text-white text-2xl';
            achievementIcon.title = 'No Achievement Yet';
        }
    }

    function initializeTreeImage() {
        for (let i = 0; i < treeImages.length; i++) {
            treeImageElement.src = treeImages[i][0]; // Display the initial image for each tree
        }
    }


    document.getElementById('prevTree').addEventListener('click', function () {
        currentTreeIndex = (currentTreeIndex - 1 + treeImages.length) % treeImages.length;
        treeImageElement.src = treeImages[currentTreeIndex][0]; // Reset to the first stage of the selected tree

    });

    document.getElementById('nextTree').addEventListener('click', function () {
        currentTreeIndex = (currentTreeIndex + 1) % treeImages.length;
        treeImageElement.src = treeImages[currentTreeIndex][0]; // Reset to the first stage of the selected tree
        console.log('Current Tree Index:', currentTreeIndex);
        console.log('Setting tree image source to:', treeImages[currentTreeIndex][0]);

    });

    document.getElementById('prevTime').addEventListener('click', function () {
        currentTimeIndex = (currentTimeIndex - 1 + times.length) % times.length;
        timeElement.textContent = times[currentTimeIndex];
    });

    document.getElementById('nextTime').addEventListener('click', function () {
        currentTimeIndex = (currentTimeIndex + 1) % times.length;
        timeElement.textContent = times[currentTimeIndex];
    });

    document.getElementById('blocklistButton').addEventListener('click', function () {
        const modal = document.getElementById('blocklistModal');
        modal.classList.remove('hidden');
    });

    document.getElementById('allowlistButton').addEventListener('click', function () {
        const modal = document.getElementById('allowlistModal');
        modal.classList.remove('hidden');
    });

    document.getElementById('blocklistAddButton').addEventListener('click', function () {
        const inputField = document.getElementById('blocklistInput');
        if (inputField.value) {
            saveBlocklist(inputField.value); // Call the function to save the blocklist // online
            //saveBlocklist.push(inputField.value) //ofline
            updateBlocklistView();
            alert(`Added to blocklist: ${inputField.value}`);
            inputField.value = '';
            document.getElementById('blocklistModal').classList.add('hidden');
        }
    });

    document.getElementById('allowlistAddButton').addEventListener('click', function () {
        const inputField = document.getElementById('allowlistInput');
        if (inputField.value) {
            saveAllowlist(inputField.value); // Call the function to save the allowlist //online

            allowlist.push(inputField.value); //ofline
            updateAllowlistView();
            alert(`Added to allowlist: ${inputField.value}`);
            inputField.value = '';
            document.getElementById('allowlistModal').classList.add('hidden');
        }
    });

    document.getElementById('blocklistCloseButton').addEventListener('click', function () {
        document.getElementById('blocklistModal').classList.add('hidden');
    });

    document.getElementById('allowlistCloseButton').addEventListener('click', function () {
        document.getElementById('allowlistModal').classList.add('hidden');
    });

    document.getElementById('gearButton').addEventListener('click', function () {
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.classList.toggle('hidden');
    });

    document.getElementById('myPlants').addEventListener('click', function () {
        const modal = document.getElementById('plantsModal');
        modal.classList.remove('hidden');
        document.getElementById('contextMenu').classList.add('hidden');
        updatePlantsView();
    });

    document.getElementById('myAllowlist').addEventListener('click', function () {
        const modal = document.getElementById('allowlistViewModal');
        modal.classList.remove('hidden');
        document.getElementById('contextMenu').classList.add('hidden');
        updateAllowlistView();
    });

    document.getElementById('myBlocklist').addEventListener('click', function () {
        const modal = document.getElementById('blocklistViewModal');
        modal.classList.remove('hidden');
        document.getElementById('contextMenu').classList.add('hidden');
        updateBlocklistView();
    });

    document.getElementById('plantsCloseButton').addEventListener('click', function () {
        document.getElementById('plantsModal').classList.add('hidden');
    });

    document.getElementById('allowlistViewCloseButton').addEventListener('click', function () {
        document.getElementById('allowlistViewModal').classList.add('hidden');
    });

    document.getElementById('blocklistViewCloseButton').addEventListener('click', function () {
        document.getElementById('blocklistViewModal').classList.add('hidden');
    });

    function updateAllowlistView() {
        fetch('/api/my-allowlist/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Allowlist data:', data); // Log the fetched data
                const allowlistContainer = document.getElementById('allowlistContainer');
                allowlistContainer.innerHTML = ''; // Clear existing content
                if (data.length === 0) {
                    allowlistContainer.innerHTML = '<li>No URLs in allowlist.</li>'; // Display message if empty
                } else {
                    data.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item.url; // Access the 'url' property of the object
                        allowlistContainer.appendChild(li);
                    });
                }
            })
            .catch(error => console.error('Error fetching allowlist:', error));
    }
    function updateBlocklistView() {
        fetch('/api/my-blocklist/')
        fetch('/api/my-blocklist/')
            .then(response => response.json())
            .then(data => {
                const blocklistContainer = document.getElementById('blocklistContainer');
                blocklistContainer.innerHTML = ''; // Clear existing content
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.url; // Access the 'url' property of the object
                    blocklistContainer.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching blocklist:', error));
    }
    function updatePlantsView() {
        fetch('/api/my-plants/')
            .then(response => response.json())
            .then(data => {
                const plantsContainer = document.getElementById('plantsContainer');
                plantsContainer.innerHTML = ''; // Clear existing content
                data.forEach(plant => {
                    const plantElement = document.createElement('div');
                    plantElement.className = 'flex items-center space-x-4';
                    plantElement.innerHTML = `
                        <img alt="${plant.status} tree" class="w-16 h-16 rounded-full" src="${plant.image}" />
                        <div>
                            <p>Ekish sanasi(Date of Planting): ${plant.date}</p>
                            <p>Sarflangan vaqt(Time Taken): ${plant.time} minut(minutes)</p>
                        </div>
                    `;
                    plantsContainer.appendChild(plantElement);
                });
            })
            .catch(error => console.error('Error fetching plants:', error));
    }

    let timerInterval;
    let messageInterval;
    let treeStageInterval;

    let hasGivenUp = false; // New state variable to track if the user has given up
    let elapsedTime = 0; // Variable to track elapsed time in seconds
    let initialTimerValue = 0;

    function stopTimer(isGiveUp = false) {
        clearInterval(timerInterval);
        clearInterval(messageInterval);
        clearInterval(treeStageInterval);
         const status = isGiveUp ? 'Dead' : 'Healthy'; // Set status based on whether the user gave up
         const image = isGiveUp ? deadTreeImage[currentTreeIndex] : treeImages[currentTreeIndex][7]; // Set image based on the state
         const date = new Date().toISOString().split('T')[0]; // Get today's date
         const time = isGiveUp ? Math.max(0, elapsedTime / 60).toFixed(1) : Math.max(0, initialTimerValue / 60); // Store time in minutes as a float

        if (isGiveUp) {
            alert("Siz taslim bo'ldingiz! (You gave up!)");
            treeImageElement.src = deadTreeImage[currentTreeIndex];
            hasGivenUp = true; // Set the state to true when the user gives up

            // Calculate the time taken based on the initial timer value minus the remaining time
            plants.push({
                status: 'Qurigan (Dead)',
                image: deadTreeImage[currentTreeIndex],
                date: new Date().toISOString().split('T')[0],
                time: Math.max(0, elapsedTime / 60).toFixed(1) // Store time in minutes, ensuring it's not negative
            });
            // Set the message and toggle buttons
            messageElement.textContent = "Ekish jarayonini boshlash uchun daraxtni bosing (Click the tree to start planting!)";
            toggleButtons(false);
        } else {
            alert("Tabriklayman, Siz sog'lom daraxt o'sdirdingiz! (Congratulations, you have grown up a healthy tree!)");
            treeImageElement.src = treeImages[currentTreeIndex][7]; // Show the fully grown tree image
            plants.push({
                status: 'Soglom (Healthy)',
                image: treeImages[currentTreeIndex][7],
                date: new Date().toISOString().split('T')[0],
                time: Math.max(0, initialTimerValue / 60) // Store the initial timer value in minutes
            });
            updateAchievementIcon();
        }
        // Call savePlant to store the plant data
        savePlant(status, image, date, time);
        // Reset the message and toggle buttons
        messageElement.textContent = "Ekish jarayonini boshlash uchun daraxtni bosing (Click the tree to start planting!)";
        toggleButtons(false);
        // Reset the timer display to initial value (e.g., 03:00)
            const initialMinutes = 3; // Set this to your initial minutes
            const initialSeconds = 0; // Set this to your initial seconds
            timeElement.textContent = `${String(initialMinutes).padStart(2, '0')}:${String(initialSeconds).padStart(2, '0')}`;
        // Reset the tree image to the initial state
        currentTreeIndex = 0; // Reset to the first tree image
        treeImageElement.src = treeImages[currentTreeIndex][0]; // Reset the tree image to the first stage

        // Remove the disabled class from buttons and images
        document.querySelectorAll('.control-button').forEach(button => {
            button.classList.remove('disabled');
        });
        treeImageElement.classList.remove('disabled'); // Enable the image

        // Reset the relevant states
        initialTimerValue = 0;
        elapsedTime = 0;
        timerInterval = null;
        messageInterval = null;
        treeStageInterval = null;
        currentTreeIndex = 0;
        hasGivenUp = false;
    }

    giveUpButton.addEventListener('click', function () {
        stopTimer(true);
    });
    // In the treeImageElement click event listener
    treeImageElement.addEventListener('click', function () {
        if (hasGivenUp) { // Check if the user has given up
            // Reset the state to allow planting again
            hasGivenUp = false; // Reset the state
            currentTreeIndex = 0; // Reset to the first tree image
            treeImageElement.src = treeImages[currentTreeIndex][0]; // Reset the tree image
            timeElement.textContent = times[currentTimeIndex]; // Reset the time display
            messageElement.textContent = "Ekish jarayonini boshlash uchun daraxtni bosing (Click the tree to start planting!)"; // Reset the message
            toggleButtons(false); // Enable buttons
            elapsedTime = 0; // Reset elapsed time
            return; // Exit the function to prevent starting the timer
        }
        // If the timer is already running, stop it
        if (timerInterval) {
            stopTimer();
        }
        // Start the planting process
        let [minutes, seconds] = timeElement.textContent.split(':').map(Number);
        initialTimerValue = minutes * 60 + seconds; // Store the initial timer value in seconds

        messageElement.textContent = messages[Math.floor(Math.random() * messages.length)];
        toggleButtons(true);
        elapsedTime = 0; // Reset elapsed time for the new planting session

        timerInterval = setInterval(function () {
            if (seconds === 0) {
                if (minutes === 0) {
                    stopTimer(false); // Call stopTimer with false to indicate successful completion
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            elapsedTime++; // Increment elapsed time
            timeElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
        messageInterval = setInterval(function () {
            messageElement.textContent = messages[Math.floor(Math.random() * messages.length)];
        }, 5000);

        treeStageInterval = setInterval(function () {
            let stageIndex = Math.floor((elapsedTime / initialTimerValue) * treeImages[currentTreeIndex].length);
            // Clamp the stageIndex to ensure it does not exceed the bounds of the array
            stageIndex = Math.min(stageIndex, treeImages[currentTreeIndex].length - 1);
            treeImageElement.src = treeImages[currentTreeIndex][stageIndex]; // Update the tree image based on the current growth stage
        }, 1000);
    });

    initializeTreeImage(); // Call to display initial images for all trees
    updateAchievementIcon();



}

document.addEventListener('DOMContentLoaded', initializeForest)
// Call the function to fetch the allowlist when the page loads
// Call these functions when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        fetchAllowlist();
        fetchBlocklist();
        fetchPlants();
    });