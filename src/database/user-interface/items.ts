import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm";
  @Entity({ name: "Items" })
  export class Items extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;
  
    @Column({ name: "itemName", nullable: true })
    itemName: string;
  
    @Column({ name: "basicQuantity", nullable: true })
    basicQuantity: number;
    @Column({ name: "deluxeQuantity", nullable: true })
    deluxeQuantity: number;
    @Column({ name: "superDeluxeQuantity", nullable: true })
    superDeluxeQuantity: number;
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