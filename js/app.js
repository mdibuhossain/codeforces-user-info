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

const changeTextColor = (color, checkMax) => {
    const handleName = document.getElementById('handle-name');
    const maxRating = document.getElementById('max-rating');
    const currentRating = document.getElementById('current-rating');
    const currentRank = document.getElementById('current-rank');
    if (checkMax)
        maxRating.style.color = color;
    else {
        handleName.style.color = color;
        currentRating.style.color = color;
        currentRank.style.color = color;
    }
}

const checkCurrentRating = (userInfo) => {
    if (userInfo.rating >= 3000) {
        changeTextColor('red');
        document.getElementById('handle-name').innerHTML = `
        <span id="handle-name"><strong><span style="color: black">${userInfo.handle.substr(0, 1)}</span>${userInfo.handle.substr(1)}</strong></span>
        `;
    }
    else if (userInfo.rating >= 2400) {
        changeTextColor('red');
    }
    else if (userInfo.rating >= 2100) {
        changeTextColor('orange');
    }
    else if (userInfo.rating >= 1900) {
        changeTextColor('violet');
    }
    else if (userInfo.rating >= 1600) {
        changeTextColor('blue');
    }
    else if (userInfo.rating >= 1400) {
        changeTextColor('cyan');
    }
    else if (userInfo.rating >= 1200) {
        changeTextColor('green');
    }
    else {
        changeTextColor('gray');
    }
}

const checkMaxRating = (maxRatingValue) => {
    if (maxRatingValue >= 3000) {
        changeTextColor('red', true);
    }
    else if (maxRatingValue >= 2400) {
        changeTextColor('red', true);
    }
    else if (maxRatingValue >= 2100) {
        changeTextColor('orange', true);
    }
    else if (maxRatingValue >= 1900) {
        changeTextColor('violet', true);
    }
    else if (maxRatingValue >= 1600) {
        changeTextColor('blue', true);
    }
    else if (maxRatingValue >= 1400) {
        changeTextColor('cyan', true);
    }
    else if (maxRatingValue >= 1200) {
        changeTextColor('green', true);
    }
    else {
        changeTextColor('gray', true);
    }
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
                    <p class="fs-3 m-0">Rank: <span id="current-rank" class="text-capitalize"><strong>${data.result[0].rank}</strong></span></p>
                    <p class="fs-3 m-0">Handle: <span id="handle-name"><strong>${data.result[0].handle}</strong></span></p>
                    <p class="fs-3 m-0">Name: <span id="full-name">${data.result[0].firstName + ' ' + data.result[0].lastName}</span></p>
                    <p class="fs-3 m-0">Max rating: <span id="max-rating"><strong>${data.result[0].maxRating}</strong></span></p>
                    <p class="fs-3 m-0">Current rating: <span id="current-rating"><strong>${data.result[0].rating}</strong></span></p>
                    <p class="fs-3 m-0">Organization: <span id="organization-name">${data.result[0].organization}</span></p>
                    <!-- <p class="fs-3 m-0">Friends: <span id="total-friends">${data.result[0].friendOfCount}</span></p> -->
                    <p class="fs-3 m-0">Country: <span id="country-name">${data.result[0].country}</span></p>
                </div>
            </div>
        `;
        container.appendChild(content);
        checkCurrentRating(data.result[0]);
        checkMaxRating(data.result[0].maxRating);

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