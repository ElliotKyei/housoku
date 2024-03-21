import './css/App.css';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'
import Navbar from './components/navbar/navbar.js'
import Home from './components/home/home.js'
import CreateAccount from './components/createAccount/createAccount.js';
import SignIn from './components/signIn/signIn.js';
import ProductPage from './components/productPage/productPage.js';
import BrowseProducts from './components/browseProducts/browseProducts.js';

import Footer from './components/footer/footer.js'

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/product-page' Component={ProductPage} />
          <Route path='/signin' Component={SignIn} />
          <Route path='/create-account' Component={CreateAccount} />
          <Route path='/apparel/browse-products' Component={BrowseProducts} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
