import Vacancy from "../models/Vacancy";
import imagesView from "./images_view";

export default {
  render(vacancy: Vacancy) {
    return {
      id: vacancy.id,
      name: vacancy.name,
      latitude: vacancy.latitude,
      longitude: vacancy.longitude,
      about: vacancy.about,
      instructions: vacancy.instructions,
      rent_price: vacancy.rent_price,
      pet_allowed: vacancy.pet_allowed,
      
      images: imagesView.renderMany(vacancy.images)
    };
  },

  renderMany(vacancies: Vacancy[]){
      return vacancies.map(vacancy => this.render(vacancy));
  }
};
