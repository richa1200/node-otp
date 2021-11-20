const subject_mail = "OTP: For Login"



const message = (otp) =>{
    return `Dear User, \n\n` 
    + 'Your One Time Password for Login is : \n\n'
    + `${otp}\n\n`
    + 'This is a auto-generated email.\n\n'
    + 'Regards,\n'
    + 'Richa Gupta\n\n'
}

module.exports = {subject_mail, message};