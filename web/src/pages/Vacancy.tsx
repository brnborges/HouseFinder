import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiDollarSign, FiGithub } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import api from "../services/api";

import "../styles/pages/vacancy.css";
import mapIcon from "../utils/mapIcon";

interface Vacancy {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  rent_price: string;
  pet_allowed: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface VacancyParams {
  id: string;
}

export default function Vacancy() {
  const params = useParams<VacancyParams>();
  const [vacancy, setVacancy] = useState<Vacancy>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`vacancies/${params.id}`).then((response) => {
      setVacancy(response.data);
    });
  }, [params.id]);

  if (!vacancy) {
    return <p>Loading...</p>;
  }

  return (
    <div id="page-vacancy">
      <Sidebar />

      <main>
        <div className="vacancy-details">
          <img
            src={vacancy.images[activeImageIndex].url}
            alt={vacancy.name}
          />

          <div className="images">
            {vacancy.images.map((image, index) => {
              return(
                <button 
                key={image.id} 
                className={activeImageIndex === index ? 'active' : ''} 
                type="button"
                onClick={() => {
                  setActiveImageIndex(index);
                }}
                >
              <img src={image.url}
                alt={vacancy.name}/>
            </button>
              )
            } )}
          </div>

          <div className="vacancy-details-content">
            <h1>{vacancy.name}</h1>
            <p>
              {vacancy.about}
            </p>

            <div className="map-container">
              <Map
                center={[vacancy.latitude, vacancy.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYnJuYm9yZ2VzIiwiYSI6ImNrZzdpMDh6cDA3amcycmxtNmo3ZXYyNGMifQ.1Oi_gnadgIKo20XtNYolxA" />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[vacancy.latitude, vacancy.longitude]}
                />
              </Map>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${vacancy.latitude},${vacancy.longitude}`}>See directions here</a>
              </footer>
            </div>

            <hr />

            <div className="overview-details">
            <h2>Property overview</h2>
            <p>
              {vacancy.instructions}
            </p>
            </div>

            <div className="rent-details">
              <div className="price">
                <FiDollarSign size={32} color="#15B6D6" />
                Rental price <br />
                {vacancy.rent_price}€
              </div>
              {vacancy.pet_allowed ? (
                <div className="pet-allowed">
                <FiGithub size={32} color="#39CC83" />
                Pets <br />
                allowed
              </div>
              ) : (
                <div className="pet-allowed not-accepted">
                <FiGithub size={32} color="#FF669D" />
                Pets are not <br />
                allowed
              </div>
              ) }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Contact me
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
