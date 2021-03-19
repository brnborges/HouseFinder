import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mapMarkerImg from "../images/logo.svg";
import { FiPlus, FiArrowRight } from "react-icons/fi";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import "../styles/pages/vacancies-map.css";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Vacancy {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function VacanciesMap() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  useEffect(() => {
    api.get('vacancies').then(response => {
      setVacancies(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="HomeFinder" />

          <h2>Find your way home.</h2>
          <p>Smarter property search starts here.</p>
        </header>

        <footer>
          <strong>Dublin</strong>
          <span>Ireland</span>
        </footer>
      </aside>
      <Map
        minZoom={10}
        maxZoom={18}
        center={[53.3498091, -6.2624435]}
        zoom={15}
        style={{ width: "100%", height: "100% " }}
      >
        <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYnJuYm9yZ2VzIiwiYSI6ImNrZzdpMDh6cDA3amcycmxtNmo3ZXYyNGMifQ.1Oi_gnadgIKo20XtNYolxA" />
        {vacancies.map(vacancy => {
          return(
            <Marker 
            icon={mapIcon} 
            position={[vacancy.latitude, vacancy.longitude]}
            key={vacancy.id}
            >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {vacancy.name}
              <Link to={`/vacancies/${vacancy.id}`}> 
                <FiArrowRight size={20} color="#FFF"/>
              </Link>
          </Popup>
        </Marker>
          )
        })}
      </Map>

      <Link to="/vacancies/create" className="create-vacancy">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default VacanciesMap;
