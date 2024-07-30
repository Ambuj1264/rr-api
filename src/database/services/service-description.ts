import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "ServiceDescription" })
export class ServiceDescription extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "serviceName", nullable: true })
  serviceName: string;
  @Column({ name: "serviceSubheading", nullable: true })
  serviceSubheading: string;
  @Column({ name: "serviceDescription", nullable: true })
  serviceDescription: string;

  @Column({ name: "serviceButton", nullable: true })
  serviceButton: string;

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
