
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("csv", { schema: "coupon" })
export class Controller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: "csv", nullable: false, length: 100 })
  csv: string | null;
}