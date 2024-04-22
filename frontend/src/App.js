
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopNavbar from './components/topNavBar/topNavbar.js';
import Navbar from './components/navbar/navbar.js'
import Home from './components/home/home.js'
import CreateAccount from './components/createAccount/createAccount.js';
import SignIn from './components/signIn/signIn.js';
import ProductPage from './components/productPage/productPage.js';
import BrowseProducts from './components/browseProducts/browseProducts.js';
import ShoppingCart from './components/shoppingCart/shoppingCart.js';
import Footer from './components/footer/footer.js'
import ScrollToTop from './customHooks/scrollToTop/scrollToTop.js';
import Auth from './customHooks/auth/auth.js';
import Blur from './components/blur/blur.js';

/* Utilizing state pattern throughout almost all components:
    Each component rerenders and performs different actions depending on the
    the current state of the web application
*/

function App() {

  return (
    <>
      <BrowserRouter>
        <Auth />
        <ScrollToTop />
        <TopNavbar />
        <Navbar />
        <Blur />
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/apparel/browse-products/:category/:name/:id' Component={ProductPage} />
          <Route path='/sign-in' Component={SignIn} />
          <Route path='/create-account' Component={CreateAccount} />
          <Route path='/apparel/browse-products/:category' Component={BrowseProducts} />
          <Route path='/cart' Component={ShoppingCart} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
