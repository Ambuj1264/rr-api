import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "Services" })
export class Services extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;
  @Column({ name: "serviceName", nullable: true })
  serviceName: string;
  @Column({ name: "altName", nullable: true })
  altName: string;
  @Column({ name: "serviceDescription", nullable: true })
  serviceDescription: string;
  @Column({ name: "serviceImageName", nullable: true })
  serviceImageName: string;
  @Column({ name: "isDeleted", nullable: true, default: false })
  isDeleted: boolean;
  @Column({ name: "priority", nullable: true, default: false })
  priority: boolean;
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
