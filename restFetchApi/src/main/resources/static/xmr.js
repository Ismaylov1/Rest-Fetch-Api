let row;

function buildTable(data) {
    let table = document.getElementById('asd')

    for (let i = 0; i < data.length; i++) {
        row = `<tr id="trTable">
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
        table.innerHTML += row
    }
}

//отрисовка таблицы

function fetchData() {              //запрос на рест с вызовом отрисовки таблицы
    fetch('http://localhost:8087/rest')
        .then(r => r.json()).then(data => {
        buildTable(data)
    })
}

async function getUsers() {         //получаем пользователей
    let allUsers = {};

    try {
        const response = await fetch("http://localhost:8087/rest");

        allUsers = await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
    }

    return allUsers;
}

fetchData()

//   блок ллогики

const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms))
}


async function tableDestroy() {
    let parent = $("#trTable").remove()
    await delay(200)

}


function getRole(roles) {
    var role = ""
    for (var i = 0; i < roles.length; i++) {
        role += roles[i].name + " "
    }
    return role.substring(0, role.length - 1).replace(/ROLE_/g, '')
}

//Edit Button Modal
$('#myModal2').on('shown.bs.modal', async function (event) {
    const button = $(event.relatedTarget); // Button that triggered the modal
    const i = button.data('whatever'); // Extract info from data-* attributes
    let userEdit = await getUsers();

    console.log(userEdit[i].roles)

    const modal = $(this);
    modal.find(".modal-body #userIDS").val(userEdit[i].id);
    modal.find(".modal-body #usernameID").val(userEdit[i].username);
    modal.find(".modal-body #lastnameID").val(userEdit[i].lastname);
    modal.find(".modal-body #ageID").val(userEdit[i].age);
    modal.find(".modal-body #pswID").val(userEdit[i].password);
    modal.find(".modal-body #roleEditID").val(getRole(userEdit[i].roles));

});

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
            let parent = $(this).closest("#trTable")

            try {
                fetch('http://localhost:8087/rest/delete/' + modalDelete.find(".modal-body #userIDSDel").val(), {
                    method: 'POST',
                    dataType: "text",
                })
                    .then(res => res.text()) // or res.json()
            } catch (e) {
            } finally {
                await delay(100)
                await tableDestroy()
                await delay(200)
                
            }
        }
    )
});

// const buttonDelete = $("#delSubmit");
// buttonDelete.click(
//     function () {
//         fetch('http://localhost:8087/rest/delete/', {
//             method: 'POST',
//             data: {id: $(this).attr("value")},
//             dataType: "text",
//             success: function (msg) {
//                 $("#users")
//                     .find("#" + msg) //ищем div с id=1
//                     .remove();
//             }
//         })
//             .then(res => res.text()) // or res.json()
//             .then(res => console.log(res))
//
//
//     }
// )





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