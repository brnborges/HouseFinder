import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import VacanciesController from './controllers/VacanciesController';


const routes = Router();
const upload = multer(uploadConfig);

routes.get('/vacancies', VacanciesController.index);
routes.get('/vacancies/:id', VacanciesController.show);
routes.post('/vacancies', upload.array('images'), VacanciesController.create);


export default routes;