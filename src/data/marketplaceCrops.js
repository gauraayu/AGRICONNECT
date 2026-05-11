const cropImages = {
  wheat:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&auto=format&fit=crop",
  rice:
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700&auto=format&fit=crop",
  tomato:
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop",
  potato:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&auto=format&fit=crop",
  onion:
    "https://images.unsplash.com/photo-1508747703725-719777637510?w=700&auto=format&fit=crop",
  soybean:
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&auto=format&fit=crop",
  maize:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=700&auto=format&fit=crop",
  cotton:
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=700&auto=format&fit=crop",
  mustard:
    "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=700&auto=format&fit=crop",
  sugarcane:
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700&auto=format&fit=crop",
  chilli:
    "https://images.unsplash.com/photo-1526346698789-22fd84314424?w=700&auto=format&fit=crop",
  banana:
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700&auto=format&fit=crop",
  apple:
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=700&auto=format&fit=crop",
  mango:
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=700&auto=format&fit=crop",
  grapes:
    "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=700&auto=format&fit=crop",
  carrot:
    "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=700&auto=format&fit=crop",
  cabbage:
    "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=700&auto=format&fit=crop",
  cauliflower:
    "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=700&auto=format&fit=crop",
  brinjal:
    "https://images.unsplash.com/photo-1604245437608-50c6bb8d4ee4?w=700&auto=format&fit=crop",
  pea:
    "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=700&auto=format&fit=crop",
};

export const marketplaceCrops = [
  { id: 1, name: "Wheat Sona", cropKey: "wheat", price: "₹2,300/qt", quantity: "120 quintal", region: "Punjab — Amritsar", farmer: "Ramesh Singh", quality: "A Grade" },
  { id: 2, name: "Basmati Rice", cropKey: "rice", price: "₹1,560/qt", quantity: "90 quintal", region: "Haryana — Karnal", farmer: "Amit Kumar", quality: "Premium" },
  { id: 3, name: "Hybrid Tomato", cropKey: "tomato", price: "₹1,880/qt", quantity: "40 quintal", region: "Maharashtra — Nashik", farmer: "Suresh Patil", quality: "Fresh" },
  { id: 4, name: "Potato Kufri", cropKey: "potato", price: "₹1,250/qt", quantity: "150 quintal", region: "Uttar Pradesh — Agra", farmer: "Mahesh Yadav", quality: "A Grade" },
  { id: 5, name: "Red Onion", cropKey: "onion", price: "₹1,700/qt", quantity: "75 quintal", region: "Maharashtra — Lasalgaon", farmer: "Ganesh Pawar", quality: "Export Quality" },
  { id: 6, name: "Yellow Soybean", cropKey: "soybean", price: "₹4,350/qt", quantity: "100 quintal", region: "Madhya Pradesh — Indore", farmer: "Rajesh Verma", quality: "Organic" },
  { id: 7, name: "Maize", cropKey: "maize", price: "₹1,950/qt", quantity: "110 quintal", region: "Madhya Pradesh — Jabalpur", farmer: "Karan Lodhi", quality: "Good" },
  { id: 8, name: "Cotton", cropKey: "cotton", price: "₹7,200/qt", quantity: "65 quintal", region: "Maharashtra — Nagpur", farmer: "Vijay Kale", quality: "Premium" },
  { id: 9, name: "Mustard Seeds", cropKey: "mustard", price: "₹5,100/qt", quantity: "80 quintal", region: "Rajasthan — Jaipur", farmer: "Bhanwar Lal", quality: "A Grade" },
  { id: 10, name: "Sugarcane", cropKey: "sugarcane", price: "₹340/qt", quantity: "300 quintal", region: "Uttar Pradesh — Meerut", farmer: "Dinesh Chaudhary", quality: "Fresh Cut" },

  { id: 11, name: "Green Chilli", cropKey: "chilli", price: "₹3,200/qt", quantity: "25 quintal", region: "Andhra Pradesh — Guntur", farmer: "Ravi Naidu", quality: "Fresh" },
  { id: 12, name: "Banana", cropKey: "banana", price: "₹1,400/qt", quantity: "60 quintal", region: "Tamil Nadu — Trichy", farmer: "Arun Kumar", quality: "Premium" },
  { id: 13, name: "Apple", cropKey: "apple", price: "₹8,500/qt", quantity: "30 quintal", region: "Himachal Pradesh — Shimla", farmer: "Kamal Thakur", quality: "Premium" },
  { id: 14, name: "Mango Alphonso", cropKey: "mango", price: "₹6,200/qt", quantity: "45 quintal", region: "Maharashtra — Ratnagiri", farmer: "Nilesh Patil", quality: "Export Quality" },
  { id: 15, name: "Black Grapes", cropKey: "grapes", price: "₹4,800/qt", quantity: "35 quintal", region: "Maharashtra — Sangli", farmer: "Santosh More", quality: "Fresh" },
  { id: 16, name: "Carrot", cropKey: "carrot", price: "₹1,100/qt", quantity: "55 quintal", region: "Delhi — Azadpur", farmer: "Rahul Kumar", quality: "A Grade" },
  { id: 17, name: "Cabbage", cropKey: "cabbage", price: "₹900/qt", quantity: "70 quintal", region: "West Bengal — Siliguri", farmer: "Subhash Das", quality: "Fresh" },
  { id: 18, name: "Cauliflower", cropKey: "cauliflower", price: "₹1,300/qt", quantity: "50 quintal", region: "Punjab — Ludhiana", farmer: "Harpreet Singh", quality: "A Grade" },
  { id: 19, name: "Brinjal", cropKey: "brinjal", price: "₹1,450/qt", quantity: "42 quintal", region: "Madhya Pradesh — Bhopal", farmer: "Ravi Kushwaha", quality: "Fresh" },
  { id: 20, name: "Green Peas", cropKey: "pea", price: "₹2,700/qt", quantity: "36 quintal", region: "Uttar Pradesh — Kanpur", farmer: "Akhilesh Yadav", quality: "Premium" },

  { id: 21, name: "Durum Wheat", cropKey: "wheat", price: "₹2,420/qt", quantity: "85 quintal", region: "Madhya Pradesh — Sehore", farmer: "Lokesh Meena", quality: "A Grade" },
  { id: 22, name: "Sona Masoori Rice", cropKey: "rice", price: "₹1,850/qt", quantity: "95 quintal", region: "Telangana — Warangal", farmer: "Prakash Rao", quality: "Cleaned" },
  { id: 23, name: "Cherry Tomato", cropKey: "tomato", price: "₹2,600/qt", quantity: "20 quintal", region: "Karnataka — Bengaluru", farmer: "Manjunath", quality: "Premium" },
  { id: 24, name: "White Potato", cropKey: "potato", price: "₹1,180/qt", quantity: "140 quintal", region: "Bihar — Patna", farmer: "Mohan Prasad", quality: "Good" },
  { id: 25, name: "White Onion", cropKey: "onion", price: "₹1,550/qt", quantity: "70 quintal", region: "Gujarat — Bhavnagar", farmer: "Harsh Patel", quality: "A Grade" },
  { id: 26, name: "Black Soybean", cropKey: "soybean", price: "₹4,600/qt", quantity: "55 quintal", region: "Madhya Pradesh — Ujjain", farmer: "Sanjay Sharma", quality: "Organic" },
  { id: 27, name: "Sweet Corn", cropKey: "maize", price: "₹2,100/qt", quantity: "45 quintal", region: "Karnataka — Mysuru", farmer: "Naveen Gowda", quality: "Fresh" },
  { id: 28, name: "Long Staple Cotton", cropKey: "cotton", price: "₹7,450/qt", quantity: "50 quintal", region: "Gujarat — Rajkot", farmer: "Jayesh Patel", quality: "Premium" },
  { id: 29, name: "Black Mustard", cropKey: "mustard", price: "₹5,250/qt", quantity: "70 quintal", region: "Rajasthan — Kota", farmer: "Om Prakash", quality: "A Grade" },
  { id: 30, name: "Fresh Sugarcane", cropKey: "sugarcane", price: "₹360/qt", quantity: "250 quintal", region: "Maharashtra — Kolhapur", farmer: "Santosh Patil", quality: "Fresh Cut" },

  { id: 31, name: "Dry Red Chilli", cropKey: "chilli", price: "₹8,500/qt", quantity: "18 quintal", region: "Andhra Pradesh — Guntur", farmer: "Kiran Reddy", quality: "Export Quality" },
  { id: 32, name: "Robusta Banana", cropKey: "banana", price: "₹1,320/qt", quantity: "75 quintal", region: "Kerala — Palakkad", farmer: "Vishnu Nair", quality: "Fresh" },
  { id: 33, name: "Royal Apple", cropKey: "apple", price: "₹9,100/qt", quantity: "26 quintal", region: "Jammu & Kashmir — Sopore", farmer: "Aqib Mir", quality: "Premium" },
  { id: 34, name: "Dasheri Mango", cropKey: "mango", price: "₹4,900/qt", quantity: "52 quintal", region: "Uttar Pradesh — Lucknow", farmer: "Imran Khan", quality: "A Grade" },
  { id: 35, name: "Green Grapes", cropKey: "grapes", price: "₹4,300/qt", quantity: "40 quintal", region: "Maharashtra — Nashik", farmer: "Vikas Jadhav", quality: "Fresh" },
  { id: 36, name: "Organic Carrot", cropKey: "carrot", price: "₹1,650/qt", quantity: "30 quintal", region: "Haryana — Sonipat", farmer: "Deepak Malik", quality: "Organic" },
  { id: 37, name: "Organic Cabbage", cropKey: "cabbage", price: "₹1,050/qt", quantity: "48 quintal", region: "Karnataka — Mysuru", farmer: "Naveen Gowda", quality: "Organic" },
  { id: 38, name: "Snowball Cauliflower", cropKey: "cauliflower", price: "₹1,480/qt", quantity: "44 quintal", region: "Uttarakhand — Dehradun", farmer: "Ankit Rawat", quality: "Fresh" },
  { id: 39, name: "Purple Brinjal", cropKey: "brinjal", price: "₹1,650/qt", quantity: "34 quintal", region: "Odisha — Cuttack", farmer: "Bikash Sahoo", quality: "A Grade" },
  { id: 40, name: "Fresh Green Peas", cropKey: "pea", price: "₹2,950/qt", quantity: "28 quintal", region: "Himachal Pradesh — Mandi", farmer: "Rohit Sharma", quality: "Premium" },

  { id: 41, name: "Sharbati Wheat", cropKey: "wheat", price: "₹2,700/qt", quantity: "55 quintal", region: "Madhya Pradesh — Vidisha", farmer: "Gopal Sharma", quality: "Premium" },
  { id: 42, name: "Parboiled Rice", cropKey: "rice", price: "₹1,720/qt", quantity: "100 quintal", region: "Chhattisgarh — Raipur", farmer: "Bhupesh Sahu", quality: "A Grade" },
  { id: 43, name: "Roma Tomato", cropKey: "tomato", price: "₹1,950/qt", quantity: "32 quintal", region: "Maharashtra — Satara", farmer: "Rahul Pawar", quality: "Fresh" },
  { id: 44, name: "Seed Potato", cropKey: "potato", price: "₹2,100/qt", quantity: "35 quintal", region: "Punjab — Jalandhar", farmer: "Harpreet Singh", quality: "Seed Grade" },
  { id: 45, name: "Organic Onion", cropKey: "onion", price: "₹2,050/qt", quantity: "40 quintal", region: "Madhya Pradesh — Mandsaur", farmer: "Devendra Rathore", quality: "Organic" },
  { id: 46, name: "Soybean JS-9560", cropKey: "soybean", price: "₹4,480/qt", quantity: "92 quintal", region: "Madhya Pradesh — Harda", farmer: "Narendra Kirar", quality: "A Grade" },
  { id: 47, name: "White Maize", cropKey: "maize", price: "₹2,050/qt", quantity: "78 quintal", region: "Rajasthan — Udaipur", farmer: "Mahendra Singh", quality: "Good" },
  { id: 48, name: "Cotton Bales", cropKey: "cotton", price: "₹7,800/qt", quantity: "45 quintal", region: "Gujarat — Surat", farmer: "Mukesh Solanki", quality: "Premium" },
  { id: 49, name: "Mustard Bold", cropKey: "mustard", price: "₹5,320/qt", quantity: "68 quintal", region: "Rajasthan — Bharatpur", farmer: "Ratan Lal", quality: "Bold Seed" },
  { id: 50, name: "Nendran Banana", cropKey: "banana", price: "₹1,900/qt", quantity: "48 quintal", region: "Kerala — Thrissur", farmer: "Sanoj Varghese", quality: "Fresh" },
].map((crop) => ({
  ...crop,
  image: cropImages[crop.cropKey],
}));