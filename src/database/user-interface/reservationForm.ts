import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "ReservationForm" })
export class ReservationForm extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;
  @Column({ name: "fields", nullable: true, type: "jsonb" })
  fields: string;
  @Column({ name: "serviceId", nullable: true })
  serviceId: string;
  @Column({ name: "serviceName", nullable: true })
  serviceName: string;
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
