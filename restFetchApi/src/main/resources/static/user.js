async function getAuthUserPage() {         //получаем 1 пользователя
    let dataAuth = {};

    try {
        const response = await fetch("http://localhost:8087/rest/oneUser");

        dataAuth = await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
    }

    return dataAuth;
}

function getRoleOnPage(roles) {
    let role = ""
    for (let i = 0; i < roles.length; i++) {
        role += roles[i].name + " "
    }
    return role.substring(0, role.length - 1).replace(/ROLE_/g, '')
}

function getTitleNiggaPage(dataAuth) {
    let titleRole = document.getElementById('userPage')
    let userRole = ` <span>${getRoleOnPage(dataAuth.roles)}</span> `
    titleRole.innerHTML = userRole

    let titleName = document.getElementById('topLeftUserName')
    let userNIck = `<p>${dataAuth.username}</p>
    `
    titleName.innerHTML = userNIck
}
getAuthUserPage().then(getTitleNiggaPage)
getAuthUserPage().then(buildUserTablePage)

function buildUserTablePage(dataAuth) {
    let table = document.getElementById('userPage')
    let userRow = '';
    console.log(getRoleOnPage(dataAuth.roles))
    userRow = `<tr>
                        <td>${dataAuth.id}</td>
                        <td>${dataAuth.username}</td>
                        <td>${dataAuth.lastname}</td>
                        <td>${dataAuth.age}</td>
                        <td>${dataAuth.password}</td>
                        <td>${getRoleOnPage(dataAuth.roles)}</td>
     </tr>                  
`
    table.innerHTML = userRow
}