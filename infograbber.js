document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const age = document.getElementById('age').value;
    const location = document.getElementById('location').value;

    try {
        const data = await fetchInfo(firstName, lastName, age, location);
        displayResults(data);
    } catch (error) {
        console.error('Error fetching information:', error);
        displayResults({ error: error.message }); // Display error message
    }
});

async function fetchInfo(firstName, lastName, age, location) {
    const clearbitUrl = `https://api.clearbit.com/v2/people/find?name=${firstName} ${lastName}&location=${location}`;

    const clearbitResponse = await fetch(clearbitUrl, {
        headers: {
            Authorization: `Bearer YOUR_CLEARBIT_API_KEY`
        }
    });

    if (!clearbitResponse.ok) {
        throw new Error('Failed to fetch Clearbit data');
    }

    const clearbitData = await clearbitResponse.json();
    return {
        clearbit: clearbitData
    };
}

function displayResults(data) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ''; // Clear previous results

    if (data.error) {
        resultContainer.innerHTML = `<p class="error">${data.error}</p>`;
        return;
    }

    if (data.clearbit) {
        const { name, email, location, avatar } = data.clearbit;
        resultContainer.innerHTML = `
            <h2>Results for ${name}</h2>
            <p>Email: ${email || 'Not found'}</p>
            <p>Location: ${location || 'Not found'}</p>
            <img src="${avatar || 'default-avatar.png'}" alt="${name}'s avatar">
        `;
    } else {
        resultContainer.innerHTML = '<p>No data found.</p>';
    }
}
