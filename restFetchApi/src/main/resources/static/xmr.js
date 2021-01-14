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

//отрисовка таблицы
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


//   блок ллогики

const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms))
}


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


//Edit Button Modal
$('#myModal2').on('shown.bs.modal', async function (event) {
    const button = $(event.relatedTarget); // Button that triggered the modal
    const i = button.data('whatever'); // Extract info from data-* attributes
    let editElement =  await getUsers();


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

//Едит юзера\\
    const buttonEdit = $("#editSubmit");

    const putMethod = {
        method: 'PUT',
        body: JSON.stringify(
            {

                id: $("#userIDS").val(),
                username: $("#usernameID").val(),
                lastname: $("#lastnameID").val(),
                password: $("#pswID").val(),
                age: $("#ageID").val(),
                roles: rolesToJSON($("#DELroleEditID")[0])
            }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    buttonEdit.click(
        async function () {
            console.log(putMethod)

            await fetch('http://localhost:8087/rest/put/' + modal.find(".modal-body #userIDS").val(), putMethod)
                .then(response => response.json()).then(data => {
                getUsers().then(buildTable)
                .catch(err => console.log(err))


        }
    )
});})


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


////////////////ZZZZZZZZZZZZZZZZZZ\\\\\\\\\\\\\\\

// $.ajax("http://localhost:8087/rest", {
//     method: "DELETE",
//     data: {id: $(this).attr("value")}, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
//     dataType: "text",
//     success: function (msg) {
//         $("#users")
//             .find("#" + msg) //ищем div с id=1
//             .remove();
//     }
// })

// event.preventDefault()
// const href = $(this).attr('href')
// var text = $(this).text()
// if (text === 'Edit') {
//     // $.get(href, function (country, status) { //main.js:14 Uncaught TypeError: $.get is not a function
//
//
//
//         $.isFunction(href, function (data) {
//             $('.myForm #id').val(data.id)
//             $('.myForm #username').val(data.username)
//             $('.myForm #lastname').val(data.lastname)
//         });}
//     $('.myForm #exampleModal').modal()
//  else {
//     $('.myForm #id').val('')
//     $('.myForm #username').val('')
//     $('.myForm #lastname').val('')
//     $('.myForm #exampleModal').modal()
// }