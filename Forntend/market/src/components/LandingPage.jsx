import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="hero_area m-20px">
      <section className="slider_section">
        <div className="slider_container">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="detail-box">
                        <h1>
                          Welcome To Our
                          Gebey Shop
                        </h1>
                        <p>
                        Gebey is your vibrant marketplace where you can effortlessly sell and buy a variety 
                        of products. Step into our world and discover a diverse range of offerings. 
                        From cutting-edge technology to timeless classics, explore our latest products and 
                        embark on a journey of shopping and selling like never before. Whether you're upgrading your 
                        gadgets or finding unique treasures, Gebey is your go-to destination for all things buying and
                         selling!                        </p>
                        <a href=''>
                          Get Started
                        </a>
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

      <section className="about_section bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/2 lg:w-1/4 bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300 ease-in-out">
              <h1 className="text-xl font-semibold mb-4 text-blue-600">Buy</h1>
              <p className="text-gray-700">
                Find the products you're looking for right here on our platform. Start purchasing today and explore a wide range of offerings tailored to your needs!
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300 ease-in-out">
              <h1 className="text-xl font-semibold mb-4 text-green-600">Sell</h1>
              <p className="text-gray-700">
                Find potential buyers for your products on our platform. Start selling today and connect with a community of interested buyers looking for what you have to offer!
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300 ease-in-out">
              <h1 className="text-xl font-semibold mb-4 text-yellow-600">Trade</h1>
              <p className="text-gray-700">
                In our marketplace, you have the opportunity to not only buy and sell but also to trade. Explore diverse trading options and discover new opportunities in our marketplace.
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300 ease-in-out">
              <h1 className="text-xl font-semibold mb-4 text-purple-600">Exchange</h1>
              <p className="text-gray-700">
                In our marketplace, you can not only buy and sell but also trade and exchange products. Explore various options and discover new opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='contact_section bg-gray-100 py-12'>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="flex flex-col items-center gap-4">
            <input type="text" placeholder="Name" className="w-full md:w-1/2 lg:w-1/4 rounded-lg shadow-md py-2 px-4 border-gray-300 focus:outline-none focus:border-blue-500" />
            <input type="email" placeholder="Email" className="w-full md:w-1/2 lg:w-1/4 rounded-lg shadow-md py-2 px-4 border-gray-300 focus:outline-none focus:border-blue-500" />
            <textarea placeholder="Message" className="w-full md:w-1/2 lg:w-1/4 rounded-lg shadow-md py-2 px-4 border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">Send</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
