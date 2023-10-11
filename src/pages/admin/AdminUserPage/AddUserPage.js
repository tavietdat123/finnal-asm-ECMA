import axios from "axios"
import { BASE_API } from "../../../constant"
import { router } from "../../../../main"

function AddUserPage() {
  setTimeout(() => {
    const submit = document.querySelector('.submit')
    const email = document.querySelector('input[name="email"]')
    const password = document.querySelector('input[name="password"]')
    const name = document.querySelector('input[name="name"]')
    const role = document.querySelector('select[name="role"]')
    const error_password = document.querySelector('.error_password')
    const error_name = document.querySelector('.error_name')
    const error_email = document.querySelector('.error_email')
    const error_role = document.querySelector('.error_role')
    submit.addEventListener('click', (e) => {
      e.preventDefault()
      const error = {}

      if (email.value === '') {
        error.email = "This field is required"
      } else if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value))) {
        error.email = "Email is not correct format "
      }
      if (password.value === '') {
        error.password = "This field is required"
      }
      if (name.value === '') {
        error.name = "This field is required"
      }
      if (role.value === '') {
        error.role = "This field is required"
      }

      error_password.innerHTML = error.password ? error.password : ''
      error_email.innerHTML = error.email ? error.email : ''
      error_name.innerHTML = error.name ? error.name : ''
      error_role.innerHTML = error.role ? error.role : ''

      if (Object.keys(error).length === 0) {
        axios.get(BASE_API + `/users`).then((res) => {
          const isExistsEmail = res.data.find(el => el.email === email.value)
          if (!isExistsEmail) {
            axios.post(BASE_API + '/users', {
              name: name.value,
              email: email.value,
              password: password.value,
              role: Number(role.value)
            }).then((res) => {
              alert('Add user successfully')

              router.navigate("/admin/user");
            })
          } else {
            error_email.innerHTML = "Email already exists"
          }

        })
          .catch((err) => {
            error_role.innerHTML = 'Add Category failed'
          })
      }

    })
  }, 100)
  return (`
    <form style="max-width:500px">
  <h3 class="text-center mb-4">Create Category</h3>
    <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="name"  placeholder="Name">
      <span class="text-danger d-block mt-1 error_name"></span>
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="email"  placeholder="Email">
      <span class="text-danger d-block mt-1 error_email"></span>
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="password"  placeholder="Password">
      <span class="text-danger d-block mt-1 error_password"></span>
      </div>
    </div>
    <div class="form-group row">
    <label for="input" class="col-sm-2 col-form-label">Role</label>
    <div class="col-sm-10">
      <select class="form-control" name="role" >
      <option value="">Select a option</option>
      <option value="1">Admin</option>
      <option value="0">User</option>
      </select>
      <span class="text-danger d-block mt-1 error_role"></span>

    </div>
  </div>
    <div class="text-center mt-4 mb-5">
                  <button type="submit" class="btn btn-primary submit" 
                      class="btn  waves-effect waves-light btn-info hidden-md-down text-white">Save User</button>
                      <button type="reset" 
                      class="btn waves-effect waves-light btn-info hidden-md-down text-white bg-danger">Reset</=>
              </div>
  </form>
    `);
}

export default AddUserPage;