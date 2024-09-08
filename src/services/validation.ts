import { z } from 'zod';

const signInValidation = z.object({
    email: z.string().email().nonempty('Required'),
    password: z.string().nonempty('Password cannot be empty'),
})

const requestCodeValidation = z.object({
    email: z.string().email().nonempty("Required"), 
})

const resetPasswordValidation = z.object({
    email: z.string().email().nonempty("Required"),
    resetCode: z.string().nonempty("Required"),
    password: z.string().nonempty('Password cannot be empty'), 
})

const ProfileValidation = z.object({
    name: z.string().nonempty("Required"),
    charityRegNumber: z.string().nonempty("Required"), 
    // interests: z.string().nonempty("Required"),
    description: z.string().nonempty("Required"), 
}) 

const BankValidation = z.object({
    bankAccountName: z.string().nonempty("Required"),
    bankAccountNumber: z.string().nonempty("Required"),
    bankName: z.string().nonempty("Required"),
    sortCode: z.string().nonempty("Required"), 
})
 
export { 
    signInValidation, 
    resetPasswordValidation,
    requestCodeValidation,
    ProfileValidation,
    BankValidation
};
