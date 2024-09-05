import { z } from 'zod';

const signInValidation = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty('Password cannot be empty'),
})

const requestCodeValidation = z.object({
    email: z.string().email().nonempty(), 
})

const resetPasswordValidation = z.object({
    email: z.string().email().nonempty(),
    resetCode: z.string().nonempty(),
    password: z.string().nonempty('Password cannot be empty'), 
})

const ProfileValidation = z.object({
    name: z.string().nonempty(),
    charityRegNumber: z.string().nonempty(),
    email: z.string().nonempty(),
    interests: z.string().nonempty(),
    description: z.string().nonempty(), 
}) 

const BankValidation = z.object({
    bankAccountName: z.string().nonempty(),
    bankAccountNumber: z.string().nonempty(),
    bankName: z.string().nonempty(),
    sortCode: z.string().nonempty(), 
})
 
export { 
    signInValidation, 
    resetPasswordValidation,
    requestCodeValidation,
    ProfileValidation,
    BankValidation
};
