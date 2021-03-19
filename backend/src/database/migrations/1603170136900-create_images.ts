import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1603170136900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
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
            name: 'path',
            type: 'varchar'
          },
          {
            name: 'vacancy_id',
            type: 'integer',
          }
        ],
        foreignKeys: [
          {
            name: 'ImageVacancy',
            columnNames: ['vacancy_id'],
            referencedTableName: 'vacancies',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
