import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
function HomeCarousel({ featured }) {
  const [index, setIndex] = useState(0);
  const navigate=useNavigate()
  const viewOffers=(data)=>{
    navigate('/list',{state:data})
  }
  // const [data,setData]=useState([]);
  // const updateOffers=()=>{
  //   //Fetch Data
  //   setData()
  // }

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {featured.map((item, idx) => (
        <Carousel.Item key={idx} onClick={()=>viewOffers({heading:item.text,products:item.products})}>
          <img
            className="d-block w-100"
            style={{ borderRadius: "25px" ,cursor:"pointer"}}
            src={item.src_img}
            text={item.text}
            height={"400px"}
            width={"800px"}
          />
          <Carousel.Caption>
            <h3>{item.text}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      {/* <Carousel.Item>
        <img className="d-block w-100" style={{borderRadius:"25px"}} src='https://iso.500px.com/wp-content/uploads/2022/07/Sunset-somewhere-in-Iowa-By-Vath.-Sok-2.jpeg' text="First slide" height={'400px'} width={'800px'} />
        <Carousel.Caption>
          <h3>Offer 1</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src='https://st4.depositphotos.com/1718692/23933/i/600/depositphotos_239335168-stock-photo-panorama-countryside-mountain-sunset-beautiful.jpg' text="Second slide" height={'400px'} width={'800px'} />
        <Carousel.Caption>
          <h3>Offer 2</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src='https://www.shutterstock.com/image-photo/majestic-sunset-mountains-landscape-dramatic-260nw-130505714.jpg' text="Third slide" height={'400px'} width={'800px'} />
        <Carousel.Caption>
          <h3>Offer 3</h3>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default HomeCarousel;
