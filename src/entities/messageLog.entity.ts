import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('message-log')
export class MessageLog {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({ length: 500 })
  sender: string

  @Column('text')
  message: string

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date
}
