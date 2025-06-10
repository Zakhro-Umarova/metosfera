          function  initializePomodoro(){
                    let timer;
                    let timeLeft = 1500; // 25 minutes in seconds
                    let isRunning = false;
                    let pomodoroCount = 0;
                    let cycleCount = 1;

                    const timerDisplay = document.getElementById('timer');
                    const startPauseBtn = document.getElementById('startPauseBtn');
                    const nextBtn = document.getElementById('nextBtn');
                    const pomodoroBtn = document.getElementById('pomodoroBtn');
                    const shortBreakBtn = document.getElementById('shortBreakBtn');
                    const longBreakBtn = document.getElementById('longBreakBtn');
                    const addTaskBtn = document.getElementById('addTaskBtn');
                    const taskModal = document.getElementById('taskModal');
                    const cancelTaskBtn = document.getElementById('cancelTaskBtn');
                    const saveTaskBtn = document.getElementById('saveTaskBtn');
                    const taskInput = document.getElementById('taskInput');
                    const tasksContainer = document.getElementById('tasks');
                    const timerSound = document.getElementById('timerSound');
                    const cycleCountDisplay = document.getElementById('cycleCount');
                    const statusText = document.getElementById('statusText');

                    function updateTimerDisplay() {
                        const minutes = Math.floor(timeLeft / 60);
                        const seconds = timeLeft % 60;
                        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    }

                    function startTimer() {
                        if (isRunning) return;
                        isRunning = true;
                        startPauseBtn.textContent = 'PAUSE';
                        nextBtn.classList.remove('hidden');
                        timer = setInterval(() => {
                            if (timeLeft > 0) {
                                timeLeft--;
                                updateTimerDisplay();
                            } else {
                                clearInterval(timer);
                                isRunning = false;
                                startPauseBtn.textContent = 'START';
                                timerSound.play();
                                handleNext();
                            }
                        }, 1000);
                    }
                    function pauseTimer() {
                        clearInterval(timer);
                        isRunning = false;
                        startPauseBtn.textContent = 'START';
                    }

                    function resetTimer(seconds) {
                        clearInterval(timer);
                        isRunning = false;
                        timeLeft = seconds;
                        updateTimerDisplay();
                        startPauseBtn.textContent = 'START';
                        nextBtn.classList.add('hidden');
                    }



                function handleNext() {
                    if (pomodoroCount < 7) {
                            if (pomodoroCount % 2 !== 0) {
                                resetTimer(1500); // 25 minutes for pomodoro
                                statusText.textContent = "Ta'lim olish vaqti!";
                                cycleCount++;
                                cycleCountDisplay.textContent = `#${cycleCount}`;
                            } else {
                                resetTimer(300); // 5 minutes for short break
                                statusText.textContent = "Tanaffus vaqti!";
                            }
                            pomodoroCount++;
                        } else {
                            resetTimer(900); // 15 minutes for long break
                            statusText.textContent = "Tanaffus vaqti!";
                            pomodoroCount = 0;
                            }
                    }

                    startPauseBtn.addEventListener('click', () => {
                        if (isRunning) {
                            pauseTimer();
                        } else {
                            startTimer();
                        }
                    });

                    nextBtn.addEventListener('click', () => {
                        handleNext();
                    });

                    pomodoroBtn.addEventListener('click', () => {
                        resetTimer(1500); // 25 minutes
                        statusText.textContent = "Ta'lim olish vaqti!";
                    });
                    shortBreakBtn.addEventListener('click', () => {
                        resetTimer(300); // 5 minutes
                        statusText.textContent = "Tanaffus vaqti!";
                    });
                    longBreakBtn.addEventListener('click', () => {
                        resetTimer(900); // 15 minutes
                        statusText.textContent = "Tanaffus vaqti!";
                    });

                    addTaskBtn.addEventListener('click', () => {
                        taskModal.classList.remove('hidden');
                        taskModal.classList.add('show'); // Add the show class to make it visible
                    });

                    cancelTaskBtn.addEventListener('click', () => {
                        taskModal.classList.remove('show'); // Remove the show class
                        setTimeout(() => {
            taskModal.classList.add('hidden'); // Add the hidden class after fade out
        }, 500);
                        taskInput.value = '';
                    });

                    saveTaskBtn.addEventListener('click', () => {
                        const taskName = taskInput.value.trim();
                        if (taskName) {
                            const taskItem = document.createElement('div');
                            taskItem.classList.add('flex', 'justify-between', 'items-center', 'bg-red-500', 'p-2', 'rounded', 'mb-2');
                            taskItem.innerHTML = `
                            <span>${taskName}</span>
                            <div class="flex space-x-2">
                                <button class="editTaskBtn bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                <button class="completeTaskBtn bg-green-500 text-white px-2 py-1 rounded">Complete</button>
                                <button class="deleteTaskBtn bg-red-700 text-white px-2 py-1 rounded">Delete</button>
                            </div>
                        `;
                            tasksContainer.appendChild(taskItem);

                            taskItem.querySelector('.editTaskBtn').addEventListener('click', () => {
                                const newTaskName = prompt('Edit Task', taskName);
                                if (newTaskName) {
                                    taskItem.querySelector('span').textContent = newTaskName;
                                }
                            });

                            taskItem.querySelector('.completeTaskBtn').addEventListener('click', () => {
                                taskItem.querySelector('span').classList.toggle('line-through');
                            });

                            taskItem.querySelector('.deleteTaskBtn').addEventListener('click', () => {
                                tasksContainer.removeChild(taskItem);
                            });

                            taskModal.classList.add('hidden');
                            taskInput.value = '';
                        }
                    });
                }
