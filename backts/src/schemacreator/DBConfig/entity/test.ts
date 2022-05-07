
        import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

        @Entity()
        export class test {
        
            
        @PrimaryGeneratedColumn()
        pk: number;
    
            
            
        @Column()
        abc: number;
    

        @Column()
        def: number;
    

        @Column()
        ijk: number;
    
            
        }
    