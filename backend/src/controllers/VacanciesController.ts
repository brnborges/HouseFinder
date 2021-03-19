import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Vacancy from '../models/Vacancy';
import vacancyView from '../views/vacancy_view';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response) {
        const vacanciesRepository = getRepository(Vacancy);

        const vacancies = await vacanciesRepository.find({
            relations: ['images']
        });
        
        return response.json(vacancyView.renderMany(vacancies));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        
        const vacanciesRepository = getRepository(Vacancy);

        const vacancy = await vacanciesRepository.findOneOrFail(id,{
            relations: ['images']
        });
        
        return response.json(vacancyView.render(vacancy));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            rent_price,
            pet_allowed,
        } = request.body;
    
        const vacanciesRepository = getRepository(Vacancy);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        })
    
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            rent_price,
            pet_allowed: pet_allowed == 'true',
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required(),
            instructions: Yup.string().required(),
            rent_price: Yup.string().required(),
            pet_allowed: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required()
            })
            )
        });

        const finalData = schema.cast(data);

        await schema.validate(data, {
            abortEarly: false,
        });

        const vacancy = vacanciesRepository.create(data);
    
        await vacanciesRepository.save(vacancy);
    
        return response.status(201).json(vacancy);
    }
    };