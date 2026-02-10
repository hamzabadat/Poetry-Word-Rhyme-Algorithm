// Simple class to handle rhyming functionality
class RhymeHelper {
    constructor() {
        // Store words in a simple object where the key is the end of the word
        this.rhymeWords = {};
    }

    // Get the end of a word (last few letters) to check for rhymes
    getRhymeEnd(word) {
        // Get last syllable (simplified - just last 3 letters)
        if (word.length <= 3) {
            return word;
        }
        return word.slice(-3);
    }

    // Add a word to our dictionary
    addWord(word) {
        // Clean the word (remove spaces, lowercase)
        word = word.trim().toLowerCase();
        
        // Get the end of the word
        const end = this.getRhymeEnd(word);
        
        // Add to our dictionary
        if (!this.rhymeWords[end]) {
            this.rhymeWords[end] = [];
        }
        // Only add if it's not already there
        if (!this.rhymeWords[end].includes(word)) {
            this.rhymeWords[end].push(word);
        }
    }

    // Find rhyming words
    findRhymes(word) {
        word = word.trim().toLowerCase();
        const end = this.getRhymeEnd(word);
        
        // Return matching words (excluding the input word itself)
        return (this.rhymeWords[end] || [])
            .filter(rhyme => rhyme !== word);
    }

    // Load multiple words at once
    loadWords(wordList) {
        wordList.forEach(word => this.addWord(word));
    }
}

// Create our rhyme helper
const rhymeHelper = new RhymeHelper();

// dictionary
const sampleWords = [
    'cat', 'hat', 'bat', 'rat', 'mat',
    'dog', 'log', 'fog', 'bog', 'cog',
    'light', 'bright', 'night', 'sight', 'fight',
    'play', 'day', 'say', 'way', 'bay',
    'smile', 'mile', 'tile', 'while', 'pile',
    'game', 'fame', 'name', 'same', 'tame',
    'house', 'mouse', 'grouse',
    'cake', 'bake', 'take', 'make', 'fake'
];

// Load words from the wordlist.txt file
function loadWordList() {
    fetch('wordlist.txt')
        .then(response => response.text())
        .then(data => {
            const words = data.split('\n');
            words.forEach(word => rhymeHelper.addWord(word));
            console.log('Wordlist loaded:', words.length, 'words added.');
        })
        .catch(error => console.error('Error loading wordlist:', error));
}

// Call the function to load the wordlist when the page loads
window.onload = () => {
    loadWordList();
};

// Load our sample words
rhymeHelper.loadWords(sampleWords);

// Function to find rhymes
function findRhymes() {
    // Get the input word
    const word = document.getElementById('wordInput').value;
    
    // Don't do anything if no word was entered
    if (!word) {
        alert('Please enter a word!');
        return;
    }

    // Find rhyming words
    const rhymes = rhymeHelper.findRhymes(word);

    // Get the results div
    const resultsDiv = document.getElementById('results');

    // Show the results
    if (rhymes.length === 0) {
        resultsDiv.innerHTML = `<p>No rhymes found for "${word}"</p>`;
    } else {
        resultsDiv.innerHTML = `
            <p>Rhyming words for "${word}":</p>
            <div>
                ${rhymes.map(rhyme => 
                    `<span class="rhyme-word">${rhyme}</span>`
                ).join(' ')}
            </div>
        `;
    }
}

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener to the button
    document.getElementById('findRhymesButton').addEventListener('click', findRhymes);
    
    // Add Enter key support
    document.getElementById('wordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            findRhymes();
        }
    });
});