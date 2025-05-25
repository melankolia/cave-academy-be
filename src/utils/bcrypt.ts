import bcrypt from 'bcrypt';

class Bcrypt {
    private saltRounds: number;

    constructor(saltRounds: number = parseInt(process.env.SALT_ROUNDS)) {
        this.saltRounds = saltRounds;
    }
    
    async hashPassword(plainPassword: string) {
        try {
            const hashedPassword = await bcrypt.hash(plainPassword, this.saltRounds);
        
            return hashedPassword;
          } catch (error) {
            console.error('Error hashing password:', error);
            throw error;
          }
    }

    async verifyPassword(plainPassword: string, hashedPassword: string) {
        try {
          const match = await bcrypt.compare(plainPassword, hashedPassword);
          return match;
        } catch (error) {
          console.error('Error verifying password:', error);
          throw error;
        }
      };

}

export default Bcrypt;