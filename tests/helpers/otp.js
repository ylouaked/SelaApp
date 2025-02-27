
export async function otp(page, OTP) {

   let i = 0;

     for (const otp of OTP) {
        const otpIndex = `#otp${i}`;
        await page.locator(otpIndex).fill(otp); 
       i++;
       console.log('otp',i)

        }
 
 
}
