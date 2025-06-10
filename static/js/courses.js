const courseFunctions = {
    courseId: null, // Declare a variable to hold the current course ID
    pauseAllVideos: function () {
                    const videos = document.querySelectorAll('.video');
                    videos.forEach(video => {
                        video.pause(); // Pause each video
                        video.currentTime = 0; // Optionally reset the video to the start
                    });
                },
    handleQuizSubmission: function (courseId) {
                    const quizForm = document.getElementById(`quiz-form_${courseId}`);
                    const answers = {
                        course1: ['A', 'A', 'A', 'B', 'A'],
                        course2: ['A', 'C', 'C', 'A', 'C'],
                        course3: ['B', 'A', 'A', 'A', 'C'],
                        course4: ['A', 'A', 'A', 'C', 'A'],
                        course5: ['A', 'B', 'A', 'C', 'A'],
                        course6: ['A', 'A', 'C', 'A', 'A']

                        // Add answers for other courses here
                    };

                quizForm.addEventListener('submit', function(event) {
                    event.preventDefault(); // Prevent the form from submitting normally
                   let score = 0;

                        for (let i = 1; i <= 5; i++) {
                            const userAnswer = this['q' + i].value;
                            if (userAnswer === answers[courseId][i - 1]) {
                                    score++;
                            }
                        }

                    const resultDiv = document.getElementById(`quiz-result_${courseId}`);
                        resultDiv.classList.remove('hidden');
                        resultDiv.innerHTML = `<strong style="font-size: 1.5rem;">Siz 5 ta savoldan ${score} tasiga to'g'ri javob berdingiz.`;

                        const resultButtonsDiv = document.getElementById(`result-buttons_${courseId}`);
                        resultButtonsDiv.innerHTML = ''; // Clear previous buttons

                        if (score > 2) {
                            resultButtonsDiv.innerHTML += `<button onclick="courseFunctions.nextCourse_Module('${courseId}')" class="bg-green-500 text-white px-4 py-2 rounded-lg">Keyingi Modul <i class="fas fa-arrow-right"></i></button>`;
                        } else {
                            resultButtonsDiv.innerHTML += `<button onclick="courseFunctions.retakeQuiz('${courseId}')" class="bg-red-500 text-white px-4 py-2 rounded-lg">Qayta topshirish</button>`;
                        }
                    });
                },
 showCourse: function(element) {
    // function code here
      courseId = element.getAttribute('data-course');
                    const courseDiv = document.getElementById(courseId);

                    // Check if courseDiv exists
                    if (!courseDiv) {
                        console.error(`Course with ID ${courseId} not found.`);
                        return; // Exit the function if the course div is not found
                    }

                    document.getElementById('catalog').classList.add('hidden');
                    document.getElementById('course-content').classList.remove('hidden');
                    document.querySelectorAll('#course-content > div').forEach(div => div.classList.add('hidden'));
                    courseDiv.classList.remove('hidden');
                      // Call the function to handle quiz submission for the current course
                    courseFunctions.handleQuizSubmission(courseId);
  },
  showCatalog: function() {
    // function code here
      document.getElementById('catalog').classList.remove('hidden');
      document.getElementById('course-content').classList.add('hidden');
  },
  nextCourse_Module: function(courseId) {
    // function code here
      // Pause all videos
                courseFunctions.pauseAllVideos();
               // Select the currently visible module
                const currentModule = document.querySelector(`#${courseId} .module:not(.hidden)`);

                if (currentModule) {
                    currentModule.classList.add('hidden'); // Hide the current module
                    const nextModule = currentModule.nextElementSibling; // Get the next sibling module

                    // Check if the next module exists and is a module
                    if (nextModule && nextModule.classList.contains('module')) {
                        nextModule.classList.remove('hidden'); // Show the next module
                        window.scrollTo(0, 0);
                    } else {
                        alert('No more modules available.'); // Alert if there are no more modules
                    }
                }
  },
  showPreviousModule: function(courseId) {
    // function code here
      // Pause all videos
                    courseFunctions.pauseAllVideos();
                    const currentModule = document.querySelector(`#${courseId} > div:not(.hidden)`); // Select the currently visible module
                    if (currentModule) {
                    currentModule.classList.add('hidden'); // Hide the current module
                    const previousModule = currentModule.previousElementSibling; // Get the previous sibling module
                    if (previousModule) {
                        previousModule.classList.remove('hidden'); // Show the previous module
                        window.scrollTo(0, 0); // Scroll to the top of the page
                    } else {
                        alert('No more modules available.'); // Alert if there are no more modules
                    }
                }
  },
  retakeQuiz: function(courseId) {
    // function code here
   // Logic to reset the quiz
                    const quizForm = document.getElementById(`quiz-form_${courseId}`); // Get the quiz form for the specific course
                    const resultDiv = document.getElementById(`quiz-result_${courseId}`); // Get the result div for the specific course
                    const resultButtonsDiv = document.getElementById(`result-buttons_${courseId}`);
                    // Reset the quiz form
                    quizForm.reset();
                    resultDiv.classList.add('hidden'); // Hide the result div
                    resultButtonsDiv.innerHTML = ''; // Clear previous buttons
                    resultDiv.innerHTML = ''; // Reset the score display

  },
  matchingGame: {
        selectedTerm: null,
        matches: {},
        isProcessing: false,

        init: function() {
            const gameContainer = document.querySelector('.game-container');
            if (!gameContainer) {
                console.warn('Game container not found. Waiting for it to be added to the DOM.');
                return; // Exit if the game container is not found
            }
            this.bindEventListeners();
            this.setupDragAndDrop();
        },

        bindEventListeners: function() {
            const gameContainer = document.querySelector('.game-container');
            if (!gameContainer) {
            console.error('Game container not found.');
            return; // Exit if the game container is not found
            }

        gameContainer.addEventListener('click', (e) => {
            if (this.isProcessing) return;

        const card = e.target.closest('.card');
        if (!card) return;

        if (card.classList.contains('term-card')) {
            this.handleTermSelection(card);
        } else if (card.classList.contains('definition-card')) {
            this.handleDefinitionSelection(card);
        }
            });

            // Bind event listeners to all reset buttons
            document.querySelectorAll('.reset-game').forEach(button => {
                button.addEventListener('click', (e) => {
                    const courseId = e.target.getAttribute('data-course'); // Get the course ID from the button
                    courseFunctions.matchingGame.resetGame(courseId); // Pass the course ID to the reset function
                });
            });
        },

        setupDragAndDrop: function() {
            const terms = document.querySelectorAll('.term-card');
            const definitions = document.querySelectorAll('.definition-card');

            terms.forEach(term => {
                term.addEventListener('dragstart', (e) => {
                    this.selectedTerm = term; // Store the selected term
                    e.dataTransfer.setData('text/plain', term.dataset.term);
                });

                term.addEventListener('dragend', () => {
                    this.selectedTerm = null; // Clear selection on drag end
                });
            });

            definitions.forEach(def => {
                def.addEventListener('dragover', (e) => {
                    e.preventDefault(); // Allow drop
                });

                def.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const termId = e.dataTransfer.getData('text/plain');
                    const term = document.querySelector(`[data-term="${termId}"]`);
                    if (term && def.dataset.definition === termId) {
                        this.handleMatch(term, def);
                    } else {
                        this.handleMismatch(term, def);
                    }
                });
            });
        },

        handleTermSelection: function(term) {
            if (term.classList.contains('matched')) return;

            if (this.selectedTerm) {
                this.selectedTerm.classList.remove('selected');
            }

            term.classList.add('selected');
            this.selectedTerm = term;
        },

        handleDefinitionSelection: function(definition) {
            if (!this.selectedTerm || definition.classList.contains('matched')) return;

            if (this.selectedTerm.dataset.term === definition.dataset.definition) {
                this.handleMatch(this.selectedTerm, definition);
            } else {
                this.handleMismatch(this.selectedTerm, definition);
            }
        },

        handleMatch: function(term, definition) {
            this.isProcessing = true;
            term.classList.remove('selected');
            term.classList.add('matched');
            definition.classList.add('matched');

            // Get the current course ID
            const courseId = term.dataset.courseId; // Assuming you have a data attribute for courseId
            // Initialize matches for the current course if it doesn't exist
            if (!this.matches[courseId]) {
                this.matches[courseId] = 1;
            } else {
                this.matches[courseId]++;
            }
            this.updateScore(courseId);
            this.selectedTerm = null;
            this.isProcessing = false;

            // Check if all pairs are matched
            if (this.matches[courseId] === 3) { // Assuming there are 3 pairs
                let bonusModule = document.querySelector(`.bonus[id^="bonus_${courseId}"]`);
                if (bonusModule) {
                    bonusModule.classList.remove('hidden'); // Show the bonus module
                }
            }
        },

        handleMismatch: function(term, definition) {
            this.isProcessing = true;
            term.classList.add('error');
            definition.classList.add('error');

            setTimeout(() => {
                term.classList.remove('selected');
                term.classList.remove('error');
                definition.classList.remove('error');
                this.selectedTerm = null;
                this.isProcessing = false;
            }, 1000);
        },

        updateScore: function(courseId) {
            const scoreElement = document.getElementById(`score_${courseId}`);
            console.log('scoreElement:', scoreElement);
            if (scoreElement) {
                scoreElement.textContent = `Mosliklar soni: ${this.matches[courseId] || 0}/3`; // Update the score display
            }
        },

        resetGame: function(courseId) {
            const cards = document.querySelectorAll(`#${courseId} .card`); // Select cards for the specific course
            cards.forEach(card => {
                card.classList.remove('selected', 'matched', 'error');
            });
            // Hide the corresponding bonus module
            let bonusModule = document.querySelector(`.bonus[id^="bonus_${courseId}"]`);
            if (bonusModule) {
                bonusModule.classList.add('hidden');
            }
            this.selectedTerm = null;
            this.matches[courseId] = 0; // Reset matches for the specific course
            this.isProcessing = false;
            // Reset score display for the specific course
            const scoreElement = document.getElementById(`score_${courseId}`);
            if (scoreElement) {
                scoreElement.textContent = `Mosliklar soni: 0/3`; // Reset score display
            } else {
                console.error(`Score element not found for course ID: ${courseId}`); // Log an error if not found
            }
        }
    }
};

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    courseFunctions.matchingGame.init(); // Initialize the matching game
    // Add touch event support
    if ('ontouchstart' in window) {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('touchstart', (e) => {
                e.preventDefault();
                card.click();
            });
        });
    }
});



