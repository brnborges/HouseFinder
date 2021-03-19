import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Vacancy from './Vacancy';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    path: string;

    @ManyToOne(() => Vacancy, vacancy => vacancy.images)
    @JoinColumn({ name: "vacancy_id" })
    vacancy: Vacancy;
}