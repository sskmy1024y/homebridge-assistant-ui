import {MigrationInterface, QueryRunner} from "typeorm";

export class createAccessoryLog1605326757141 implements MigrationInterface {
    name = 'createAccessoryLog1605326757141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accessory_log" ("uuid" varchar PRIMARY KEY NOT NULL, "accessoryUuid" varchar(36) NOT NULL, "accessoryType" varchar(500) NOT NULL, "value" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "accessory_log"`);
    }

}
