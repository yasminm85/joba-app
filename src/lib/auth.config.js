export const authConfig = {
  pages: {
    signIn: "/", 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

      if (isMaintenance) return true;

      return true;
    },
  },
  providers: [],
};

