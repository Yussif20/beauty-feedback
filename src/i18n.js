import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Authentication
      login: 'Login',
      register: 'Register',
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      password: 'Password',
      confirm_password: 'Confirm Password',
      dob: 'Date of Birth',
      is_admin: 'Register as Admin',
      name_required: 'First and last name are required',
      invalid_email: 'Invalid email address',
      password_short: 'Password must be at least 6 characters',
      password_mismatch: 'Passwords do not match',
      dob_required: 'Date of birth is required',
      registration_failed: 'Registration failed. Please try again.',
      fill_all_fields: 'Please fill all fields',
      login_failed: 'Login failed. Please check your credentials.',
      have_account: 'Already have an account?',
      no_account: 'Don’t have an account?',

      // Navigation
      home: 'Home',
      search: 'Search',
      chat: 'Chat',
      profile: 'Profile',
      admin_dashboard: 'Admin Dashboard',
      log_out: 'Log Out',

      // Posts and Comments
      new_post: 'What’s on your mind?',
      choose_image: 'Choose Image',
      no_file_chosen: 'No file chosen',
      post: 'Post',
      post_created: 'Post created successfully',
      like: 'Like',
      dislike: 'Dislike',
      add_comment: 'Add a comment',
      comment: 'Comment',
      comment_added: 'Comment added successfully',
      by: 'By',
      empty_comment: 'Comment cannot be empty',
      comment_failed: 'Failed to add comment. Please try again.',
      post_not_found: 'Post not found. Redirecting to home...',
      fetch_post_failed: 'Failed to load post. Redirecting to home...',
      loading: 'Loading...',

      // Chat
      type_message: 'Type a message',
      send: 'Send',
      message_sent: 'Message sent successfully',
      empty_message: 'Message cannot be empty',
      fetch_messages_failed: 'Failed to fetch messages. Please try again.',
      send_message_failed: 'Failed to send message. Please try again.',

      // Profile
      bio: 'Bio',
      bio_placeholder: 'Tell us about yourself',
      save_bio: 'Save Bio',
      your_posts: 'Your Posts',
      no_posts: 'No posts yet',
      admin: 'Admin',
      user: 'User',
      bio_updated: 'Bio updated successfully',

      // Admin Dashboard
      pending_posts: 'Pending Posts',
      approve: 'Approve',
      reject: 'Reject',
      post_approved: 'Post approved successfully',
      post_rejected: 'Post rejected successfully',
      no_pending_posts: 'No pending posts',
      action_failed: 'Action failed. Please try again.',
    },
  },
  ar: {
    translation: {
      // Authentication
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      first_name: 'الاسم الأول',
      last_name: 'الاسم الأخير',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirm_password: 'تأكيد كلمة المرور',
      dob: 'تاريخ الميلاد',
      is_admin: 'التسجيل كمسؤول',
      name_required: 'الاسم الأول والأخير مطلوبان',
      invalid_email: 'البريد الإلكتروني غير صحيح',
      password_short: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      password_mismatch: 'كلمات المرور غير متطابقة',
      dob_required: 'تاريخ الميلاد مطلوب',
      registration_failed: 'فشل التسجيل. حاول مرة أخرى.',
      fill_all_fields: 'يرجى ملء جميع الحقول',
      login_failed: 'فشل تسجيل الدخول. تحقق من بياناتك.',
      have_account: 'لديك حساب بالفعل؟',
      no_account: 'ليس لديك حساب؟',

      // Navigation
      home: 'الرئيسية',
      search: 'بحث',
      chat: 'دردشة',
      profile: 'الملف الشخصي',
      admin_dashboard: 'لوحة تحكم المسؤول',
      log_out: 'تسجيل الخروج',

      // Posts and Comments
      new_post: 'ما الذي يدور في ذهنك؟',
      choose_image: 'اختر صورة',
      no_file_chosen: 'لم يتم اختيار ملف',
      post: 'نشر',
      post_created: 'تم إنشاء المنشور بنجاح',
      like: 'إعجاب',
      dislike: 'عدم إعجاب',
      add_comment: 'أضف تعليقًا',
      comment: 'تعليق',
      comment_added: 'تم إضافة التعليق بنجاح',
      by: 'بواسطة',
      empty_comment: 'التعليق لا يمكن أن يكون فارغًا',
      comment_failed: 'فشل إضافة التعليق. حاول مرة أخرى.',
      post_not_found: 'المنشور غير موجود. يتم إعادة التوجيه إلى الرئيسية...',
      fetch_post_failed: 'فشل تحميل المنشور. يتم إعادة التوجيه إلى الرئيسية...',
      loading: 'جارٍ التحميل...',

      // Chat
      type_message: 'اكتب رسالة',
      send: 'إرسال',
      message_sent: 'تم إرسال الرسالة بنجاح',
      empty_message: 'الرسالة لا يمكن أن تكون فارغة',
      fetch_messages_failed: 'فشل جلب الرسائل. حاول مرة أخرى.',
      send_message_failed: 'فشل إرسال الرسالة. حاول مرة أخرى.',

      // Profile
      bio: 'السيرة الذاتية',
      bio_placeholder: 'أخبرنا عن نفسك',
      save_bio: 'حفظ السيرة',
      your_posts: 'منشوراتك',
      no_posts: 'لا توجد منشورات بعد',
      admin: 'مسؤول',
      user: 'مستخدم',
      bio_updated: 'تم تحديث السيرة بنجاح',

      // Admin Dashboard
      pending_posts: 'المنشورات المعلقة',
      approve: 'الموافقة',
      reject: 'الرفض',
      post_approved: 'تمت الموافقة على المنشور بنجاح',
      post_rejected: 'تم رفض المنشور بنجاح',
      no_pending_posts: 'لا توجد منشورات معلقة',
      action_failed: 'فشل الإجراء. حاول مرة أخرى.',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV === 'development',
  dir: (lng) => (lng === 'ar' ? 'rtl' : 'ltr'),
});

export default i18n;