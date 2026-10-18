const BlogData = [
  {
    id: 1,
    isFeatured: true,
    mainImage: "/assets/images/blog/medical-outreach-3.jpg",
    slug: "Preventive-Healthcare-Outreach-Monastery",
    title: "Preventive Healthcare Outreach Monastery",
    metadata: `
      At Gracespring Hospitals, we believe that healthcare extends beyond the walls of our clinics. Recently, our medical team organized a comprehensive Preventive Healthcare Outreach at Monastery Road to bring vital health screenings directly to the community.
    `,
    subTitleA: "Bringing Health to the Community",
    bodyA: `
        The initiative focused on early detection and routine checkups, which are critical in improving long-term health outcomes. Hundreds of residents participated, receiving free blood pressure checks, blood sugar monitoring, and personalized wellness consultations from our expert physicians and nurses.
    `,
    // ADDED: Side-by-side images for the content body
    contentImages: [
      "/assets/images/blog/medical-outreach-3.jpg",
      "/assets/images/blog/Journey of Recovery.jpg" // Using available local assets as placeholders
    ],
    subTitleB: "The Power of Early Detection",
    bodyB: `
      Many chronic illnesses, such as hypertension and diabetes, show no early symptoms. Through outreach programs like this, we identify individuals at risk before their conditions escalate, offering them immediate medical advice and referrals to specialist care.
    `,
    subTitleC: "Community Impact:",
    bodyC: `
      The response from the Monastery Road community was overwhelmingly positive. Gracespring Hospitals remains committed to breaking down barriers to healthcare access. By prioritizing preventive care, we are building a healthier, stronger community together.
    `,
    bulletedTitleA: "Key Services Provided During the Outreach:",
    bulletedBodyA: [
      `Blood Pressure & Vital Signs Monitoring: Identifying risks for hypertension and cardiovascular diseases.`,
      `Blood Sugar Testing: Early screening for diabetes to prevent long-term complications.`,
      `Nutritional Counseling: Educating residents on balanced diets and healthy lifestyle choices.`,
      `Pediatric Consultations: Ensuring the youngest members of the community meet their developmental milestones.`,
      `Medication Dispensation: Providing essential supplements and basic medications free of charge.`
    ],
    tags: ["#MedicalOutreach", "#PreventiveCare", "#GracespringHospitals"],
    publishedAt: "June 16, 2026",
  },

  {
    id: 2,
    isFeatured: true,
    mainImage: "/assets/images/blog/Journey of Recovery.jpg",
    slug: "Journey-of-Recovery",
    title: "A Journey of Recovery & Hope",
    metadata: `
      Healing is rarely a straight line. For many of our patients at Gracespring Hospitals, the journey to recovery requires not just clinical excellence, but deep compassion, resilience, and unwavering support from our multidisciplinary medical team.
    `,
    subTitleA: "Overcoming the Odds",
    bodyA: `
      When Mr. Adebayo arrived at our emergency wing following a severe accident, the prognosis was uncertain. His treatment plan required immediate surgical intervention followed by months of intensive physiotherapy. Our orthopedic surgeons and rehabilitation specialists worked tirelessly to chart a path forward.
    `,
    contentImages: [
      "/assets/images/blog/Journey of Recovery.jpg",
      "/assets/images/blog/medical-outreach-3.jpg" 
    ],
    subTitleB: "Compassionate Care in Action",
    bodyB: `
      Recovery isn't just physical; it's emotional. Our nursing staff and clinical psychologists played a crucial role in maintaining his morale during the most difficult phases of rehabilitation. By celebrating small milestones—from his first unaided step to his eventual discharge—we ensured he never walked alone.
    `,
    subTitleC: "A Brighter Future",
    bodyC: `
      Today, Mr. Adebayo has returned to his family and his career, a testament to what is possible when advanced medical technology meets human compassion. His story inspires our entire staff to continue delivering world-class care every single day.
    `,
    bulletedTitleA: "The Pillars of Our Recovery Programs:",
    bulletedBodyA: [
      `Multidisciplinary Approach: Surgeons, therapists, and counselors collaborating on unified care plans.`,
      `State-of-the-Art Rehabilitation: Utilizing modern therapeutic equipment to accelerate healing.`,
      `Mental Health Support: Addressing the psychological trauma that often accompanies severe physical injuries.`,
      `Family Involvement: Educating and supporting the patient's family to assist in long-term home care.`
    ],
    tags: ["#PatientStory", "#Recovery", "#HealthcareHeroes"],
    publishedAt: "August 12, 2026",
  },

  {
    id: 3,
    isFeatured: true,
    mainImage: "/assets/images/blog/breast-cancer.jpeg",
    slug: "Breast-Cancer-Awareness-Early-Detection-Saves-Lives",
    title: "Breast Cancer Awareness: Early Detection Saves Lives",
    metadata: `
      Breast cancer remains one of the most common cancers affecting women worldwide. At Gracespring Hospitals, our oncology and women's health departments are dedicated to spreading awareness, encouraging regular screenings, and providing cutting-edge treatment options.
    `,
    subTitleA: "Why Early Screening Matters",
    bodyA: `
      When breast cancer is detected early, and is in the localized stage, the 5-year relative survival rate is incredibly high. Regular mammograms and clinical breast exams are the most effective ways to detect the disease before physical symptoms even appear.
    `,
    contentImages: [
      "/assets/images/blog/breast-cancer.jpeg",
      "/assets/images/blog/medical-outreach-3.jpg" 
    ],
    subTitleB: "Understanding Your Risks",
    bodyB: `
      While age, genetics, and family history play a significant role in breast cancer risk, lifestyle factors such as diet, physical activity, and alcohol consumption also contribute. Our specialists offer personalized risk assessments to help patients make informed health decisions.
    `,
    subTitleC: "Gracespring's Comprehensive Care",
    bodyC: `
      From advanced diagnostic imaging to surgical oncology and supportive survivorship programs, we walk with our patients through every step of their journey. Remember, you are your best advocate—schedule your routine screening today.
    `,
    bulletedTitleA: "Proactive Steps for Breast Health:",
    bulletedBodyA: [
      `Schedule Annual Mammograms: Recommended for women starting at age 40, or earlier if there is a family history.`,
      `Perform Monthly Self-Exams: Familiarize yourself with how your breasts normally look and feel, and report any changes to your doctor immediately.`,
      `Maintain a Healthy Weight: Engage in regular physical activity and eat a balanced, nutrient-dense diet.`,
      `Know Your Family History: Discuss your genetic risks with a healthcare provider to determine if early or genetic screening is right for you.`
    ],
    tags: ["#BreastCancerAwareness", "#WomensHealth", "#EarlyDetection"],
    publishedAt: "October 1, 2026",
  }
];

export default BlogData;


// const BlogData = [

//   {
//     id: 1,
//     isFeatured: true, // <--- ADD THIS
//     mainImage: "/assets/images/blog/medical-outreach-3.jpg",
//     slug:"World-Diabetes-Day-Prioritizing-Well-being-for-a-Better-Diabetes-Life",
//     title: "Preventive Healthcare Outreach Monastery",
//     metadata: `
//       World Diabetes Day (WDD) Preventive Healthcare Outreach Monastery Road is a significant global event that shines a light on the ongoing challenges faced by millions of people living with diabetes. Held every year on November 14th, this day aims to raise awareness about diabetes, its impact on individuals, and the necessary steps we can take to prevent and manage this condition. The theme for World Diabetes Day from 2024 to 2026 is Diabetes and Well-being, focusing on the physical, societal, and mental health aspects of living with diabetes.

//       Diabetes is not only a physical challenge but also has profound effects on the mental and emotional well-being of those affected. According to a global survey by the International Diabetes Federation (IDF), approximately 77% of people living with diabetes have reported experiencing anxiety, depression, or other mental health conditions due to their condition. Additionally, many people struggle with what is referred to as diabetes burnout, which refers to the emotional and psychological strain of managing the condition on a daily basis.

//     `,
//     subTitleA: "World Diabetes Day: Prioritizing Well-being for a Better Diabetes Life",
//     bodyA: `
//         This World Diabetes Day, we aim to highlight the importance of prioritizing well-being in diabetes care. While managing blood sugar is vital, we must also focus on providing emotional support, mental health care, and community connection to improve the overall quality of life for people living with diabetes. Here are some essential tips for preventing and managing diabetes to promote overall well-being:
//     `,
//     subTitleB: "Support and Well-being for Those Living with Diabetes:",

//     bodyB: `
//       For those already living with diabetes, maintaining both physical and emotional well-being is essential. In addition to medical treatments and lifestyle changes, it’s crucial to seek support from healthcare providers, family, friends, and diabetes communities. People living with diabetes are encouraged to speak with their healthcare providers about any emotional challenges they may face and explore mental health resources that can help manage stress, anxiety, and depression.
//     `,

//     subTitleC: "Let’s Make a Difference:",
//     bodyC: `
//       World Diabetes Day serves as a reminder of the importance of accessible healthcare and the need for better support for people living with diabetes. By joining the global movement, we can raise awareness about the impact of diabetes on both physical and mental well-being and advocate for better care, support, and resources for those living with the condition.

//       This World Diabetes Day, let’s commit to prioritizing well-being and improving the lives of those affected by diabetes. Together, we can make a difference and create a better future for all.
//     `,

//     bulletedTitleA: "Tips to Prevent Diabetes:",
//     bulletedBodyA: [
//       `Maintain a Healthy Weight: Excess weight is a major risk factor for type 2 diabetes. Achieving and maintaining a healthy weight through regular physical activity and balanced nutrition can help reduce the risk of developing diabetes.`,
    
//       `Exercise Regularly: Regular physical activity, such as walking, cycling, or swimming, helps improve insulin sensitivity and blood sugar control. Aim for at least 30 minutes of moderate exercise most days of the week.`,

//       `Eat a Balanced Diet: Focus on a diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Limiting the intake of sugary foods and drinks, processed snacks, and refined carbohydrates can help manage blood sugar levels.`,

//       `Monitor Your Blood Sugar Levels: Regular blood sugar monitoring can help detect early signs of diabetes. If you are at risk, consult with a healthcare provider to keep track of your blood sugar and take early preventive action.`,

//       `Stay Hydrated: Drinking plenty of water can help control blood sugar levels and prevent dehydration, which is a common problem for people with diabetes.`,

//       `Manage Stress: Chronic stress can negatively impact blood sugar levels. Practicing relaxation techniques like meditation, yoga, or deep breathing can help reduce stress and improve overall well-being.`,

//       `Get Regular Sleep: Poor sleep can contribute to weight gain and insulin resistance. Aim for 7-9 hours of quality sleep each night to support overall health.`,

//       `Avoid Smoking and Limit Alcohol: Smoking and excessive alcohol consumption can increase the risk of developing diabetes. If you smoke, seek support to quit, and if you drink alcohol, do so in moderation.`

//     ],

//     tags: ["#WorldDiabetesDay #Diabetes"],
//     publishedAt: "14th November",
//   },

//   {
//     id: 2,
//     isFeatured: true, // <--- ADD THIS
//     mainImage: "/assets/images/blog/Journey of Recovery.jpg",
//     slug:"Journey-of-Recovery",
//     title: "Journey of Recovery",
//     metadata: `
//       Today, we honour and celebrate the dedication, compassion, and expertise of doctors worldwide. These medical professionals play a crucial role in saving lives, promoting health, and advancing medical science.

//       Doctors commit themselves to long hours of rigorous training, research, and patient care, upholding the principles of the Hippocratic Oath and ensuring the well-being of individuals and communities. They stand on the frontlines during health crises, pandemics, and emergencies, often sacrificing their own comfort to care for others.

//       On this special day, let’s express gratitude to all doctors for their unwavering service, medical innovations, and life-changing impact. It’s also an opportunity to raise awareness about the challenges facing healthcare professionals, including burnout, mental health struggles, and the need for continuous support and recognition.

//       Let’s celebrate and appreciate doctors for their selfless contributions to society!

//     `,
//     subTitleA: "",
//     bodyA: ``,
//     subTitleB: "",

//     bodyB: ``,

//     subTitleC: "",
//     bodyC: ``,

//     bulletedTitleA: "",
//     bulletedBodyA: [``],

//     tags: ["#HappyDoctorsDay", "#DoctorsDay", "#Doctors", "#DoctorsLife", "#DoctorsOfInstagram", "#NationalDoctorsDay", "#Medicine ", "#DoctorsOffice", "#DoctorStranger", "#DoctorsWithoutBorders", "#DoctorWho", "#DoctorsLifestyle", "#DoctorsDiary", "#MedicalLife", "#MedSchool", "#Gastroscopy", "#Endoscopy", "#HealthFirst", "#LiverHealth", "#LifestyleCoach", "#WellnessCare", "#Gastroenterologist", "#H8althOclock8pm", "#HealthOclock", "#HealthEducation", "#HealthInspiration"],
//     publishedAt: "14th November",
//   },

//   {
//     id: 3,
//     isFeatured: true,
//     mainImage: "/assets/images/blog/breast-cancer.jpeg",
//     slug:"WORLD-DOWN-SYNDROME-DAY-END-THE-STEREOTYPES",
//     title: "WORLD DOWN SYNDROME DAY: END THE STEREOTYPES",
//     metadata: `
//       Every year, World Down Syndrome Day raises awareness about Down Syndrome, a genetic condition where an individual has an extra chromosome 21. While most people are born with 46 chromosomes, individuals with Down Syndrome have 47, which can impact their physical growth, intellectual development, and overall health.

//     `,
//     subTitleA: "",
//     bodyA: ``,

//     subTitleB: "Breaking the Stereotypes",

//     bodyB: `
//       This year’s theme, “End The Stereotypes”, encourages society to challenge misconceptions and promote inclusivity. People with Down Syndrome are capable, talented, and valuable members of society who deserve equal opportunities in education, employment, and community life.
//       Let’s spread awareness, acceptance, and love! ❤️💙
//     `,

//     subTitleC: "",
//     bodyC: ``,

//     bulletedTitleA: "Understanding Down Syndrome",
//     bulletedBodyA: [
//       `💡 Prevalence: According to the United Nations, Down Syndrome occurs in about 1 in 1,000 to 1 in 1,100 live births, affecting 3,000–5,000 infants annually worldwide.`,
    
//       `💡 Causes: The exact cause of Down Syndrome remains unknown, but it has been part of the human experience across all races, cultures, and socio-economic backgrounds.`,

//       `💡 Health & Well-being: People with Down Syndrome may have mild to moderate intellectual disabilities, but with early intervention, inclusive education, and healthcare support, they can lead fulfilling and independent lives.`

//     ],

//     tags: ["#DownSyndrome",  "#Diabetes"],
//     publishedAt: "14th November",
//   },

//   {
//     id: 4,
//     mainImage: "/images/blog/egg-day.jpg",
//     slug:"The-Incredible-Benefits-of-Eggs-A-Superfood-for-All-Ages-",
//     title: "The Incredible Benefits of Eggs: A Superfood for All Ages! 🍳",
//     metadata: `
//       Did you know that one to two eggs per day can significantly boost your overall health? 🏋️‍♂️✨ Packed with high-quality protein, vitamins, and essential nutrients, eggs are a nutritional powerhouse for people of all ages!

//     `,
//     subTitleA: "🥚 Cholesterol & Heart Health: The Truth",
//     bodyA: `Many people worry about cholesterol, but research indicates that eating eggs daily can actually increase HDL (good cholesterol) while balancing LDL (bad cholesterol) levels. Those with cardiovascular diseases or high cholesterol should aim for moderate intake (about 3 eggs per week) for safety 🩺💙.`,

//     subTitleB: "🥚 The Perfect Superfood for Your Diet",
//     bodyB: `Eggs are affordable, nutrient-dense, and versatile—perfect for any meal of the day! Whether boiled, scrambled, or poached, they make a tasty and healthy addition to your diet 🍳👌.

//     🥚 What's your favorite way to eat eggs? Let us know in the comments! ⬇️

//     📌 Stay informed, eat smart, and live healthy!

//     🔖 Hashtags for Visibility & Engagement`,
//     subTitleC: "",
//     bodyC: ``,

//     bulletedTitleA: "🥚 Why You Should Eat Eggs Daily",
//     bulletedBodyA: [
//       `Boosts Immunity & Brain Function – Rich in choline and omega-3 fatty acids, eggs support brain health, memory, and cognitive function 🧠💡.`,
    
//       `Supports Lactation & Child Growth – Essential for breastfeeding mothers and children's development, helping in optimal growth and nourishment 🍼👶.`,

//       `Aids in Malnutrition & Muscle Repair – A cost-effective solution to combat malnourishment and build muscle strength 💪🥗.`,

//       `Heart-Healthy Choice – Studies show that one egg daily does not significantly increase cholesterol or cardiovascular risks for most healthy adults ❤️🏃‍♂️.`,

//       `Supports Liver Health – For those with liver diseases, moderate egg consumption (1-2 eggs/day) provides essential protein to prevent muscle breakdown. However, in cases of hepatic encephalopathy (confusion due to liver disease), egg intake should be monitored carefully 🏥.`

//     ],

//     tags: ["#EggBenefits", "#HealthyEating", "#Superfood", "#NutritionFacts", "#HeartHealth", "#EggsForLife", "#ProteinPower", "#WellnessCare", "#BrainFood", "#ChildNutrition", "#LiverHealth", "#MedicalDoctor"],
//     publishedAt: "14th November",
//   },

//   {
//     id: 5,
//     mainImage: "/images/blog/handwash.jpg",
//     slug:"Global-Handwashing-Day-Celebrating-the-Power-of-Clean-Hands",
//     title: "Global Handwashing Day: Celebrating the Power of Clean Hands",
//     metadata:
//       "Every year on October 15th, we observe Global Handwashing Day, a worldwide initiative dedicated to promoting the importance of handwashing with soap as an effective and affordable way to prevent diseases and save lives.",
      
//     subTitleA: "The Importance of Handwashing",
//     bodyA: `Proper hand hygiene is our first line of defense against illnesses. Regular handwashing with soap can prevent the spread of infections and diseases, including respiratory and intestinal illnesses. Studies have shown that handwashing in schools can lead to fewer diarrhea-related sicknesses and respiratory infections, which can result in fewer missed school days.`,

//     subTitleB: "",
//     bodyB: `Remember, clean hands save lives! Let's make handwashing with soap a habit to protect ourselves and our communities. `,
//     subTitleC: "",
//     bodyC: ``,

//     bulletedTitleA: "How to Wash Your Hands Effectively",
//     bulletedBodyA: [
//       `Wet your hands with clean, running water (warm or cold), turn off the tap, and apply soap.`,
    
//       `Lather your hands by rubbing them together with the soap. Be sure to lather the backs of your hands, between your fingers, and under your nails.`,

//       `Scrub your hands for at least 20 seconds. Need a timer? Hum the "Happy Birthday" song from beginning to end twice.`,

//       `Heart-Healthy Choice – Studies show that one egg daily does not significantly increase cholesterol or cardiovascular risks for most healthy adults ❤️🏃‍♂️.`,

//       `Dry your hands using a clean towel or air dry them.`

//     ],

//     tags: ["#GlobalHandwashingDay ", "#CleanHandsSaveLives", "#HandHygiene", "#StayHealthy"],
//     publishedAt: "14th November",
//   },

//   {
//     id: 6,
//     mainImage: "/images/blog/keep-knocking.jpg",
//     slug:"Keep-knocking-for-behind-each-persistent-tap-lies-the-door-to-resilience-and-triumph",
//     title: "Keep knocking, for behind each persistent tap lies the door to resilience and triumph.",
//     metadata:
//       `Life is a journey filled with obstacles and setbacks, and it often feels like we are knocking on closed doors, waiting for an opportunity to open. Yet, it’s in those moments of uncertainty that the essence of persistence reveals its true power. The simple act of continuing to knock, to keep pushing forward despite setbacks, is where the true strength lies. When we persist, we unlock not only external opportunities but also personal growth that prepares us to embrace success in all its forms.
//       `,
  
//       subTitleB: "Monday Motivation",
//       bodyB: `
//           Every day is a new opportunity to test your limits. Mondays, in particular, have long been associated with new beginnings. They symbolize the start of a fresh week, a chance to re-align your goals and set your intentions. But for many, Mondays also come with a sense of dread—reminiscent of the burdens of the week ahead. It’s easy to let doubt take over, but it’s crucial to remember that each tap on the door you face is a step closer to something extraordinary. Whether it’s a promotion, a new project, or personal growth, the door to success is opened with the key of persistence. By continuing to knock, you create momentum that fuels progress, even when it feels like nothing is happening.
//       `,
//       subTitleC: "",
//       bodyC: `
//           In conclusion, #TriumphThroughTenacity is not just a phrase—it’s a way of life. When you embody persistence, resilience, and tenacity, you transform every obstacle into an opportunity. Every knock on the door brings you closer to your goals, and no matter how long it takes, the persistence you display will lead to triumph. So, keep knocking. Keep pushing forward. The door to success is closer than you think.
//       `,
  
//       bulletedTitleA: "Motivation",
//       bulletedBodyA: [
        
//         `When we encounter challenges, it’s easy to feel like we’re knocking on a door that will never open. Yet, the reality is that success is often just beyond our reach, and the breakthrough moment can arrive when we least expect it. #KnockToRise symbolizes this process of climbing upward despite obstacles. The simple act of knocking represents your effort, your hope, and your belief that something better is waiting behind the door. But this hope is not passive; it is coupled with relentless action and the willingness to keep going, even when it seems like the door is impervious to your knocks.`,

//         `Each “tap” on the door represents not just an attempt but a piece of your growth. #DoorwayToSuccess is not a one-time event, but an ongoing process that requires determination and patience. Behind each door lies the potential to transform your life in ways that are unimaginable right now. Success is not just a destination—it’s a journey. And the act of knocking is a reminder that the only way forward is through consistent effort and the belief that your persistence will eventually be rewarded.`,

//         `#TenacityUnleashed is the power that fuels persistence. When we unleash tenacity, we break through mental barriers and unlock a mindset capable of achieving remarkable things. This strength doesn’t come from an easy path—it comes from a mindset that refuses to give up. The human spirit, when tempered with tenacity, becomes unshakable. It allows us to continue even when the odds are stacked against us, knowing that each knock brings us one step closer to the triumph we seek.`,

//         `#ResilientJourney is not always easy to navigate, but it’s the path to becoming stronger, wiser, and more capable. Every knock you make on the door of success is a testament to your resilience. Resilience is not about avoiding failure but about using failure as a stepping stone. It’s the courage to keep moving forward even when it feels like there’s no progress, because true growth happens when we push beyond our limits.`,

//         `#KeepOnKnocking is a reminder that persistence is not a sprint; it’s a marathon. There will be days when you feel like giving up, when the door seems far from opening, but it’s in these moments that you must remind yourself of the importance of the journey. Each knock is a step in the right direction. It’s proof that you’re not giving up. You’re taking charge, shaping your destiny, and moving toward the success that awaits on the other side.`,

//         `#EnduranceElevated emphasizes the importance of endurance in the pursuit of our dreams. Success is not handed to us—it is earned through effort and perseverance. The journey might be tough, but with each step, you elevate your endurance. You become stronger. You become wiser. You become more capable of achieving the success you’ve always dreamed of.`,

//         `#PersistentSpirit is the driving force behind every success story. It is that inner spark that refuses to be extinguished, no matter the obstacles that come in your path. A persistent spirit is unyielding, never satisfied with anything less than the realization of your goals. It’s what keeps you motivated when the world tells you to stop, and it’s what propels you toward greatness when others have given up.`,

//         `Persist And Prevail Persistence is more than just showing up day after day; it’s about maintaining focus in the face of adversity. Every failed attempt is not a defeat, but a lesson that fortifies you for the challenges ahead. #PersistAndPrevail is more than just a hashtag—it’s a mindset that acknowledges the struggles while recognizing that each hurdle is an opportunity for growth. Resilience is not a trait you're born with but a quality that develops over time as you face and conquer difficulties. It’s the refusal to stay down after a fall, the will to continue forward despite what seems to be insurmountable odds.`,
      
//       ],
  
//       tags: ["#MondayMotivation", "#HealthyEating", "#Superfood", "#NutritionFacts", "#HeartHealth", "#EggsForLife", "#ProteinPower", "#WellnessCare", "#BrainFood", "#ChildNutrition", "#LiverHealth", "#MedicalDoctor"],
//       publishedAt: "14th November",
//   },

//   {
//     id: 7,
//     mainImage: "/images/blog/kidney-day.jpg",
//     slug:"World-Kidney-Day-Raising-Awareness-About-Kidney-Health",
//     title: "World Kidney Day: Raising Awareness About Kidney Health",
//     metadata:
//       "World Kidney Day is an important global event observed every year to raise awareness about kidney health and encourage the prevention and early detection of kidney disease. It serves as a reminder that kidney disease often goes unnoticed until it reaches an advanced stage. Here are key points to consider for this year's observance:",
      
//     subTitleA: "What is World Kidney Day",
//     bodyA: `
//           World Kidney Day is celebrated on the second Thursday of March each year.
//           The event aims to raise awareness about the importance of kidneys and reduce the frequency and impact of kidney disease globally.
//           It is observed by healthcare professionals, organizations, and individuals around the world, united in the effort to promote kidney health.
//     `,

//     subTitleB: "Statistics on Kidney Disease",
//     bodyB: `Approximately 1 in 10 adults worldwide is affected by kidney disease, with many being unaware of their condition.
//             Chronic kidney disease (CKD) is a leading cause of death globally, with millions suffering from its effects.
//             Kidney disease often goes undiagnosed because its symptoms are subtle and can be mistaken for other health conditions.
//           `,
//     subTitleC: "Signs and Symptoms of Kidney Disease",
//     bodyC: `Fatigue, swollen feet or ankles, and shortness of breath are common signs.
//             Changes in urination, such as more or less frequent urination or blood in the urine.
//             Unexplained weight loss, nausea, and persistent itching may also indicate kidney issues.
//             If you experience any of these symptoms, it is important to consult a healthcare provider for kidney screening.
//           `,

//     bulletedTitleA: "The Importance of Kidney Health",
//     bulletedBodyA: [
//       `Kidneys are vital organs that filter waste products from the blood, regulate blood pressure, and maintain fluid balance in the body.`,
    
//       `Healthy kidneys are essential for overall well-being, and they help control electrolyte levels and produce important hormones.`,

//       `Kidney disease is often silent in its early stages, making early detection crucial for preventing long-term complications.`,

//     ],

//     tags: ["#Raise awareness by sharing information about kidney health on social media, using the hashtags #WorldKidneyDay and #KidneyHealthForAll.", "#Support kidney health organizations by donating or volunteering to help advance research and patient support services.", "#Participate in local events, walks, or virtual campaigns designed to raise awareness and funds for kidney disease prevention and treatment.", ],
//     publishedAt: "14th November",
//   },

//   {
//     id:8,
//     mainImage: "/images/blog/mens-day.jpg",
//     slug:"Celebrating-Men-Making-a-Difference",
//     title: "Celebrating Men Making a Difference",
//     metadata:
//         `International Men’s Day is more than just a day of celebration—it’s an opportunity to reflect, recognize, and redefine the roles men play in society. Every year, on November 19, the world comes together to honor men’s contributions, challenge societal stereotypes, and promote important conversations about mental health, gender equality, and positive masculinity.

//         This year’s theme encourages us to unite in reshaping perceptions and fostering a more compassionate world. Here’s why we should celebrate and support International Men’s Day

//         `,
//     subTitleA: "Celebrating Men Making a Difference",
//     bodyA: `International Men’s Day serves as a platform to highlight the achievements of men who are making positive contributions to society.
//             Whether through their work in the community, leadership in various fields, or everyday acts of kindness, men play a crucial role in building a better future for everyone.
//             #PositiveMasculinity is all about embracing a vision of masculinity that values empathy, emotional intelligence, and kindness, breaking away from traditional, harmful stereotypes.

//           `,

//     subTitleB: "Challenging Stereotypes",
//     bodyB: `Societal expectations often place restrictive labels on men, from “tough” to “emotionally distant.” It’s time to break the mold and redefine what it means to be a man.
//     Men can be vulnerable, nurturing, and emotionally expressive, and these qualities should be celebrated, not suppressed.
//     #BreakTheMold encourages men to embrace their authentic selves, without fear of judgment or conformity to outdated ideals.
//     `,
//     subTitleC: "Promoting Mental Health Awareness",
//     bodyC: `Mental health is one of the most pressing issues that men face today. Yet, many men feel hesitant to speak out about their struggles due to the stigma surrounding mental health in traditional masculinity.
//     By raising awareness about mental health on #IMD2025, we create an environment where men feel safe to discuss their challenges and seek help when needed.
//     It’s vital to promote open conversations about mental health, especially in communities where emotional well-being is often overlooked.International Men’s Day offers us the chance to celebrate the incredible contributions of men while acknowledging the challenges they face. By breaking down outdated stereotypes, promoting mental health awareness, and fostering gender equality, we can build a world where everyone—regardless of gender—can feel valued and supported.

//     So, join the movement this #IMD2025 and help spread the message of positive masculinity, emotional health, and equality. Together, we can build a better tomorrow for everyone.

//     `,

//     bulletedTitleA: "Spotlighting Male Role Models and Celebrating the Supermen Among Us",
//     bulletedBodyA: [
//       `Role models have a significant impact on shaping future generations. On International Men’s Day, we honor the male figures who inspire others through their positive actions and leadership.`,
    
//       `These role models provide a framework for younger men to understand the importance of kindness, respect, integrity, and responsibility. They demonstrate how to use power for good, serve as mentors, and help others overcome challenges.`,

//       `#MaleRoleModels embody values that contribute to healthier communities, making it possible for others to follow their lead and strive to create positive change in their own lives.`,

//       `Heart-Healthy Choice – Studies show that one egg daily does not significantly increase cholesterol or cardiovascular risks for most healthy adults ❤️🏃‍♂️.`,

//       `Every man has the potential to be a “superman” in his own unique way—whether it’s through everyday acts of courage, strength, and kindness or through significant personal achievements.`,

//       `#Supermen are the fathers, sons, brothers, and friends who dedicate themselves to helping others, showing up when it matters most, and being a source of strength in times of adversity.`,

//       `By celebrating these supermen, we encourage men to see their worth beyond traditional measures of success and redefine what it means to be strong and capable.`

//     ],

//     tags: ["#IMD2025"],
//     publishedAt: "14th November",
//   },

//   {
//     id: 9,
//     mainImage: "/images/blog/obesity-day.jpg",
//     slug:"Obesity-A-Global-Health-Challenge",
//     title: "Obesity: A Global Health Challenge",
//     metadata:
//       `Did you know that 1 in 8 people worldwide live with obesity, and 43% of adults are overweight, with 16% classified as obese? These staggering statistics highlight the growing obesity crisis, which affects millions of individuals across the globe, contributing to serious health risks such as heart disease, diabetes, and other chronic conditions.`,
//     subTitleA: "Understanding Obesity:",
//     bodyA: `Obesity occurs when a person has excessive body fat that can negatively affect their health.
//             Being overweight or obese is determined by the Body Mass Index (BMI), a simple measurement based on height and weight.
//             The higher the BMI, the higher the risk of developing health complications, including hypertension, stroke, and certain cancers.`,

//     subTitleB: "How to Take Control of Your Health:",
//     bodyB: `tart with Your BMI: One of the simplest ways to assess your risk for obesity-related health problems is by calculating your BMI.
//     Healthy Lifestyle Choices: Adopting a balanced diet, increasing physical activity, and managing stress can help prevent and reverse obesity.
//     Get Support: Consulting with healthcare professionals, nutritionists, or weight loss programs can provide the guidance needed to reach your goals.`,
//         subTitleC: "Take Action Today:",
//         bodyC: `Check Your BMI for Free by clicking here to access the free BMI calculator provided by Timob Health International. This tool will help you understand your body composition and determine if you’re at risk for obesity.`,

//     bulletedTitleA: "The Impact of Obesity on Health, Obesity significantly increases the risk of developing serious conditions like:",
//     bulletedBodyA: [
//       `Heart Disease: High blood pressure, elevated cholesterol levels, and poor heart function.`,
    
//       `Type 2 Diabetes: Insulin resistance and difficulties in managing blood sugar levels.`,

//       `Sleep Apnea: Breathing difficulties during sleep, leading to a lack of restful sleep and fatigue.`,

//       `Joint Problems: Excess weight puts stress on joints, leading to arthritis and other musculoskeletal issues.`,

//       `Mental Health: The stigma of obesity can lead to depression, anxiety, and social isolation.`

//     ],

//     tags: ["#healthier", "#happierlife",],
//     publishedAt: "14th November",
//   },

//   {
//     id: 10,
//     mainImage: "/images/blog/oralhealth.jpg",
//     slug:"Happy-World-Oral-Health-Day",
//     title: "Happy World Oral Health Day!",
//     metadata:
//       "We celebrate World Oral Health Day, a global initiative aimed at raising awareness about the importance of oral health and preventing oral diseases. Our oral health is not just about a bright smile—it’s closely connected to our overall well-being. A healthy mouth plays a key role in maintaining a healthy body, so let's commit to taking care of our teeth and gums!",
//     subTitleA: "Why Oral Health Matters:",
//     bodyA: `Oral diseases, such as cavities, gum disease, and oral cancer, can have serious consequences for your overall health.
//     Poor oral health has been linked to various chronic diseases, including heart disease, diabetes, and respiratory issues.
//     Regular oral hygiene practices—brushing, flossing, and visiting the dentist—can significantly reduce the risk of oral diseases.`,

//     subTitleB: "A Happy Mouth Equals a Happy Body",
//     bodyB: `Your oral health is a reflection of your overall health. Taking care of your teeth and gums can lead to a healthier, happier life.
//     Oral diseases can lead to pain, discomfort, and other health issues that affect your daily life, so make oral care a priority for a happier, more confident you. Take the First Step: Start today by committing to better oral health. Small changes in your daily habits can have a big impact on your smile and overall health. Let’s celebrate World Oral Health Day by taking steps to keep our mouths clean, our smiles bright, and our bodies healthy!`,
//     subTitleC: "",
//     bodyC: ``,

//     bulletedTitleA: "Tips for Maintaining a Healthy Mouth:",
//     bulletedBodyA: [
//       `Brush Twice a Day: Use fluoride toothpaste and brush for at least two minutes each time.`,
    
//       `Floss Daily: Flossing helps remove food particles and plaque from between your teeth where a toothbrush can't reach.`,

//       `Eat a Balanced Diet: Foods rich in calcium, vitamins, and minerals help strengthen your teeth and gums.`,

//       `Heart-Healthy Choice – Studies show that one egg daily does not significantly increase cholesterol or cardiovascular risks for most healthy adults ❤️🏃‍♂️.`,

//       `Visit the Dentist Regularly: Routine check-ups and cleanings are essential for preventing oral diseases and catching any issues early.`,

//       `Limit Sugary Drinks and Snacks: Excess sugar can contribute to tooth decay and cavities.`,

//     ],

//     tags: ["#EggBenefits", "#HealthyEating", "#Superfood", "#NutritionFacts", "#HeartHealth", "#EggsForLife", "#ProteinPower", "#WellnessCare", "#BrainFood", "#ChildNutrition", "#LiverHealth", "#MedicalDoctor"],
//     publishedAt: "14th November",
//   },

//   {
//     id: 11,
//     mainImage: "/images/blog/timob-valentine.jpg",
//     slug:"Happy-Valentines-Day-Always-Laugh-When-You-Can",
//     title: "Happy Valentine’s Day Always Laugh When You Can – It's Good for the Soul!",
//     metadata:
//       "This Valentine’s Day, let’s embrace the power of laughter. Life is full of challenges, but laughter is a gift that lifts our spirits, nurtures our souls, and connects us with those we love. Laughter is truly good for the soul, helping us to release stress, boost our immune system, and improve our overall health.",
//     subTitleA: "Health and Wellness Reminder",
//     bodyA: `On Valentine’s Day, let’s choose to laugh more, love deeply, and appreciate the good things in life, no matter what challenges we may face. Life’s journey can be tough, but with a little laughter, we can make it a lot more enjoyable.`,

//     subTitleB: "",
//     bodyB: ``,
//     subTitleC: "",
//     bodyC: `As we celebrate love, let’s also prioritize our health. A healthy mind, body, and soul are essential for happiness and success. If you're interested in improving your overall wellness, make sure to take care of your liver health and overall lifestyle choices. #HealthFirst #LiverHealth #WellnessCare

//     Let’s keep showing up, persevere through challenges, and always remember that our dreams require persistence.`,

//     bulletedTitleA: "Why Laughter is Essential:",
//     bulletedBodyA: [
//       `Reduces Stress: Laughter lowers levels of stress hormones and triggers the release of feel-good endorphins.`,
    
//       `Improves Heart Health: A good laugh increases blood flow and improves the function of blood vessels, lowering the risk of heart disease.`,

//       `Boosts Immunity: It strengthens the immune system, helping your body fight off illness.`,

//       `Strengthens Relationships: Sharing a laugh brings people together, creating a bond of connection and love.`,

//       `Improves Mental Health: Laughing helps reduce anxiety and depression, promoting a more positive mindset.`

//     ],

//     tags: ["#valentine ", "#love ", "#valentinesday ", "#valentines ", "#valentinegift"],
//     publishedAt: "14th November",
//   },

// ];

// export default BlogData;
