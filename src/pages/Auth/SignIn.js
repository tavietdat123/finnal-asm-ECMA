import axios from "axios";
import { router } from "../../../main";
import { BASE_API } from "../../constant";

function SignIn() {
	setTimeout(() => {
		const submit = document.querySelector('.submit')
		const email = document.querySelector('input[name="email"]')
		const password = document.querySelector('input[name="password"]')
		const error_password = document.querySelector('.error_password')
		const error_email = document.querySelector('.error_email')
		submit.addEventListener('click', (e) => {
			e.preventDefault()
			const error = {}

			if (email.value === '') {
				error.email = "This field is required"
			}
			if (password.value === '') {
				error.password = "This field is required"
			}
			error_password.innerHTML = error.password ? error.password : ''
			error_email.innerHTML = error.email ? error.email : ''

			if (Object.keys(error).length === 0) {
				axios.get(BASE_API + `/users`)
					.then((res) => {
						const user = res.data.find(user => user.email === email.value && user.password === password.value)
						localStorage.setItem('infoUser', JSON.stringify(user))
						if (user) {
							alert('Login success')
							if (user.role === 0) {
								router.navigate("/");
							} else {
								router.navigate('/admin/dashboard')
							}
						} else {
							error_password.innerHTML = 'Username password is incorrect'

						}
					})
					.catch((err) => {
					})
			}
		})
	}, 100);
	return (`
    <div class='appointment' style='max-width: 1140px;margin:auto;padding:20px 0'>
    <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-7 col-lg-5">
					<div class="login-wrap p-4 p-md-5">
		      	<div class="icon d-flex align-items-center justify-content-center">
		      		<img src="https://i.pinimg.com/236x/27/87/62/2787629fe39ee0bb053b9d1cf1906d33.jpg" width="100" height="100" style="border-radius:50%" />
		      	</div>
		      	<h3 class="text-center mb-4 mt-3">Sign In</h3>
						<form action="#" class="login-form">
		      		<div class="form-group">
		      			<input type="text" class="form-control " style='padding:10px 8px' placeholder="Email" name="email" required>
      <span class="text-danger d-block mt-1 error_email"></span>
		      		
						</div>
	            <div class="form-group">
	              <input type="password" class="form-control " style='padding:10px 8px' placeholder="Password" name="password" required>
      <span class="text-danger d-block mt-1 error_password"></span>
	           
				  </div>
	            <div class="form-group">
	            	<button  class="form-control btn btn-primary rounded submit px-3">Login</button>
	            </div>
	            <div class="form-group d-md-flex">
	            	<div class="w-50">
	            		<label class="checkbox-wrap checkbox-primary">Remember Me
									  <input type="checkbox" checked>
									  <span class="checkmark"></span>
									</label>
								</div>
								<div class="w-50 text-md-right">
									<a href="#">Forgot Password</a>
								</div>
	            </div>
	          </form>
	        </div>
				</div>
			</div>
		</div>
	</section>
    </div>`);
}

export default SignIn;