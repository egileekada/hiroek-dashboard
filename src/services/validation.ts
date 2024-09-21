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
    confirmpassword: z.string().nonempty('Password cannot be empty'), 
})

const ProfileValidation = z.object({
    name: z.string().nonempty("Required"),
    charityRegNumber: z.string().nonempty("Required"), 
    // interests: z.string().nonempty("Required"),
    description: z.string().nonempty("Required"), 
}) 


const EventValidation = z.object({
    name: z.string().nonempty("Required"), 
    description: z.string().nonempty("Required"), 
    fundraisingGoal: z.string().nonempty("Required"), 
    // interest: z.string().nonempty("Required"), 
    organization: z.string().nonempty("Required"), 
    category: z.string().nonempty("Required"), 
    privacy: z.string().nonempty("Required"), 
    eventEndDate: z.string().nonempty("Required"), 
    endTime: z.string().nonempty("Required"), 
    address: z.string().nonempty("Required"), 
    signUpLimit: z.string().nonempty("Required"), 
    // communityId: z.string().nonempty("Required"),  
}) 


const EditEventValidation = z.object({
    name: z.string(), 
    description: z.string(), 
    fundraisingGoal: z.any(), 
    // interest: z.string(), 
    organization: z.string(), 
    category: z.string(), 
    privacy: z.string(), 
    eventEndDate: z.string(), 
    endTime: z.string(), 
    address: z.string(), 
    signUpLimit: z.any(), 
    // communityId: z.string().nonempty("Required"),  
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
    BankValidation,
    EventValidation,
    EditEventValidation
};
