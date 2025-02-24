export const translations: Record<Language, { [key: string]: string }> = {
  en: {
    language: "Language",
    //navegation word
    Home: "Home",
    Orders: "Orders",
    Containers: "Containers",
    Services: "Services",
    Blogs: "Blogs",
    About_us: "About us",
    Information: "Information",
    Contact_Us: "Contact Us",
    dashboard: "Dashboard",
    requests: "Requests",
    users: "Users",
    accounts: "Accounts",
    profile: "Profile",
    settings: "Settings",
    My_Actions: "My Actions",
    //login  word
    Login: "Log in",
    login_des: "Log in to your account to continue your journey",
    Dont_have_an_account: "Dont have an account?",
    Sign_in: "Sign in",
    Forgot_password: "Forgot your password?",
    Logout: "Logout",
    //signup word
    Register: "Register",
    Signup: "Sign up",
    Signup_step1: "Choose the account type that suits you best",
    Signup_step2_private: "Sign up as private account",
    Signup_step2_company: "انشاء حساب تجاري",
    Full_name: "Full name",
    name: "name",
    Password: "Password",
    Email: "Email",
    company: "Company",
    company_des: "(For businesses and organizations)",
    private: "Private",
    private_des: "(For individuals)",
    Company_name: "Company name",
    //action word
    Back: "Back",
    Admin: "Admin",
    Track: "Track",
    Search: "Search",
    Enter_your_tracking_number: "Enter your tracking number",
    //hero section
    hero_title: "Simplify Your Car Import Journey!",
    hero_des:
      "Comprehensive services to import and ship cars from Canada to Oman",
  },
  ar: {
    language: "اللغة",
    //navegation word
    Home: "الرئيسية",
    Orders: "الطلبات",
    Containers: "حاويات",
    Services: "الخدمات",
    Blogs: "المقالات",
    About_us: "من نحن",
    Information: "معلومات",
    Contact_Us: "تواصل معنا",
    Requests: "الطلبات",
    Users: "المستخدمون",
    Accounts: "الحسابات",
    profile: "الملف الشخصي",
    Settings: "الإعدادات",
    My_Actions: "طلباتي",
    Dashboard: "لوحة التحكم",
    //login  word
    Login: "تسجيل الدخول",
    login_des: "سجل الدخول الى حسابك لاكمال",
    Dont_have_an_account: "ليس لديك حساب؟",
    Sign_in: "تسجيل الدخول",
    Logout: "تسجيل الخروج",
    //signup word
    Register: "انشاء حساب",
    Signup: "انشاء حساب",
    Signup_step1: "اختر نوع الحساب الذي تفضل",
    Signup_step2_private: "انشاء حساب شخصي",
    Signup_step2_company: "انشاء حساب تجاري",
    Password: "كلمة المرور",
    Forgot_password: "هل نسيت كلمة المرور؟",
    Full_name: "الاسم الكامل",
    name: "الاسم",
    Email: "البريد الالكتروني",
    company: "شركة",
    company_des: "(للانشطة التجارية والمنظمات)",
    private: "شخصي",
    private_des: "(للشراء الشخصي)",
    Company_name: "اسم الشركة",
    //actions word
    Back: "رجوع",
    Admin: "المسؤول",
    Track: "مراقبة",
    Search: "بحث",
    Enter_your_tracking_number: "ادخل رقم الشحنة",
    //hero section
    hero_title: "عنوان",
    hero_des: "وصف",
  },
};

export type Language = "en" | "ar";
