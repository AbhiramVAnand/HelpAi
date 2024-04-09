// Create the chatbot container element
const chatbotContainer = document.createElement('div');
chatbotContainer.id = 'chatbot-container';
chatbotContainer.style.position = 'fixed';
chatbotContainer.style.bottom = '20px';
chatbotContainer.style.right = '20px';
chatbotContainer.style.width = '300px';
chatbotContainer.style.height = '400px';
chatbotContainer.style.backgroundColor = '#f0f0f0';
chatbotContainer.style.borderRadius = '5px';
chatbotContainer.style.padding = '10px';
chatbotContainer.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.3)';

// Create the chatbot header
const chatbotHeader = document.createElement('h2');
chatbotHeader.textContent = 'Chatbot';

// Create the chatbot conversation area
const chatbotConversation = document.createElement('div');
chatbotConversation.id = 'chatbot-conversation';
chatbotConversation.style.overflowY = 'auto';
chatbotConversation.style.height = '300px';

// Create the chatbot input field
const chatbotInput = document.createElement('input');
chatbotInput.type = 'text';
chatbotInput.placeholder = 'Type your message here...';

// Create the chatbot send button
const chatbotSendButton = document.createElement('button');
chatbotSendButton.textContent = 'Send';

// Append elements to create the chatbot structure
chatbotContainer.appendChild(chatbotHeader);
chatbotContainer.appendChild(chatbotConversation);
chatbotContainer.appendChild(chatbotInput);
chatbotContainer.appendChild(chatbotSendButton);

// Append the chatbot container to the body of the website
document.body.appendChild(chatbotContainer);

// Handle send button clicks (replace with your chatbot logic)
chatbotSendButton.addEventListener('click', () => {
  const userMessage = chatbotInput.value;
  // Simulate a chatbot response
  const botResponse = 'Hello there! How can I help you today?';
  displayChatMessage('user', userMessage);
  displayChatMessage('bot', botResponse);
  chatbotInput.value = '';
});

// Function to display a chat message
function displayChatMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatbotConversation.appendChild(messageElement);
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight; // Auto-scroll
}
