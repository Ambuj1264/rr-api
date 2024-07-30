import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "Login" })
export class Login extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "userId", nullable: true })
  userId: string;

  @Column({ name: "email", unique: true })
  email: string;

  @Column({ name: "password", nullable: true })
  password: string;

  @Column({ name: "isDeleted", nullable: true, default: false })
  isDeleted: boolean;

  @Column({ name: "isActive", default: true })
  isActive: boolean;

  @Column({ name: "DatePwChanged", default: null })
  datePwChanged: Date;
  @Column({ name: "firstName", nullable: true })
  firstName: string;
  @Column({ name: "lastName", nullable: true })
  lastName: string;

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
