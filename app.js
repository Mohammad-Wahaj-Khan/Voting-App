let members = [];

// Load members from local storage
const storedMembers = localStorage.getItem('members');
if (storedMembers) {
    members = JSON.parse(storedMembers);
}

function saveMembersToLocalStorage() {
    localStorage.setItem('members', JSON.stringify(members));
}

function renderMembers() {
    const list = document.querySelector('ul');
    list.innerHTML = '';

    const highestVotes = Math.max(...members.map(member => member.votes));

    members.forEach((member, index) => {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between border-b py-2';

        const nameContainer = document.createElement('div');
        nameContainer.className = 'flex items-center';

        const nameElement = document.createElement('span');
        nameElement.className = 'cursor-pointer mr-2 text-blue-500';
        nameElement.textContent = member.name;
        nameElement.addEventListener('click', () => vote(index));

        if (member.votes > 0) {
            nameElement.innerHTML += ` <span class="text-green-500 ml-2">(${member.votes} votes)</span>`;
        }

        nameContainer.appendChild(nameElement);

        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'flex items-center';

        const editButton = document.createElement('button');
        editButton.className = 'text-gray-500 mr-2';
        editButton.innerHTML = '<img src="edit-text.png" alt="Edit icon" width="16" height="16" />'; // Replace with your edit icon image
        editButton.addEventListener('click', () => editMember(index));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'text-red-500';
        deleteButton.innerHTML = '<img src="bin.png" alt="Delete icon" width="16" height="16" />'; // Replace with your delete icon image
        deleteButton.addEventListener('click', () => deleteMember(index));

        controlsContainer.appendChild(editButton);
        controlsContainer.appendChild(deleteButton);

        li.appendChild(nameContainer);
        li.appendChild(controlsContainer);

        if (member.votes === highestVotes) {
            li.classList.add('bg-white');
        }

        list.appendChild(li);
    });

    // Save members to local storage after rendering
    saveMembersToLocalStorage();
}

function addMember() {
    const newMemberInput = document.getElementById('newMember');
    const newName = newMemberInput.value.trim();

    if (newName === '') {
        alert('Please enter a valid member name.');
        return;
    }

    const existingMember = members.find(member => member.name.toLowerCase() === newName.toLowerCase());

    if (existingMember) {
        alert('Can\'t add the same member twice.');
        return;
    }

    members.push({ name: newName, votes: 0 });
    newMemberInput.value = '';
    renderMembers();
}

function editMember(index) {
    const newName = prompt('Enter the new name for the member:');
    if (newName !== null) {
        members[index].name = newName.trim();
        renderMembers();
    }
}

function deleteMember(index) {
    members.splice(index, 1);
    renderMembers();
}

function vote(index) {
    members[index].votes++;
    renderMembers();
}

// Initial rendering
renderMembers();
