import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "Packages" })
export class Packages extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "service", nullable: true })
  service: string;
  @Column({ name: "superDeluxePackagePrice", nullable: true })
  superDeluxePackagePrice: number;
  @Column({ name: "deluxePackagePrice", nullable: true })
  deluxePackagePrice: number;
  @Column({ name: "basicPackagePrice", nullable: true })
  basicPackagePrice: number;

  @Column({ name: "items", nullable: true, type: "jsonb" })
  items: string;
  @Column({ name: "basic", nullable: true })
  basic: boolean;
  @Column({ name: "deluxe", nullable: true })
  deluxe: boolean;
  @Column({ name: "superDeluxe", nullable: true })
  superDeluxe: boolean;
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
