import axios from "axios"
import { router } from "../../../../main"
import { BASE_API } from "../../../constant"

function EditProductPage(params) {
  axios.get(BASE_API + '/category').then((category) => {
    axios.get(BASE_API + '/products/' + params.data.id).then((res) => {
      const data = res.data
      const submit = document.querySelector('.submit')
      const error_name = document.querySelector('.error_name')
      const error_price = document.querySelector('.error_price')
      const error_sale = document.querySelector('.error_sale')
      const error_rate = document.querySelector('.error_rate')
      const error_image = document.querySelector('.error_image')
      const error_available = document.querySelector('.error_available')
      const error_description = document.querySelector('.error_description')
      const error_type = document.querySelector('.error_type')
      const name = document.querySelector('input[name="name"]')
      const price = document.querySelector('input[name="price"]')
      const sale = document.querySelector('input[name="sale"]')
      const rate = document.querySelector('input[name="rate"]')
      const image = document.querySelector('input[name="image"]')
      const available = document.querySelector('input[name="available"]')
      const description = document.querySelector('textarea[name="description"]')
      const img = document.querySelector('.img')
      const type = document.querySelector('select[name="type"]')
      name.value = data.name
      price.value = data.price
      sale.value = data.sale
      rate.value = data.rate
      image.value = data.img
      description.value = data.description
      available.value = data.available
      img.src = data.img
      type.innerHTML = `<option value="">Select a option</option>` + category.data.map((el) => {
        return `<option value="${el.id}" ${el.id === data.type ? 'selected' : ''}>${el.name}</option>`
      }).join('')

      submit.addEventListener('click', (e) => {
        e.preventDefault()
        const error = {}
        if (name.value === '') {
          error.name = "This field is required"
        }
        if (price.value === '') {
          error.price = "This field is required"
        } else if (price.value < 0) {
          error.price = "Price must be greater than 0"

        }
        if (sale.value === '') {
          error.sale = "This field is required"
        } else if (sale.value < 0) {
          error.sale = "Price must be greater than or equal to 0"
        } else if (sale.value > price.value) {
          error.sale = "Original price must be greater than sale price"
        }
        if (rate.value === '') {
          error.rate = "This field is required"
        } else if (rate.value < 0 || rate.value > 5) {
          error.rate = "Price must be greater than 0 and less than 5 or equal to 5"
        }
        if (image.value === '') {
          error.image = "This field is required"
        }
        if (available.value === '') {
          error.available = "This field is required"
        }
        if (description.value === "") {
          error.description = "This field is required"
        }
        if (type.value === '') {
          error.type = "This field is required"
        }
        error_name.innerHTML = error.name ? error.name : ''
        error_price.innerHTML = error.price ? error.price : ''
        error_sale.innerHTML = error.sale ? error.sale : ''
        error_rate.innerHTML = error.rate ? error.rate : ''
        error_image.innerHTML = error.image ? error.image : ''
        error_available.innerHTML = error.available ? error.available : ''
        error_description.innerHTML = error.description ? error.description : ''
        error_type.innerHTML = error.type ? error.type : ''
        if (Object.keys(error).length === 0) {
          const data = {
            name: name.value,
            price: Number(price.value),
            sale: Number(sale.value),
            rate: Number(rate.value),
            img: image.value,
            available: Number(available.value),
            description: description.value,
            type: Number(type.value)
          }
          axios.put(BASE_API + `/products/` + params.data.id, data).then((res) => {
            alert('Edit product successfully')

            router.navigate("/admin/product");
          })

        }

      })
    })


  })
  return (`
    <form style="max-width:500px">
    <h3 class="text-center mb-4">Create Product</h3>
  <div class="form-group row">
    <label for="input" class="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-10">
      <input class="form-control" name="name"  placeholder="Name">
      <span class="text-danger d-block mt-1 error_name"></span>
    </div>
  </div>

  <div class="form-group row">
    <label for="input" class="col-sm-2 col-form-label">Price</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" name="price"   placeholder="Price">
      <span class="text-danger d-block mt-1 error_price"></span>
    </div>
  </div>

  <div class="form-group row">
    <label for="" class="col-sm-2  col-form-label">Sale</label>
    <div class="col-sm-10">
      <input class="form-control" name="sale" value="0" type="number" placeholder="Sale">
      <span class="text-danger d-block mt-1 error_sale"></span>

    </div>
  </div>

  <div class="form-group row">
    <label for="" class="col-sm-2 col-form-label">Rate</label>
    <div class="col-sm-10">
      <input  class="form-control" name="rate" type="number" placeholder="Rate">
      <span class="text-danger d-block mt-1 error_rate"></span>
    </div>
  </div>

  <div class="form-group row">
    <label for="" class="col-sm-2 col-form-label">Image</label>
    <div class="col-sm-10">
      <input class="form-control" name="image" placeholder="Image">
      <span class="text-danger d-block mt-1 error_image"></span>

    </div>
  </div>
  <img style="height:60px" class="img" src=""/>

  <div class="form-group row">
    <label for="input" class="col-sm-2 col-form-label">Available</label>
    <div class="col-sm-10">
      <input class="form-control" name="available" type="number" placeholder="Available">
      <span class="text-danger d-block mt-1 error_available"></span>

    </div>
  </div>
  <div class="form-group row">
    <label for="input" class="col-sm-2 col-form-label">Description</label>
    <div class="col-sm-10">
      <textarea class="form-control" name="description" placeholder="Description"></textarea>
      <span class="text-danger d-block mt-1 error_description"></span>

    </div>
  </div>
  <div class="form-group row">
    <label for="input" class="col-sm-2 col-form-label">Type</label>
    <div class="col-sm-10">
      <select class="form-control" name="type" ><option value="">Select a option</option></select>
      <span class="text-danger d-block mt-1 error_type"></span>

    </div>
  </div>


  <div class="text-center mt-4 mb-5">
                <button type="submit" class="btn btn-primary submit"
                    class="btn  waves-effect waves-light btn-info hidden-md-down text-white">Save Product</button>
                    <button type="reset" 
                    class="btn waves-effect waves-light btn-info hidden-md-down text-white bg-danger">Reset</=>
            </div>
</form>`);
}

export default EditProductPage;