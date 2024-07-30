
import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm";
  @Entity({ name: "Slots" })
  export class Slots extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;
    @Column({ name: "startDate", nullable: true })
    startDate: string;
    @Column({ name: "startTime", nullable: true })
    startTime: string;
    @Column({ name: "endTime", nullable: true })
    endTime: string;
    @Column({ name: "isDeleted", nullable: true, default: false })
    isDeleted: boolean;
    @Column({
      name: "createdAt",
      type: "timestamptz",
      default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
    @Column({
      name: "updatedAt",
      type: "timestamptz",
      default: () => "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
  }