import axios from "axios"
import { BASE_API } from "../../../constant"
import { router } from "../../../../main"

function EditCategoryPage(params) {
    setTimeout(() => {
        const submit = document.querySelector('.submit')
        const fieldName = document.querySelector('input[name="name"]')

        axios.get(BASE_API + `/category/` + params.data.id).then((res) => {
            fieldName.value = res.data.name
        })
        submit.addEventListener('click', (e) => {
            e.preventDefault()
            const error = {}
            const error_name = document.querySelector('.error_name')
            const fieldName = document.querySelector('input[name="name"]')
            if (fieldName.value === '') {
                error.name = "This field is required"
            }
            console.log(error)
            error_name.innerHTML = error.name ? error.name : ''

            if (Object.keys(error).length === 0) {
                axios.put(BASE_API + `/category/` + params.data.id, { name: fieldName.value }).then((res) => {
                    alert('Edit Category successfully')
                    router.navigate("/admin/category");
                })
                    .catch((err) => {
                        error_name.innerHTML = 'Add Category failed'
                    })
            }

        })
    }, 100)
    return (`
    <form style="max-width:500px">
  <h3 class="text-center mb-4">Edit Category</h3>
    <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="name"  placeholder="Name">
      <span class="text-danger d-block mt-1 error_name"></span>
      </div>
    </div>
    <div class="text-center mt-4 mb-5">
                  <button type="submit" class="btn btn-primary submit" 
                      class="btn  waves-effect waves-light btn-info hidden-md-down text-white">Save Category</button>
                      <button type="reset" 
                      class="btn waves-effect waves-light btn-info hidden-md-down text-white bg-danger">Reset</=>
              </div>
  </form>`);
}

export default EditCategoryPage;