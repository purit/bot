import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // ...
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnChat = nextUrl.pathname.startsWith('/');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isApiRoute = nextUrl.pathname.startsWith('/api/');

      // อนุญาตให้เข้าถึง Register และ Login เสมอ
      if (isOnRegister || isOnLogin) {
        return true;
      }

      // สำหรับ API Routes (/api/) ต้อง Login เท่านั้น
      if (isApiRoute) {
        return isLoggedIn;
      }

      // สำหรับหน้า Chat (และหน้าอื่นๆ ที่ไม่ใช่ Register/Login/API)
      if (isOnChat) {
        return isLoggedIn; // ต้อง Login เพื่อเข้าถึง
      }

      // กรณีอื่นๆ (อาจจะไม่จำเป็น แต่เพื่อความชัดเจน)
      return true;
    },
  },
} satisfies NextAuthConfig;
