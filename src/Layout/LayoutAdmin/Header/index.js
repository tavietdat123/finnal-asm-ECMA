import { router } from "../../../../main"

const navigation = [
    { name: 'Dashboard ', path: '/admin/dashboard ', icon: '<i class="fa fa-smile-o"></i>' },
    { name: 'Product', path: '/admin/product', icon: '<i class="fa fa-tachometer"></i>' },
    { name: 'Category', path: '/admin/category', icon: '<i class="fa fa-bookmark-o"></i>' },
    { name: 'User', path: '/admin/user', icon: '<i class="fa fa-user-circle-o"></i>' },
]
function Header() {
    setTimeout(() => {
        const btn = document.querySelector('.btn-logout')
        if (btn) btn.addEventListener('click', async () => {
            const ok = await confirm('Are you sure you want to log out')
            if (ok) {
                localStorage.removeItem('infoUser')
                router.navigate('/')
            }
        })
    }, 100)
    return (` <header class="topbar">
    <nav class="navbar top-navbar navbar-expand-md navbar-light" >
        <!-- ============================================================== -->
        <!-- Logo -->
        <!-- ============================================================== -->
        <div class="navbar-header">
            <a class="navbar-brand" style="margin-left:20px" href="/admin/dashboard">
                    <img src="/src/assets/img/logo.png"  class="logo-admin" />
            </a>
        </div>
        <!-- ============================================================== -->
        <!-- End Logo -->
        <!-- ============================================================== -->
        <div class="navbar-collapse">
            <!-- ============================================================== -->
            <!-- toggle and nav items -->
            <!-- ============================================================== -->
            <ul class="navbar-nav me-auto">
                
                <!-- ============================================================== -->
                <!-- Search -->
                <!-- ============================================================== -->
                <li class="nav-item hidden-xs-down search-box"> <a
                        class="nav-link hidden-sm-down waves-effect waves-dark" href="javascript:void(0)"><i
                            class="fa fa-search"></i></a>
                   
                </li>
            </ul>
            <!-- ============================================================== -->
            <!-- User profile and search -->
            <!-- ============================================================== -->
            <ul class="navbar-nav my-lg-0">
                <!-- ============================================================== -->
                <!-- Profile -->
                <!-- ============================================================== -->
                <li class="nav-item dropdown u-pro">
                    <a class="nav-link waves-effect waves-dark profile-pic" href="#"
                        
                        ><img src="/src/assets/img/4.jpg" alt="user" class="" />
                        <span  style='font-size:16px'>${JSON.parse(localStorage.getItem('infoUser')).name} &nbsp;</span> </a>
                    
                </li>
            </ul>
        </div>
    </nav>
</header>
<!-- ============================================================== -->
<!-- End Topbar header -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<!-- Left Sidebar - style you can find in sidebar.scss  -->
<!-- ============================================================== -->
<aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div class="scroll-sidebar" style="height:100%">
        <!-- Sidebar navigation-->
        <nav class="sidebar-nav d-flex justify-content-between flex-column"  style="height:100%" >
            <ul id="sidebarnav">
                ${navigation.map(el => {
        return `<li> <a href="${el.path}" >${el.icon}<span class="hide-menu">${el.name}</span></a>
            </li>`
    }).join('')
        }
                
            </ul>
            <div class="text-center mt-4 mb-5">
                <div 
                    class="btn waves-effect waves-light btn-info hidden-md-down btn-logout text-white"> Log Out</div>
            </div>
        </nav>
        <!-- End Sidebar navigation -->
    </div>
    <!-- End Sidebar scroll-->
</aside>` );
}

export default Header;