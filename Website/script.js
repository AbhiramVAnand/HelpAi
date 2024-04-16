const chatIcon = document.createElement('div');
chatIcon.id = 'chat-icon';
chatIcon.innerHTML = '<i class="fas fa-comment"></i>';  // Adjust icon class based on your preference (e.g., Font Awesome)
chatIcon.style.cssText = `
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2ECC71;
  color: white;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  display: none;
`;

const chatBox = document.createElement('div');
chatBox.id = 'chat-box';
chatBox.style.cssText = `
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  height: calc(100vh - 50px);
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: none;
`;

const chatInput = document.createElement('input');
chatInput.type = 'text';
chatInput.placeholder = 'Type your message...';
chatInput.style.cssText = `
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const chatMessages = document.createElement('div');
chatMessages.id = 'chat-messages';
chatMessages.style.cssText = `
  height: calc(100% - 40px);
  overflow-y: scroll;
  border-bottom: 1px solid #ccc;
`;

chatBox.appendChild(chatMessages);
chatBox.appendChild(chatInput);

document.body.appendChild(chatIcon);
document.body.appendChild(chatBox);

chatIcon.addEventListener('click', function() {
  chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
});

// This part is for demonstration purposes only. 
// You'll need to replace it with your actual chatbot logic
chatInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const message = this.value.trim();
    if (message) {
      const userMessage = document.createElement('p');
      userMessage.innerHTML = message;
      userMessage.style.cssText = `
        background-color: #ddd;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 5px;
      `;
      chatMessages.appendChild(userMessage);
      this.value = '';

      // Simulate chatbot response (replace with your logic)
      const response = 'Hi there! How can I help you today?';
      const botMessage = document.createElement('p');
      botMessage.innerHTML = response;
      botMessage.style.cssText = `
        background-color: #eee;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 5px;
      `;
      chatMessages.appendChild(botMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
});
