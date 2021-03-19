
import Leaflet from "leaflet";
import mapMarkerImg from '../images/map-marker.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [158, 100],
    iconAnchor: [80, 68],
    popupAnchor: [0, -30]
  })

  export default mapIcon;

  // iconSize: [58, 68],
  //  iconAnchor: [29, 68],
  //  popupAnchor: [0, -60]