import axios from "axios";
import { BASE_API } from "../../constant";

function ProductPage() {
  axios.get(BASE_API + "/category").then((cat) => {
    const filter = document.querySelector('select[name="filter"]')
    filter.innerHTML = `<option value=""></option>` + cat.data.map((el) => {
      return `<option value="${el.id}">${el.name}</option>`
    })
    axios.get(BASE_API + '/products').then((res) => {
      const container = document.querySelector('.render_item')
      container.innerHTML = res.data.map(el => {
        return `<div class="col-md-12 col-lg-4 mb-4 ">
            <a href='/product/${el.id}' data-navigo>
            <div class="card" >
              <div class="d-flex justify-content-between p-3">
                <p class="lead mb-0">Today's Combo Offer</p>
                <div
                  class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                  style="width: 35px; height: 35px;">
                  <p class="text-white mb-0 small">x4</p>
                </div>
              </div>
              <img style="    height: 300px;
              object-fit: cover;" src="${el.img}"
                class="card-img-top" alt="Laptop" />
              <div class="card-body">
                <div class="d-flex justify-content-between" >
                  <p class="small"><a href="#!" class="text-muted">${cat.data.find(ele => ele.id === el.type).name}</a></p>
                  <p class="small text-danger"><s>${el.sale ? '$' + (el.price + el.sale) : ''}</s></p>
                </div>
    
                <div class="d-flex justify-content-between mb-3">
                  <h5 class="mb-0">${el.name}</h5>
                  <h5 class="text-dark mb-0">${el.price}</h5>
                </div>
    
                <div class="d-flex justify-content-between mb-2">
                  <p class="text-muted mb-0">Available: <span class="fw-bold">${el.available}</span></p>
                  <div class="ms-auto text-warning">
                  ${Array.from({ length: 5 }).map((_, index) => {
          if (index + 1 <= el.rate) return '<i class="fa fa-star"></i>'
          return '<i class="fa-regular fa-star"></i>'


        }).join('')
          }
                  </div>
                </div>
              </div>
              
            </div>
            </a>
          </div>`
      }).join('')
      filter.addEventListener('change', (e) => {
        container.innerHTML = res.data.filter((el) => el.type === Number(e.target.value)).map(el => {
          return `<div class="col-md-12 col-lg-4 mb-4 ">
              <a href='/product/${el.id}' data-navigo>
              <div class="card" >
                <div class="d-flex justify-content-between p-3">
                  <p class="lead mb-0">Today's Combo Offer</p>
                  <div
                    class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style="width: 35px; height: 35px;">
                    <p class="text-white mb-0 small">x4</p>
                  </div>
                </div>
                <img style="    height: 300px;
                object-fit: cover;" src="${el.img}"
                  class="card-img-top" alt="Laptop" />
                <div class="card-body">
                  <div class="d-flex justify-content-between" >
                    <p class="small"><a href="#!" class="text-muted">${cat.data.find(ele => ele.id === el.type).name}</a></p>
                    <p class="small text-danger"><s>${el.sale ? '$' + (el.price + el.sale) : ''}</s></p>
                  </div>
      
                  <div class="d-flex justify-content-between mb-3">
                    <h5 class="mb-0">${el.name}</h5>
                    <h5 class="text-dark mb-0">${el.price}</h5>
                  </div>
      
                  <div class="d-flex justify-content-between mb-2">
                    <p class="text-muted mb-0">Available: <span class="fw-bold">${el.available}</span></p>
                    <div class="ms-auto text-warning">
                    ${Array.from({ length: 5 }).map((_, index) => {
            if (index + 1 <= el.rate) return '<i class="fa fa-star"></i>'
            return '<i class="fa-regular fa-star"></i>'


          }).join('')
            }
                    </div>
                  </div>
                </div>
                
              </div>
              </a>
            </div>`
        }).join('')
      })
    })
  })
  return (`<section style="background-color: #eee;">
    <div class="container py-5">
    <div class="form-group d-flex" style="width:300px">
    <label for="input" class="col-sm-2 col-form-label">Filter</label>
    <div class="col-sm-10">
    <select class="form-control" name="filter" ></select>
    </div>
  </div>
      <div class="row render_item">
      </div>
    </div>
  </section>`);
}

export default ProductPage;