import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class PasswordService {
	private salt: string;

	constructor() {
		this.salt = bcrypt.genSaltSync(Number.parseInt(process.env.BCRYPT_SALT_ROUNDS))
	}

	hash(password: string): string {
		return bcrypt.hashSync(password, this.salt)
	}

	compare(plainPassword: string, hash: string): boolean {
		return bcrypt.compareSync(plainPassword, hash);
	}
}
