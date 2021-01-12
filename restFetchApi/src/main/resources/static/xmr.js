


function fetchData() {
    fetch('http://localhost:8087/rest')
        .then(r => r.json()).then(data => {
        buildTable(data)
    })
}

fetchData()


function buildTable(data) {
    let table = document.getElementById('asd')
    let editBtn = document.getElementById('btn2')
    let editForm = document.getElementById('myModal2')

    for (let i = 0; i < data.length; i++) {

        let row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].username}</td>
                        <td>${data[i].lastname}</td>
                        <td>${data[i].age}</td>
                        <td>${getRole(data[i].roles)}</td>

                        <td>   
                          <div class="text-left">
                          <button class="btn btn-info eBtn" id="btn2" data-toggle="modal" data-target="#myModal2" type="button">Edit</button>
                          </div>                 
                         
    <div id="myModal2" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h4 class="modal-title" id="modalLabel">Edit user</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    
                </div>
                <div class="modal-body">
                
                <div class="form-group col-sm-10 offset-sm-1 text-center">
                <div class="text center">
                    <strong>ID</strong><br>
                    <input class="form-control"
                           type="number" name="id">
                </div>
                    </div>
                    <div class="text center">
                    <strong>Username</strong><br>
                    <input class="form-control"
                    type="text" name="username"
                    value="${data[i].username}">
                    </div>
                <div class="text center">
                         <strong>LastName</strong><br>
                         <input class="form-control"
                                type="text" name="lastname"
                                value="${data[i].lastname}"
                         >
                </div>
                <div class="text center">
                    <strong>Age</strong><br>
                    <input class="form-control"
                           type="number" name="age"
                           value="${data[i].age}"
                    >
                </div>
                <div class="text center">
                    <strong>Password</strong><br>
                    <input class="form-control"
                           type="text" name="password"
                           value="${data[i].password}"
                    >
                </div>    
                    
                   <div><br>
                           <strong>Role</strong>
                           <select multiple
                                   class="custom-select form-control"

                                   name="newRoles"
                                   id="rl1"
                                   required>
                               <option
                               ${getRole(data[i].roles)}
                                       >
                               </option>
                           </select>
                       </div> 
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary">Сохранить изменения</button>
                </div>
            </div>
        </div>
    </div>
    
</td>
<td>
    <div class="text-left">
        <button id="delBtn" type="button" name="id"  class="btn btn-danger"
                data-toggle="modal"
                value="${data.id}">
            Delete
        </button>
    </div>
</td>
                  </tr>
`
        table.innerHTML += row
        
        // editBtn.innerHTML += row
        // editForm.innerHTML += row
    }

}


function getRole(roles) {
    var role = ""
    for (var i = 0; i < roles.length; i++) {
        role += roles[i].name + " "
    }
    return role.substring(0, role.length - 1).replace(/ROLE_/g, '')
}
// function asd() {
//
//     $(function () {
//
//         $("#btn2").click(function () {
//             $("#myModal2").modal('show');
//         });
//     });
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     function modal(){
//     const priceModal = $.modal({
//
//         title: 'Цена на Товар',
//         closable: true,
//         width: '400px',
//         footerButtons: [
//             {text: 'Закрыть', type: 'primary', handler() {
//                     priceModal.close()
//                 }}
//         ]
//     })}

// $('.eBtn').addEventListener('click', event => {
//         event.preventDefault()
//         const btnType = event.target.dataset.btn
//         if (btnType === 'editE') {
//             priceModal.open()
//         }
//     }
// )


//     $('.eBtn').on('click', function (event) {
//         let edit = $(document).querySelector("#editModal")
//         edit.addEventListener('click', listener)
//     });
//     $('.asd .delBtn').on('click', function (event) {
//         event.preventDefault()
//         var href = $(this).attr('href')
//         $('#myModal #delRef').attr('href', href)
//         $('#myModal').modal()
//     });
// });

const buttonDelete = $("#delBtn");
buttonDelete.click(
    function () {
        $.ajax("/rest", {
            method: "DELETE",
            data: {id: $(this).attr("value")}, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
            dataType: "text",
            success: function (msg) {
                $("#users")
                    .find("#" + msg) //ищем div с id=1
                    .remove();
            }
        })
    }
)

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