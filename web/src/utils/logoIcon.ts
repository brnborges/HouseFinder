
import Leaflet from "leaflet";
import logoImgIcon from '../images/logo.svg';

const logoIcon = Leaflet.icon({
    iconUrl: logoImgIcon,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })

  export default logoIcon;