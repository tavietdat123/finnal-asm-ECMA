import Navigo from "navigo";
import { router } from "../../../main";
const navigation = [
	{ name: 'Home', path: '/' },
	{ name: 'Product', path: '/product' },
]
let i = false
function Header() {
	setTimeout(() => {
		const btn = document.querySelector('.fa-right-from-bracket')
		if (btn) btn.addEventListener('click', async () => {
			const ok = await confirm('Are you sure you want to log out')
			if (ok) {
				localStorage.removeItem('infoUser')
				window.location.reload()
			}
		})
	}, 100)
	return (`
    <!-- Header Area -->
		<header class="header" >
			<!-- Topbar -->
			<div class="topbar">
				<div class="container">
					<div class="row">
						<div class="col-lg-6 col-md-5 col-12">
							<!-- Contact -->
							<ul class="top-link">
								<li><a href="#">About</a></li>
								<li><a href="#">Doctors</a></li>
								<li><a href="#">Contact</a></li>
								<li><a href="#">FAQ</a></li>
							</ul>
							<!-- End Contact -->
						</div>
						<div class="col-lg-6 col-md-7 col-12">
							<!-- Top Contact -->
							<ul class="top-contact">
								<li><i class="fa fa-phone"></i>+880 1234 56789</li>
								<li><i class="fa fa-envelope"></i><a href="mailto:support@yourmail.com">support@yourmail.com</a></li>
							</ul>
							<!-- End Top Contact -->
						</div>
					</div>
				</div>
			</div>
			<!-- End Topbar -->
			<!-- Header Inner -->
			<div class="header-inner">
				<div class="container">
					<div class="inner">
						<div class="row">
							<div class="col-lg-3 col-md-3 col-12">
								<!-- Start Logo -->
								<div class="logo">
									<a href="index.html"><img src="/src/assets/img/logo.png" alt="#"></a>
								</div>
								<!-- End Logo -->
								<!-- Mobile Nav -->
								<div class="mobile-nav"></div>
								<!-- End Mobile Nav -->
							</div>
							<div class="col-lg-6 col-md-9 col-12">
								<!-- Main Menu -->
								<div class="main-menu">
									<nav class="navigation">
										<ul class="nav menu">
                                        ${navigation.map(el => {
		return `<li class=""><a href="${el.path}" data-navigo>${el.name}</a></li>`
	}).join('')

		}
											
											
										</ul>
									</nav>
								</div>
								<!--/ End Main Menu -->
							</div>
							<div class="col-lg-3 col-12 d-flex align-items-center" style='gap:10px ;justify-content:flex-end'>
								${localStorage.getItem('infoUser') ? ` <i class="fa-solid fa-right-from-bracket" style="font-size:24px"></i><a class="nav-link waves-effect waves-dark profile-pic" href="#"
                        
								>
								<span  style='font-size:16px'>${JSON.parse(localStorage.getItem('infoUser')).name} &nbsp;</span> </a>
								<img style="width:50px;height:50px; border-radius:100%" src="/src/assets/img/4.jpg" alt="user" class="" />
							`: `<div class="get-quote">
									<a href="/sign-in" data-navigo class="btn" style="padding:10px 15px">Sign In</a>
								</div>
                                <div class="get-quote">
									<a href="sign-up" data-navigo class="btn" style="padding:10px 15px">Sign Up</a>
								</div>`}
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--/ End Header Inner -->
		</header>
		<!-- End Header Area -->` );
}

export default Header;