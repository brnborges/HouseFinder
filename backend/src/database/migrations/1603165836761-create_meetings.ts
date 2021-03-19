import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createMeetings1603165836761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'vacancies',
            columns: [
                {
                  name: 'id',
                  type: 'integer',
                  unsigned: true,
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'latitude',
                  type: 'decimal',
                  scale: 10,
                  precision: 2,
                },
                {
                  name: 'longitude',
                  type: 'decimal',
                  scale: 10,
                  precision: 2,
                },
                {
                  name: 'about',
                  type: 'text',
                },
                {
                  name: 'instructions',
                  type: 'text',
                },
                {
                  name: 'rent_price',
                  type: 'varchar'
                },
                {
                  name: 'pet_allowed',
                  type: 'boolean',
                  default: false,
                },
              ]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vacancies');
    }

}
