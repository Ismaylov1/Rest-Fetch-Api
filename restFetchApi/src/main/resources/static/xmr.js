const heading = document.getElementById('t1')
//
//
// console.log(heading);
//
// async function getUsers() {
//     fetch('http://localhost:8087/rest')
//         .then(response => response.json())
//         .then(data => console.dir(data))
//         .then((data => JSON.parse(data)))
// }
const url = 'http://localhost:8087/rest'
let users1
async function getUsers() {
    let users = await fetch('http://localhost:8087/rest')
        .then(r => r.json())
        .then(async function array(users) {
            for (var i = 0; i < users.length; i++) {
                let copy = $('#exampleTest').clone();
                $('#asd').append(copy);
                copy.find('#exampleTest').attr("id", "exampleTest" + i)
                copy.find('#username').attr("id", "username" + i)
                $('#username' + i).text(users[i].username)
                copy.show()
            }
        })
}
getUsers()

// let usernamesJS = fetch(url)
//     .then(r => r.json())
//     .then(async function array(users) {
//         for (var i = 0; i < users.length; i++) {
//             console.log(users[i].username)
//         }
//     })


// //
// // $("table tr>th:first").html(usernamesJS);
// console.log($(usernamesJS).html(heading));
//
//
// let userLastName = fetch('http://localhost:8087/rest')
//     .then(r => r.json())
//     .then(async function array(users) {
//         for (var i = 0; i < users.length; i++) {
//             console.log(users[i].lastname)
//         }
//     })
//
// let usersID = fetch('http://localhost:8087/rest')
//     .then(r => r.json())
//     .then(async function array(users) {
//         for (var i = 0; i < users.length; i++) {
//             console.log(users[i].id)
//         }
//     })
// let userRoles = fetch('http://localhost:8087/rest')
//     .then(r => r.json())
//     .then(async function array(users) {
//         for (var i = 0; i < users.length; i++) {
//             console.log(users[i].roles)
//         }
//     })
//
// let userAge = fetch(url)
//     .then(r => r.json())
//     .then(async function array(users) {
//         for (var i = 0; i < users.length; i++) {
//             console.log(users[i].age)
//         }
//     })
//
// let copy = $('#exampleTest').copy();
// copy.find('#username').attr("id", "newId")
// $('#newId').text(users.username)

// let users = await fetch('http://localhost:8087/rest')
//     .then(r => r.json())
//     .then(async function array(users) {
//         for (let i = 0; i < users.length; i++) {
//             let copy = $('#exampleTest').clone();
//             copy.find('#username').attr("id","username"+i )
//             $('#username'+i ).text(users[i].username)
//
//             ('#asd').append(copy);
//         }
//     })
// for (var i = 0; i < users.length; i++) {
//     let copy = $('#exampleTest').clone();
//     ('#asd').append(copy);
//     copy.find('#exampleTest').attr("id","exampleTest"+i )
//     copy.find('#username').attr("id","username"+i )
//     $('#username'+i ).text(users.username)
//
// }