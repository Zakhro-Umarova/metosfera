function initializeIKIGAI() {
    console.log("IKIGAI initialized");
    const buttons = document.querySelectorAll('button.option');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('bg-green-300');
            this.classList.toggle('bg-green-500');
            this.classList.toggle('text-white');
        });
    });

    const form = document.getElementById('ikigai-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const selectedTags = Array.from(document.querySelectorAll('.option.bg-green-500')).map(button => button.textContent.trim());
        const courseRecommendations = getCourseRecommendations(selectedTags);
        displayRecommendations(courseRecommendations);
        drawIkigaiDiagram(selectedTags);
    });
}

        function getCourseRecommendations(selectedTags) {
            const courses = [
                { title: "Axborotni samarali izlash algoritmi", tags: ["axborotni tez topishni", "yangi narsalarni o‘rganishni", "muammolarga yechim topishni", "kompyuterdan foydalanishni", "muammolarni hal qilishni", "qidiruv tizimlardan foydalanishni", "kompyuterdan foydalanishni", "yangi narsalarni o‘rganishni", "tez ma’lumot topishni", "bilganlarimni boshqalarga o‘rgatib", "axborotlarni topib berib", "axborotni samarali izlovchilar", "axborot tahlilchilari", "ishonchli manbani aniqlovchilar"], score: 0 },
                { title: "Axborotni tahrirlash texnologiyasi", tags: ["yangi narsalarni o‘rganishni", "kompyuterdan foydalanishni", "yaratish jarayonini", "muammolarni hal qilishni", "yangi narsalarni o‘rganishni", "kompyuterdan foydalanishni", "MS Worddan foydalanishni", "tahrirlash xizmatlari orqali", "kontent yaratib", "kontent yaratuvchilar", "muharrirlar"], score: 0 },
                { title: "Professional taqdimot yaratish", tags: ["yangi narsalarni o‘rganishni ", "kompyuterdan foydalanishni", "ijod qilishni", "taqdimot tayyorlashni", "vizuallashtirishni", "boshqalarga g‘oyalarni yetkazishni", "kompyuterdan foydalanishni", "taqdimot dasturlaridan foydalanishni", "taqdimotlar yaratib", "taqdimot yarata oladiganlar", "ma’lumotlarni visual tasvirlovchilar", "dizayner"], score: 0 },
                { title: "3D effektli elektron kitob yaratish", tags: ["kompyuterdan foydalanishni", "yaratish jarayonini", "yangi texnologiyani o‘rganishni", "yangi narsalarni o‘rganishni", "illustratsiyalar chizishni", "e-kitoblar yaratib", "dizayn xizmatlari orqali", "e-kitob yaratuvchilar", "ta’lim resurslarini yaratuvchilar"], score: 0 },
                { title: "Infografika yaratish", tags: ["yangi narsalarni o‘rganishni", "yaratish jarayonini", "illustratsiyalar chizishni", "vizuallashtirishni", "yangi narsalarni o‘rganishni", "kompyuterdan foydalanishni", "dizaynni", "kontent yaratib", "dizayn xizmatlari orqali", "kontent yaratuvchilar", "ma’lumotlarni visual tasvirlovchilar", "dizayner", "ta’lim resurslarini yaratuvchilar"], score: 0 },
                { title: "YouTubeda ta'limiy kanal ochish va yuritish", tags: ["yangi narsalarni o‘rganishni", "ijod qilishni", "o‘rgatishni", "boshqalarga g‘oyalarni yetkazishni", "kompyuterdan foydalanishni", "boshqalarga o‘rgatishni", "video yaratishni", "bilganlarimni boshqalarga o‘rgatib", "onlayn kurslar orqali", "reklama orqali", "konsalting xizmatlari orqali", "video kontent yaratib", "kontent yaratuvchilar", "ta’lim resurslarini yaratuvchilar", "ta’lim bloggeri", "onlayn ta’lim beruvchilar"], score: 0 },
                { title: "Interaktiv web quest yaratish", tags: ["yangi narsalarni o‘rganishni", "muammolarga yechim topishni", "kompyuterdan foydalanishni", "yaratish jarayonini", "yangi texnologiyani o‘rganishni", "vizuallashtirishni", "muammolarni hal qilishni", "yangi narsalarni o‘rganishni", "kompyuterdan foydalanishni", "boshqalarga o‘rgatishni", "dizaynni","onlayn kurslar orqali", "web quest yaratib", "ta’lim resurslarini yaratuvchilar", "onlayn ta’lim beruvchilar"], score: 0 },
                { title: "Ta'lim uchun foydali servislar", tags: ["yangi narsalarni o‘rganishni", "kompyuterdan foydalanishni", "yaratish jarayonini", "ijod qilishni", "o‘rgatishni", "boshqalarga g‘oyalarni yetkazishni", "muammolarni hal qilishni", "yangi narsalarni o‘rganishni", "kompyuterdan foydalanishni", "boshqalarga o‘rgatishni", "web saytlardan foydalanishni", "tez ma’lumot topishni", "bilganlarimni boshqalarga o‘rgatib", "kontent yaratib","onlayn kurslar orqali", "konsalting xizmatlari orqali", "ta’lim resurslarini yaratuvchilar", "onlayn ta’lim beruvchilar" ], score: 0 }
            ];
            const normalizedSelectedTags = selectedTags.map(tag => tag.toLowerCase().trim());

            courses.forEach(course => {
                const normalizedCourseTags = course.tags.map(tag => tag.toLowerCase().trim());
                course.score = normalizedCourseTags.filter(tag => normalizedSelectedTags.includes(tag)).length;
            });
            return courses.sort((a, b) => b.score - a.score).slice(0, 2);
        }

        function displayRecommendations(recommendations) {
            const recommendationsSection = document.getElementById('course-recommendations');
            recommendationsSection.innerHTML = `
                    <h2 class="text-3xl font-bold mb-4">Quyidagi kurslar Sizga ko'proq mos keladi</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${recommendations.map(course => `
                        <div class="bg-white p-6 rounded-lg shadow-lg">
                            <h3 class="text-xl font-semibold mb-2">${course.title}</h3>
                            <p>Score: ${course.score}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            recommendationsSection.classList.remove('hidden');
            document.getElementById('ikigai-diagram').classList.remove('hidden');
        }

        function drawIkigaiDiagram(selectedTags) {
            const ikigaiDiagram = document.getElementById('ikigai-diagram-svg');
            ikigaiDiagram.innerHTML = ''; // Clear previous diagram

            // Define the categories and their corresponding tags
            const categories = [
                {label: 'What You Love', color: 'red', tags: []},
                {label: 'What You Are Good At', color: 'blue', tags: []},
                {label: 'What You Can Be Paid For', color: 'green', tags: []},
                {label: 'What The World Needs', color: 'yellow', tags: []}
            ];


            // Define the mapping of tags to categories
            const tagCategoryMapping = {
                'axborotni tez topishni': 'What You Love',
                'yangi narsalarni o‘rganishni': 'What You Love',
                'muammolarga yechim topishni': 'What You Love',
                'kompyuterdan foydalanishni': 'What You Love',
                'yaratish jarayonini': 'What You Love',
                'ijod qilishni': 'What You Love',
                'taqdimot tayyorlashni': 'What You Love',
                'yangi texnologiyani o‘rganishni': 'What You Love',
                'illustratsiyalar chizishni': 'What You Love',
                'o‘rgatishni': 'What You Love',
                'vizuallashtirishni': 'What You Love',
                'boshqalarga g‘oyalarni yetkazishni': 'What You Love',

                'muammolarni hal qilishni': 'What You Are Good At',
                'qidiruv tizimlardan foydalanishni': 'What You Are Good At',
                'yangi narsalarni o‘rganishni': 'What You Are Good At',
                'kompyuterdan foydalanishni': 'What You Are Good At',
                'MS Worddan foydalanishni': 'What You Are Good At',
                'taqdimot dasturlaridan foydalanishni': 'What You Are Good At',
                'illustratsiyalar chizishni': 'What You Are Good At',
                'boshqalarga o‘rgatishni': 'What You Are Good At',
                'dizaynni': 'What You Are Good At',
                'video yaratishni': 'What You Are Good At',
                'web saytlardan foydalanishni': 'What You Are Good At',
                'tez ma’lumot topishni': 'What You Are Good At',

                'bilganlarimni boshqalarga o‘rgatib': 'What You Can Be Paid For',
                'axborotlarni topib berib': 'What You Can Be Paid For',
                'tahrirlash xizmatlari orqali': 'What You Can Be Paid For',
                'kontent yaratib': 'What You Can Be Paid For',
                'taqdimotlar yaratib': 'What You Can Be Paid For',
                'e-kitoblar yaratib': 'What You Can Be Paid For',
                'dizayn xizmatlari orqali': 'What You Can Be Paid For',
                'onlayn kurslar orqali': 'What You Can Be Paid For',
                'reklama orqali': 'What You Can Be Paid For',
                'konsalting xizmatlari orqali': 'What You Can Be Paid For',
                'video kontent yaratib': 'What You Can Be Paid For',
                'web quest yaratib': 'What You Can Be Paid For',

                'axborotni samarali izlovchilar': 'What The World Needs',
                'axborot tahlilchilari': 'What The World Needs',
                'ishonchli manbani aniqlovchilar': 'What The World Needs',
                'kontent yaratuvchilar': 'What The World Needs',
                'muharrirlar': 'What The World Needs',
                'taqdimot yarata oladiganlar': 'What The World Needs',
                'e-kitob yaratuvchilar': 'What The World Needs',
                'ma’lumotlarni vizual tasvirlovchilar': 'What The World Needs',
                'ta’lim resurslarini yaratuvchilar': 'What The World Needs',
                'dizayner': 'What The World Needs',
                'ta’lim bloggeri': 'What The World Needs',
                'onlayn ta’lim beruvchilar': 'What The World Needs',

                // Add more mappings as needed
            };
             // Normalize selected tags to lowercase
            const normalizedSelectedTags = selectedTags.map(tag => tag.trim());

        // Populate the categories with selected tags
            normalizedSelectedTags.forEach(tag => {
        const category = tagCategoryMapping[tag];
        if (category) {
            const categoryObj = categories.find(cat => cat.label === category);
            if (categoryObj) {
                categoryObj.tags.push(tag+',');
            }
        } else {
            console.log(`Tag "${tag}" not found in mapping`); // Debugging line
        }
    });
            // Adjusted positions and radii
            const positions = [
                {cx: 350.140452, cy: 200.859548, r: 200}, // What You Love
                {cx: 200.859548, cy: 347.14045207, r: 200}, // What You Are Good At
                {cx: 328.863017, cy: 500.205471, r: 200}, // What You Can Be Paid For
                {cx: 490.140452, cy: 347.14045207, r: 200} // What The World Needs
            ];
            // Define specific positions for labels and tags
            const labelPositions = [
                {x: 350, y: 100}, // What You Love
                {x: 115, y: 320}, // What You Are Good At
                {x: 350, y: 560}, // What You Can Be Paid For
                {x: 590, y: 320}  // What The World Needs
            ];


            // Draw the circles
            positions.forEach((pos, index) => {
                const category = categories[index];
                ikigaiDiagram.innerHTML += `
                    <circle cx="${pos.cx}" cy="${pos.cy}" r="${pos.r}" class="venn-circle" fill="${category.color}" />
                `;
            });

            // Draw the labels using the labelPositions array
            labelPositions.forEach((labelPos, index) => {
                const category = categories[index];
                ikigaiDiagram.innerHTML += `
                    <text x="${labelPos.x}" y="${labelPos.y}" text-anchor="middle" fill="black" font-size="14" font-weight="bold">${category.label}</text>
                `;
            });

                    // Define specific positions for tags in the red circle
            const redTagPositions = [
                {x: 350, y: 120}, // First tag position in red circle
                {x: 454, y: 150}  // Second tag position in red circle
            ];

            // Define specific positions for tags in the blue circle
            const blueTagPositions = [
                {x: 90, y: 340},  // First tag position in blue circle
                {x: 205, y: 400}  // Second tag position in blue circle
            ];

            // Define specific positions for tags in the green circle
            const greenTagPositions = [
                {x: 310, y: 580}, // First tag position in green circle
                {x: 238, y: 630}  // Second tag position in green circle
            ];
            // Define specific positions for tags in the yellow circle
            const yellowTagPositions = [
                {x: 560, y: 347}, // First tag position in yellow circle
                {x: 600, y: 400}  // Second tag position in yellow circle
            ];


            // Function to render tags at specific positions
            // Function to render tags at specific positions
    function renderTags(tags, positions, maxWidth) {
        let currentLine = '';
        let currentY = positions[0].y; // Start at the first position's Y coordinate

        tags.forEach((tag, index) => {
            const newLine = currentLine ? currentLine + ' ' + tag : tag; // Add comma if not the first tag
            const textWidth = newLine.length * 6; // Estimate width (6 pixels per character)

            if (textWidth > maxWidth) {
                // If the text exceeds the max width, render the current line and start a new line
                ikigaiDiagram.innerHTML += `
                    <text x="${positions[0].x}" y="${currentY}" text-anchor="middle" fill="black" font-size="12">${currentLine}</text>
                `;
                currentLine = tag; // Start new line with the current tag
                currentY += 20; // Move down for the next line
            } else {
                currentLine = newLine; // Update the current line
            }
        });

        // Render the last line if it exists
        if (currentLine) {
            ikigaiDiagram.innerHTML += `
                <text x="${positions[0].x}" y="${currentY}" text-anchor="middle" fill="black" font-size="12">${currentLine}</text>
            `;
        }
    }

    // Render tags for each category using the specific positions and max widths
    renderTags(categories[0].tags, redTagPositions, 400); // What You Love
    renderTags(categories[1].tags, blueTagPositions, 200); // What You Are Good At
    renderTags(categories[2].tags, greenTagPositions, 400); // What You Can Be Paid For
    renderTags(categories[3].tags, yellowTagPositions, 200); // What The World Needs
     // Add extra texts for Mission, Passion, Vocation, Profession, and IKIGAI
            ikigaiDiagram.innerHTML += `
            <text x="250" y="235" text-anchor="middle" fill="black" font-size="16" font-weight="bold">Passion</text>
            <text x="435" y="460" text-anchor="middle" fill="black" font-size="16" font-weight="bold">Vocation</text>
            <text x="225" y="460" text-anchor="middle" fill="black" font-size="16" font-weight="bold">Profession</text>
            <text x="460" y="235" text-anchor="middle" fill="black" font-size="16" font-weight="bold">Mission</text>
            <text x="350" y="350" text-anchor="middle" fill="black" font-size="20" font-weight="bold">IKIGAI</text>
        `;
        }
