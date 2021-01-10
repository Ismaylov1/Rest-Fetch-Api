
jQuery(document).ready(function (){




function fetchData() {
    fetch('http://localhost:8087/rest')
        .then(r => r.json()).then(data => {
        buildTable(data)
    })
}

fetchData()


function buildTable(data) {
    let table = document.getElementById('asd')
    for (let i = 0; i < data.length; i++) {

        let row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].username}</td>
                        <td>${data[i].lastname}</td>
                        <td>${data[i].age}</td>
                        <td>${getRole(data[i].roles)}</td>

                        <td>                    <div class="text-left">
                                                    <button id = "eBtn" class="btn btn-info" data-toggle="modal"
                                                            value="${data.username}"
                                                            type="button">Edit
                                                    </button>

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
    }
}


function getRole(roles) {
    var role = ""
    for (var i = 0; i < roles.length; i++) {
        role += roles[i].name + " "
    }
    return role.substring(0, role.length - 1).replace(/ROLE_/g, '')
}


$(document).ready(function () {
    $(' .asd .eBtn').on('click', function (event) {
        event.preventDefault()
        const href = $(this).attr('href')
        var text = $(this).text()
        if (text === 'Edit') {
            // $.get(href, function (country, status) { //main.js:14 Uncaught TypeError: $.get is not a function
            for (let i = 0; i < data.length; i++) {


                $.isFunction(href, function (data) {
                    $('.myForm #id').val(data[i].id)
                    $('.myForm #username').val(data[i].username)
                    $('.myForm #lastname').val(data[i].lastname)
                });}
            $('.myForm #exampleModal').modal()
        } else {
            $('.myForm #id').val('')
            $('.myForm #username').val('')
            $('.myForm #lastname').val('')
            $('.myForm #exampleModal').modal()
        }
    });
    $('.asd .delBtn').on('click', function (event) {
        event.preventDefault()
        var href = $(this).attr('href')
        $('#myModal #delRef').attr('href', href)
        $('#myModal').modal()
    });
});

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

});