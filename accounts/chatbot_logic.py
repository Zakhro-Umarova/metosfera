from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import spacy

nlp = spacy.load('en_core_web_sm')

# # Create a new chatbot instance
# chatbot = ChatBot('Uzbek Chatbot')
# Create a new chatbot instance
chatbot = ChatBot(
    'Uzbek Chatbot',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ],
    database_uri='sqlite:///database.sqlite3'  # Use SQLite for storage
)

# Create a new trainer for the chatbot
trainer = ListTrainer(chatbot)

# Train the chatbot with some example conversations in Uzbek
uzbek_corpus = [
    ["Salom", "Salom! Qanday yordam bera olishim mumkin?"],
    ["Yordam kerak", "Albatta! Nima haqida yordam kerak?"],
    ["Xayr", "Xayr! Yana kelib turing."],
    ["Menga qanday yordam bera olasiz?", "Men sizga mustaqil ta'lim olish jarayoningizda as qotadigan texnika va strategiyalar bo'yicha har qanday savolga javob bera olaman."],
    ["Sizning ismingiz nima?", "Men Uzbek Chatbotman."],
    # Add more pairs as needed

    # IKIGAI haqida
    ["IKIGAI nima?",
     "IKIGAI - bu Yaponcha tushuncha bo'lib, insonning hayotda eng katta maqsadi va mazmunini aniqlashni anglatadi. IKIGAI shaxsiy qiziqishlar, imkoniyatlar va ijtimoiy ehtiyojlarni birlashtirishni maqsad qilgan bir konsepsiya."],
    ["IKIGAI qanday topiladi?",
     "IKIGAI ni topish uchun siz o'zingizni to'liq anglab, qaysi ishlarni yaxshi ko'rishingiz, qaysi ishlarni bajarishda muvaffaqiyat qozonishingiz, qaysi ishlarni boshqalar uchun foydali deb bilsangiz, va ular uchun qanday imkoniyatlar mavjudligini o'rganishingiz kerak."],

    # SMART goals haqida
    ["SMART maqsadlar (goals) nima?",
     "SMART maqsadlar (goals) - bu aniq, o'lchab bo'ladigan, amalga oshiriladigan, ahamiyatli va vaqtni belgilashga asoslangan maqsadlarni belgilash texnikasi."],
    ["SMART maqsadlar (goals) ni qanday belgilash kerak?",
     "SMART maqsadlar quyidagicha bo'lishi kerak: "
     "1. Aniq (Specific) - Maqsadning aniq bo'lishi. "
     "2. O'lchab bo'ladigan (Measurable) - Maqsadni o'lchash mumkin bo'lishi. "
     "3. Amalda bajariladigan (Achievable) - Maqsadni bajarish mumkin bo'lishi. "
     "4. Mantiqan ahamiyatli (Relevant) - Maqsadning ahamiyatli va foydali bo'lishi. "
     "5. Vaqtli (Time-bound) - Maqsad uchun aniq vaqt belgilanishi kerak."],

    # Kunlik vazifalarni rejalashtirish
    ["Kunlik vazifalarni qanday rejalashtirish kerak?",
     "Kunlik vazifalarni rejalashtirish uchun har kuni ertalab barcha vazifalarni yozib chiqing, ularni muhimligi va shoshilinchligi bo'yicha tartiblang, va vaqtni samarali boshqarishga harakat qiling."],

    # KAIZEN haqida
    ["KAIZEN nima?",
     "KAIZEN - bu Yaponcha tushuncha bo'lib, 'doimiy takomillashtirish' degan ma'noni anglatadi. Bu jarayonni kichik qadamlar bilan amalga oshirish va har kuni yaxshilanishni ta'minlashni anglatadi."],
    ["KAIZENni qanday qo'llash mumkin?",
     "KAIZENni qo'llash uchun siz kichik o'zgarishlar qilishni boshlang. Har kuni biror yangi odatni hayotingizga kiritishga harakat qiling va o'zingizni doimiy ravishda takomillashtiring."],

    # UBUNTU haqida
    ["UBUNTU nima?",
     "UBUNTU - bu Janubiy Afrikada paydo bo'lgan falsafiy tushuncha bo'lib, bir-biriga yordam berish, hamjihatlik va jamoaviy ruhni anglatadi. "
     "UBUNTU odamlarning bir-biriga bo'lgan hurmatini va yordamni aks ettiradi."],
    ["UBUNTUni qanday qo'llash mumkin?",
     "UBUNTUni hayotingizga tatbiq etish uchun jamoatdagi odamlar bilan yordam berishga, ularga hurmat ko'rsatishga va birgalikda muvaffaqiyatga erishishga "
     "harakat qiling."],

    # IYVLEE metodi
    ["IYVLEE metodi nima?",
     "IYVLEE - bu o'qish va o'rganish jarayonida samarali bo'lish uchun ishlatiladigan metod. Bu metodi yordamida siz biron bir materialni chuqurroq "
     "tushunib, eslab qolishingiz mumkin. IYVLEE bu qisqacha: Imagine (tasavvur qiling), Visualize (tasvirlang), Link (bog'lang), Explain (tushuntiring), "
     "Evaluate (baholang), va Elaborate (ko'proq ma'lumot qo'shing) degan ma'noni anglatadi."],

    # SWISS Cheese metodi
    ["SWISS Cheese metodi nima?",
     "SWISS Cheese (Shvetsariya siri) metodi - bu o'qish va o'rganishning samarali usuli bo'lib, unda siz katta ma'lumotni kichik qismlarga bo'lib, har bir qismini "
     "alohida o'rganishga e'tibor qaratasiz. Bu metod yordamida o'qish jarayonini 'sir teshikchalari' (cheese) kabi kichik qismlarga bo'lish mumkin."],
    ["Shvetsariya siri (SWISS Cheese) metodi nima?",
     "Shvetsariya siri metodi – bu murakkab, yoqimsiz yoki qiyin vazifalarni kichik, oson bajariladigan qadamlar orqali hal qilish usulidir. Asosan, vazifalar juda katta yoki murakkab bo'lsa, ularni kichik qismlarga bo'lish orqali o'zini ishga solishni osonlashtiradi."],

    ["Shvetsariya siri (SWISS Cheese) metodining maqsadi nima?",
     "Shvetsariya siri metodining asosiy maqsadi – vazifalarni osonroq va qadam-baqadam bajarish orqali prokrastinatsiya (ortga surish) yoki qo'rquvni yengishdir. Bu metod yordamida siz har kuni kichik va oddiy qadamlar orqali katta va qiyin vazifalarni muvaffaqiyatli yakunlashingiz mumkin."],

    ["Shvetsariya siri (SWISS Cheese) metodini qanday qo'llash mumkin?",
     "Shvetsariya siri metodini qo'llash uchun avval vazifani kichik qadamlar yoki 'teshiklar'ga ajrating. Har bir qadamni o'zingiz uchun eng oson va noqulay bo'lmagan tarzda tanlang. Kichik 'teshiklar'ni amalga oshirish orqali, vaqt o'tishi bilan katta vazifa to'liq bajariladi."],

    ["Shvetsariya siri (SWISS Cheese) metodining afzalliklari",
     "Bu metodning afzalligi shundaki, u sizni vazifaga kirishishga undaydi. Oson bosqichlarni bajarish orqali, siz o'zingizni keyingi yirik qadamga tayyorlashingiz mumkin."],

    ["Shvetsariya siri (SWISS Cheese) metodini qanday misolda qo'llash mumkin?",
     "Misol uchun, agar sizda katta imtihonga tayyorlanish vazifasi bo'lsa, uni kichik qismlarga ajratish mumkin. Har kuni biror kichik darsni o'qish yoki bir nechta test savollarini yechish orqali, tayyorgarlik jarayonini yengillashtirishingiz mumkin."],

    ["Shvetsariya siri (SWISS Cheese) metodini qaysi vazifalarda qo'llash mumkin?",
     "Bu metod ayniqsa katta yoki yoqimsiz vazifalarni hal qilishda foydalidir. Masalan, o'qish, uy vazifalari, loyihalar yoki hatto hayotiy o'zgarishlarni amalga oshirishda foydalanish mumkin."],

    ["Shvetsariya siri (SWISS Cheese) metodini qachon qo'llash kerak?",
     "Agar siz katta vazifani bajarishga qo'rqsangiz, stress yoki charchoq tufayli boshlashni qiyin deb hisoblasangiz, Shvetsariya siri (SWISS Cheese) metodi yordamida kichik va oson qadamlar bilan boshlashingiz mumkin."],

    ["Shvetsariya siri (SWISS Cheese) metodining ishlash prinsipi qanday?",
     "Shvetsariya siri (SWISS Cheese) metodi har bir vazifani kichik, oson qadamlar bilan ajratib, har bir qadamni mustaqil bajarishga imkon beradi. Har bir kichik qadamni amalga oshirish orqali, butun vazifa bir necha kunda yoki haftada yakunlanadi."],

    ["Shvetsariya siri (SWISS Cheese) metodini qanday yanada samarali qo'llash mumkin?",
     "Shvetsariya siri (SWISS Cheese) metodini yanada samarali qo'llash uchun, har bir qadamni rejalashtirish va bajargan har bir kichik qadamni mukofotlash orqali motivatsiyani saqlash kerak. Bundan tashqari, har bir qadamni bajarishda qiyinchiliklar yuzaga kelganida, uni yanada kichikroq qadamlar bo'lib ajratish mumkin."],

    ["Shvetsariya siri (SWISS Cheese) metodining kamchiliklari bormi?",
     "Shvetsariya siri (SWISS Cheese) metodining kamchiliklari shundaki, ba'zi vazifalar ketma-ketlikni talab qiladi, va bu metod faqatgina ketma-ketliksiz bajarilishi mumkin bo'lgan vazifalarda samarali bo'ladi. Agar vazifa qat'iy tartibda bajarilishi kerak bo'lsa, metodning samaradorligi pasayishi mumkin."],

    ["Shvetsariya siri (SWISS Cheese) metodini qanday o'zgartirish mumkin?",
     "Metodning o'ziga xosligi shundaki, u juda moslashuvchan. Agar biror qadam sizga qiyin yoki noqulay bo'lsa, boshqa bir qadamni tanlashingiz mumkin. Shuningdek, agar vazifa juda murakkab bo'lsa, uni yanada kichikroq bo'laklarga ajratib, unga yanada moslashuvchan yondoshuvni qo'llashingiz mumkin."],


    # SQ3R metodi
    ["SQ3R metodi nima?",
     "SQ3R metodi - bu samarali o'qish metodikasidir. Bu metodi quyidagi 5 qadamdan iborat: Survey (ko'rib chiqish), Question (savol berish), "
     "Read (o'qish), Recite (takrorlash), va Review (ko'rib chiqish)."],

    # Pomodoro texnikasi
    ["Pomodoro texnikasi nima?",
     "Pomodoro texnikasi - bu vaqtni boshqarish usuli bo'lib, unda 25 daqiqa davomida ishlash va so'ngra 5 daqiqa dam olish tavsiya etiladi. "
     "Bu jarayonni 4 marta takrorlagandan so'ng, katta dam olish (15-30 daqiqa) mumkin."],
    ["Pomodoro texnikasini qanday qo'llash kerak?",
     "Pomodoro texnikasini qo'llash uchun ishni 25 daqiqalik segmentlarga ajrating va har bir segmentdan so'ng 5 daqiqa dam oling. "
     "Shundan so'ng, yana davom eting."],

    # 5-minute rule
    ["5-minute rule nima?",
     "5-minute rule - bu o'qish va ishni boshlashda foydalaniladigan metod. Agar siz biror vazifa yoki materialni boshlashga qiynalsangiz, "
     "buni 5 daqiqa davomida qilishingiz kerak, shundan so'ng uni davom ettirish osonlashadi."],

    # Feynman texnikasi
    ["Feynman texnikasi nima?",
     "Feynman texnikasi - bu o'qigan ma'lumotni soddalashtirib, boshqalarga tushuntirish orqali o'zlashtirish texnikasidir. Agar siz biror narsani "
     "o'rgatishga harakat qilsangiz, siz uni yaxshi o'rgangan bo'lasiz."],

    # Forest ilovasi haqida
    ["Forest ilovasi nima?",
     "Forest - bu diqqatni jamlashga yordam beradigan ilova bo'lib, unda siz daraxt ekishingiz va uning o'sishini kuzatib borishingiz mumkin. Virtual daraxtni o'sishi jarayonida esa diqqatingizni qaratishga qiynalayotgan biror mashg'ulotingiz bilan shug'ullanish orqali diqqatni biron ishga qaratish imkoniyatiga ega bo'lasiz"],
    ["Forest ilovasidan qanday foydalanish mumkin?",
     "Forest ilovasini o'rnatib, maqsadga erishishga intiling. Har bir fokussiz ishlangan vaqt uchun daraxt ekiladi. "
     "Bu ilova sizni samarali va diqqatni jamlashga undaydi."],

    # Memory technique lar haqida
    ["Memory techniques nima?",
     "Memory techniques - bu xotirani yaxshilash uchun turli xil strategiyalar va metodlar. Misol uchun, 'Mind Palace' texnikasi yoki 'Chunking' "
     "usuli yordamida ko'proq ma'lumotni o'rganishingiz mumkin."],
    ["Memory techniquesni qanday qo'llash kerak?",
     "Xotirani yaxshilash uchun, misol uchun, Mind Palace metodini sinab ko'ring. Bu metodda siz tasavvur qilingan joyda har bir ma'lumotni joylashtirishingiz "
     "va ularni eslab qolishingiz mumkin."],

    # Leitner sistemasi
    ["Leitner sistemasi nima?",
     "Leitner sistemasi - bu o'rgangan ma'lumotlarni mustahkamlash uchun ishlatiladigan tizim bo'lib, unda har bir kartochka yoki material ma'lum bir tezlikda qayta ko'rib chiqiladi. Bu tizim yordamida ko'proq eslab qolishingiz mumkin."],

    # Active recall usuli
    ["Active recall usuli nima?",
     "Active recall - bu o'rganilgan materialni qayta tiklash va eslab qolishning samarali usulidir. Bu usulda siz materialni eslab qolishga "
     "harakat qilasiz, so'ngra javoblar va yechimlarni tekshirasiz."],

    # Note taking usullari haqida
    ["Note taking usullari nima?",
     "Note taking usullari - bu ma'lumotni samarali tarzda yozib olish usullari bo'lib, misol uchun, Cornel usuli yoki map kabi turli xil texnikalardan "
     "foydalanish mumkin."],
    ["Note taking usullarini qanday qo'llash kerak?",
     "Note taking uchun Cornel usulini qo'llash mumkin. Bu usulda yozuvning 3 asosiy qismi bo'ladi: asosiy ma'lumotlar, savollar va izohlar."],
    # Cornell metodi
    ["Cornell metodi nima?",
     "Cornell metodi - bu o'qish va yozuvlar olishning samarali usulidir. Bu usulda yozuvlar uch qismga bo'linadi: asosiy fikrlar, savollar va "
     "izohlar."],

    # Sentence metodi
    ["Sentence metodi nima?",
     "Sentence metodi - bu yozuvlarni qisqa va aniq jumlalar shaklida olish usulidir. Bu yordamida o'qishning har bir qismini izchil yozish "
     "o'rganiladi."],

    # Outlining metodi
    ["Outlining metodi nima?",
     "Outlining metodi - bu o'qish materialini tartibga solish va asosiy nuqtalarni belgilash uchun ishlatiladi. Bu usulda asosiy va kichik "
     "punktlarni belgilab, bir-biriga bog'lash mumkin."],
    # Svetafor (note taking) qayd usuli
    ["Svetafor usuli nima?",
     "Svetafor usuli - bu yozuvlarni samarali tarzda tashkil etish usulidir. Har bir fikr yoki ma'lumot uchun uch xil ranglar (qizil, sariq, yashil) "
     "ishlatiladi: qizil - muhim ma'lumot, sariq - o'ylab ko'rish kerak bo'lgan fikr, yashil - qo'llanilishi mumkin bo'lgan ma'lumot."],

    # Vaqtni boshqarish (Time Management) texnikalari
    ["Vaqtni boshqarishda qiynalayapman",
     "Vaqtni boshqarish bo'yicha ba'zi usullarni sinab ko'rishingiz mumkin: "
     "1. Pomodoro texnikasi - 25 daqiqalik ishlash va 5 daqiqa dam olish. "
     "2. SMART goals - aniq va vaqtga bog'langan maqsadlar qo'ying. "
     "3. Shvetsariya siri (SWISS Cheese) metodi - katta vazifalarni kichik qadamlar bilan hal qiling. "
     "4. 4D texnikasi - har bir vazifani quyidagi ro'yxatga taqsimlashni anglatadi: Delete (o'chirish), Delay (kechiktirish), Delegate (boshqaga topshirish), Do (bajarish). Shu tarzda o'zingiz uchun faqat Do ro'yxatidagi vazifalarni qoldirasiz. Bu esa yuklamalarni sezilarli darajada kamaytiradi"
     "5. Eyzenxauer matritsasi - vazifalarni ahamiyati va shoshilinchligiga ko'ra toifalarga ajratib, ish tartibini aniqlash va faqat eng muhimlari uchun vaqt ajratishni taklif qiladi"],

    ["Vaqtni boshqarish uchun nima qilay?",
     "Vaqtni boshqarish uchun Pomodoro texnikasini sinab ko'ring. Bu usulda siz 25 daqiqa davomida ishni davom ettirib, 5 daqiqalik dam olishni qo'llaysiz. "
     "Shu tarzda, ishni samarali va diqqatni jamlab bajarish mumkin."],

    ["Pomodoro texnikasini qanday qo'llash kerak?",
     "Pomodoro texnikasini qo'llash uchun ishni 25 daqiqalik segmentlarga ajrating, har bir segmentdan so'ng 5 daqiqa dam oling. "
     "Bu sizni diqqatni jamlashga va ishni samarali qilishga yordam beradi."],

    ["Shvetsariya siri (SWISS Cheese) metodi nima?",
     "Shvetsariya siri metodi - bu katta yoki murakkab vazifalarni kichik, oson bajariladigan qismlarga bo'lish usulidir. "
     "Har bir kichik qadamni bajarib, katta vazifani muvaffaqiyatli yakunlashingiz mumkin."],

    ["5-minute rule nima?",
     "5-minute rule - bu usulda siz biror vazifani boshlash uchun uni 5 daqiqa davomida qilishingiz kerak, bu esa o'zini osonlashtiradi va davom ettirishni osonlashtiradi."],

    # Memory texnikalari (Xotirani yaxshilash)
    ["Xotiraga yordam beruvchi usullarni bilishni istayman",
     "Xotirani yaxshilash uchun ba'zi texnikalarni sinab ko'rishingiz mumkin: "
     "1. Mind Palace texnikasi - tasavvur qilingan joyda ma'lumotlarni saqlash. "
     "2. Leitner tizimi - kartochkalar yordamida ma'lumotlarni qayta ko'rib chiqish. "
     "3. Chunking - katta ma'lumotni kichik qismlarga ajratib o'rganish. "
     "4. Active recall - o'rganilgan materialni qayta tiklash va eslab qolish."],

    ["Memory techniquesni qanday qo'llash mumkin?",
     "Xotirani yaxshilash uchun, masalan, Mind Palace metodini qo'llash mumkin. Bu metodda siz tasavvur qilingan joyda har bir ma'lumotni joylashtirishingiz "
     "va ularni eslab qolishingiz mumkin."],
# SMART goals haqida
    ["SMART maqsadlar qanday yordam beradi?",
     "SMART maqsadlar sizga o'z maqsadlaringizni aniq va o'lchab bo'ladigan shaklda belgilashga yordam beradi. Bu sizga maqsadga erishishda aniq yo'lni ko'rsatadi."],

    ["SMART maqsadlarni qanday amalga oshirish mumkin?",
     "SMART maqsadlarni amalga oshirish uchun har bir maqsadga aniq vaqt va yo'nalish belgilab, ularni tartibda bajarishga e'tibor qaratishingiz kerak."],

    ["SMART maqsadlarni belgilashda qanday xatolarga yo'l qo'yish mumkin?",
     "SMART maqsadlarni belgilashda eng ko'p uchraydigan xatoliklar: noaniqlik, o'lchovning yo'qligi, va vaqtni belgilamaganlikdir. Har bir qadamni aniq va o'lchab bo'lishi zarur."],

    # Feynman texnikasi haqida
    ["Feynman texnikasini qanday qo'llash mumkin?",
     "Feynman texnikasini qo'llash uchun siz biron bir mavzuni o'rganib, uni oddiy va tushunarli tilda boshqalarga tushuntirishga harakat qilishingiz kerak. Agar tushuntira olmasangiz, demak siz yetarlicha o'rgangan emassiz."],

    ["Feynman texnikasining afzalliklari nima?",
     "Feynman texnikasining afzalligi shundaki, u sizni o'rgangan materialni yanada chuqurroq tushunishga majbur qiladi. Tushuntirish jarayoni orqali sizning bilimingiz mustahkamlanadi."],

    # Time Management texnikalari haqida
    ["Vaqtni boshqarish texnikalarini qanday tanlash mumkin?",
     "Vaqtni boshqarish texnikalarini tanlashda o'zingizning ishlash uslubingizni va maqsadlaringizni hisobga olish muhim. Masalan, agar siz ko'p kichik vazifalar bilan band bo'lsangiz, Pomodoro texnikasi foydali bo'lishi mumkin."],

    ["Vaqtni boshqarish bo'yicha qanday maslahatlar bor?",
     "Vaqtni boshqarish bo'yicha ba'zi maslahatlar: "
     "1. Har kuni kunlik reja tuzing. "
     "2. Ahamiyatli vazifalarni oldinga suring. "
     "3. Shoshilinch vazifalarni kechiktirib, avval muhimlarini bajaring. "
     "4. Dam olishga vaqt ajrating."],

    ["Vaqtni boshqarishda eng katta xatolar nima?",
     "Vaqtni boshqarishda eng katta xatolar orasida rejalashtirishning yo'qligi, vazifalarni kechiktirish va vaqtni samarali boshqarmaslik mavjud. Bularni yengish uchun reja tuzish va har bir vazifaga alohida e'tibor qaratish zarur."],

    # Memory techniques (Xotira strategiyalari) haqida
    ["Xotirani yaxshilash uchun qanday metodlardan foydalanish mumkin?",
     "Xotirani yaxshilash uchun quyidagi metodlar mavjud: "
     "1. Mind Palace - har bir ma'lumotni o'zingiz tasavvur qilgan joyda saqlash. "
     "2. Leitner tizimi - kartochkalar yordamida o'rganilgan materialni qayta ko'rib chiqish. "
     "3. Chunking - katta ma'lumotni kichik qismlarga ajratish. "
     "4. Active recall - materialni eslab qolish va mustahkamlash."],

    ["Xotira uchun qanday yangi usullarni sinab ko'rish mumkin?",
     "Xotiraga yordam beruvchi yangi usullar orasida: "
     "1. Chunking - katta ma'lumotni kichik qismlarga ajratib o'rganish. "
     "2. Mind Palace texnikasini qo'llash. "
     "3. Leitner tizimi - kartochkalar yordamida o'rgangan materialni qayta ko'rib chiqish."],

    ["Xotira kuchaytirish uchun qanday odatlar hosil qilish kerak?",
     "Xotira kuchaytirish uchun doimiy ravishda o'rganish, ko'rib chiqish va materialni faollashtirish zarur. Bunda active recall va Leitner tizimi kabi metodlar juda samarali."],

    ["Mind Palace metodini qanday qo'llash mumkin?",
     "Mind Palace metodini qo'llash uchun o'zingizga tanish yoki tasavvur qilgan joyni o'ylang va o'rganilgan materialni bu joyning har bir burchagiga joylashtiring. Bu sizga ma'lumotlarni eslab qolishda yordam beradi."],

    ["Chunking metodini qanday qo'llash mumkin?",
     "Chunking metodini qo'llash uchun katta ma'lumotni kichik, oson o'rganiladigan qismlarga ajrating. Bu usul sizga o'qish va o'rganishda samarali bo'ladi."],

    # Note taking usullari haqida
    ["Yaxshi yozuv olish uchun qanday usullarni qo'llash mumkin?",
     "Yaxshi yozuv olish uchun turli usullarni qo'llash mumkin: "
     "1. Cornell usuli - asosiy fikrlar, savollar va izohlar. "
     "2. Outlining usuli - asosiy nuqtalarni va kichik punktlarni belgilash. "
     "3. Svetafor usuli - ranglar orqali muhim, o'ylab ko'riladigan va qo'llaniladigan ma'lumotlarni ajratish."],

    ["Cornell usulini qanday qo'llash mumkin?",
     "Cornell usulini qo'llash uchun har bir darsni asosiy fikrlar, savollar va izohlar bilan ajrating. Bu usul ma'lumotni tezda qayta ko'rib chiqish va o'rganish uchun foydalidir."],

    ["Outlining metodini qanday qo'llash mumkin?",
     "Outlining metodini qo'llash uchun o'qish materialini to'liq ko'rib chiqib, asosiy nuqtalar va kichik nuqtalarni alohida belgilab chiqing. Bu usul materialni tizimli tarzda o'rganishga yordam beradi."],

    ["Svetafor usulini qanday qo'llash mumkin?",
     "Svetafor usulini qo'llash uchun har bir ma'lumotni qizil, sariq va yashil ranglarga ajrating: qizil - muhim, sariq - o'ylab ko'rish, yashil - qo'llaniladigan."],

    # Vaqtni boshqarish va samarali rejalashtirish
    ["Vaqtni boshqarish bo'yicha qanday maslahatlar bor?",
     "Vaqtni boshqarish uchun samarali texnikalar: "
     "1. Pomodoro texnikasi - 25 daqiqa ishlang, 5 daqiqa dam oling. "
     "2. SMART maqsadlar - aniq va o'lchovli maqsadlarni belgilang. "
     "3. Shvetsariya siri (SWISS Cheese) metodi - katta vazifalarni kichik qismlarga ajratib, birma-bir bajaring. "
     "4. 4D texnikasi - vazifalarni delete (o'chirish), delay (kechiktirish), delegate (topshirish), do (bajarish) qilib ajrating."],
     # O'rganishga qiynalyapman
     ["O'rganishga qiynalyapman",
     "O'rganish jarayonida qiynalayotganingizni tushunaman. Ba'zan ma'lumotlarni kichik qismlarga ajratib, o'rgansangiz, o'rganish osonlashadi. Feynman texnikasi, ya'ni o'rganganlaringizni oddiy tilda boshqalarga tushuntirish, ko'p hollarda samarali bo'ladi. Shuningdek, o'rganish va dam olishni uyg'unlashtirish ham muhim — Pomodoro texnikasini sinab ko'ring."],
     # Mustaqil ta'lim olishda ma'lumot topolmayapman
     ["Mustaqil ta'lim olishda ma'lumot topolmayapman",
     "Mustaqil ta'lim olishda ma'lumot topishda qiyinchilik yuzaga kelishi tabiiy. Biroq, hozirgi kunda onlayn platformalar, kurslar va forumlar juda ko'p. Masalan, Coursera, Udemy yoki Khan Academy kabi saytlardan foydalanishingiz mumkin. Shuningdek, kitoblar va maqolalar ham yaxshi manba bo'lishi mumkin."],
     # Eslab qolishga qiynalyapman
     ["Eslab qolishga qiynalyapman",
     "Xotirani yaxshilash uchun ba'zi usullarni sinab ko'rishingiz mumkin. Masalan, Mind Palace usuli yoki Leitner tizimi kabi metodlar xotirangizni mustahkamlashda foydali bo'lishi mumkin. Shuningdek, ma'lumotlarni kichik qismlarga ajratib, qayta-qayta ko'rib chiqish (Active Recall) juda samarali."],
     # Motivatsiya yetishmayapti
     ["Motivatsiya yetishmayapti",
     "Motivatsiya va energiya ba'zida kam bo'lishi mumkin. Bunday holatda, kichik maqsadlar qo'yib, ularga erishishni boshlash yaxshi bo'ladi. SMART maqsadlar metodini sinab ko'ring. Shuningdek, o'zingizni mukofotlashni unutmang — har bir kichik yutuqni nishonlash motivatsiya oshirishi mumkin."],

     # Biron ishni oxiriga yetkaza olmayman
     ["Biron ishni oxiriga yetkaza olmayman",
     "Bu juda ko'p odamlarda uchraydigan holat. Biron ishni oxiriga yetkazish uchun vazifalarni kichik qadamlar bo'yicha ajratish va Pomodoro texnikasi yoki SWISS Cheese metodini qo'llash foydali bo'lishi mumkin. Har bir kichik yutuq sizga ilhom bag'ishlaydi va oxiriga yetkazish imkoniyatini yaratadi."],

     # Mustaqil o'rgana olmayapman
     ["Mustaqil o'rgana olmayapman",
     "Mustaqil o'rganish ba'zida qiyin bo'lishi mumkin, chunki o'z o'zingizga rejalar tuzish va ularni amalga oshirish zarur. Biroq, Cornell usuli yoki Outlining usuli kabi yozuv olish texnikalari o'rganish jarayonini tizimlashtirishga yordam beradi. Shuningdek, o'zingizga kichik, lekin o'lchab bo'ladigan maqsadlar qo'yishni unutmang."],
     # Qanday qilib o'qishdagi diqqatimni jamlay olishim mumkin?
     ["Qanday qilib o'qishdagi diqqatimni jamlay olishim mumkin?",
     "O'qishdagi diqqatni jamlash uchun Pomodoro texnikasini sinab ko'rishingiz mumkin. Bu usulda siz 25 daqiqa davomida ishlaysiz va so'ngra 5 daqiqa dam olasiz. Shuningdek, diqqatni jamlashga yordam beradigan Forest ilovasini o'rnatishingiz mumkin, bu ilova yordamida siz o'z maqsadlaringizga erishish uchun diqqatni jamlashga harakat qilasiz va virtual daraxtlar o'sadi."],
     # Mustaqil ta'lim olish uchun qanday maqsadlar qo'yishim kerak?
     ["Mustaqil ta'lim olish uchun qanday maqsadlar qo'yishim kerak?",
     "Mustaqil ta'lim olishda SMART maqsadlarini qo'yish juda muhim. Bu usulda maqsadlaringizni aniq, o'lchab bo'ladigan, amalga oshiriladigan, ahamiyatli va vaqtga bog'langan qilib belgilaysiz. Misol uchun, har kuni o'qish uchun 30 daqiqa ajratish, bir oyda 3 ta yangi mavzuni o'rganish kabi maqsadlar qo'yish mumkin."],
     # O'qish jarayonida motivatsiyani qanday saqlab qolishim mumkin?
     ["O'qish jarayonida motivatsiyani qanday saqlab qolishim mumkin?",
     "Motivatsiyani saqlash uchun 5 daqiqa qoidasini sinab ko'ring. Agar siz o'qishni boshlashda qiynalsangiz, o'qish jarayonini 5 daqiqa davomida boshlang. Bu sizga motivatsiya beradi va o'qishni davom ettirishni osonlashtiradi. Bundan tashqari, o'qish jarayonini kichik bo'laklarga bo'lish ham yordam beradi, masalan, SWISS Cheese metodini qo'llash mumkin."],
    # Eslab qolish uchun qanday usullarni qo'llashim mumkin?
    ["Eslab qolish uchun qanday usullarni qo'llashim mumkin?",
    "Eslab qolishni yaxshilash uchun Memory techniques usullarini qo'llashingiz mumkin. Masalan, Mind Palace texnikasini sinab ko'ring, bu usulda ma'lumotlarni tasavvur qilingan joylarda saqlaysiz. Shuningdek, Leitner tizimi yordamida kartochkalar bilan ma'lumotlarni takrorlashingiz mumkin."],
    # O'qishdan zerikib ketaman, nima qilishim kerak?
    ["O'qishdan zerikib ketaman, nima qilishim kerak",
    "Agar o'qishdan zeriksangiz, birinchi navbatda o'zingizni faollashtirish uchun kichik maqsadlar qo'ying. Masalan, har bir mavzu bo'yicha bir necha daqiqa davomida ishlash yoki o'qish uchun yangi muhit yaratish. Shuningdek, o'qishning qiziqarli va interaktiv tomonlarini kiritishga harakat qiling, masalan, Feynman texnikasini qo'llash, ya'ni o'rgangan ma'lumotlaringizni boshqalarga tushuntirish orqali o'zingizni yanada qiziqtirishingiz mumkin."],
    # O'qishga qanday tayyorgarlik ko'rishim kerak?
    ["O'qishga qanday tayyorgarlik ko'rishim kerak?",
    "O'qishga tayyorgarlik ko'rish uchun SQ3R metodini qo'llang. Bu usul 5 qadamdan iborat: 1) Survey - umumiy ko'rib chiqish, 2) Question - savollar berish, 3) Read - o'qish, 4) Recite - o'qigan narsalarni takrorlash, 5) Review - qayta ko'rib chiqish. Bu usul sizning o'qish jarayonini yanada samarali qiladi."],
    # O'zimni o'qishga qanday ruhlantirishim mumkin?
    ["O'zimni o'qishga qanday ruhlantirishim mumkin?",
    "O'zingizni o'qishga ruhlantirish uchun KAIZEN usulidan foydalaning. Bu usulda kichik o'zgarishlar orqali o'qishdagi samaradorlikni oshirish mumkin. Har kuni o'qish uchun yangi odatlar yaratish va ularga rioya qilish, o'qishga bo'lgan intilishni yanada kuchaytiradi."],
    # O'qish va amaliy mashg'ulotlarni qanday muvozanatlashim kerak?
    ["O'qish va amaliy mashg'ulotlarni qanday muvozanatlashim kerak?",
    "O'qish va amaliy mashg'ulotlarni muvozanatlash uchun Vaqtni boshqarish texnikalarini qo'llash juda foydali. Misol uchun, Pomodoro texnikasini qo'llab, o'qish vaqtini 25 daqiqa davomida belgilab, amaliy mashg'ulotlar uchun qisqa dam olishlarni ajrating. Shuningdek, 4D texnikasi yordamida vazifalarni tartibga solishingiz mumkin."],
    #O'qishni boshlashda qanday yondashuvdan foydalanishim kerak?
    ["O'qishni boshlashda qanday yondashuvdan foydalanishim kerak?",
     "O'qishni boshlashda SWISS Cheese metodini qo'llang. Bu metodda katta vazifalarni kichik qismlarga ajratib, har bir qismini o'rganish yoki bajarish orqali o'qish jarayonini boshqara olasiz. Bu yondashuv, o'qishni osonlashtiradi va sizni boshlashga undaydi."],
    # Mustaqil ta'limda qaysi resurslardan foydalanishim mumkin?
    ["Mustaqil ta'limda qaysi resurslardan foydalanishim mumkin?",
     "Mustaqil ta'lim olish uchun Internet resurslarini izlash va o'rganish foydali. Onlayn kurslar, YouTube kanallari, elektron kitoblar, va ta'lim portallari orqali ma'lumotlar to'plashingiz mumkin. Shuningdek, o'zingizni har tomonlama rivojlantirish uchun turli xil ilovalar, masalan, Forest ilovasini ishlatib, diqqatni jamlashni yaxshilashingiz mumkin."],
    # Nega boshqalar kabi tez o'rgana olmayman?
    ["Nega boshqalar kabi tez o'rgana olmayman?",
    "Har bir insonning o'rganish uslubi va tezligi turlicha bo'lishi mumkin. Tez o'rganishning asosiy omillari - o'rganish metodikasi, motivatsiya, diqqat va o'ziga xos maqsadlar. Tez o'rganishning samarali yo'li - o'zingizga mos metodlarni sinab ko'rish va kichik maqsadlar qo'yishdir. Agar siz o'qish usulingizni optimallashtirsangiz va doimiy ravishda takrorlasangiz, o'rganish tezligingizni oshirishingiz mumkin."],
    # Nega boshqalar kabi mustaqil o'rgana olmayman?
    ["Nega boshqalar kabi mustaqil o'rgana olmayman?",
    "Mustaqil o'rganish har kimga bir xil darajada oson bo'lmasligi mumkin. Bu jarayonni muvaffaqiyatli tashkil qilish uchun o'zingizga aniq maqsadlar qo'yish, vaqtni samarali boshqarish va motivatsiyani yuqori tutish muhim. Boshqalar qanday qilib o'rganayotganini kuzatib borish o'rinli bo'lishi mumkin, lekin o'z uslubingizni topish eng muhimi. Mustaqil o'qish odatiga ega bo'lish, vaqt o'tishi bilan yaxshilanadi, shuning uchun sabrli bo'ling."],
    # Qanday qilib ixtiyoriy yangi narsani tez o'rganib olish mumkin?
    ["Qanday qilib ixtiyoriy yangi narsani tez o'rganib olish mumkin?",
    "Yangi narsani tez o'rganish uchun Active Recall va Spaced Repetition kabi samarali o'rganish texnikalarini qo'llash kerak. O'rganayotgan narsangizni bir necha marta takrorlash va turli xil metodlarni sinab ko'rish, o'rganishni tezlashtiradi. Shuningdek, o'rgangan narsalarni doimiy ravishda amaliyotda qo'llash, yodda saqlashni kuchaytiradi. Feynman texnikasi ham o'rganilgan ma'lumotni boshqalarga tushuntirish orqali tez o'rganishga yordam beradi."],

    # Qanday qilib tez o'rganish mumkin?
    ["Qanday qilib tez o'rganish mumkin?",
    "Tez o'rganishning eng samarali usuli - Pomodoro texnikasini qo'llash va o'rganish vaqtini qismlarga ajratish. Masalan, 25 daqiqa o'rganish va 5 daqiqa dam olish. Boshqa usullar ham samarali bo'lishi mumkin, masalan, SQ3R metodi (Survey, Question, Read, Recite, Review). Bu metod sizga matnni tezda o'qib chiqish va uni yaxshiroq eslab qolishga yordam beradi. Diqqatni jamlash va faol eslab qolish metodlari o'rganishni tezlashtiradi."],

    # Mustaqil ta'limni qanday qilib tashkil qilish va bosqarish kerak?
    ["Mustaqil ta'limni qanday qilib tashkil qilish va bosqarish kerak?",
     "Mustaqil ta'limni tashkil qilish uchun quyidagi qadamlarga rioya qilish mumkin:" 
     "1. Ma'lumotni aniqlash: O'zingiz o'rganmoqchi bo'lgan mavzularni aniq belgilang. Bunda IKIGAI konsepsiyasidan foydalanishingiz mumkin"
     "2. Resurslarni tanlash: Kitoblar, onlayn kurslar yoki videolar kabi ishonchli resurslardan foydalaning."
     "3. Maqsadlar qo'yish: SMART (aniq, o'lchab bo'ladigan, vaqtga bog'langan) maqsadlarni  qo'yish."
     "4. Vaqtni rejalashtirish: Har bir o'qish sessiyasining vaqtini va davomiyligini rejalashtirish."
     "5. O'z-o'zini tekshirish: O'rganganlaringizni doimiy ravishda qayta ko'rib chiqing va baholashlar o'tkazing."
     "6. O'zini tahlil qilish: Natijalaringizni tahlil qilib, o'zingizga moslashtiring."],
    # Qanday qilib mustaqil ta'lim oluvchi bo'lish mumkin?
    ["Qanday qilib mustaqil ta'lim oluvchi bo'lish mumkin?",
     "Mustaqil ta'lim olish uchun eng avvalo motivatsiya va o'ziga bo'lgan ishonch kerak. O'zingizga maqsadlar qo'yib, ularni amalga oshirish uchun aniq reja tuzing. Har kuni o'qish vaqtini ajratib, o'qish jarayonini muntazam ravishda davom ettirish juda muhim. Shu bilan birga, o'zini tekshirish va o'qilgan ma'lumotni amaliyotda qo'llash, mustaqil o'rganishning samarali usullaridan biridir."],
    # Qanday qilib lifelong learner bo'lish mumkin?
    ["Qanday qilib lifelong learner bo'lish mumkin?",
    "Lifelong learner (doimiy o'rganuvchi) bo'lish uchun o'zingizni har doim yangi narsalarni o'rganishga rag'batlantirishingiz kerak. Buning uchun turli mavzularni o'rganing, yangi kitoblar o'qing, kurslarga yoziling va yangi qobiliyatlarni rivojlantirishni davom ettiring. Shuningdek, feedback olish va o'rganish jarayonini doimiy ravishda yaxshilashga harakat qilish kerak. O'qish va o'rganishga nisbatan ishtiyoqni rivojlantirish, o'z-o'zini rivojlantirish uchun birinchi qadamdir."],

    # O'rganishda qancha vaqt sarflashim kerak?
    ["O'rganishda qancha vaqt sarflashim kerak?",
     "O'rganish vaqtining aniq miqdori har bir inson uchun farq qiladi, ammo o'rtacha, kuniga 1-2 soat o'rganish samarali bo'ladi. Agar sizning maqsadingiz kattaroq bo'lsa, o'qish vaqtini har haftada asta-sekin oshirishingiz mumkin. O'zingizga dam olish vaqtlarini ham rejalashtiring, chunki muntazam dam olish o'qish jarayonini samarali qiladi."],
    # O'qishdan zerikib ketishim mumkinmi?
    ["O'qishdan zerikib ketishim mumkinmi?",
     "O'qishdan zerikishning oldini olish uchun o'qish metodlarini har xil qilib o'zgartirish zarur. Misol uchun, agar siz kitob o'qiyotgan bo'lsangiz, biror video yoki amaliy mashqlarni sinab ko'ring. Boshqa o'qish uslublarini sinash va o'zgarishlar kiritish zerikishdan qochishga yordam beradi. Shuningdek, o'qishdagi maqsadlaringizni doim qayta ko'rib chiqib, ularni yangilab borish motivatsiyani oshiradi."],
    # Agar muvaffaqiyatsizlikka uchrasam, nima qilishim kerak?
    ["Agar muvaffaqiyatsizlikka uchrasam, nima qilishim kerak?",
     "Muvaffaqiyatsizlikka uchraganingizda, sabrsizlikka tushib qolmang. Bu normal holat va uni o'rganishning bir qismi sifatida ko'ring. Xatoliklardan o'rganish va o'z uslubingizni yangilash uchun tahlil qiling. Kichik muvaffaqiyatsizliklarni oqilona qabul qilish va ularni o'z-o'zini rivojlantirish uchun bir imkoniyat sifatida ko'rish kerak."],
    # O'zimni tahlil qilib, o'rganish jarayonini qanday yaxshilashim mumkin?
    ["O'zimni tahlil qilib, o'rganish jarayonini qanday yaxshilashim mumkin?",
     "O'rganish jarayonini tahlil qilish uchun, o'zingizni o'zaro baholash orqali aniqlang. O'zingizga quyidagilarni so'rang:"
     "- Menga qanday o'qish uslublari mos keladi?"
     "- O'rganishda qanday usullarni qo'llashim kerak?"
     "- Qaysi vaqtlar samarali bo'ladi?"
     "- Maqsadlarimni to'g'ri qo'yganmiman?"
     "- O'zgarishlarni joriy etib, kuchli tomonlaringizni rivojlantiring va yomon odatlarni o'zgartirishga harakat qiling."],

    # Nima uchun doim o'rgangan ma'lumotni amaliyotga qo'llash kerak?
    ["Nima uchun doim o'rgangan ma'lumotni amaliyotga qo'llash kerak?",
     "Amaliyotga qo'llash orqali siz nazariy bilimlarni yaxshiroq o'zlashtirasiz. Har qanday o'rganish jarayoni faqat amaliyot orqali mustahkamlanadi. Feynman texnikasini yoki boshqa amaliyot usullarini qo'llab, o'rganilgan ma'lumotni hayotda qo'llash orqali uni yanada samarali eslab qolishingiz mumkin. Bu sizning bilimlaringizni ta'limga real hayotda bog'lashga yordam beradi."],
    # Growth mindset nima va bu meni qanday rivojlantirishi mumkin?
    ["Growth mindset nima va bu meni qanday rivojlantirishi mumkin?",
    "Growth mindset — bu insonning o'z qobiliyatlarini rivojlantirish va o'zgartirishga bo'lgan ishonchi. Bu fikr, har qanday muvaffaqiyatsizlikni o'rganish imkoniyati sifatida ko'radi, shuning uchun siz o'zingizni doimiy ravishda rivojlantirib borishingiz mumkin. Bu mindset sizga qiyinchiliklardan qo'rqmaslik va xatolardan o'rganish orqali muvaffaqiyatga erishish imkoniyatini beradi. Shunday qilib, siz har doim o'z ustingizda ishlashingiz kerakligini anglaysiz va o'z xatolaringizni o'sish va o'rganish vositasi sifatida qabul qilasiz."],

    # Growth mindsetni qanday rivojlantirishim mumkin?
    ["Growth mindsetni qanday rivojlantirishim mumkin?",
    "Growth mindsetni rivojlantirish uchun, birinchi navbatda o'zingizni va boshqalarni muvaffaqiyatsizlikka qarshi quvnoq va ochiq fikrli bo'lishga rag'batlantirishingiz kerak. Jarayonni qadrlash va natijalarni emas, balki o'rganish va rivojlanishni e'tiborga olish muhim. O'rganish jarayonida katta maqsadlar o'rniga kichik, o'lchab bo'ladigan maqsadlar qo'yish va har bir muvaffaqiyatni bayram qilish kerak. O'rgangan narsangizni amalda qo'llash, o'z-o'zini tahlil qilish va xatolardan o'rganish orqali yangi yondashuvlarni izlang."],

    # Growth mindsetni qanday qilib kundalik hayotimda qo'llay olaman?
    ["Growth mindsetni qanday qilib kundalik hayotimda qo'llay olaman?",
    "Growth mindsetni kundalik hayotda qo'llash uchun har bir vaziyatda qiyinchiliklar va muvaffaqiyatsizliklarni imkoniyatlar sifatida ko'rish kerak. Misol uchun, muvaffaqiyatsizlikni faqat yomon holat sifatida emas, balki o'rgatadigan bir qadam sifatida ko'rish zarur. Shuningdek, har doim yangi narsalar o'rganishga tayyor bo'ling va har bir kichik yutuqni o'z-o'zini rivojlantirish jarayonining bir qismi sifatida qabul qiling."],

    # Agar muvaffaqiyatsizlikka uchraganimda o'zimni motivatsiyasiz his qilsam, nima qilishim kerak?
    ["Agar muvaffaqiyatsizlikka uchraganimda o'zimni motivatsiyasiz his qilsam, nima qilishim kerak?",
    "Muvaffaqiyatsizlikka duch kelganda, avvalo, uni o'rganish imkoniyati sifatida ko'rib chiqing. Tahlil qiling va o'z xatolaringizni tushunib, yangi strategiyalarni ishlab chiqing. Growth mindsetni qabul qilishda eng muhim narsa shundaki, sizni muvaffaqiyatsizlik to'xtatmaydi, balki sizni yanada kuchliroq qiladi. O'zingizni o'zgartirish uchun har bir muvaffaqiyatsizlikdan o'rganing va uni yangi imkoniyat sifatida qabul qiling"],
    # Mustaqil ta'lim olishda muvaffaqiyatga erishish uchun qanday odatlar yaratishim kerak?
    ["Mustaqil ta'lim olishda muvaffaqiyatga erishish uchun qanday odatlar yaratishim kerak?",
     "Mustaqil ta'lim olishda muvaffaqiyatga erishish uchun quyidagi odatlar muhimdir:"
     "Rejalashtirish: Har hafta yoki har oy uchun maqsadlar qo'ying va bu maqsadlarga erishish uchun aniq reja tuzing."
     "Intizom: Har kuni yoki har hafta ma'lum bir vaqtni o'rganishga ajrating."
     "Diqqat(Fokus)ni jamlash: O'rganish vaqtida diqqatni jamlashga yordam beradigan usullarni (Pomodoro texnikasi yoki boshqa usullar) qo'llang."
     "O'z-o'zini baholash: O'rganish jarayonida o'zingizni doimiy ravishda baholang va o'zingizning muvaffaqiyatlaringizni va kamchiliklaringizni ko'rib chiqing."
     "Amaliyot: Nazariy bilimni amaliyotga qo'llang, bu o'rganganlaringizni mustahkamlashga yordam beradi."],

    # Kundalik o'rganish odatini qanday yaratishim mumkin?
    ["Kundalik o'rganish odatini qanday yaratishim mumkin?",
     "Kundalik o'rganish odatini yaratish uchun kichik qadamlar bilan boshlang. Har kuni bir necha daqiqa o'rganishni boshlang va asta-sekin vaqtni oshiring. Dastlabki 21 kunni o'rganish uchun ajratilgan vaqtni muntazam ravishda davom ettirishni maqsad qiling. O'zingizni mukofotlash orqali o'rganish jarayonini qulayroq qiling va bu odatni hayotingizning bir qismiga aylantiring."],

    # O'rganish jarayonida kechikishlarni qanday yengishim mumkin?
    ["O'rganish jarayonida kechikishlarni qanday yengishim mumkin?",
     "Kutilgan natijalarga erishish uchun motivatsiya va tartibga rioya qilish muhim. Kechikishlar(proktinastiya)ni yengish uchun kichik maqsadlar qo'yish va har kuni amalga oshiriladigan vazifalarni o'z vaqtida bajarishga harakat qiling. O'z-o'zini nazorat qilish va bajarilishi kerak bo'lgan vazifalarni joriy qilish ham kechikishlarni kamaytiradi. Shuningdek, o'z yutuqlaringizni bayram qilish va har bir kichik yutuqni qadrlash motivatsiyangizni oshiradi."],

    #   O'rganishni kundalik hayotimga qanday samarali ravishda integratsiya qilsam bo'ladi?
    ["O'rganishni kundalik hayotimga qanday samarali ravishda integratsiya qilsam bo'ladi?",
     "O'rganishni kundalik hayotingizga integratsiya qilish uchun qisqa vaqtli, lekin samarali o'rganish sessiyalarini o'rnatishingiz mumkin. Har kuni 20-30 daqiqa vaqtni o'rganishga ajratish, o'qish yoki yangi bilimlarni ishlatish uchun imkoniyat yaratadi. Hayotingizdagi har bir faoliyatni o'rganish imkoniyati sifatida ko'ring. Masalan, yangi so'zlarni eslab qolish uchun kundalik suhbatlarda ulardan foydalaning yoki o'rgangan bilimlaringizni amaliyotda sinab ko'ring."],
    # O'rganishga qiynalyapman
    ["O'rganishga qiynalyapman",
     "O'rganish qiyin bo'lishi mumkin, lekin bu har bir kishining o'ziga xos jarayoni. Ba'zi maslahatlar:"
     "- O'qish va o'rganishni kichik qismlarga ajrating."
     "- Fikrlaringizni tartibga soling va diqqatni jamlashga harakat qiling."
     "- O'zingizni motivatsiya qilish uchun o'rganish jarayonini qiziqarli qilishga harakat qiling."
     "- Yaxshi dam olishni unutmang, chunki ortiqcha charchoq o'rganish samaradorligini kamaytiradi."],
    # Mustaqil o'rganishga qiynalyapman
    ["Mustaqil o'rganishga qiynalyapman",
     "Mustaqil o'rganish boshida biroz qiyin bo'lishi mumkin, chunki bu o'zini tashkillashtirishni va intizomni talab qiladi. Biroq, ba'zi foydali usullar mavjud:"
     "- Ma'qsad qo'ying: Aniq va o'lchovli maqsadlar belgilab oling. Masalan, Bir hafta ichida yangi mavzu o'rganish kabi."
     "- Reja tuzing: Har kuni o'rganishga ajratilgan vaqtni rejalashtiring."
     "- Resurslar tanlang: O'rganish uchun eng yaxshi manbalarni toping – video darsliklar, kitoblar, maqolalar, va boshqalar."
     "- Refleksiya: O'zingizni baholab ko'ring va qaysi joylarda kuchli, qaysi joylarda kuchsiz ekanligingizni aniqlang."],
    # Mustaqil ta'limga qiynalyapman
    ["Mustaqil ta'limga qiynalyapman",
     "Mustaqil ta'limni samarali amalga oshirish uchun quyidagi maslahatlarni qo'llang:"
     "- O'qish muhitini yaratish: Diqqatni jamlash uchun tinch va qulay o'rganish joyini toping."
     "- Motivatsiya toping: O'rganish maqsadlaringizni eslatib turadigan biror narsa yaratish, masalan, qisqa muddatli maqsadlar yoki o'zingizni rag'batlantirish."
     "- Doimiy tekshirish: O'zingizni muntazam ravishda tekshirib turing, bu qanchalik o'zlashtirilganini va qayerda yordam kerakligini bilib olishda yordam beradi."],
    # Mustaqil ta'lim olishga qiynalyapman
    ["Mustaqil ta'lim olishga qiynalyapman",
     "Mustaqil ta'limni samarali amalga oshirish uchun quyidagi maslahatlarni qo'llang:"
     "- O'qish muhitini yaratish: Diqqatni jamlash uchun tinch va qulay o'rganish joyini toping."
     "- Motivatsiya toping: O'rganish maqsadlaringizni eslatib turadigan biror narsa yaratish, masalan, qisqa muddatli maqsadlar yoki o'zingizni rag'batlantirish."
     "- Doimiy tekshirish: O'zingizni muntazam ravishda tekshirib turing, bu qanchalik o'zlashtirilganini va qayerda yordam kerakligini bilib olishda yordam beradi."],

    # Qanday qilib mustaqil ta'lim olsa bo'ladi?
    ["Qanday qilib mustaqil ta'lim olsa bo'ladi?",
     "Mustaqil ta'lim olish uchun bir nechta samarali yondashuvlar mavjud:"
     "- O'rganish rejasini tuzing: Kichik maqsadlar qo'yib, har birini amalga oshirishga harakat qiling. Har bir kichik yutuq sizni yanada kuchliroq qilishi mumkin."
     "- Resurslarni aniqlang: Onlayn kurslar, YouTube kanallari, kitoblar, va forumlar orqali o'rganish materiallarini toping. Masalan, Coursera, Udemy, edX, va Khan Academy kabi saytlardan foydalaning."
     "- Amaliyot qilish: O'rgangan narsangizni amaliyotda sinab ko'ring. Bu sizning bilimlaringizni mustahkamlashga yordam beradi."
     "- Refleksiya: O'zingizni muntazam ravishda baholab, o'zingizni qanday yaxshilash mumkinligini o'ylang."],

]


# Train the chatbot
for conversation in uzbek_corpus:
    trainer.train(conversation)

# Function to get a response with a default fallback
def get_chatbot_response(user_input):
    response = chatbot.get_response(user_input)
    if response.confidence < 0.5:  # Adjust the confidence threshold as needed
        return "Kechirasiz, bu savolga javob bera olmayman. Iltimos, boshqa savol bering."
    return response