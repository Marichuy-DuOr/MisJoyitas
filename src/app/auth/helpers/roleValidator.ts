import { User } from 'src/app/shared/models/user';

export class RoleValidator {
    isClient(user: User): boolean {
        return user.role === 'CLIENT';
    }
    isAdmin(user: User): boolean {
        return user.role === 'ADMIN';
    }
}
