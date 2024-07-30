import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "Reservation" })
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;
  @Column({ name: "serviceId", nullable: true })
  serviceId: string;
  @Column({ name: "serviceName", nullable: true })
  serviceName: string;
  @Column({ name: "packages", nullable: true, type: "jsonb" })
  packages: string;
  @Column({ name: "reservationForm", nullable: true, type: "jsonb" })
  reservationForm: string;
  @Column({ name: "packagePrice", nullable: true })
  packagePrice: string;
  @Column({ name: "packageType", nullable: true })
  packageType: string;
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
