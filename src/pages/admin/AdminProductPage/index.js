import axios from "axios";
import { BASE_API } from "../../../constant";
function AdminProductPage() {


  const getList = (res, cat) => {
    const test = document.querySelector('#test12')
    test.innerHTML = "";
    const data = res.data.map((item) => {
      return `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.sale}</td>
            <td>${item.rate}</td>
            <td>${item.available}</td>
            <td><img style="height:60px" src="${item.img}"/></td>
            <td>${item.description}</td>
            <td>${cat.data.find(el => el.id === item.type)?.name}</td>
            <td><button id="${item.id}" class="btn deleteCategory" style="background-color:#dc3545;color:#fff;padding:10px"> Delete</button> <a href='product/update/${item.id}'  class="text-white btn " style="padding:10px"> Edit</a></td>
          </tr>`
    })
    test.innerHTML = data.join('')
    const deleteCategory = document.querySelectorAll('.deleteCategory')
    deleteCategory.forEach((item) => {
      item.addEventListener('click', async () => {
        const id = item.getAttribute('id')
        const isComfirm = await confirm('Are you sure you want to delete')
        if (isComfirm) {
          axios.delete(BASE_API + '/products/' + id).then(() => {
            axios.get(BASE_API + "/category").then((cat) => {
              axios.get(BASE_API + "/products").then((res) => {
                getList(res, cat)
              })
            })
          })
            .catch(() => {
              alert('Delete product failed')
            });
        }
      })
    })
  }
  axios.get(BASE_API + "/category").then((cat) => {
    axios.get(BASE_API + "/products").then((res) => {
      getList(res, cat)
    })
  })
  return (`<table class="table" >
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Price Sale</th>
        <th scope="col">Rate</th>
        <th scope="col">Available</th>
        <th scope="col">Image</th>
        <th scope="col">Description</th>
        <th scope="col">Type</th>
        <th scope="col"><a href='/admin/product/add' style="background-color:#28a745;padding:10px"  class="text-white btn"> Create Product</a></th>
      </tr>
    </thead>
    <tbody id="test12">
    </tbody>
  </table>` );
}

export default AdminProductPage;