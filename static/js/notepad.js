    function applyTextStyle() {
    console.log("applyTextStyle called"); // Debugging line
    const noteContent = document.getElementById('noteContent');
    noteContent.style.fontFamily = document.getElementById('fontName').value;
    noteContent.style.fontSize = document.getElementById('fontSize').value + 'px';
    noteContent.style.color = document.getElementById('fontColor').value;
    noteContent.style.textAlign = document.getElementById('textAlign').value;

}
function toggleBold() {
    const noteContent = document.getElementById('noteContent');
    noteContent.classList.toggle('font-bold'); // This toggles the 'font-bold' class
}

function toggleItalic() {
               document.getElementById('noteContent').classList.toggle('italic');
           }

function toggleUnderline() {
               document.getElementById('noteContent').classList.toggle('underline');
           }
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

    function deleteList(listId, button) {
        if (confirm('Are you sure you want to delete this list?')) {
            fetch(`/api/delete-list/${listId}/`, {
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Remove the list item from the DOM
                    const listItem = button.closest('li'); // Get the parent list item
                    listItem.remove(); // Remove the list item from the sidebar
                } else {
                    alert(data.error); // Show error message if deletion fails
                }
            })
            .catch(error => {
                console.error('Error deleting list:', error);
            });
        }
    }

           function  initializeNotepad() {
               console.log("Notepad initialized");
               const sidebar_notes = document.getElementById('sidebar_notes');
               const sidebar_notes_Toggle = document.getElementById('sidebar_notes_Toggle');
               const fab = document.getElementById('fab');
               const contextMenu = document.getElementById('contextMenu');
               const textModal = document.getElementById('textModal');
               const listModal = document.getElementById('listModal');
               const noteLists = document.getElementById('note-lists');
               let activeList = null;
               let listContents = {};
               const notesContainer = document.getElementById('notesContainer');


               sidebar_notes_Toggle.addEventListener('click', () => {
                   sidebar_notes.classList.toggle('-translate-x-full');
                   sidebar_notes_Toggle.textContent = sidebar_notes.classList.contains('-translate-x-full') ? '>' : '<';
               });

               fab.addEventListener('click', () => {
                   contextMenu.classList.toggle('hidden');
               });

               contextMenu.addEventListener('click', (e) => {
                   const type = e.target.closest('li').dataset.type;
                   if (type === 'list') {
                       listModal.classList.remove('hidden');
                       contextMenu.classList.add('hidden');
                   } else if (type === 'text') {
                       if (activeList) {
                           // document.getElementById('textModal').classList.remove('hidden');
                           contextMenu.classList.add('hidden');
                           textModal.classList.remove('hidden');
                       } else {
                           alert('Please select a list to add text to.');
                       }
                   } else if (type === 'image') {
                       // Implement image upload functionality
                       if (activeList) {
                           contextMenu.classList.add('hidden');
                           imageModal.classList.remove('hidden');

                       } else {
                           alert('Please select a list to add image to.');
                       }

                   } else if (type === 'audio') {
                       // Implement audio upload functionality
                       if (activeList) {
                           contextMenu.classList.add('hidden');
                           audioModal.classList.remove('hidden');

                       } else {
                           alert('Please select a list to add audio to.');
                       }
                   } else if (type === 'video') {
                       // Implement video upload functionality
                       if (activeList) {
                           contextMenu.classList.add('hidden');
                           videoModal.classList.remove('hidden');

                       } else {
                           alert('Please select a list to add video to.');
                       }
                   } else if (type === 'url') {
                       // Implement URL functionality
                       if (activeList) {
                           contextMenu.classList.add('hidden');
                           urlModal.classList.remove('hidden');

                       } else {
                           alert('Please select a list to add URL to.');
                       }
                   } else if (type === 'file') {
                       // Implement file upload functionality
                       if (activeList) {
                           contextMenu.classList.add('hidden');
                           fileModal.classList.remove('hidden');

                       } else {
                           alert('Please select a list to add file to.');
                       }
                   }
               });


               // Function to handle entering a list
    function enterList(listItem) {
                   activeList = listItem; // Set the clicked list as the active list
                   const title = listItem.textContent.trim(); // Get the title from the active list

                   // Log the active list and its ID
                    console.log('Active List:', activeList);
                    console.log('Active List ID:', activeList.dataset.listId); // Log the list ID for debugging


                   // Get the element where you want to display the list content
                   let contentArea = document.getElementById('notesContainer');

                   // Update the contentArea with the list title, exit button, and list content
                   contentArea.innerHTML = `
                    <h2 class="text-2xl font-bold mb-4">${title}</h2>
                    <div id="contentArea"></div>
                `;

                   // Display the contents of the active list
                   const contents = listContents[title] || [];
                   contentArea = document.getElementById('contentArea');
                   //contentArea.innerHTML = contents.map(content => `<div class="text-box bg-blue-100 p-2 rounded mb-2">${content}</div>`).join('');
                   contentArea.innerHTML = contents.join(''); // Join the contents as HTML

                   // Highlight the active list
                   Array.from(noteLists.children).forEach(item => item.classList.remove('active'));
                   listItem.classList.add('active');

                   // // Exit button functionality
                   // document.getElementById('exitList').addEventListener('click', () => {
                   //     // Reset the active list
                   //     activeList = null; // Reset activeList to null
                   //     Array.from(noteLists.children).forEach(item => item.classList.remove('active'));
                   //
                   //     // Clear the content area
                   //     const contentArea = document.getElementById('notesContainer');
                   //     contentArea.innerHTML = ''; // Clear the content area
                   //     // Reset the main content to the welcome message
                   //     mainContent.innerHTML = `<h1 class="text-2xl font-bold">Welcome to Your Note Taking App</h1><p class="mt-2">Click the plus button to create a new note or list.</p>`;
                   // });
               }

               // Event listener for list items
                document.querySelectorAll('#note-lists li').forEach(item => {
                item.addEventListener('click', function() {
                 enterList(this); // Call enterList first to display the title
                 const listId = this.dataset.listId; // Get the list ID from the clicked item
                 fetchNotes(listId); // Fetch notes for the clicked list
                });
                });
               // Create List Functionality
               document.getElementById('createList').addEventListener('click', () => {
                   const title = document.getElementById('listTitle').value.trim();
                   const description = document.getElementById('listDescription').value.trim();

                   if (title) {
                       const existingTitles = Array.from(noteLists.children).map(item => item.textContent.trim());
                       if (existingTitles.includes(title)) {
                           alert('There is already a list with this name. Please choose a different title.');
                       } else {
                            // Send the data to the server
                        fetch('/api/create-list/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                        },
                        body: JSON.stringify({ title: title, description: description })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const listItem = document.createElement('li');
                            listItem.className = 'p-2 bg-yellow-200 border border-yellow-300 rounded shadow cursor-pointer';
                            // listItem.textContent = title;
                            // listItem.dataset.description = description;
                            listItem.dataset.listId = data.list_id; // Use the ID returned from the server

                            // Create delete button
                            const deleteBtn = document.createElement('button');
                            deleteBtn.className = 'text-red-500 hover:text-red-700 delete-btn';
                            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon

                            // Append delete button to the list item
                            listItem.appendChild(deleteBtn);
                            listItem.appendChild(document.createTextNode(title)); // Append the title after the button

                            listItem.addEventListener('click', () => enterList(listItem)); // Call the enterList function

                            // Add event listener for delete button
                            deleteBtn.addEventListener('click', (e) => {
                                e.stopPropagation(); // Prevent triggering the list click event
                                if (confirm('Are you sure you want to delete this list?')) {
                                    fetch(`/api/delete-list/${data.list_id}/`, {
                                        method: 'DELETE',
                                        headers: {
                                            'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        // After successfully saving the note
                                        if (data.success) {
                                            listItem.remove(); // Remove the list item from the sidebar
                                        } else {
                                            alert(data.error);
                                        }
                                    });
                                }
                            });

                          // For now, we will simulate it with a random ID
                          //listItem.dataset.listId = Math.floor(Math.random() * 1000); // Simulated ID, replace with actual ID from server


                           noteLists.appendChild(listItem);
                           listContents[title] = []; // Initialize content array for the new list

                           document.getElementById('listTitle').value = '';
                           document.getElementById('listDescription').value = '';
                           listModal.classList.add('hidden');

                       }
                    })
                        .catch(error => {
                        console.error('Error creating list:', error);
                    });
                }

                   } else {
                       alert('Title is required');
                   }
               });

                // Cancel List Modality
               document.getElementById('cancelList').addEventListener('click', () => {
                   listModal.classList.add('hidden'); // Hide the file modal
                   document.getElementById('listTitle').value = ''; // Clear the list title input
                   document.getElementById('listDescription').value = ''; // Clear the list description input
               });

               // Add Text Functionality
               document.getElementById('addText').addEventListener('click', () => {
                   const selectedColorBox = document.querySelector('.color-box.selected');
                   const color = selectedColorBox ? selectedColorBox.dataset.color : 'red'; // Default to red if no color is selected
                   const alignment = document.getElementById('textAlign').value;
                   const content = document.getElementById('noteContent').value.trim();
                   const listId = activeList.dataset.listId; // Get the list ID from the active list
                   const saveButton = document.getElementById('addText');
                   const noteId = saveButton.dataset.noteId; // Get the note ID from the button's dataset

                   // Ensure title is defined
                   const title = activeList.textContent.trim(); // Get the title from the active list

                   if (content && listId) {
                       if (saveButton.textContent === 'Save') {
                         // Update existing note
                        // const noteId = saveButton.dataset.noteId; // Get the note ID from the button's dataset
                   fetch(`/api/update-note/${noteId}/`, { // Assuming you have an endpoint to update notes
                    method: 'PUT', // Use PUT for updating
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    body: JSON.stringify({ content: content, list_id: listId, color:color,}) // Send updated content
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Update the note in the UI
                        const noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
                        noteElement.querySelector('p').innerText = content; // Update the displayed content
                        textModal.classList.add('hidden'); // Hide the modal
                        saveButton.textContent = 'Save'; // Reset button text
                        delete saveButton.dataset.noteId; // Clear the note ID
                    } else {
                        console.error('Error updating note:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } else {

                            // Create new note
                            // Create a JSON object to send to the server

                            const data = {
                                content: content,
                                list_id: listId,
                                type: 'text', // Specify the type as 'text'
                                color: color // Include the selected color
                            };

                            // Send the data to the server
                            fetch('/api/create-note/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json', // Set Content-Type to application/json
                                    'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                                },
                                body: JSON.stringify(data) // Convert the data to JSON
                            })
                                .then(response => response.json())
                                .then(data => {
                                    if (data.success) {
                                        // Create the note element
                                        const note = document.createElement('div');
                                        note.className = `bg-${color}-100 p-4 rounded shadow mb-4`;
                                        note.innerHTML = `
                                <div class="flex justify-between items-center mb-2">
                                <div>
                                <button class="text-blue-500 hover:text-blue-700 edit-btn"><i class="fas fa-edit"></i></button>
                                <button class="text-red-500 hover:text-red-700 delete-btn"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                            <p class="break-words" style="${getTextStyle(alignment)}">${content}</p>
                        `;
                                        // Append the note to the notesContainer
                                        notesContainer.appendChild(note);

                                        note.dataset.noteId = data.note_id; // Set the note ID for deletion
                                        // Store the note content in the listContents object
                                        if (!listContents[title]) {
                                            listContents[title] = []; // Initialize if it doesn't exist
                                        }
                                        listContents[title].push(content); // Add the content to the active list
                                        // Clear the input and hide the modal
                                        document.getElementById('noteContent').value = '';
                                        addNoteEventListeners(note);
                                        textModal.classList.add('hidden');
                                    } else {
                                        console.error('Error saving note:', data.error);
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        }
            } else {
                alert('Text content is required.');
            }
        });

               document.getElementById('cancelText').addEventListener('click', () => {
                   textModal.classList.add('hidden');
                   document.getElementById('noteContent').value = '';
               });

               function getTextStyle(alignment) {
                   const fontName = document.getElementById('fontName').value;
                   const fontSize = document.getElementById('fontSize').value;
                   const fontColor = document.getElementById('fontColor').value;
                   const isBold = document.getElementById('noteContent').classList.contains('font-bold');
                   const isItalic = document.getElementById('noteContent').classList.contains('italic');
                   const isUnderline = document.getElementById('noteContent').classList.contains('underline');

                   return `
                    font-family: ${fontName};
                    font-size: ${fontSize}px;
                    color: ${fontColor};
                    font-weight: ${isBold ? 'bold' : 'normal'};
                    font-style: ${isItalic ? 'italic' : 'normal'};
                    text-decoration: ${isUnderline ? 'underline' : 'none'};
                    text-align: ${alignment};
                `;
               }

               // function addListEventListeners(list) {
               //     const editBtn = list.querySelector('.edit-btn');
               //     const deleteBtn = list.querySelector('.delete-btn');
               //
               //     editBtn.addEventListener('click', () => {
               //         const title = list.querySelector('h3').innerText;
               //         const description = list.querySelector('p').innerText;
               //         document.getElementById('listTitle').value = title;
               //         document.getElementById('listDescription').value = description;
               //         listModal.classList.remove('hidden');
               //         list.remove();
               //     });
               //
               //     deleteBtn.addEventListener('click', () => {
               //         if (confirm('Are you sure?')) {
               //             list.remove();
               //         }
               //     });
               // }

               document.querySelectorAll('.color-box').forEach(box => {
                   box.addEventListener('click', function () {
                       document.querySelectorAll('.color-box').forEach(b => b.classList.remove('selected'));
                       this.classList.add('selected');
                   });
               });

               // Similar event listeners for other content types (image, audio, video, URL, file) would be added here
               document.getElementById('addImage').addEventListener('click', () => {
                  const imageUpload = document.getElementById('image-upload').files[0];
               if (imageUpload && activeList) {
                   const title = activeList.textContent.trim(); // Get the title from the active list
                   const listId = activeList.dataset.listId; // Get the list id from the active list

                   // Create a FormData object to send the data
                   const formData = new FormData();
                   formData.append('image', imageUpload);
                   formData.append('list_id', listId); // Include the list ID
                   formData.append('type', 'image');
                   formData.append('content', 'image');


                   // Send the data to the server
                   fetch('/api/create-note/', {
                   method: 'POST',
                   body: formData,
                   headers: {
                   'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                    }
                })
                 .then(response => response.json())
                 .then(data => {
                     if (data.success) {
                        // Handle success (e.g., update the UI)
                console.log('Image saved successfully');
                // Create the image element and append it to the notesContainer
                // Create the note element
                   const imageBox = document.createElement('div');
                   imageBox.classList.add('p-4', 'border', 'border-gray-300', 'rounded', 'mb-4');
                   //imageBox.classList.add('text-box', 'bg-blue-100', 'p-4', 'rounded', 'mb-4', 'flex', 'justify-between', 'items-center');

                   const img = document.createElement('img');
                   img.src = URL.createObjectURL(imageUpload);
                   img.alt = "Uploaded image";
                   img.classList.add('w-auto', 'h-full', 'max-h-300');

                   imageBox.innerHTML = `
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            <button class="text-blue-500 hover:text-blue-700 edit-btn"><i class="fas fa-edit"></i></button>
                            <button class="text-red-500 hover:text-red-700 delete-btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
                   imageBox.appendChild(img);
                   // Append the note to the notesContainer
                   notesContainer.appendChild(imageBox);
                   // Store the note content in the listContents object
                   if (!listContents[title]) {
                       listContents[title] = []; // Initialize if it doesn't exist
                   }
                   listContents[title].push(imageBox.outerHTML); // Store the outerHTML of the imageBox
                   // Clear the input and hide the modal
                   imageModal.classList.add('hidden');
                   document.getElementById('image-upload').value = ''; // Clear the file input
                   // Add event listeners for edit and delete buttons
                   addImageEventListeners(imageBox, imageUpload);

                } else {
                        console.error('Error saving image', data.error);
            }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } else {
                alert('Image content is required and a list must be selected.');
            }    });
               document.getElementById('cancelImage').addEventListener('click', () => {
                   imageModal.classList.add('hidden');
                   document.getElementById('noteContent').value = '';
               });

               function addImageEventListeners(imageBox, originalImageFile) {
                   const editBtn = imageBox.querySelector('.edit-btn');
                   const deleteBtn = imageBox.querySelector('.delete-btn');

                   editBtn.addEventListener('click', () => {
                       // Change the button text to "Save"
                        const saveButton = document.getElementById('addImage');
                        saveButton.textContent = 'Save'; // Change the button text to "Save"
                        saveButton.dataset.noteId = imageBox.dataset.noteId; // Store the note ID for saving
                        // Show the modal
                        imageModal.classList.remove('hidden'); // Show the modal
                        // Allow the user to upload a new image
                       document.getElementById('image-upload').click(); // Trigger the file input click
                       document.getElementById('image-upload').onchange = function () {

                           const newImageFile = this.files[0];
                           if (newImageFile) {
                               const newImg = document.createElement('img');
                               newImg.src = URL.createObjectURL(newImageFile);
                               newImg.alt = "Uploaded image";
                               newImg.classList.add('w-auto', 'h-full', 'max-h-300'); // Limit height for better layout

                               // Replace the old image with the new one
                               imageBox.replaceChild(newImg, imageBox.querySelector('img'));

                               // Update the listContents with the new image link
                               const title = activeList.textContent.trim();
                               const index = listContents[title].indexOf(originalImageFile.name);
                               if (index > -1) {
                                   listContents[title][index] = newImg.outerHTML; // Update the stored link
                               }
                           }
                       };
                   });

                   deleteBtn.addEventListener('click', () => {
                       if (confirm('Are you sure you want to delete this image?')) {
                           imageBox.remove(); // Remove the image note from the display
                           const title = activeList.textContent.trim();
                           const index = listContents[title].indexOf(originalImageFile.name);
                           if (index > -1) {
                               listContents[title].splice(index, 1); // Remove the image from the listContents
                           }
                       }
                   });
               }

               // Listeners for Audio
               document.getElementById('addAudio').addEventListener('click', () => {
                   const audioUpload = document.getElementById('audio-upload').files[0];
                   if (audioUpload && activeList) {
                       const title = activeList.textContent.trim(); // Get the title from the active list
                       const listId = activeList.dataset.listId; // Get the list ID from the active list

                    // Create a FormData object to send the data
                    const formData = new FormData();
                    formData.append('audio', audioUpload);
                    formData.append('list_id', listId); // Include the list ID
                    formData.append('type', 'audio'); // Specify the type as 'audio'
                    formData.append('content', 'audio');
                       // Send the data to the server
                    fetch('/api/create-note/', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                       if (data.success) {
                            // Handle success (e.g., update the UI)
                            console.log('Audio saved successfully');


                       // Create the note element
                       const audioBox = document.createElement('div');
                       audioBox.classList.add('p-4', 'border', 'border-gray-300', 'rounded', 'mb-4');
                       const audio = document.createElement('audio');
                       audio.controls = true; // Add controls to the audio element
                       audio.src = URL.createObjectURL(audioUpload); // Set the source to the uploaded file

                       audioBox.innerHTML = `
                        <div class="flex justify-between items-center mb-2">
                            <div>
                                <button class="text-blue-500 hover:text-blue-700 edit-btn"><i class="fas fa-edit"></i></button>
                                <button class="text-red-500 hover:text-red-700 delete-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `;

                       audioBox.appendChild(audio); // Append the audio element to the audioBox

                       // Append the note to the notesContainer
                       notesContainer.appendChild(audioBox);
                       note.dataset.noteId = data.note_id; // Set the note ID for deletion
                       // Store the note content in the listContents object
                       if (!listContents[title]) {
                           listContents[title] = []; // Initialize if it doesn't exist
                       }
                       listContents[title].push(audioBox.outerHTML); // Store the outerHTML of the audioBox
                       // Clear the input and hide the modal
                       audioModal.classList.add('hidden');
                       document.getElementById('audio-upload').value = ''; // Clear the file input

                       // Add event listeners for edit and delete buttons
                       addAudioEventListeners(audioBox, audioUpload);

                    } else {
                        console.error('Error saving audio: ', data.error);
                    }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                   } else {
                       alert('Audio content is required and a list must be selected.');
                   }
               });

               document.getElementById('cancelAudio').addEventListener('click', () => {
                   audioModal.classList.add('hidden');
                   document.getElementById('noteContent').value = '';
               });

               function addAudioEventListeners(audioBox, originalAudioFile) {
                   const editBtn = audioBox.querySelector('.edit-btn');
                   const deleteBtn = audioBox.querySelector('.delete-btn');

                   editBtn.addEventListener('click', () => {
                       // Allow the user to upload a new audio
                       document.getElementById('audio-upload').click(); // Trigger the file input click
                       document.getElementById('audio-upload').onchange = function () {
                           const newAudioFile = this.files[0];
                           if (newAudioFile) {
                               const newAudio = document.createElement('audio');
                               newAudio.controls = true; // Add controls to the audio element
                               newAudio.src = URL.createObjectURL(newAudioFile); // Set the source to the uploaded file

                               // Replace the old image with the new one
                               audioBox.replaceChild(newAudio, audioBox.querySelector('audio'));

                               // Update the listContents with the new image link
                               const title = activeList.textContent.trim();
                               const index = listContents[title].indexOf(originalAudioFile.name);
                               if (index > -1) {
                                   listContents[title][index] = newAudio.outerHTML; // Update the stored link
                               }
                           }
                       };
                   });

                   deleteBtn.addEventListener('click', () => {
                       if (confirm('Are you sure you want to delete this audio?')) {
                           audioBox.remove(); // Remove the audio note from the display
                           const title = activeList.textContent.trim();
                           const index = listContents[title].indexOf(originalAudioFile.name);
                           if (index > -1) {
                               listContents[title].splice(index, 1); // Remove the audio from the listContents
                           }
                       }
                   });
               }

               // Listeners for Video
               document.getElementById('addVideo').addEventListener('click', () => {
                   const videoUpload = document.getElementById('video-upload').files[0];
                   if (videoUpload && activeList) {
                       const title = activeList.textContent.trim(); // Get the title from the active list
                       const listId = activeList.dataset.listId; // Get the list ID from the active list

                       // Create a FormData object to send the data
                        const formData = new FormData();
                        formData.append('video', videoUpload);
                        formData.append('list_id', listId); // Include the list ID
                        formData.append('type', 'video'); // Specify the type as 'video'
                        formData.append('content', 'video');
                        // Send the data to the server
                        fetch('/api/create-note/', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                            }
                        })
                         .then(response => response.json())
                         .then(data => {
                            if (data.success) {
                                // Handle success (e.g., update the UI)
                                console.log('Video saved successfully');

                       // Create the note element
                       const videoBox = document.createElement('div');
                       videoBox.classList.add('p-4', 'border', 'border-gray-300', 'rounded', 'mb-4');
                       const video = document.createElement('video');
                       video.controls = true; // Add controls to the video element
                       video.src = URL.createObjectURL(videoUpload); // Set the source to the uploaded file

                       videoBox.innerHTML = `
                        <div class="flex justify-between items-center mb-2">
                            <div>
                                <button class="text-blue-500 hover:text-blue-700 edit-btn"><i class="fas fa-edit"></i></button>
                                <button class="text-red-500 hover:text-red-700 delete-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `;

                       videoBox.appendChild(video); // Append the audio element to the audioBox

                       // Append the note to the notesContainer
                       notesContainer.appendChild(videoBox);
                       // Store the note content in the listContents object
                       if (!listContents[title]) {
                           listContents[title] = []; // Initialize if it doesn't exist
                       }
                       listContents[title].push(videoBox.outerHTML); // Store the outerHTML of the audioBox
                       // Clear the input and hide the modal
                       videoModal.classList.add('hidden');
                       document.getElementById('video-upload').value = ''; // Clear the file input

                       // Add event listeners for edit and delete buttons
                       addVideoEventListeners(videoBox, videoUpload);
                    } else {
                        console.error('Error saving video');
                    }
                    })
                .catch(error => {
                    console.error('Error:', error);
                });

                   } else {
                       alert('Video content is required and a list must be selected.');
                   }
               });

               document.getElementById('cancelVideo').addEventListener('click', () => {
                   videoModal.classList.add('hidden');
                   document.getElementById('noteContent').value = '';
               });

               function addVideoEventListeners(videoBox, originalVideoFile) {
                   const editBtn = videoBox.querySelector('.edit-btn');
                   const deleteBtn = videoBox.querySelector('.delete-btn');

                   editBtn.addEventListener('click', () => {
                       // Allow the user to upload a new video
                       document.getElementById('video-upload').click(); // Trigger the file input click
                       document.getElementById('video-upload').onchange = function () {
                           const newVideoFile = this.files[0];
                           if (newVideoFile) {
                               const newVideo = document.createElement('video');
                               newVideo.controls = true; // Add controls to the video element
                               newVideo.src = URL.createObjectURL(newVideoFile); // Set the source to the uploaded file

                               // Replace the old image with the new one
                               videoBox.replaceChild(newVideo, videoBox.querySelector('video'));

                               // Update the listContents with the new image link
                               const title = activeList.textContent.trim();
                               const index = listContents[title].indexOf(originalVideoFile.name);
                               if (index > -1) {
                                   listContents[title][index] = newVideo.outerHTML; // Update the stored link
                               }
                           }
                       };
                   });

                   deleteBtn.addEventListener('click', () => {
                       if (confirm('Are you sure you want to delete this video?')) {
                           videoBox.remove(); // Remove the video note from the display
                           const title = activeList.textContent.trim();
                           const index = listContents[title].indexOf(originalVideoFile.name);
                           if (index > -1) {
                               listContents[title].splice(index, 1); // Remove the video from the listContents
                           }
                       }
                   });
               }

               // Listeners for URL
               document.getElementById('addUrl').addEventListener('click', () => {
                  const url = document.getElementById('url-content').value.trim(); // Get the URL input
                  const saveButton = document.getElementById('addUrl');
                  const noteId = saveButton.dataset.noteId; // Get the note ID from the button's dataset

                  if (url && activeList) { // Check if URL is provided and a list is selected
                    const listId = activeList.dataset.listId; // Get the list ID from the active list

                        // Create a JSON object to send to the server
                    const data = {
                        url: url,
                        list_id: listId,
                        type: 'url' // Specify the type as 'url'
                    };

                    // Determine whether to create or update the note
                    const method = noteId ? 'PUT' : 'POST'; // Use PUT if noteId exists, otherwise POST
                    const endpoint = noteId ? `/api/update-note/${noteId}/` : '/api/create-note/';

                    // Send the data to the server
                    fetch(endpoint, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                        },
                        body: JSON.stringify(data) // Convert the data to JSON
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Handle success (e.g., update the UI)
                            console.log('URL saved successfully');

                            // If updating, find the existing note element
                            let noteElement;
                            if (noteId) {
                                noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
                                noteElement.querySelector('a').textContent = url; // Update the displayed URL
                                noteElement.querySelector('a').href = url; // Update the href attribute
                            } else {
                                // Create the note element for a new URL
                                noteElement = document.createElement('div');
                                noteElement.className = 'bg-blue-100 p-4 rounded shadow mb-4'; // You can customize the color

                                // Create the inner HTML for the note with a clickable link
                                noteElement.innerHTML = `
                                    <div class="flex justify-between items-center mb-2">
                                        <div>
                                            <button class="text-blue-500 hover:text-blue-700 edit-btn"><i class="fas fa-edit"></i></button>
                                            <button class="text-red-500 hover:text-red-700 delete-btn"><i class="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                    <a href="${url}" target="_blank" class="text-blue-600 underline">${url}</a>
                                `;

                                // Append the note to the notesContainer
                                notesContainer.appendChild(noteElement);

                                // Store the note content in the listContents object
                                if (!listContents[activeList.textContent.trim()]) {
                                    listContents[activeList.textContent.trim()] = []; // Initialize if it doesn't exist
                                }
                                listContents[activeList.textContent.trim()].push(url); // Add the URL to the active list
                            }

                            // Clear the input and hide the modal
                            document.getElementById('url-content').value = ''; // Clear the URL input
                            urlModal.classList.add('hidden'); // Hide the URL modal

                            addUrlEventListeners(noteElement, url); // Add event listeners for edit and delete buttons
                        } else {
                            console.error('Error saving URL:', data.error); // Ensure there's a colon after 'URL'
                        }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } else {
                alert('URL is required and a list must be selected.');
            }
          });

                   // Cancel URL Modal
                   document.getElementById('cancelUrl').addEventListener('click', () => {
                       urlModal.classList.add('hidden'); // Hide the URL modal
                       document.getElementById('urlContent').value = ''; // Clear the URL input
                   });

               // Function to add event listeners for URL notes
               function addUrlEventListeners(note, originalUrl) {
                   const editBtn = note.querySelector('.edit-btn');
                   const deleteBtn = note.querySelector('.delete-btn');

                   editBtn.addEventListener('click', () => {
                       // Allow the user to edit the URL
                       document.getElementById('url-content').value = originalUrl; // Set the current URL in the input
                       urlModal.classList.remove('hidden'); // Show the URL modal
                   });

                   deleteBtn.addEventListener('click', () => {
                       if (confirm('Are you sure you want to delete this URL?')) {
                           note.remove(); // Remove the URL note from the display
                           const title = activeList.textContent.trim();
                           const index = listContents[title].indexOf(originalUrl);
                           if (index > -1) {
                               listContents[title].splice(index, 1); // Remove the URL from the listContents
                           }
                       }
                   });
               }

               // Listener for adding files
               document.getElementById('addFile').addEventListener('click', () => {
                   const fileUpload = document.getElementById('file-upload').files[0];
                   if (fileUpload && activeList) { // Check if a file is selected and a list is active
                       const title = activeList.textContent.trim(); // Get the title from the active list
                       const listId = activeList.dataset.listId; // Get the list ID from the active list

                    // Create a FormData object to send the data
                    const formData = new FormData();
                    formData.append('file', fileUpload);
                    formData.append('list_id', listId); // Include the list ID
                    formData.append('type', 'file'); // Specify the type as 'file'
                    formData.append('content', 'file');
                    // Send the data to the server
                    fetch('/api/create-note/', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                        }
                    })
                     .then(response => response.json())
                     .then(data => {
                       if (data.success) {
                            // Handle success (e.g., update the UI)
                            console.log('File saved successfully');

                       // Create the note element
                       const fileBox = document.createElement('div');
                       fileBox.classList.add('p-4', 'border', 'border-gray-300', 'rounded', 'mb-4');

                       // Create a link for the uploaded file
                       const fileLink = document.createElement('a');
                       fileLink.href = URL.createObjectURL(fileUpload); // Create a URL for the file
                       fileLink.target = '_blank'; // Open in a new tab
                       fileLink.textContent = fileUpload.name; // Display the file name
                       fileLink.classList.add('text-blue-600', 'underline'); // Add styles to the link

                       fileBox.innerHTML = `
                        <div class="flex justify-between items-center mb-2">
                            <div>
                                <button class="text-blue-500 hover:text-blue-700 edit-btn"><i class="fas fa-edit"></i></button>
                                <button class="text-red-500 hover:text-red-700 delete-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `;
                       // Append the link and actions container to the fileBox

                       fileBox.appendChild(fileLink);

                       // Append the fileBox to the notesContainer
                       notesContainer.appendChild(fileBox);

                       // Store the note content in the listContents object
                       if (!listContents[title]) {
                           listContents[title] = []; // Initialize if it doesn't exist
                       }
                       listContents[title].push(fileLink.outerHTML); // Store the outerHTML of the fileBox

                       // Clear the input and hide the modal
                       fileModal.classList.add('hidden');
                       document.getElementById('file-upload').value = ''; // Clear the file input

                       // Add event listeners for edit and delete buttons
                       addFileEventListeners(fileBox, fileUpload);

                        } else {
                        console.error('Error saving File:', data.error);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });

                       } else {
                       alert('File is required and a list must be selected.');
                   }
               });

               // Cancel File Modal
               document.getElementById('cancelFile').addEventListener('click', () => {
                   fileModal.classList.add('hidden'); // Hide the file modal
                   document.getElementById('file-upload').value = ''; // Clear the file input
               });

               // Function to add event listeners for file notes
               function addFileEventListeners(fileBox, originalFile) {
                   const editBtn = fileBox.querySelector('.edit-btn');
                   const deleteBtn = fileBox.querySelector('.delete-btn');

                   editBtn.addEventListener('click', () => {
                       // Allow the user to upload a new file
                       document.getElementById('file-upload').click(); // Trigger the file input click
                       document.getElementById('file-upload').onchange = function () {
                           const newFile = this.files[0];
                           if (newFile) {
                               const newFileLink = document.createElement('a');
                               newFileLink.href = URL.createObjectURL(newFile);
                               newFileLink.target = '_blank';
                               newFileLink.textContent = newFile.name;
                               newFileLink.classList.add('text-grey-600', 'underline');

                               // Replace the old link with the new one
                               fileBox.replaceChild(newFileLink, fileBox.querySelector('a'));
                               // Update the listContents with the new file link
                               const title = activeList.textContent.trim();
                               const index = listContents[title].indexOf(originalFile.name);
                               if (index > -1) {
                                   listContents[title][index] = newFileLink.outerHTML; // Update the stored link
                               }
                           }
                       };
                   });

                   deleteBtn.addEventListener('click', () => {
                       if (confirm('Are you sure you want to delete this file?')) {
                           fileBox.remove(); // Remove the file note from the display
                           const title = activeList.textContent.trim();
                           const index = listContents[title].indexOf(originalFile.name);
                           if (index > -1) {
                               listContents[title].splice(index, 1); // Remove the file from the listContents
                           }
                       }
                   });


    }
    // function fetchLists() {
    //                console.log("Fetching lists..."); // Debugging line
    //                fetch('/api/get-lists/') // Adjust the URL to your API endpoint
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     const noteLists = document.getElementById('note-lists');
    //                     noteLists.innerHTML = ''; // Clear existing lists
    //                     data.forEach(list => {
    //                         const listItem = document.createElement('li');
    //                         listItem.className = 'sticker p-2 bg-yellow-200 border border-yellow-300 rounded shadow cursor-pointer';
    //                         listItem.textContent = list.title; // Set the title from the database
    //                         listItem.dataset.listId = list.id; // Store the list ID for deletion
    //
    //                         // Create delete button
    //                         const deleteBtn = document.createElement('button');
    //                         deleteBtn.className = 'text-red-500 hover:text-red-700 delete-btn';
    //                         deleteBtn.innerHTML =  '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
    //
    //
    //                         // Append delete button to the list item
    //                         listItem.appendChild(deleteBtn);
    //                         console.log('deleteBtn: ', listItem);
    //                         // Add event listener for the list item
    //                         listItem.addEventListener('click', () => enterList(listItem)); // Call the enterList function
    //
    //                         // Add event listener for delete button
    //                         deleteBtn.addEventListener('click', (e) => {
    //                             e.stopPropagation(); // Prevent triggering the list click event
    //                             if (confirm('Are you sure you want to delete this list?')) {
    //                                 deleteList(list.id, listItem); // Call the delete function
    //                             }
    //                         });
    //
    //                         // Append the new list item to the note-lists
    //                         noteLists.appendChild(listItem);
    //                         console.log(listItem); // Debugging line to check if the button is appended
    //
    //                     });
    //                 })
    //                 .catch(error => {
    //                     console.error('Error fetching lists:', error);
    //                 });
    //         }




                document.querySelectorAll('#note-lists li').forEach(item => {
                 item.addEventListener('click', function() {
                    const listId = this.dataset.listId; // Get the list ID from the clicked item
                    fetchNotes(listId); // Fetch notes for the clicked list
                    });
                });


                function fetchNotes(listId) {
                     // Ensure activeList is defined and points to the correct list item
                     if (!activeList) {
                        console.error('No active list selected.');
                        return; // Exit the function if no active list is set
                    }

                    // Get the title of the active list
                    const title = activeList.textContent.trim(); // Get the title from the active list

                         fetch(`/api/get-notes/${listId}/`) // Adjust the URL to your API endpoint
                            .then(response => response.json())
                            .then(data => {
                                console.log(data); // Log the data to check the structure
                                const notesContainer = document.getElementById('notesContainer');
                                notesContainer.innerHTML = ''; // Clear existing notes

                                // Add the active list title to the notesContainer
                                notesContainer.innerHTML = `<h2 class="text-2xl font-bold mb-4">${title}</h2>`;

                                data.forEach(note => {
                                console.log(`Processing note ID: ${note.id}, Type: ${note.type}`); // Log the type being processed

                                const noteElement = document.createElement('div');
                               // Set the background color based on the note's color
                                if (note.type === 'text') {
                                    noteElement.className = `bg-${note.color}-100 p-4 rounded shadow mb-4`; // Use the stored color
                                } else {
                                    noteElement.className = 'bg-blue-100 p-4 rounded shadow mb-4'; // Default color for other types
                                }
                    // Check the type of the note and create the appropriate HTML structure
                    switch (note.type) {
                        case 'text':
                            noteElement.innerHTML = `
                                <div class="flex justify-between items-center mb-2">
                                    <div>
                                        <button class="text-blue-500 hover:text-blue-700 edit-btn" data-note-id="${note.id}"><i class="fas fa-edit"></i></button>
                                        <button class="text-red-500 hover:text-red-700 delete-btn" data-note-id="${note.id}"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                                <p class="break-words">${note.content}</p>
                            `;
                            break;
                        case 'url':
                            noteElement.innerHTML = `
                                <div class="flex justify-between items-center mb-2">
                                    <div>
                                        <button class="text-blue-500 hover:text-blue-700 edit-btn" data-note-id="${note.id}"><i class="fas fa-edit"></i></button>
                                        <button class="text-red-500 hover:text-red-700 delete-btn" data-note-id="${note.id}"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                                <a href="${note.url}" target="_blank" class="text-blue-600 underline">${note.url}</a>
                            `;
                            break;
                        case 'file':
                            // Extract the file name from the full path
                            const fileName = note.file.split('/').pop(); // Get the last part of the path
                            noteElement.innerHTML = `
                                <div class="flex justify-between items-center mb-2">
                                    <div>
                                        <button class="text-blue-500 hover:text-blue-700 edit-btn" data-note-id="${note.id}"><i class="fas fa-edit"></i></button>
                                        <button class="text-red-500 hover:text-red-700 delete-btn" data-note-id="${note.id}"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                                <a href="${note.file}" target="_blank" class="text-blue-600 underline">${fileName}</a> <!-- Use the extracted file name -->
                            `;
                            break;
                        case 'image':
                            noteElement.innerHTML = `
                                <div class="flex justify-between items-center mb-2">
                                    <div>
                                        <button class="text-blue-500 hover:text-blue-700 edit-btn" data-note-id="${note.id}"><i class="fas fa-edit"></i></button>
                                        <button class="text-red-500 hover:text-red-700 delete-btn" data-note-id="${note.id}"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                                <img src="${note.image}" alt="Uploaded image" class="w-auto h-full max-h-300">
                            `;
                            break;
                        case 'audio':
                            noteElement.innerHTML = `
                                <div class="flex justify-between items-center mb-2">
                                    <div>
                                        <button class="text-blue-500 hover:text-blue-700 edit-btn"><i class="fas fa-edit" data-note-id="${note.id}"></i></button>
                                        <button class="text-red-500 hover:text-red-700 delete-btn"><i class="fas fa-trash" data-note-id="${note.id}"></i></button>
                                    </div>
                                </div>
                                <audio controls>
                                    <source src="${note.audio}" type="audio/mpeg">
                                    Your browser does not support the audio tag.
                                </audio>
                            `;
                            break;
                        case 'video':
                            noteElement.innerHTML = `
                                <div class="flex justify-between items-center mb-2">
                                    <div>
                                        <button class="text-blue-500 hover:text-blue-700 edit-btn" data-note-id="${note.id}"><i class="fas fa-edit"></i></button>
                                        <button class="text-red-500 hover:text-red-700 delete-btn" data-note-id="${note.id}"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                                <video controls>
                                    <source src="${note.video}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            `;
                            break;
                        default:
                            console.warn('Unknown note type:', note.type);
                            return; // Skip this note if the type is unknown
                    }

                    notesContainer.appendChild(noteElement); // Append the note element to the notesContainer

                    // Optionally, set the note ID for deletion
                    noteElement.dataset.noteId = note.id; // Assuming you have an ID for the note
                    addNoteEventListeners(noteElement); // Add event listeners for edit and delete buttons
                });
            })
            .catch(error => {
                console.error('Error fetching notes:', error);
            });
    }
    // Function to add event listeners for edit and delete buttons
    function addNoteEventListeners(noteElement) {
        const editBtn = noteElement.querySelector('.edit-btn');
        const deleteBtn = noteElement.querySelector('.delete-btn');

        if (editBtn) {
            editBtn.addEventListener('click', () => {

                // const noteId = editBtn.dataset.noteId; // Get the note ID
                const noteId =  noteElement.dataset.noteId; // Get the note ID
                // const noteId = editBtn.closest('[data-note-id]').dataset.noteId;
                console.log('Edit button clicked for note ID:', noteId); // Debugging log

                // Fetch the note details to populate the edit form
                fetch(`/api/get-note/${noteId}/`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(noteData => {
                         // Check the type of the note and open the corresponding modal
                        switch (noteData.type) {
                            case 'text':
                                document.getElementById('noteContent').value = noteData.content;
                                textModal.classList.remove('hidden');
                                const saveButtonText = document.getElementById('addText');
                                saveButtonText.textContent = 'Save'; // Change the button text to "Save"
                                saveButtonText.dataset.noteId = noteId; // Store the note ID for saving
                                break;
                            case 'image':
                                // Handle image editing
                                document.getElementById('image-upload').value = ''; // Clear previous value
                                document.getElementById('image-upload').onchange = function () {
                                    const newImageFile = this.files[0];
                                    if (newImageFile) {
                                        // Replace the old image with the new one
                                        const img = noteElement.querySelector('img');
                                        img.src = URL.createObjectURL(newImageFile);
                                    }
                                    const saveButton = document.getElementById('addImage');
                                    saveButton.textContent = 'Save'; // Change the button text to "Save"
                                    saveButton.dataset.noteId = noteId; // Store the note ID for saving
                                };
                                imageModal.classList.remove('hidden');
                                break;
                            case 'audio':
                                // Handle audio editing
                                document.getElementById('audio-upload').value = ''; // Clear previous value
                                document.getElementById('audio-upload').onchange = function () {
                                    const newAudioFile = this.files[0];
                                    if (newAudioFile) {
                                        // Replace the old audio with the new one
                                        const audio = noteElement.querySelector('audio');
                                        audio.src = URL.createObjectURL(newAudioFile);
                                    }
                                    const saveButton = document.getElementById('addAudio');
                                    saveButton.textContent = 'Save'; // Change the button text to "Save"
                                    saveButton.dataset.noteId = noteId; // Store the note ID for saving
                                    };
                                audioModal.classList.remove('hidden');
                                break;
                            case 'video':
                                // Handle video editing
                                document.getElementById('video-upload').value = ''; // Clear previous value
                                document.getElementById('video-upload').onchange = function () {
                                    const newVideoFile = this.files[0];
                                    if (newVideoFile) {
                                        // Replace the old video with the new one
                                        const video = noteElement.querySelector('video');
                                        video.src = URL.createObjectURL(newVideoFile);
                                    }
                                    const saveButton = document.getElementById('addVideo');
                                    saveButton.textContent = 'Save'; // Change the button text to "Save"
                                    saveButton.dataset.noteId = noteId; // Store the note ID for saving
                                };
                                videoModal.classList.remove('hidden');
                                break;
                            case 'url':
                                document.getElementById('url-content').value = noteData.url || ''; // Set the current URL in the input
                                urlModal.classList.remove('hidden'); // Show the URL modal
                                const saveButton = document.getElementById('addUrl');
                                saveButton.textContent = 'Save'; // Change the button text to "Save"
                                saveButton.dataset.noteId = noteId; // Store the note ID for saving
                                console.log(noteId, "=noteID")
                                break;
                            case 'file':
                                // Handle file editing (if applicable)
                                document.getElementById('file-upload').value = ''; // Clear previous value
                                document.getElementById('file-upload').onchange = function () {
                                    const newFile = this.files[0];
                                    if (newFile) {
                                        // Replace the old file with the new one
                                        const file = noteElement.querySelector('file');
                                        file.src = URL.createObjectURL(newFile);
                                    }
                                    const saveButton = document.getElementById('addFile');
                                    saveButton.textContent = 'Save'; // Change the button text to "Save"
                                    saveButton.dataset.noteId = noteId; // Store the note ID for saving
                                    console.log(noteId, "=noteID")
                                };
                                fileModal.classList.remove('hidden');
                                break;
                            default:
                                console.warn('Unknown note type:', noteData.type);
                                return; // Skip this note if the type is unknown
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching note details:', error);
                    });
            });
        }
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the note click event
                if (confirm('Are you sure you want to delete this note?')) {
                    const noteId = noteElement.dataset.noteId; // Get the note ID
                    console.log('Note ID before delete:', noteId); // Debugging log
                    fetch(`/api/delete-note/${noteId}/`, {
                        method: 'DELETE',
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token for security
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            noteElement.remove(); // Remove the note from the display
                        } else {
                            alert(data.error);
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting note:', error);
                    });
                }
            });
        }
    }
    }

