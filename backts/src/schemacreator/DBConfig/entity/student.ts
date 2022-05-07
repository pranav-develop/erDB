
        import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

        @Entity()
        export class student {
        
            
            
            
        @PrimaryColumn()
        id: number;
    

        @Column()
        name: string;
    

        @Column()
        college: string;
    

        @Column()
        mobile: string;
    
            
        }
    