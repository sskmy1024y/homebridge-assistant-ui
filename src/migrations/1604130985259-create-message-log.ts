import { MigrationInterface, QueryRunner } from 'typeorm'

export class createMessageLog1604130985259 implements MigrationInterface {
  name = 'createMessageLog1604130985259'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message_log" ("uuid" varchar PRIMARY KEY NOT NULL, "sender" varchar(500) NOT NULL, "message" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "message_log"`)
  }
}
