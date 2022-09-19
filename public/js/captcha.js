/* eslint-disable */
export const recaptcha = async () => {
  //   e.preventDefault();
  try {
    console.log('fuck');
    const token = await grecaptcha.ready(async () => {
      return token = await grecaptcha.execute(
        '6LcDOvYhAAAAAI4sz4fAyXerLBWEUq4_eKJrChsl'
      );
    
      // Add your logic to submit to your backend server here.
    
    });
    console.log('q');
    console.log( token);
    console.log('t');
    return await token;
  } catch (e) {
    console.log(e.message);
  }
};
