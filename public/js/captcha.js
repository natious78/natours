/* eslint-disable */
export const recaptcha = async () => {
  //   e.preventDefault();
  try {
    const token = await grecaptcha.ready(async () => {
      return token = await grecaptcha.execute(
        '6LcDOvYhAAAAAI4sz4fAyXerLBWEUq4_eKJrChsl'
      );
    
      // Add your logic to submit to your backend server here.
    
    });
    return await token;
  } catch (e) {
  }
};
