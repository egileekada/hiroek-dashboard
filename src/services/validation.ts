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


const EventValidation = z.object( 
    {
        name: z.string().nonempty("Required"),
        description: z.string().nonempty("Required"), 
        category: z.string().nonempty("Required"),
        privacy: z.string().nonempty("Required"),
        eventEndDate: z.any(),
        endTime: z.any(),
        fundRaiser: z.any(),
        eventTicket: z.any(),
        address: z.string().nonempty("Required"),
        signUpLimit: z.string()
    }
)


const EditEventValidation = z.object({ 
    name: z.string(),
    description: z.string(), 
    category: z.string(),
    privacy: z.string(),
    eventEndDate: z.string(),
    endTime: z.string(),
    fundRaiser: z.any(),
    eventTicket: z.any(),
    address: z.string(),
    signUpLimit: z.any()
    // communityId: z.string().nonempty("Required"),  
})

const BankValidation = z.object({
    bankAccountName: z.string().nonempty("Required"),
    bankAccountNumber: z.string().nonempty("Required"),
    bankName: z.string().nonempty("Required"),
    sortCode: z.string().nonempty("Required"),
    pin: z.string().nonempty("Required"),
})

const BankPinValidation = z.object({
    oldPin: z.string(),
    newPin: z.string().nonempty("Required"),
})

const CommunityValidation = z.object({
    name: z.string().nonempty("Required"),
    description: z.string().nonempty("Required"),
    privacy: z.string().nonempty("Required"),
})


const CommunityPostValidation = z.object({
    content: z.string().nonempty("Required"),
    communityId: z.string().nonempty("Required"), 
})

export {
    signInValidation,
    resetPasswordValidation,
    requestCodeValidation,
    ProfileValidation,
    BankValidation,
    EventValidation,
    EditEventValidation,
    BankPinValidation,
    CommunityValidation,
    CommunityPostValidation
};
