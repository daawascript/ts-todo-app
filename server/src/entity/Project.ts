/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Todo from './Todo';

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  deadline: Date;

  @OneToMany(() => Todo, (todo) => todo.project)
  todos: Todo[];
}
