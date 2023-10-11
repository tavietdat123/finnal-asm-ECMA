import axios from "axios";
import { BASE_API } from "../../constant";

function DetailProductPage(params) {
    axios.get(BASE_API + '/products/' + params.data.id).then((res) => {
        const container = document.querySelector('.render-detail')
        const data = res.data
        container.innerHTML = `<div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" style="width:600px;height:700px;object-fit:cover;border-radius:10px" src="${data.img}" alt="..." /></div>
        <div class="col-md-6">
            <div class="small mb-1">SKU: BST-498</div>
            <h1 class="display-5 fw-bolder">${data.name}</h1>
            <div class="fs-5 mb-2 mt-3 d-flex">
                <span class="text-decoration-line-through " style="font-size:24px"><s>${data.sale ? '$' + (data.price + data.sale) : ''}</s></span>
                <span class="text-danger" style="font-size:24px">$${data.price}</span>
            </div>
            <div class="fs-5 mb-2 ">
                <span class="text-decoration-line-through">Available: <span class="fw-bold">${data.available}</span></span>
            </div>
            <div class="fs-5 mb-2 ">
                <span class="text-decoration-line-through">Type: <span class="fw-bold">${data.type}</span></span>
            </div>
            <div class="fs-5 mb-4 ">

            ${Array.from({ length: 5 }).map((_, index) => {
            if (index + 1 <= data.rate) return '<i class="fa fa-star" style="color:#ffc107"></i>'
            return '<i class="fa-regular fa-star" style="color:#ffc107"></i>'


        }).join('')
            }
            </div>

            <p class="lead mb-3">${data.description}</p>
            <div class="d-flex">
                <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                <button class="btn btn-outline-dark flex-shrink-0" type="button">
                    <i class="bi-cart-fill me-1"></i>
                    Add to cart
                </button>
            </div>
        </div>
    </div>`
    })
    return (` <section >
    
    <div class="container px-4 px-lg-5 my-5 render-detail">
    
    </div>
</section>`);
}

export default DetailProductPage;