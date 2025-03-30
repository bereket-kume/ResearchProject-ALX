import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="hero_area">
      <section className="slider_section">
        <div className="slider_container">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="detail-box">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate__animated animate__fadeInDown">
                          Welcome To Our
                          <br />
                          Gebey Shop
                        </h1>
                        <p className="mt-4 text-lg md:text-xl lg:text-2xl animate__animated animate__fadeInUp" style={{ color: 'white'}}>
                          Gebey is your vibrant marketplace where you can effortlessly sell and buy a variety of products. Step into our world and discover a diverse range of offerings. From cutting-edge technology to timeless classics, explore our latest products and embark on a journey of shopping and selling like never before. Whether you're upgrading your gadgets or finding unique treasures, Gebey is your go-to destination for all things buying and selling!
                        </p>
                        <Link className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out animate__animated animate__fadeInUp" to="/shop"> Get Started </Link>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="img-box">
                        {/* Add your image or content here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add more carousel items here if needed */}
            </div>
          </div>
        </div>
      </section>

      <section className="about_section">
        <div className="container mx-auto px-4">
          <h2 className="about_heading animate__animated animate__fadeIn">About Us</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="card" style={{ background: 'linear-gradient(45deg, #210cdf, #181515,  #181515)' }}>
              <h1 className="text-xl font-semibold mb-4 text-blue-600">Buy</h1>
              <p className="text-white" style={{ color: 'white'}}>
                Find the products you're looking for right here on our platform. Start purchasing today and explore a wide range of offerings tailored to your needs!
              </p>
            </div>
            <div className="card" style={{ background: 'linear-gradient(45deg, #210cdf, #181515,  #181515)' }}>
              <h1 className="text-xl font-semibold mb-4 text-green-600">Sell</h1>
              <p className="text-white" style={{ color: 'white'}}>
                Find potential buyers for your products on our platform. Start selling today and connect with a community of interested buyers looking for what you have to offer!
              </p>
            </div>
            <div className="card" style={{ background: 'linear-gradient(45deg, #210cdf, #181515,  #181515)' }}>
              <h1 className="text-xl font-semibold mb-4 text-yellow-600">Trade</h1>
              <p  style={{ color: 'white'}}>
                In our marketplace, you have the opportunity to not only buy and sell but also to trade. Explore diverse trading options and discover new opportunities in our marketplace.
              </p>
            </div>
            <div className="card" style={{ background: 'linear-gradient(45deg, #210cdf, #181515,  #181515)' }}>
              <h1 className="text-xl font-semibold mb-4 text-purple-600">Exchange</h1>
              <p className="text-white"style={{ color: 'white'}}>
                In our marketplace, you can not only buy and sell but also trade and exchange products. Explore various options and discover new opportunities.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="contact_section py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white animate__animated animate__fadeIn">Contact Us</h2>
          <div className="flex flex-col items-center gap-6">
            <input type="text" placeholder="Name" className="w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-lg py-3 px-5 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white animate__animated animate__fadeInUp" />
            <input type="email" placeholder="Email" className="w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-lg py-3 px-5 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white animate__animated animate__fadeInUp delay-100" />
            <textarea placeholder="Message" className="w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-lg py-3 px-5 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white animate__animated animate__fadeInUp delay-200"></textarea>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out animate__animated animate__fadeInUp delay-300">Send</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
