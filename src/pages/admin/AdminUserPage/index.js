
import axios from "axios"
import { BASE_API } from "../../../constant"

function AdminUserPage() {
    const getListCategory = (res) => {
        const test = document.querySelector('#test12')
        test.innerHTML = ""
        const data = res.data.map((item) => {
            return `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td>${item.role === 1 ? 'Admin' : 'User'}</td>
            <td><button  class="btn deleteUser" id='${item.id}' style="background-color:#dc3545;color:#fff;padding:10px" data-navigo> Delete</button> <a href='/admin/user/update/${item.id}'  class="text-white btn " style="padding:10px" data-navigo> Edit</a></td>
          </tr>`
        })
        test.innerHTML = data.join('')
        const deleteUser = document.querySelectorAll('.deleteUser')
        deleteUser.forEach((item) => {
            item.addEventListener('click', async () => {
                const id = item.getAttribute('id')
                const isComfirm = await confirm('Are you sure you want to delete')
                if (isComfirm) {
                    axios.delete(BASE_API + '/users/' + id).then(() => {
                        axios.get(BASE_API + "/users").then((res) => {
                            getListCategory(res)

                        })
                    })
                        .catch(() => {
                            alert('Delete user failed')

                        });
                }
            })
        })
    }
    axios.get(BASE_API + "/users").then((res) => {
        getListCategory(res)

    })

    return (`<table class="table" >
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Password</th>
        <th scope="col">Role</th>
        <th scope="col"><a href='/admin/user/add' style="background-color:#28a745;padding:10px"  class="text-white btn" data-navigo> Create Product</a></th>
      </tr>
    </thead>
    <tbody id="test12">
    </tbody>
  </table>`);
}

export default AdminUserPage;