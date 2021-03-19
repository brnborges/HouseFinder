import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('vacancies')
export default class Vacancy {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    rent_price: string;

    @Column()
    pet_allowed: boolean;

    @OneToMany(() => Image, image => image.vacancy, {
        cascade: ["insert", "update"]
    })
    @JoinColumn({ name: "vacancy_id" })
    images: Image[];
}