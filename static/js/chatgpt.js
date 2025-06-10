 async function sendMessage() {
        const userInput = document.getElementById('userInput').value;
        if (userInput.trim() === '') return;

        const chatbox = document.getElementById('chatbox');
        const userMessage = document.createElement('div');
        userMessage.className = 'mb-2 text-right';
        userMessage.innerHTML = `<span class="bg-blue-600 text-white p-2 rounded-lg inline-block">${userInput}</span>`;
        chatbox.appendChild(userMessage);

        // Clear the input field
        document.getElementById('userInput').value = '';

        // Scroll to the bottom of the chatbox
        chatbox.scrollTop = chatbox.scrollHeight;

        // Fetch AI response
        const aiResponse = await getAIResponse(userInput);

        const aiMessage = document.createElement('div');
        aiMessage.className = 'mb-2 text-left';
        aiMessage.innerHTML = `<span class="bg-gray-200 p-2 rounded-lg inline-block">${aiResponse}</span>`;
        chatbox.appendChild(aiMessage);

        // Scroll to the bottom of the chatbox
        chatbox.scrollTop = chatbox.scrollHeight;
    }
async function getAIResponse(userInput) {
    const response = await fetch(`/chatbot/?message=${encodeURIComponent(userInput)}`);
    const data = await response.json();
    return data.response;
}
function initializeChat() {
    document.addEventListener('DOMContentLoaded', () => {
        sendMessage();
        getAIResponse();
})

}