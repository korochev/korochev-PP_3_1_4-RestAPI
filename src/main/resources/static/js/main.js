const url = 'http://localhost:8080/api/users/';
const urlRoles = 'http://localhost:8080/api/roles/';
const container = document.querySelector('.usersTbody');
const newUserForm = document.getElementById('newUserForm');
const editUserForm = document.getElementById('editUserForm');
const deleteUserForm = document.getElementById('deleteUserForm');
const btnCreate = document.getElementById('new-user-tab');
const adminPageBtn = document.getElementById('admin-page-btn')
const userPageBtn = document.getElementById('user-page-btn')
const newRoles = document.getElementById('newRoles');
let result = '';

var editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
var deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
const editId = document.getElementById('editId');
const editName = document.getElementById('editName');
const editAge = document.getElementById('editAge');
const editEmail = document.getElementById('editEmail');
const editPassword = document.getElementById('editPassword');
const editRoles = document.getElementById('editRoles');

const delId = document.getElementById('delId');
const delName = document.getElementById('delName');
const delAge = document.getElementById('delAge');
const delEmail = document.getElementById('delEmail');
const delRoles = document.getElementById('delRoles');

const newName = document.getElementById('newName');
const newAge = document.getElementById('newAge');
const newEmail = document.getElementById('newEmail');
const newPassword = document.getElementById('newPassword');


let rolesArr = [];


let option = '';

const renderUsers = (users) => {
    users.forEach(user => {
        let roles = user.roles
        let roleName = '';
        roles.forEach(
            role => {
                r = role.roleName.substring(5);
                roleName += r + ' ';
            }
        );
        result += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>
                ${roleName}
                </td>
                <td><a class="btnEdit btn btn-success btn-sm">Edit</a></td>
                <td><a class="btnDelete btn btn-danger btn-sm">Delete</a></td>
            </tr>
            `
    })
    container.innerHTML = result;
}

const renderRoles = (roles) => {
    rolesOptions = '';
    roles.forEach(role => {
        rolesOptions += `
            <option value = ${role.id}>${role.roleName.substring(5)}</option>
            `
        rolesArr.push(role);
    })
    newRoles.innerHTML = rolesOptions;
    editRoles.innerHTML = rolesOptions;
    delRoles.innerHTML = rolesOptions;
}


fetch(url)
    .then(res => res.json())
    .then(data => renderUsers(data))
    .catch(error => console.log(error));

var allRoles;

fetch(urlRoles)
    .then(res => res.json())
    .then(data => {
        allRoles = data;
        renderRoles(allRoles)
    });


const refreshListOfUsers = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            result = '';
            renderUsers(data)
        })
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

// Удаление

on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode;
    idForm = row.children[0].innerHTML;
    const nameForm = row.children[1].innerHTML;
    const ageForm = row.children[2].innerHTML;
    const emailForm = row.children[3].innerHTML;


    delId.value = idForm;
    delName.value = nameForm;
    delAge.value = ageForm;
    delEmail.value = emailForm;
    deleteUserModal.show();
})

// Изменение

let idForm = 0;
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode;
    idForm = row.children[0].innerHTML;
    const nameForm = row.children[1].innerHTML;
    const ageForm = row.children[2].innerHTML;
    const emailForm = row.children[3].innerHTML;


    editId.value = idForm;
    editName.value = nameForm;
    editAge.value = ageForm;
    editPassword.value = ''
    editEmail.value = emailForm;
    editRoles.options.selectedIndex = -1;
    editUserModal.show();

})

// Новый пользователь таб

btnCreate.addEventListener('click', () => {
    newName.value = ''
    newAge.value = '';
    newPassword.value = ''
    newEmail.value = '';
    newRoles.options.selectedIndex = 1;
});


// Удаление сабмит

deleteUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url + delId.value, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(refreshListOfUsers);
    deleteUserModal.hide();
});

// Новый пользователь сабмит

newUserForm.addEventListener('submit', (e) => {
    let rolesJ = [];
    e.preventDefault();
    const selectedOpts = [...newRoles.options]
        .filter(x => x.selected)
        .map(x => x.value);

    selectedOpts.forEach(
        role => {
            rolesJ.push(rolesArr[role - 1])
        }
    );


    const fetchFunction = async () => {
        const fetchedData = await
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newName.value,
                    age: newAge.value,
                    password: newPassword.value,
                    email: newEmail.value,
                    roles: rolesJ
                })
            });

        if (!fetchedData.ok) {
            fetchedData.json()
                .then(data => alert(data.message))
        }
        return fetchedData;
    }

    fetchFunction()
        .then(response => response.json())
        .catch(err => console.log(err))
        .then(refreshListOfUsers);
    const navtab1 = document.getElementById('all-users-tab');
    const navtab2 = document.getElementById('new-user-tab');
    const tab1 = document.getElementById('all-users');
    const tab2 = document.getElementById('new-user');

    navtab1.setAttribute("class", "nav-link active");
    navtab2.setAttribute("class", "nav-link");
    tab1.setAttribute("class", "tab-pane fade active show");
    tab2.setAttribute("class", "tab-pane fade");

})

// Изменение сабмит

editUserForm.addEventListener('submit', (e) => {
    let rolesJ = [];
    e.preventDefault();
    const selectedOpts = [...editRoles.options]
        .filter(x => x.selected)
        .map(x => x.value);

    selectedOpts.forEach(
        role => {
            rolesJ.push(rolesArr[role - 1])
        }
    );



    const fetchFunction = async () => {
        const fetchedData = await fetch(url + idForm, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editId.value,
                name: editName.value,
                age: editAge.value,
                password: editPassword.value,
                email: editEmail.value,
                roles: rolesJ
            })
        });

        if (!fetchedData.ok) {
            fetchedData.json()
                .then(data => alert(data.message))
        }
        return fetchedData;
    }
    fetchFunction()
        .then(response => response.json)
        .then(refreshListOfUsers)
    editUserModal.hide();
})