import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('accessory-log')
export class AccessoryLog {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({ length: 36 })
  accessoryUuid: string

  @Column({ length: 500 })
  accessoryType: string

  @Column('text')
  value: string

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date
}
