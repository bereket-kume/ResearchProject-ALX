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
                          Sequi perspiciatis nulla reiciendis, rem, tenetur impedit, eveniet non necessitatibus error distinctio mollitia suscipit. Nostrum fugit doloribus consequatur distinctio esse, possimus maiores aliquid repellat beatae cum, perspiciatis enim, accusantium perferendis.
                        </p>
                        <a href="https://example.com">
                          Contact Us
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
            <div className="carousel_btn-box">
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                <span className="sr-only">Previous</span>
              </a>
              <img src="images/line.png" alt="" />
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
