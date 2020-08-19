import React from 'react';
import './adminlte.min.css'
import Navbar from './components/Navbar';
import ContentWrapper from './components/ContentWrapper';
import Footer from './components/Footer';

function App() {
  return (
    <div className='wrapper'>
      <Navbar/>
      <ContentWrapper/>
      <Footer/>
    </div>
  );
}

export default App;
