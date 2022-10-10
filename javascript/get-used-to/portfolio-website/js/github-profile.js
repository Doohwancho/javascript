const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const search = document.getElementById('search');

const skillSet = [
    'Java',
    'Spring',
    'HTML/CSS',
    'Javascript',
    'Python',
    'SQL',
    'AWS',
];

getUser('doohwancho');

async function getUser(username){
    const resp = await fetch(APIURL+username);
    const respData = await resp.json();

    createUserCard(respData);

    addSkillSet();

    getRepos(username);
}

async function getRepos(username){
    const resp = await fetch(APIURL+username+"/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

function addSkillSet(){
    listContainer = document.getElementById('skillSet');
    
    // header = document.createElement('p');
    // header.classList.add('user-info');
    // header.innerHTML = 'Skill Set';
    // listContainer.appendChild(header);

    listElement = document.createElement('ul');
    listContainer.appendChild(listElement);
    
    for (i = 0; i < skillSet.length; ++i) {
        listItem = document.createElement('ul');
        listItem.innerText = skillSet[i];
        listElement.appendChild(listItem);
    }
}


function createUserCard(user){
    const cardHTML = `
        <div class="card">
            <div class="image-container">
                <img class="avatar" src="${user.avatar_url}" alt="" />
                <div id="skillSet"></div>
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos){
    const reposEl = document.getElementById("repos");

    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}