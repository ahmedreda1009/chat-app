const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const chatWindow = document.getElementById('chat-window');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('sendMessage', input.value);
    input.value = '';
});

socket.on('message', (msg) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'mb-2');

    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, day: 'numeric', month: 'short', year: 'numeric' });

    const msgSpan = document.createElement('span');
    msgSpan.textContent = msg + " ";

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('text-muted');
    dateSpan.style.fontSize = '12px';
    dateSpan.textContent = formattedDate;

    li.appendChild(msgSpan);
    li.appendChild(dateSpan);

    messages.appendChild(li);

    chatWindow.scrollTop = chatWindow.scrollHeight;
});
