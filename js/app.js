document.getElementById('search-user').addEventListener('click', (e) => {
    e.preventDefault();
    const searchHandle = document.getElementById('handle-value');
    // console.log(searchHandle.value);
    loadData(searchHandle.value);
    searchHandle.value = '';
})

const loadData = async inputHandle => {
    const url = `https://codeforces.com/api/user.info?handles=${inputHandle}`;
    const res = await fetch(url);
    const jsonData = await res.json();
    // console.log(jsonData);
    processDatatoUI(jsonData);
}

const processDatatoUI = data => {
    const container = document.getElementById('container');
    container.textContent = '';
    if (data.status === 'OK') {
        // console.log('yaaa');
        const content = document.createElement('div');
        content.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'flex-wrap');
        content.innerHTML = `
            <div class="mx-3">
                <div class="shadow user-avatar">
                    <img class="img-fluid" src="${data.result[0].titlePhoto}">
                </div>
            </div>
            <div class="mx-3">
                <div class="mt-md-0 mt-4">
                    <p class="fs-3 m-0">Handle: <span id="handle-name"><strong>${data.result[0].handle}</strong></span></p>
                    <p class="fs-3 m-0">Name: <span id="full-name">${data.result[0].firstName + ' ' + data.result[0].lastName}</span></p>
                    <p class="fs-3 m-0">Max rating: <span id="max-rating">${data.result[0].maxRating}</span></p>
                    <p class="fs-3 m-0">Current rating: <span id="current-rating"><strong>${data.result[0].rating}</strong></span></p>
                    <p class="fs-3 m-0">Rank: <span id="current-rank"><strong>${data.result[0].rank}</strong></span></p>
                    <p class="fs-3 m-0">Organization: <span id="organization-name">${data.result[0].organization}</span></p>
                    <!-- <p class="fs-3 m-0">Friends: <span id="total-friends">${data.result[0].friendOfCount}</span></p> -->
                    <p class="fs-3 m-0">Country: <span id="country-name">${data.result[0].country}</span></p>
                </div>
            </div>
        `;
        container.appendChild(content);
        const handleName = document.getElementById('handle-name');
        const currentRating = document.getElementById('current-rating')
        const currentRank = document.getElementById('current-rank')
        if (data.result[0].rating >= 3000) {
            currentRating.style.color = 'red';
            currentRank.style.color = 'red';
            handleName.innerHTML = `
                <span id="handle-name"><strong><span style="color: black">${data.result[0].handle.substr(0, 1)}</span>${data.result[0].handle.substr(1)}</strong></span>
            `;
            handleName.style.color = 'red';
        }
        else if (data.result[0].rating >= 2400) {
            currentRating.style.color = 'red';
            currentRank.style.color = 'red';
            handleName.style.color = 'red';
        }
        else if (data.result[0].rating >= 2100) {
            currentRating.style.color = 'orange';
            currentRank.style.color = 'oragne';
            handleName.style.color = 'orange';
        }
        else if (data.result[0].rating >= 1900) {
            currentRating.style.color = 'violet';
            currentRank.style.color = 'violet';
            handleName.style.color = 'violet';
        }
        else if (data.result[0].rating >= 1600) {
            currentRating.style.color = 'blue';
            currentRank.style.color = 'blue';
            handleName.style.color = 'blue';
        }
        else if (data.result[0].rating >= 1400) {
            currentRating.style.color = 'cyan';
            currentRank.style.color = 'cyan';
            handleName.style.color = 'cyan';
        }
        else if (data.result[0].rating >= 1200) {
            currentRating.style.color = 'green';
            currentRank.style.color = 'green';
            handleName.style.color = 'green';
        }
        else {
            currentRating.style.color = 'gray';
            currentRank.style.color = 'gray';
            handleName.style.color = 'gray';
        }
        // const handleName = document.getElementById('handle-name');
        // const fullName = document.getElementById('full-name');
        // const maxRating = document.getElementById('max-rating');
        // const currentRating = document.getElementById('current-rating');
        // const currentRank = document.getElementById('current-rank');
        // const organizationName = docuemnt.getElementById('organization-name');
        // const totalFriends = document.getElementById('total-friends');

    }
    else {
        alert(data.comment);
    }
}