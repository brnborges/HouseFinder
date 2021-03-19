import React, { useState, ChangeEvent ,FormEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from "react-router-dom";
import { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-vacancy.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

export default function CreateVacancy() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0})

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [rent_price, setRentPrice] = useState('');
  const [pet_allowed, setPetAllowed] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);




  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions' , instructions);
    data.append('rent_price' , rent_price);
    data.append('pet_allowed' , String(pet_allowed));

    images.forEach(image => {
      data.append('images' , image);   
    })

    await api.post('vacancies', data);

    alert('Registered');

    history.push('/app')
  }

  return (
    <div id="page-create-vacancy">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-vacancy-form">
          <fieldset>
            <legend>Details</legend>

            <Map 
              center={[53.3498091,-6.2624435]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYnJuYm9yZ2VzIiwiYSI6ImNrZzdpMDh6cDA3amcycmxtNmo3ZXYyNGMifQ.1Oi_gnadgIKo20XtNYolxA" />

              { position.latitude !== 0 && (
              <Marker 
              interactive={false} 
              icon={mapIcon} 
              position={[
                position.latitude,
                position.longitude
                ]} 
                /> 
                )}
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Address</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Description <span>Max of 300 caracteres</span></label>
              <textarea id="name" value={about} onChange={event => setAbout(event.target.value)} maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Photos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}
              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#493E7F" />
              </label>

              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Extra information</legend>

            <div className="input-block">
              <label htmlFor="instructions">Property overview</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="rent_price">Rental price ( e.g: 300 - 500 )</label>
              <input id="rent_price" value={rent_price} onChange={event => setRentPrice(event.target.value)}/>
            </div>

              <div className="input-block">
              <label htmlFor="pet_allowed">Pets allowed</label>

                <div className="button-select">
                <button type="button" className={pet_allowed ? 'active' : ''} onClick={() => setPetAllowed(true)}>Yes</button>
                <button type="button" className={!pet_allowed ? 'active' : ''} onClick={() => setPetAllowed(false)}>No</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirm
          </button>
        </form>
      </main>
    </div>
  );
}
