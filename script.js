function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateOddsFromRoundId(roundId) {
    const numericValue = Array.from(roundId).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const modValue = numericValue % 100;
    const minOdds = 1.01;
    const maxOdds = 100.00;
    const odds = minOdds + (modValue / 100) * (maxOdds - minOdds);
    return odds.toFixed(2);
}

function generateHashCode() {
    const roundId = document.getElementById('roundId').value;

    if (!roundId) {
        document.getElementById('result').textContent = "Please enter a valid Round ID.";
        return;
    }

    // Generate Odds
    const odds = generateOddsFromRoundId(roundId);

    // Generate Random String
    const randomString = generateRandomString(36);  // Example: 36 characters long

    // Define a fixed Salt (for simplicity)
    const salt = "kqDff7STE6jOWTg1l9657A==";

    // Create the Key
    const key = `${roundId}_${odds}_Crash_${randomString}`;

    // Generate the Hash Code using SHA512
    const hashCode = sha512(key + salt);

    // Display the results
    document.getElementById('result').innerHTML = `Odds: ${odds}<br>Hash Code: ${hashCode}`;
}

// SHA-512 hash function implementation
// You can use a library like crypto-js for this, or include a simple implementation
function sha512(str) {
    const buffer = new TextEncoder("utf-8").encode(str);
    return crypto.subtle.digest("SHA-512", buffer).then(hash => {
        return Array.prototype.map.call(new Uint8Array(hash), x => ('00' + x.toString(16)).slice(-2)).join('');
    });
}

