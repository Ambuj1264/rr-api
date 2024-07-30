import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "Footer" })
export class Footer extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "footerLogo", nullable: true })
  footerLogo: string;

  @Column({ name: "footerDescription", nullable: true })
  footerDescription: string;

  @Column({ name: "facebook", nullable: true })
  facebook: string;

  @Column({ name: "twitter", nullable: true })
  twitter: string;

  @Column({ name: "instagram", nullable: true })
  instagram: string;
  @Column({ name: "linkedin", nullable: true })
  linkedin: string;

  @Column({ name: "isDeleted", default: false, nullable: true })
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
