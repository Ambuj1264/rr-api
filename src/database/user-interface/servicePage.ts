import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm";
  @Entity({ name: "ServicePageDetails" })
  export class ServicePageDetails extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;
  
    @Column({ name: "serviceBanner", nullable: true })
    serviceBanner: string;
  
    @Column({ name: "serviceDescription", nullable: true })
    serviceDescription: string;
    @Column({ name: "isDeleted", default: false })
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
  