import connectDB from '@/config/datebase';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      } 
    })
    ],
    callbacks: {
      // invoked on successful signing
      async signIn({profile}){

        await connectDB()

        const userExists = await User.findOne({email: profile.email})
        if(!userExists){
          // truncate user name if too long
          const username = profile.name.slice(0, 20);
          try {
            await User.create({
              email: profile.email,
              username,
              image: profile.picture
            });
          } catch (error) {
            console.log(error)
          }
        
          console.log("hash")
        }
        return true
      },
      // modifies the session object
      async session({session}){
        const user = await User.findOne({ email: session.user.email })
        
        session.user.id = user._id.toString() 

        return session;
      }
    }
}