//ОТРИСОВКА ТАБЛИЦЫ
getUsers().then(buildTable);

async function getUsers() {         //получаем пользователей
    let data = {};

    try {
        const response = await fetch("http://localhost:8087/rest");

        data = await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
    }

    return data;
}

getAuthUser().then(buildUserTable)  // ВЫЗОВ ТАБЫ АВТОРИЗОВАННОГО ЮЗЕРА
getAuthUser().then(getTitleNigga)   // ЛЕВАЯ ВЕРХНЯЯ НАДПИСЬ

async function getAuthUser() {         //получаем 1 пользователя
    let dataAuth = {};

    try {
        const response = await fetch("http://localhost:8087/rest/oneUser");

        dataAuth = await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
    }

    return dataAuth;
}


//ДЕЛЭЙ

const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms))
}

//РЕНДЕР РОЛИ
function getRole(roles) {
    let role = ""
    for (let i = 0; i < roles.length; i++) {
        role += roles[i].name + " "
    }
    return role.substring(0, role.length - 1).replace(/ROLE_/g, '')
}

function rolesToJSON(roles) {
    let jsonRoles = [];

    function roleSet(id, name) {
        this.id = id;
        this.name = name;
    }

    for (var i = 0; i < roles.options.length; i++) {
        if (roles.options[i].selected) {
            jsonRoles.push(new roleSet(roles.options[i].value, roles.options[i].text));
        }
    }

    return jsonRoles;
}


//ОТРИСОВКА МОДАЛЬНОГО ОКНА EDIT

$('#myModal2').on('shown.bs.modal', async function (event) {
    const button = $(event.relatedTarget); // Button that triggered the modal
    const i = button.data('whatever'); // Extract info from data-* attributes
    let editElement = await getUsers();


    const modal = $(this);


    modal.find(".modal-body #userIDS").val(editElement[i].id);
    modal.find(".modal-body #usernameID").val(editElement[i].username);
    modal.find(".modal-body #lastnameID").val(editElement[i].lastname);
    modal.find(".modal-body #ageID").val(editElement[i].age);
    modal.find(".modal-body #pswID").val(editElement[i].password);
    modal.find(".modal-body #roleEditID").val(getRole(editElement[i].roles));
    modal.find('.modal-body #DELroleEditID option').prop('selected', false);
    for (let j = 0; j < editElement[i].roles.length; j++) {
        modal.find('.modal-body #DELroleEditID option[value="' + editElement[i].roles[j].id + '"]').prop('selected', true);
    }

//EDIT USER
    async function putEdit(bodyUser, idUser) {
        const url = 'http://localhost:8087/rest/put/' + idUser
        try {
            const r = await fetch(url, {
                method: 'PUT',
                body: bodyUser,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await r.json();
            console.log(JSON.stringify(json))
        } catch (error) {
            console.error(error)
        }
    }


    async function putMethod() {


        const username = $("#usernameID").val()
        const lastname = $("#lastnameID").val()
        const password = $("#pswID").val()
        const age = $("#ageID").val()
        const roles = rolesToJSON($("#DELroleEditID")[0])
        const id = $("#userIDS").val()
        try {
            await putEdit(JSON.stringify({username, lastname, password, age, roles}), id)
        } catch (error) {
        }
        getUsers().then(buildTable)
    }

    const buttonEdit = $("#editSubmit");
    buttonEdit.click(
        putMethod
    )
})
//КРИЕЙТ НОВЫЙ ЧЕЛОВЕК
document.getElementById('buttonOfCreation').addEventListener('click', function (e) {
    e.preventDefault()
    linkClick()

})

function linkClick() {
    createUser().then(r => addUser(r))
    cleanForm()
    $('.mainShit a[href="#nav-usersTable"]').tab('show')
}

function cleanForm() {
    $("#userNameADD").val('')
    $("#lastNameADD").val('')
    $("#pswADD").val('')
    $("#ageADD").val('')
}

async function createUser() {

    const username = $("#userNameADD").val()
    const lastname = $("#lastNameADD").val()
    const password = $("#pswADD").val()
    const age = $("#ageADD").val()
    const roles = rolesToJSON($("#role")[0])

    try {
        $('.mainShit a[href="#nav-usersTable"]').tab('show')
        await addUser(JSON.stringify({username, lastname, password, age, roles}))
    } catch (error) {
    }
}

async function addUser(userRequest) {
    const url = 'http://localhost:8087/rest/add'
    console.log(userRequest);

    try {
        const r = await fetch(url, {
            method: 'PUT',
            body: userRequest,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await r.json();

        console.log(JSON.stringify(json))
    } catch (error) {
        $('.mainShit a[href="#nav-usersTable"]').tab('showMain')
        console.error(error)
    }
    getUsers().then(buildTable)
}


//Delete Button Modal

$('#myModalDelete').on('shown.bs.modal', async function (event) {

    const button = $(event.relatedTarget); // Button that triggered the modal
    const i = button.data('whatever'); // Extract info from data-* attributes
    let userDelete = await getUsers();
    const modalDelete = $(this);

    modalDelete.find(".modal-body #userIDSDel").val(userDelete[i].id)
    modalDelete.find(".modal-body #usernameIDDel").val(userDelete[i].username)
    modalDelete.find(".modal-body #lastnameIDDel").val(userDelete[i].lastname)
    modalDelete.find(".modal-body #ageIDDel").val(userDelete[i].age)
    modalDelete.find(".modal-body #passwordIDDel").val(userDelete[i].password)
    modalDelete.find(".modal-body #roleEditIDDEL").val(getRole(userDelete[i].roles))
    console.log(modalDelete.find(".modal-body #userIDSDel").val())


// Удаление персоны
    const buttonDelete = $("#delSubmit");

    buttonDelete.click(
        async function () {

            try {
                fetch('http://localhost:8087/rest/delete/' + modalDelete.find(".modal-body #userIDSDel").val(), {
                    method: 'POST',
                    dataType: "text",
                })
                    .then(res => res.text()).then(data => {
                    getUsers().then(buildTable)
                }) // or res.json()
            } catch (e) {
            } finally {
                // trTable[i].remove()
                await delay(100)

            }
        }
    )
});

//РАЗДЕЛ ТАБЛИЦ
function buildTable(data) {
    let table = document.getElementById('asd')
    let row = '';
    for (let i = 0; i < data.length; i++) {
        row += `<tr id="trTable" data-whatever="${i}">
                        <td>${data[i].id}</td>
                        <td>${data[i].username}</td>
                        <td>${data[i].lastname}</td>
                        <td>${data[i].age}</td>
                        <td>${getRole(data[i].roles)}</td>

                        <td>   
                          
                              <button class="btn btn-info eBtn" id="btn2" data-toggle="modal" 
                              data-target="#myModal2" type="button" 
                              data-whatever="${i}" >Edit
                              </button>
                          
                        </td>               
                        <td>
  
                             <button id="delBtn" type="button" name="id"  class="btn btn-danger"
                                 data-toggle="modal" data-target="#myModalDelete"
                                 data-whatever="${i}">Delete
                             </button> 
                       </td>
     </tr>                  
`
        table.innerHTML = row
    }
}
//Заполнение авторизованного юзера
function buildUserTable(dataAuth) {
    let table = document.getElementById('authUser')
    let userRow = '';
    console.log(getRole(dataAuth.roles))
    userRow = `<tr>
                        <td>${dataAuth.id}</td>
                        <td>${dataAuth.username}</td>
                        <td>${dataAuth.lastname}</td>
                        <td>${dataAuth.age}</td>
                        <td>${dataAuth.password}</td>
                        <td>${getRole(dataAuth.roles)}</td>
     </tr>                  
`
    table.innerHTML = userRow
}

function getTitleNigga(dataAuth) {
    let titleRole = document.getElementById('titleHustler')
    let userRole = ` <span>${getRole(dataAuth.roles)}</span> `
    titleRole.innerHTML = userRole

    let titleName = document.getElementById('topLeftTitle')
    let userNIck = `<p>${dataAuth.username}</p>
    `
    titleName.innerHTML = userNIck
}



