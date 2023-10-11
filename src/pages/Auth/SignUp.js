import axios from "axios";
import { BASE_API } from "../../constant";
import { router } from "../../../main";

function SignUp() {
	axios.get(BASE_API + '/users').then((res) => {
		const submit = document.querySelector('.submit')
		const email = document.querySelector('input[name="email"]')
		const password = document.querySelector('input[name="password"]')
		const name = document.querySelector('input[name="name"]')
		const re_password = document.querySelector('input[name="re-password"]')
		const error_password = document.querySelector('.error_password')
		const error_re_password = document.querySelector('.error_re_password')
		const error_name = document.querySelector('.error_name')
		const error_email = document.querySelector('.error_email')
		submit.addEventListener('click', (e) => {
			e.preventDefault()
			const error = {}

			if (email.value === '') {
				error.email = "This field is required"
			} else if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value))) {
				error.email = "Email is not correct format "
			} else if (res.data.find(el => el.email === email.value)) {
				error.email = "Email already exists"
			}
			if (password.value === '') {
				error.password = "This field is required"
			}
			if (name.value === '') {
				error.name = "This field is required"
			}
			if (re_password.value === '') {
				error.re_password = "This field is required"
			} else if (re_password.value !== password.value) {
				error.re_password = "Re-password is not math"
			}
			error_password.innerHTML = error.password ? error.password : ''
			error_email.innerHTML = error.email ? error.email : ''
			error_re_password.innerHTML = error.re_password ? error.re_password : ''
			error_name.innerHTML = error.name ? error.name : ''

			if (Object.keys(error).length === 0) {
				axios.post(BASE_API + '/users', {
					name: name.value,
					email: email.value,
					password: password.value,
					role: 0
				}).then((res) => {
					alert('Sign Up success')
					router.navigate("/sign-in");
				})
					.catch((err) => {
						error_re_password.innerHTML = "Sign up failed"
					})


			}
		})
	}, 100);
	return (`<div class='appointment' style='max-width: 1140px;margin:auto;padding:20px 0'>
    <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-7 col-lg-5">
					<div class="login-wrap p-4 p-md-5">
		      	<div class="icon d-flex align-items-center justify-content-center">
		      		<img src="https://i.pinimg.com/236x/27/87/62/2787629fe39ee0bb053b9d1cf1906d33.jpg" width="100" height="100" style="border-radius:50%" />
		      	</div>
		      	<h3 class="text-center mb-4 mt-3">Sign Up</h3>
						<form action="#" class="login-form">
                        <div class="form-group">
		      			<input type="text" class="form-control " style='padding:10px 8px' placeholder="Name" name="name" required>
						  <span class="text-danger d-block mt-1 error_name"></span>

		      		</div>
		      		<div class="form-group">
		      			<input type="text" class="form-control " style='padding:10px 8px' placeholder="Email" name="email" required>
						  <span class="text-danger d-block mt-1 error_email"></span>

		      		</div>
                    
	            <div class="form-group ">
	              <input type="password" class="form-control " style='padding:10px 8px' placeholder="Password" name="password" required>
				  <span class="text-danger d-block mt-1 error_password"></span>

	            </div>
                <div class="form-group ">
	              <input type="password" class="form-control " style='padding:10px 8px' placeholder="Re-Password" name="re-password" required>
				  <span class="text-danger d-block mt-1 error_re_password"></span>

	            </div>
	            <div class="form-group">
	            	<button type="submit" class="form-control btn btn-primary rounded submit px-3">Login</button>
	            </div>
	            
	          </form>
	        </div>
				</div>
			</div>
		</div>
	</section>
    </div>`);
}

export default SignUp;