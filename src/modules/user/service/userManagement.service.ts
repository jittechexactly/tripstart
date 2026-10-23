import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../repositories/user.repository";
import { Repository } from "typeorm";
import { randomInt } from "crypto";

@Injectable()
export class UserManagementService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    public async create(data: any): Promise<User> {
        const otp = randomInt(0, 1_000_000).toString().padStart(6, '0');

        const user = this.userRepository.create({
            name: data.name,
            email: data.email,
            verificationOtp: otp,
            otpExpiredAt: new Date(Date.now() + 10 * 60_000),
        });

        return await this.userRepository.save(user);
    }

    public async update(id: string, data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');

        this.userRepository.merge(user, data);
        return this.userRepository.save(user);
    }

    public async findById(id: number) {

    }

    public async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email: email }
        })
    }

    public async findByUserId(userId: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id: userId }
        })
    }
}