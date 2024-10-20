import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

const categories = [
  {
    name: "Technology",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASZWs6cgUb7Et_g6iKAr4qb0SZRHOyI0Cbg&s",
  },
  {
    name: "Phones",
    img: "https://www.cnet.com/a/img/resize/a4ffadf45a4f42ce90a542af0d558b4b62e1b3eb/hub/2022/03/30/e841545d-e55c-47fc-b24a-003bf14e58c8/oneplus-10-pro-cnet-review-12.jpg?auto=webp&fit=crop&height=675&width=1200",
  },
  {
    name: "Laptops",
    img: "https://media.licdn.com/dms/image/D5612AQEKugq1B3lXOw/article-cover_image-shrink_600_2000/0/1709109157277?e=2147483647&v=beta&t=0IaFBn43BDMArmQLVbER6Gpq_-71zP9ZLhbXTz0_O4w",
  },
];

function Home() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const lastProducts = product.slice(0, 8);
  useEffect(() => {
    axios.get("/product").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <img
        src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"
        className="home-banner"
        alt="Home Banner"
      />
      <div className="featured-products-container container mt-4">
        <h2>Last products</h2>
        {/*here to  last products  */}
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => {
            <ProductPreview {...product} />;
          })}
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <div key={product.name}>
              {/* here to ProductPreview  */}
              <img src={product.img} alt={product.name} />
              <p>{product.name}</p>
            </div>
          ))}
        </div>
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>
      {/* herr to  banner */}
      <div className="sale__banner--container mt-4">
        <img
          src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
          alt="Sale Banner"
        />
      </div>

      <Container>
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              key={category.name}
              to={`/category/${category.name.toLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
