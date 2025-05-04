import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      logo:"Beauty Feedback",
      welcome: 'Welcome to Beauty Feedback',
      home: 'Home',
      login: 'Login',
      signup: 'Sign Up',
      profile: 'Profile',
      search: 'Search',
      admin: 'Admin Dashboard',
      light: 'Light Mode',
      dark: 'Dark Mode',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      login_required: 'Please log in to view this page',
      no_bio: 'No bio available',
      your_posts: 'Your Posts',
      search_placeholder: 'Search for products or posts',
      approve: 'Approve',
      reject: 'Reject',
      like: 'Like',
      dislike: 'Dislike',
      comment: 'Comment',
      add_comment: 'Add a comment',
      chat: 'Chat',
      send_message: 'Send Message',
    },
  },
  ar: {
    translation: {
      logo:"تقييم الجمال",
      welcome: 'مرحبًا بك في منصة تقييم منتجات التجميل',
      home: 'الرئيسية',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      profile: 'الملف الشخصي',
      search: 'بحث',
      admin: 'لوحة التحكم',
      light: 'الوضع الفاتح',
      dark: 'الوضع الداكن',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      name: 'الاسم',
      login_required: 'يرجى تسجيل الدخول لعرض هذه الصفحة',
      no_bio: 'لا يوجد وصف شخصي',
      your_posts: 'منشوراتك',
      search_placeholder: 'ابحث عن منتجات أو منشورات',
      approve: 'الموافقة',
      reject: 'الرفض',
      like: 'إعجاب',
      dislike: 'عدم الإعجاب',
      comment: 'تعليق',
      add_comment: 'أضف تعليقًا',
      chat: 'الدردشة',
      send_message: 'إرسال رسالة',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;