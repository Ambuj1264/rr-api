import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "User" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "email", unique: true })
  email: string;
  @Column({ name: "firstName", nullable: true })
  firstName: string;
  @Column({ name: "lastName", nullable: true })
  lastName: string;

  @Column({ name: "mobileNumber", nullable: true })
  mobileNumber: string;

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
