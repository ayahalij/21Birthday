const mongoose = require('mongoose');
const Card = require('./models/Card');
require('dotenv').config();

const seedData = [
  {
    id: 1,
    image: "/images/card1.jpg",
    note: "يا حلاتهم الصغيررررون و حلات الوردة الي في شعرهم 🌸",
    secretMessage: "ما تغير فينا شي نفس الوجه بس كبرنا",
  },
  {
    id: 2,
    image: "/images/card2.jpg", 
    note: "اموووت على الابتسامة الصامتة اني ... عمري البراءة في العيووون",
    secretMessage: "لحين بريئين مو قصدنا شي 😒",
  },
  {
    id: 3,
    image: "/images/card3.jpg",
    note: "يا جمااالوو المتفوق و المتميز منذ الصغر",
    secretMessage: "رجعوا تصوير التفوق أحتاجه 😭",
  },
  {
    id: 4,
    image: "/images/card4.jpg",
    note: "كنا اول سنة جامعة و اليوم احنا آخر سنة و بنتخرج ان شاء الله ",
    secretMessage: "شفتين شلون الايام تركض",
  },
  {
    id: 5,
    image: "/images/card5.jpg",
    note: "شكرًا لجميع المساعدات اللتي قدمت اثناء مسيرتي في بوليتكنك",
    secretMessage: "خلاص ما في مساعدات جاية؟!",
  },
  {
    id: 6,
    image: "/images/card6.jpg",
    note: "حلاااات الجيري...في شي بعطيش اياه اذا جفتش",
    secretMessage: "متأكدة صورة عفوية؟!",
  },
  {
    id: 7,
    image: "/images/card7.jpg",
    note: "الطفل الداخلي و الخارجي سعيد ... لان من الاساس نحن اطفال 😊",
    secretMessage: "الاستمتاع باخر يوم للاجازة",
  },
  {
    id: 8,
    image: "/images/card8.jpg",
    note: "صورة تعود لعام ٢٠١٦ مدرسة القيروان حفل التفوق",
    secretMessage: "ما عندنا صور واجد ويا بعض 😭",
  },
  {
    id: 9,
    image: "/images/card9.jpg",
    note: "صورة في أجواء الحرب و التجمع و اللجوء العائلي",
    secretMessage: "يعني موتة وحدة؟! 😂",
  },
  {
    id: 10,
    image: "/images/card10.jpg",
    note: "نرد نلبس روب التخرج لكن هالمرة مال الجامعة",
    secretMessage: "يؤبرني الخريج انييي",
  },
  {
    id: 11,
    image: "/images/card11.jpg",
    note: "الله يعودنا وياش في الماتم و دايمًا على يساري ان شاء الله",
    secretMessage: "ما تدرين يمكن خلاص اروح ماتم ثاني 😉",
  },
  {
    id: 12,
    image: "/images/card12.jpg",
    note: "و نبدي رحلتنا و و نسافر بيها و بسم الله نبتدي فيها",
    secretMessage: "اخذيني وياش مو تسافرين عنيي",
  },
  {
    id: 13,
    image: "/images/card13.jpg",
    note: "الله يرزقنا وياش عمرة و حجة ان شاء الله و نجدد صورتنا",
    secretMessage: "ترى اول حجة ويايي دعيت مو تنسين",
  },
  {
    id: 14,
    image: "/images/card14.jpg",
    note: "و من بعدها نروح لخير البرية و نزوره و نزور بته الزجية ",
    secretMessage: "ادعي مو بس اني ادعي",
  },
  {
    id: 15,
    image: "/images/card15.jpg",
    note: "و على ائمة البقيع لازم نسلم و لو ما شفنا قبورهم لازم نتألم",
    secretMessage: "تدرين ان سري مدفون في قبر ام البنين",
  },
  {
    id: 16,
    image: "/images/card16.jpg",
    note: "و نعرج على أميرنا ابو الحسنين و تاليها نمر عباس و الحسين",
    secretMessage: "علي آية و علي غاية و علي راية",
  },
  {
    id: 17,
    image: "/images/card17.jpg",
    note: "و اتخيله مشهد في بالي بين الحرمين وداني خيالي",
    secretMessage: "نسلم على الحسين او العباس اول؟!",
  },
  {
    id: 18,
    image: "/images/card18.jpg",
    note: "و في بغداد أزور الكاظميين و يهل الدمع من اشوف القبتين",
    secretMessage: "اذا زرنا اقل من ليلتين ماني قاعدة",
  },
  {
    id: 19,
    image: "/images/card19.jpg",
    note: "و لانيس النفوس لازم نروح تتشافى النفس و عنها تبرى الجروح",
    secretMessage: "نروح شتا لو صيف؟!",
  },
  {
    id: 20,
    image: "/images/card20.jpg",
    note: "و آخر شي نروح على هالوادي نزور العسكري و ابوه الهادي",
    secretMessage: "ام و عمة و زوجة الامام العسكري مدفونين وياهم",
  },
  {
    id: 21,
    image: "/images/card21.jpg",
    note: "و وصلنا لآخر محطة و فيها كمال العترة صاحب الأمر عجال الله امره",
    secretMessage: "ادعي أكمله و اعطيش اياه",
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI ? 'Atlas Cloud DB' : 'Local MongoDB');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scrapbook');
    console.log('Connected to MongoDB successfully!');
    
    await Card.deleteMany({});
    console.log('Cleared existing cards');
    
    await Card.insertMany(seedData);
    console.log(`Database seeded successfully with ${seedData.length} cards!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();