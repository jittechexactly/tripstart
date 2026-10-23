import { User } from "../../modules/user/repositories/user.repository";

export class UserResource {
    id!: string;
    name!: string;
    email!: string;
    verified!: boolean;

    static from(user: User): UserResource {
        const resource = new UserResource();
        resource.id = user.id;
        resource.name = user.name;
        resource.email = user.email;
        resource.verified = user.verified;
        return resource;
    }

    static collection(users: User[]): UserResource[] {
        return users.map((u) => UserResource.from(u));
    }
}