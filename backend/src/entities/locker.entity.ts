import { Column, Entity, Generated, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Group } from './group.entity';
import { Location } from './location.entity';
import { LockerInstance } from './locker-instance.entity';
import { QRCode } from './qr-code.entity';
import { Report } from './report.entity';

export enum LockerAvailability {
    UNREGISTERED = 'UNREGISTERED',
    AVAILABLE = 'AVAILABLE',
    MAINTENANCE = 'MAINTENANCE',
    DELETE = 'DELETE',
    WARNING = 'WARNING',
}

@Entity()
export class Locker {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'uuid',
        unique: true,
    })
    @Generated('uuid')
    serialNumber: string;

    @Column({
        nullable: true,
    })
    name: string;

    @Column({
        nullable: true,
    })
    number: string;

    @Column({
        type: 'enum',
        enum: LockerAvailability,
        default: LockerAvailability.UNREGISTERED,
    })
    availability: LockerAvailability;

    @Column({
        nullable: true,
    })
    locationID: number;

    @ManyToOne(type => Location, location => location.lockers, { onDelete: 'SET NULL' })
    @JoinColumn({
        name: 'locationID',
    })
    location: Location;

    @OneToMany(type => LockerInstance, lockerInstance => lockerInstance.locker)
    lockerInstances: LockerInstance[];

    @ManyToMany(type => Group, group => group.lockers)
    groups: Group[];

    @OneToMany(type => QRCode, qrCode => qrCode.locker, { nullable: true })
    qrCodes: QRCode[];

    @OneToMany(type => Report, report => report.locker)
    reports: Report[];

}
