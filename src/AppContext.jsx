import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

const translations = {
  en: {
    nav: {
      home: "Home",
      postProblem: "Post Problem",
      contact: "Contact Us",
      marketplace: "Marketplace",
      weather: "Weather",
      dashboard: "Dashboard",
      login: "Login",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
      language: "Language",
      english: "English",
      hindi: "हिंदी",
    },
    hero: {
      badge: "India's Farming Platform",
      titleLine1: "Grow Smarter,",
      titleLine2: "Sell Better",
      description:
        "AgriConnect helps farmers post their problems and connect directly with agronomists. It bridges the gap between farmers, buyers, and experts.",
      joinButton: "Join as Farmer 🌾",
      aboutButton: "About Us",
      contactButton: "Contact Us 📞",
    },
    stats: [
      { value: "50K+", label: "Farmers Connected" },
      { value: "120+", label: "Crop Varieties" },
      { value: "28", label: "States Covered" },
      { value: "₹2Cr+", label: "Trade Volume" },
    ],
    features: [
      {
        icon: "🛒",
        title: "Farmer Marketplace",
        desc: "Buy and sell crops directly. No middlemen, better prices for farmers and buyers alike.",
        color: "bg-leaf-100 text-leaf-700",
      },
      {
        icon: "🌦️",
        title: "Weather Advisory",
        desc: "Real-time weather updates and crop-specific advisories to protect your harvest.",
        color: "bg-earth-100 text-earth-700",
      },
      {
        icon: "📊",
        title: "Farm Dashboard",
        desc: "Track your crops, manage inventory, and monitor your farm's performance in one place.",
        color: "bg-amber-100 text-amber-700",
      },
      {
        icon: "🤝",
        title: "Expert Connect",
        desc: "Get guidance from agricultural experts and connect with fellow farmers nationwide.",
        color: "bg-emerald-100 text-emerald-700",
      },
    ],
    steps: [
      { step: "01", icon: "📝", title: "Register", desc: "Sign up as a farmer, buyer, or expert in minutes." },
      { step: "02", icon: "🌾", title: "List or Browse", desc: "Post your crops or browse the marketplace for fresh produce." },
      { step: "03", icon: "💰", title: "Connect & Trade", desc: "Connect directly with buyers and get paid fairly." },
    ],
    testimonials: [
      {
        name: "Ramesh Patel",
        location: "Gujarat",
        text: "AgriConnect helped me sell my wheat directly to buyers at 30% better price than the mandi.",
        emoji: "👨‍🌾",
      },
      {
        name: "Sunita Devi",
        location: "Punjab",
        text: "The weather advisory saved my mustard crop last season. I got timely alerts and took action.",
        emoji: "👩‍🌾",
      },
      {
        name: "Mohan Singh",
        location: "Rajasthan",
        text: "The farm dashboard makes it so easy to track everything. I feel in control of my farm now.",
        emoji: "🧑‍🌾",
      },
    ],
    farmerDashboard: {
      welcome: "Welcome back,",
      ready: "Ready to make your farm thrive today?",
      quickStats: [
        { value: "0", label: "Active Problems", color: "bg-leaf-50 text-leaf-600" },
        { value: "0", label: "Expert Responses", color: "bg-blue-50 text-blue-600" },
        { value: "24°C", label: "Current Temp", color: "bg-yellow-50 text-yellow-600" },
        { value: "Good", label: "Soil Health", color: "bg-green-50 text-green-600" },
      ],
      quickActions: [
        {
          icon: "🚨",
          title: "Post Problem",
          desc: "Get expert help for your farming issues",
          path: "/post-problem",
          color: "bg-red-100 text-red-700",
        },
        {
          icon: "📞",
          title: "Contact Support",
          desc: "Reach out to our support team",
          path: "/contact",
          color: "bg-blue-100 text-blue-700",
        },
        {
          icon: "🌦️",
          title: "Weather Update",
          desc: "Check today's weather forecast",
          path: "/weather",
          color: "bg-yellow-100 text-yellow-700",
        },
        {
          icon: "📊",
          title: "My Problems",
          desc: "View your posted problems and responses",
          path: "/my-problems",
          color: "bg-purple-100 text-purple-700",
        },
      ],
      noActivity: "No recent activity yet.",
      startPost: "Start by posting your first problem!",
      logoutButton: "Logout 🚪",
    },
    login: {
      headingLogin: "Welcome Back!",
      headingRegister: "Join AgriConnect",
      loginSubtext: "Login to your account",
      registerSubtext: "Create your free account today",
      roleTitle: "I am a...",
      fields: {
        name: "Full Name *",
        email: "Email Address *",
        phone: "Phone Number",
        password: "Password *",
        passwordHint: "Must contain uppercase, lowercase, number, and special character (min 8 chars)",
        forgotPassword: "Forgot Password?",
        loginButton: "Login to Account 🌾",
        registerButton: "Create Account 🌱",
      },
      placeholders: {
        name: "Ramesh Patel",
        email: "farmer@example.com",
        phone: "+91 98765 43210",
        password: "••••••••",
      },
      messages: {
        fillRequired: "Please fill all required fields.",
        loginFill: "Please enter email and password.",
        invalidCredentials: "Invalid email or password.",
        accountCreated: "Account created successfully as {role}! Please login.",
        emailRegistered: "Email already registered. Please login.",
        serverError: "Something went wrong. Is the server running?",
        passwordUpper: "Password must contain at least one uppercase letter.",
        passwordLower: "Password must contain at least one lowercase letter.",
        passwordNumber: "Password must contain at least one number.",
        passwordSpecial: "Password must contain at least one special character.",
        passwordLength: "Password must be at least 8 characters long.",
      },
      roles: [
        { value: "farmer", label: "Farmer", icon: "👨‍🌾", desc: "Grow & sell crops" },
        { value: "buyer", label: "Buyer", icon: "🛒", desc: "Buy fresh produce" },
        { value: "agronomist", label: "Agronomist", icon: "🔬", desc: "Provide expert advice" },
        { value: "vendor", label: "Vendor", icon: "🏪", desc: "Supply & distribute" },
      ],
    },
    contact: {
      headerTitle: "Get In Touch",
      headerSubtitle: "We're here to help you grow better",
      emailLabel: "Email",
      phoneLabel: "Phone",
      supportLabel: "Support Hours",
      addressLabel: "Address",
      form: {
        name: "Name *",
        email: "Email *",
        subject: "Subject *",
        message: "Message *",
        subjectPlaceholder: "What's this about?",
        messagePlaceholder: "Tell us how we can help you...",
        sendButton: "Send Message 📤",
        sending: "Sending...",
      },
      messages: {
        required: "Please fill all required fields.",
        success: "Message sent successfully! We'll get back to you soon.",
        error: "Something went wrong. Please try again.",
      },
      contactDetails: {
        email: "support@agriconnect.in",
        phone: "+91 1800-123-4567",
        hours: "Mon-Fri: 9AM-6PM IST",
        address: "New Delhi, India",
      },
      backHome: "← Back to Home",
    },
    about: {
      headerTitle: "About AgriConnect",
      headerDesc: "AgriConnect helps farmers post their problems and connect directly with agronomists. The platform supports better farm decisions through expert guidance, a marketplace, and weather-aware insights.",
      whoTitle: "Who We Are",
      whoText: "AgriConnect is built to empower small farmers by giving them a trusted place to share crop issues, receive agronomist advice, and connect with buyers.",
      items: [
        { title: "Post Your Problem", text: "Share your farm challenge and get guidance from experts." },
        { title: "Connect to Agronomists", text: "Talk to agronomists who understand your soil, crop and climate." },
        { title: "Grow with Confidence", text: "Use real insights to take action and improve your yield." },
      ],
      missionTitle: "Our Mission",
      missionText: "We want every farmer to feel supported and connected. AgriConnect brings expert help, market access, and practical tools to farming communities across India.",
      contactButton: "Contact Us 📞",
    },
    profile: {
      title: "My Profile",
      name: "Name:",
      email: "Email:",
      role: "Role:",
      overview: "This is a simple profile overview page. You can expand it later with more details.",
      noUser: "No user is currently logged in.",
      backHome: "Back to Home",
    },
    settings: {
      title: "Settings",
      description: "This is a placeholder settings page. Add preference controls, password change, and account options here.",
      sections: [
        { title: "Account Preferences", text: "Manage your account settings and notifications." },
        { title: "Privacy", text: "Configure your privacy and data settings." },
      ],
      backHome: "Back to Home",
    },
    postProblem: {
      title: "Post Your Problem",
      subtitle: "Get expert advice from agricultural specialists",
      labels: {
        problemTitle: "Problem Title *",
        category: "Category",
        urgency: "Urgency Level",
        description: "Detailed Description *",
      },
      options: {
        crop: "Crop Disease",
        soil: "Soil Issues",
        pest: "Pest Control",
        irrigation: "Irrigation",
        weather: "Weather Related",
        equipment: "Equipment",
        other: "Other",
        low: "Low - Can wait a few days",
        medium: "Medium - Need help soon",
        high: "High - Urgent assistance needed",
        critical: "Critical - Immediate help required",
      },
      placeholders: {
        title: "e.g., Yellowing leaves on tomato plants",
        description: "Describe your problem in detail. Include what you've observed, when it started, what you've tried, etc.",
      },
      buttons: {
        post: "Post Problem 🚨",
        posting: "Posting...",
        backHome: "← Back to Home",
      },
      messages: {
        required: "Please fill all required fields.",
        success: "Problem posted successfully! Experts will respond soon.",
        error: "Something went wrong. Please try again.",
      },
    },
  },
  hi: {
    nav: {
      home: "होम",
      postProblem: "समस्या पोस्ट करें",
      contact: "संपर्क करें",
      marketplace: "मार्केटप्लेस",
      weather: "मौसम",
      dashboard: "डैशबोर्ड",
      login: "लॉगिन",
      profile: "प्रोफ़ाइल",
      settings: "सेटिंग्स",
      logout: "लॉगआउट",
      themeLight: "लाइट मोड",
      themeDark: "डार्क मोड",
      language: "भाषा",
      english: "English",
      hindi: "हिंदी",
    },
    hero: {
      badge: "भारत का कृषि मंच",
      titleLine1: "समझदारी से उगाएँ,",
      titleLine2: "बेहतर बेचें",
      description:
        "AgriConnect किसानों को उनकी समस्याएँ पोस्ट करने और सीधे कृषि विशेषज्ञों से जुड़ने में मदद करता है। यह किसानों, खरीदारों और विशेषज्ञों के बीच की दूरी घटाता है।",
      joinButton: "किसान के रूप में शामिल हों 🌾",
      aboutButton: "हमारे बारे में",
      contactButton: "संपर्क करें 📞",
    },
    stats: [
      { value: "50K+", label: "कनेक्टेड किसान" },
      { value: "120+", label: "फ़सल विविधताएँ" },
      { value: "28", label: "आवरण राज्य" },
      { value: "₹2Cr+", label: "व्यापार मात्रा" },
    ],
    features: [
      {
        icon: "🛒",
        title: "किसान मार्केटप्लेस",
        desc: "कृपा खरीदें और बेचें। बीचौलिये नहीं, बेहतर दाम।",
        color: "bg-leaf-100 text-leaf-700",
      },
      {
        icon: "🌦️",
        title: "मौसम सलाह",
        desc: "ताज़ा मौसम अपडेट और फ़सल के अनुसार सलाह।",
        color: "bg-earth-100 text-earth-700",
      },
      {
        icon: "📊",
        title: "फार्म डैशबोर्ड",
        desc: "अपनी फ़सल, इन्वेंटरी, और प्रदर्शन एक जगह ट्रैक करें।",
        color: "bg-amber-100 text-amber-700",
      },
      {
        icon: "🤝",
        title: "एक्सपर्ट कनेक्ट",
        desc: "कृषि विशेषज्ञों से गाइडेंस लें और किसानों से जुड़ें।",
        color: "bg-emerald-100 text-emerald-700",
      },
    ],
    steps: [
      { step: "01", icon: "📝", title: "रजिस्टर करें", desc: "किसान, खरीदार या विशेषज्ञ के रूप में जल्दी से साइन अप करें।" },
      { step: "02", icon: "🌾", title: "लिस्ट या ब्राउज़ करें", desc: "अपनी फ़सल पोस्ट करें या ताज़ा उत्पाद देखें।" },
      { step: "03", icon: "💰", title: "कनेक्ट करें और ट्रेड करें", desc: "सीधे खरीदारों से जुड़ें और निष्पक्ष भुगतान पाएं।" },
    ],
    testimonials: [
      {
        name: "रमेश पटेल",
        location: "गुजरात",
        text: "AgriConnect ने मुझे मेरी गेहूँ सीधे खरीदारों को 30% बेहतर कीमत पर बेचने में मदद की।",
        emoji: "👨‍🌾",
      },
      {
        name: "सुनीता देवी",
        location: "पंजाब",
        text: "मौसम सलाह ने मेरी सरसों की फ़सल को बचाया। मुझे समय पर सूचनाएँ मिलीं।",
        emoji: "👩‍🌾",
      },
      {
        name: "मोहन सिंह",
        location: "राजस्थान",
        text: "फार्म डैशबोर्ड ने सब कुछ ट्रैक करना आसान बना दिया। अब मुझे अपनी फ़सल पर नियंत्रण लगता है।",
        emoji: "🧑‍🌾",
      },
    ],
    farmerDashboard: {
      welcome: "फिर से स्वागत है,",
      ready: "क्या आप आज अपनी फ़सल को बेहतर बनाना चाहते हैं?",
      quickStats: [
        { value: "0", label: "सक्रिय समस्याएँ", color: "bg-leaf-50 text-leaf-600" },
        { value: "0", label: "विशेषज्ञ प्रतिक्रियाएँ", color: "bg-blue-50 text-blue-600" },
        { value: "24°C", label: "वर्तमान तापमान", color: "bg-yellow-50 text-yellow-600" },
        { value: "अच्छा", label: "मिट्टी की सेहत", color: "bg-green-50 text-green-600" },
      ],
      quickActions: [
        { icon: "🚨", title: "समस्या पोस्ट करें", desc: "कृषि समस्याओं के लिए विशेषज्ञ सहायता प्राप्त करें", path: "/post-problem", color: "bg-red-100 text-red-700" },
        { icon: "📞", title: "सपोर्ट से संपर्क करें", desc: "हमारी सपोर्ट टीम से जुड़ें", path: "/contact", color: "bg-blue-100 text-blue-700" },
        { icon: "🌦️", title: "मौसम अपडेट", desc: "आज का मौसम देखें", path: "/weather", color: "bg-yellow-100 text-yellow-700" },
        { icon: "📊", title: "मेरी समस्याएँ", desc: "अपनी पोस्ट की गई समस्याएँ देखें", path: "/my-problems", color: "bg-purple-100 text-purple-700" },
      ],
      noActivity: "अभी कोई सक्रिय गतिविधि नहीं है।",
      startPost: "पहली समस्या पोस्ट करके शुरू करें!",
      logoutButton: "लॉगआउट 🚪",
    },
    login: {
      headingLogin: "फिर से स्वागत है!",
      headingRegister: "AgriConnect से जुड़ें",
      loginSubtext: "अपने अकाउंट में लॉगिन करें",
      registerSubtext: "आज ही अपना मुफ़्त अकाउंट बनाएं",
      roleTitle: "मैं हूं...",
      fields: {
        name: "पूरा नाम *",
        email: "ईमेल पता *",
        phone: "फ़ोन नंबर",
        password: "पासवर्ड *",
        passwordHint: "कम से कम 8 अक्षर, एक बड़ी, एक छोटी, एक नंबर, एक विशेष वर्ण।",
        forgotPassword: "पासवर्ड भूल गए?",
        loginButton: "अकाउंट में लॉगिन करें 🌾",
        registerButton: "अकाउंट बनाएं 🌱",
      },
      placeholders: {
        name: "रमेश पटेल",
        email: "farmer@example.com",
        phone: "+91 98765 43210",
        password: "••••••••",
      },
      messages: {
        fillRequired: "कृपया सभी आवश्यक फ़ील्ड भरें।",
        loginFill: "कृपया ईमेल और पासवर्ड दर्ज करें।",
        invalidCredentials: "अमान्य ईमेल या पासवर्ड।",
        accountCreated: "{role} के रूप में खाता सफलतापूर्वक बनाया गया! कृपया लॉगिन करें।",
        emailRegistered: "ईमेल पहले से पंजीकृत है। कृपया लॉगिन करें।",
        serverError: "कुछ गलत हो गया। क्या सर्वर चल रहा है?",
        passwordUpper: "पासवर्ड में कम से कम एक बड़ी अक्षर होना चाहिए।",
        passwordLower: "पासवर्ड में कम से कम एक छोटी अक्षर होना चाहिए।",
        passwordNumber: "पासवर्ड में कम से कम एक नंबर होना चाहिए।",
        passwordSpecial: "पासवर्ड में कम से कम एक विशेष अक्षर होना चाहिए।",
        passwordLength: "पासवर्ड कम से कम 8 अक्षर लंबा होना चाहिए।",
      },
      roles: [
        { value: "farmer", label: "किसान", icon: "👨‍🌾", desc: "फ़सल उगाएँ और बेचें" },
        { value: "buyer", label: "खरीदार", icon: "🛒", desc: "ताज़ा उत्पाद खरीदें" },
        { value: "agronomist", label: "एग्रीनोमिस्ट", icon: "🔬", desc: "विशेषज्ञ सलाह दें" },
        { value: "vendor", label: "विक्रेता", icon: "🏪", desc: "आपूर्ति और वितरण" },
      ],
    },
    contact: {
      headerTitle: "संपर्क करें",
      headerSubtitle: "हम आपकी मदद करने के लिए यहाँ हैं",
      emailLabel: "ईमेल",
      phoneLabel: "फ़ोन",
      supportLabel: "सपोर्ट घंटे",
      addressLabel: "पता",
      form: {
        name: "नाम *",
        email: "ईमेल *",
        subject: "विषय *",
        message: "संदेश *",
        subjectPlaceholder: "यह किस बारे में है?",
        messagePlaceholder: "हमें बताएं कि हम आपकी कैसे मदद कर सकते हैं...",
        sendButton: "संदेश भेजें 📤",
        sending: "भेजा जा रहा है...",
      },
      messages: {
        required: "कृपया सभी आवश्यक फ़ील्ड भरें।",
        success: "संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।",
        error: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
      },
      contactDetails: {
        email: "support@agriconnect.in",
        phone: "+91 1800-123-4567",
        hours: "सोम-शुक्र: 9AM-6PM IST",
        address: "नई दिल्ली, भारत",
      },
      backHome: "← होम पर वापस जाएँ",
    },
    about: {
      headerTitle: "AgriConnect के बारे में",
      headerDesc: "AgriConnect किसानों को उनकी समस्याएँ पोस्ट करने और सीधे कृषि विशेषज्ञों से जुड़ने में मदद करता है। यह विशेषज्ञ मार्गदर्शन, मार्केटप्लेस और मौसम-संबंधित इनसाइट प्रदान करता है।",
      whoTitle: "हम कौन हैं",
      whoText: "AgriConnect को छोटे किसानों को समर्थ बनाने के लिए बनाया गया है, ताकि वे अपनी फ़सल समस्याएँ साझा करें, विशेषज्ञ सलाह प्राप्त करें और खरीदारों से जुड़ें।",
      items: [
        { title: "अपनी समस्या पोस्ट करें", text: "अपनी कृषि चुनौती साझा करें और विशेषज्ञों से मार्गदर्शन प्राप्त करें।" },
        { title: "एग्रीनोमिस्ट से जुड़ें", text: "ऐसे विशेषज्ञों से बात करें जो आपकी मिट्टी, फ़सल और जलवायु को समझते हैं।" },
        { title: "आत्मविश्वास से उगाएँ", text: "वास्तविक इनसाइट का उपयोग करें और अपने उत्पादन को सुधारें।" },
      ],
      missionTitle: "हमारा मिशन",
      missionText: "हम चाहते हैं कि हर किसान समर्थ और जुड़ा महसूस करे। AgriConnect विशेषज्ञ सहायता, बाज़ार पहुँच और व्यावहारिक उपकरण लेकर आता है।",
      contactButton: "संपर्क करें 📞",
    },
    profile: {
      title: "मेरी प्रोफ़ाइल",
      name: "नाम:",
      email: "ईमेल:",
      role: "रोल:",
      overview: "यह एक सरल प्रोफ़ाइल अवलोकन पेज है। आप इसे आगे और विस्तार दे सकते हैं।",
      noUser: "कोई उपयोगकर्ता लॉगिन नहीं है।",
      backHome: "होम पर वापस जाएँ",
    },
    settings: {
      title: "सेटिंग्स",
      description: "यह एक प्लेसहोल्डर सेटिंग्स पेज है। यहाँ प्राथमिकताएँ, पासवर्ड बदलें और खाता विकल्प जोड़ें।",
      sections: [
        { title: "खाता प्राथमिकताएँ", text: "अपने अकाउंट सेटिंग्स और नोटिफ़िकेशन प्रबंधित करें।" },
        { title: "गोपनीयता", text: "अपनी गोपनीयता और डेटा सेटिंग्स कॉन्फ़िगर करें।" },
      ],
      backHome: "होम पर वापस जाएँ",
    },
    postProblem: {
      title: "अपनी समस्या पोस्ट करें",
      subtitle: "कृषि विशेषज्ञों से मार्गदर्शन प्राप्त करें",
      labels: {
        problemTitle: "समस्या शीर्षक *",
        category: "श्रेणी",
        urgency: "तत्कालता स्तर",
        description: "विस्तृत विवरण *",
      },
      options: {
        crop: "फ़सल रोग",
        soil: "मिट्टी समस्याएँ",
        pest: "कीट नियंत्रण",
        irrigation: "सिंचाई",
        weather: "मौसम संबंधित",
        equipment: "उपकरण",
        other: "अन्य",
        low: "कम - कुछ दिन इंतजार कर सकता है",
        medium: "मध्यम - जल्दी मदद चाहिए",
        high: "उच्च - आपातकालीन सहायता आवश्यक",
        critical: "गंभीर - तुरंत मदद चाहिए",
      },
      placeholders: {
        title: "उदा., टमाटर के पौधों पर पत्तियों का पीला पड़ना",
        description: "अपनी समस्या विस्तार से बताएं। इसमें क्या देखा, कब शुरू हुआ, और क्या प्रयास किया शामिल करें।",
      },
      buttons: {
        post: "समस्या पोस्ट करें 🚨",
        posting: "पोस्ट किया जा रहा है...",
        backHome: "← होम पर वापस जाएँ",
      },
      messages: {
        required: "कृपया सभी आवश्यक फ़ील्ड भरें।",
        success: "समस्या सफलतापूर्वक पोस्ट की गई! विशेषज्ञ शीघ्र उत्तर देंगे।",
        error: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
      },
    },
  },
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("agriTheme");
    return stored === "dark" ? "dark" : "light";
  });
  const [locale, setLocale] = useState(() => {
    const stored = localStorage.getItem("agriLocale");
    return stored === "hi" ? "hi" : "en";
  });

  useEffect(() => {
    localStorage.setItem("agriTheme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("agriLocale", locale);
  }, [locale]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleLocale = () => setLocale((prev) => (prev === "en" ? "hi" : "en"));

  const value = useMemo(
    () => ({ theme, locale, toggleTheme, toggleLocale, strings: translations[locale] }),
    [theme, locale]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
