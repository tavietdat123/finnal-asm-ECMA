import axios from "axios"
import { BASE_API } from "../../../constant"

function AdminCategoryPage() {
  const getListCategory = (res) => {
    const test = document.querySelector('#test12')
    test.innerHTML = ""
    const data = res.data.map((item) => {
      return `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td><button  class="btn deleteCategory" id='${item.id}' style="background-color:#dc3545;color:#fff;padding:10px" data-navigo> Delete</button> <a href='/admin/category/update/${item.id}'  class="text-white btn " style="padding:10px" data-navigo> Edit</a></td>
          </tr>`
    })
    test.innerHTML = data.join('')
    const deleteCategory = document.querySelectorAll('.deleteCategory')
    deleteCategory.forEach((item) => {
      item.addEventListener('click', async () => {
        const id = item.getAttribute('id')
        const isComfirm = await confirm('Are you sure you want to delete')
        if (isComfirm) {
          axios.delete(BASE_API + '/category/' + id).then(() => {
            axios.get(BASE_API + "/category").then((res) => {
              getListCategory(res)

            })
          })
            .catch(() => {
              alert('Delete category failed')

            });
        }
      })
    })
  }
  axios.get(BASE_API + "/category").then((res) => {
    getListCategory(res)

  })

  return (`<table class="table" >
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col"><a href='/admin/category/add' style="background-color:#28a745;padding:10px"  class="text-white btn" data-navigo> Create Product</a></th>
      </tr>
    </thead>
    <tbody id="test12">
    </tbody>
  </table>`);
}

export default AdminCategoryPage;