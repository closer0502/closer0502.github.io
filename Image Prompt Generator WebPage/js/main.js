// Load image prompt data
fetch('json/image_prompt.json')
    .then(response => response.json())
    .then(data => initializeApp(data));

function initializeApp(data) {
    // Create tabs
    const tabContainer = document.getElementById('tab-container');
    for (const promptType in data) {
        const tabButton = document.createElement('button');
        tabButton.textContent = promptType;
        tabButton.addEventListener('click', () => switchTab(promptType, data));
        tabContainer.appendChild(tabButton);
    }

    // Initialize first tab
    switchTab(Object.keys(data)[0], data);
}

function switchTab(promptType, data) {
    // Clear current buttons
    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = '';

    // Create new buttons
    for (const promptWord of data[promptType]) {
        const promptButton = document.createElement('button');
        promptButton.textContent = promptWord;
        promptButton.addEventListener('click', () => addToOutput(promptWord));
        buttonContainer.appendChild(promptButton);
    }
}

function addToOutput(promptWord) {
    const outputBox = document.getElementById('output-box');
    outputBox.value += promptWord + ', ';
}

//#copy-buttonにクリックイベント「クリップボードに追加」を追加
document.getElementById('copy-button').addEventListener('click', () => {
    const outputBox = document.getElementById('output-box');
    outputBox.select();
    document.execCommand('copy');
});
