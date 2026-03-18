const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Home = require('../models/Home');
const About = require('../models/About');
const TicketPage = require('../models/TicketPage');
const Attraction = require('../models/Attraction');
const ContactPage = require('../models/ContactPage');
const FaqPage = require('../models/FaqPage');
const SafetyPage = require('../models/SafetyPage');
const GalleryPage = require('../models/GalleryPage');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // --- SEED HOME ---
        await Home.deleteMany();
        await Home.create({
            hero: {
                background: [
                    '/home/hero/hero-bg.jpg'
                ],
                text: {
                    title: 'KUDARAT WATERPARK',
                    subtitle: 'Your Ultimate Splash-tastic Haven!',
                    description: 'Dive into a day of thrills and laughter with water slides, wave pools, and family rides for all ages.'
                }
            },
            premiumFacilities: {
                text: {
                    tagline: 'WHY US',
                    title: 'EXPLORE OUR PREMIUM FACILITIES',
                    subtitle: 'DISCOVER THE BEST AMENITIES FOR AN UNFORGETTABLE WATERPARK EXPERIENCE'
                },
                cards: [
                    {
                        imageUrl: '/home/facilities/facility-1.png',
                        title: 'ROOF-TOP POOL',
                        description: 'ENJOY STUNNING VIEWS FROM OUR EXCLUSIVE ROOF-TOP POOL'
                    },
                    {
                        imageUrl: '/home/facilities/facility-2.png',
                        title: 'BEST-IN-CLASS RIDES',
                        description: 'EXPERIENCE THRILLING WATER SLIDES AND ATTRACTIONS'
                    },
                    {
                        imageUrl: '/home/facilities/facility-3.png',
                        title: 'WATER FILTRATION',
                        description: 'CLEAN AND SAFE WATER WITH ADVANCED FILTRATION SYSTEMS'
                    },
                    {
                        imageUrl: '/home/facilities/facility-4.png',
                        title: 'SAFE LOCKERS',
                        description: 'SECURE YOUR BELONGINGS WITH OUR RELIABLE LOCKERS'
                    },
                    {
                        imageUrl: '/home/facilities/facility-5.png',
                        title: 'COSTUME RENTALS',
                        description: 'RENT SWIMWEAR AND ACCESSORIES FOR A HASSLE-FREE VISIT'
                    },
                    {
                        imageUrl: '/home/facilities/facility-6.png',
                        title: 'DINE IN WOODS',
                        description: 'SAVOR DELICIOUS MEALS IN A SCENIC WOODED SETTING'
                    }
                ]
            },
            signatureRides: {
                text: {
                    tagline: 'MUST-DO',
                    title: 'SIGNATURE RIDES',
                    subtitle: 'OUR MOST-LOVED ATTRACTIONS – THRILLS, WAVES, AND ENDLESS SPLASH FOR EVERYONE.'
                },
                cards: [
                    {
                        title: 'The Tsunami Wave',
                        description: 'Ride ocean-like waves in our main pool. Pure thrill!'
                    },
                    {
                        title: 'Spiral Splash',
                        description: 'Race down spiral slides with family. Multiple lanes!'
                    },
                    {
                        title: 'Paradise Beach',
                        description: 'Beach-style wave pool. Relax and play in gentle waves.'
                    },
                    {
                        title: 'Adventure Rapids',
                        description: 'Dance under water jets and rain. Cool off & play!'
                    }
                ],
                button: {
                    label: 'SEE ALL RIDES & ATTRACTIONS',
                    url: '/attractions'
                }
            },
            pricing: {
                text: {
                    tagline: 'PLAN YOUR VISIT',
                    title: 'TICKETS & PRICING',
                    subtitle: 'CHOOSE YOUR PERFECT DAY OF ADVENTURE WITH OUR FLEXIBLE PRICING OPTIONS'
                },
                cards: [
                    {
                        title: 'MONDAY - THURSDAY',
                        subtitle: 'REGULAR DAYS',
                        price: '₹899/PERSON',
                        time: '9:30 AM TO 5:30 PM',
                        requirements: 'KIDS BELOW 3 YEARS - FREE ENTRY.'
                    },
                    {
                        title: 'FRIDAY - SUNDAY',
                        subtitle: 'WEEKENDS & HOLIDAYS',
                        price: '₹999/PERSON',
                        time: '9:30 AM TO 6:00 PM',
                        requirements: 'KIDS BELOW 3 YEARS - FREE ENTRY.'
                    },
                    {
                        title: 'COSTUME CHARGES',
                        subtitle: 'RENTAL GEAR',
                        price: '₹500',
                        rent: '₹150 RENT',
                        refund: '₹150 REFUNDABLE DEPOSIT.'
                    },
                    {
                        title: 'LOCKER CHARGES',
                        subtitle: 'SECURE STORAGE',
                        price: '₹350',
                        rent: '₹200 RENT',
                        refund: '₹150 REFUNDABLE DEPOSIT.'
                    }
                ]
            },
            gallery: {
                text: {
                    tagline: '@FOLLOW THE AMAZING MEMORIES WITH US ON INSTAGRAM'
                },
                images: [
                    '/home/gallery/gallery-1.jpg',
                    '/home/gallery/gallery-2.jpg',
                    '/home/gallery/gallery-3.jpg',
                    '/home/gallery/gallery-4.jpg',
                    '/home/gallery/gallery-5.jpg',
                    '/home/gallery/gallery-6.jpg'
                ]
            },
            location: {
                text: {
                    tagline: 'FIND US HERE.',
                    title: 'LOCATION & CONTACT',
                    subtitle: 'VISIT US FOR AN UNFORGETTABLE WATER PARK EXPERIENCE.'
                },
                info: {
                    address: 'OPP, MAHALAXMI DAIRY, VALAD, GUJARAT 382355.',
                    phone: '+91 85549 92350',
                    email: 'info@kudaratwaterpark.com',
                    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.7300362742526!2d72.69260267432234!3d23.14354101180485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e819852da1257%3A0x6d71d34041366e31!2sKudarat%20Waterpark!5e0!3m2!1sen!2sin!4v1773832544322!5m2!1sen!2sin'
                }
            }
        });

        // --- SEED ABOUT ---
        await About.deleteMany();
        await About.create({
            hero: {
                text: {
                    tagline: "Get to know us — we're all about splash!",
                    title: "ABOUT WATER PARK"
                },
                backgroundUrl: "/home/hero/hero-bg.jpg"
            },
            story: {
                title: "SPLISH, SPLASH AND SOAK UP THE FUN!",
                description: "Our expansive waterpark spans acres of pure excitement — water rides, thrilling slides, wave pools, and relaxation zones for the whole family. Whether you want high-energy adventures or to unwind by the water, Kudarat Waterpark guarantees endless fun. Make memories that last a lifetime as you dive, splash, and laugh with loved ones."
            },
            features: {
                title: "What we offer",
                cards: [
                    {
                        title: "THRILLING WATER SLIDES",
                        description: "Feel the rush with steep drops and sharp turns. Tube slides, body slides, and raft slides for an adrenaline-packed experience."
                    },
                    {
                        title: "WAVE POOL",
                        description: "Catch a wave at our state-of-the-art wave pool. Perfect for relaxing or having fun with the family."
                    },
                    {
                        title: "RAIN DANCE PARTY",
                        description: "Dance under the rain surrounded by friends and family — drenched in pure delight!"
                    }
                ]
            },
            support: {
                title: "We're Here to Help",
                phone: "+91 85549 92350",
                email: "info@kudaratwaterpark.com",
                button: {
                    label: "Contact Us",
                    url: "/contact"
                }
            }
        });

        // --- SEED TICKETS ---
        await TicketPage.deleteMany();
        await TicketPage.create({
            hero: {
                text: {
                    title: 'TICKET BOOKING',
                    tagline: 'Book your visit — dive in!'
                },
                backgroundUrl: "/home/hero/hero-bg.jpg"
            },
            bookingForm: {
                title: 'SELECT YOUR TICKETS',
                fields: {
                    date: {
                        label: 'Select Date'
                    },
                    ticketType: {
                        label: 'Ticket Type',
                        options: [
                            {
                                label: 'Adult',
                                value: 'Adult',
                                price: 800,
                            },
                            {
                                label: 'Child',
                                value: 'Child',
                                price: 600,
                            }
                        ]
                    },
                    quantity: {
                        label: 'Quantity',
                        min: 1
                    }
                },
                summary: {
                    totalLabel: 'TOTAL'
                },
                submitButton: {
                    label: 'BOOK NOW'
                }
            }
        });

        // --- SEED ATTRACTIONS ---
        await Attraction.deleteMany();
        await Attraction.create({
            hero: {
                text: {
                    title: 'RIDES & ATTRACTIONS',
                    tagline: 'Discover our rides and stay safe with our guidelines.'
                }
            },
            rideDetails: {
                text: {
                    title: 'RIDE DETAILS',
                    description: 'Everything you need to know about our water rides and joy rides at Kudarat Water Park'
                },
                list: [
                    {
                        title: 'The Tsunami Wave',
                        category: 'Water',
                        description: 'Experience the thrill of ocean-like waves in our main pool. Perfect for swimming, bodyboarding, and family fun. The wave cycle runs at scheduled intervals throughout the day.',
                        requirements: {
                            height: 'Minimum 4 ft in shallow area; deep end for swimmers only',
                            age: 'Children under 12 must be accompanied by an adult'
                        },
                        imageUrl: '/attractions/tsunami.png'
                    },
                    {
                        title: 'Spiral Splash',
                        category: 'Water',
                        description: 'Race your friends and family down our spiral slides. Multiple lanes let everyone slide together for a splashing good time. Mats provided at the ride.',
                        requirements: {
                            height: 'Min 4 ft (122 cm)',
                            age: 'Ages 8+ or with adult'
                        },
                        imageUrl: '/attractions/multilane_slide.png'
                    },
                    {
                        title: 'Paradise Beach',
                        category: 'Water',
                        description: 'Relax and play at our beach-style wave pool. Gentle waves and a sandy vibe make it the perfect spot for families to unwind and enjoy the water.',
                        requirements: {
                            height: 'None in shallow area',
                            age: 'All ages; children under 12 with adult'
                        },
                        imageUrl: '/attractions/wave_pool.png'
                    },
                    {
                        title: 'Adventure Rapids',
                        category: 'Water',
                        description: 'Dance under cascading water jets and rain showers. A fun, active zone ideal for all ages to cool off and play in the rapids.',
                        requirements: {
                            height: 'None',
                            age: 'All ages'
                        },
                        imageUrl: '/attractions/rain_dance.png'
                    }
                ]
            },
            safetySection: {
                title: 'Guidelines & Safety',
                subtitle: 'Please follow these rules for a safe and fun visit for everyone.',
                rules: [
                    {
                        title: 'Height & Age Restrictions',
                        content: 'Every ride has posted height and age requirements that must be followed for your safety.'
                    },
                    {
                        title: 'No Running',
                        content: 'Wet surfaces and pool decks can be slippery. Please walk carefully at all times.'
                    },
                    {
                        title: 'Child Supervision',
                        content: 'Children must be supervised by a responsible adult at all times within the park.'
                    },
                    {
                        title: 'Proper Swimwear',
                        content: 'Proper swimwear is required in all pools and on water rides. Cotton t-shirts should be avoided.'
                    }
                ]
            },
            cta: {
                buttonLabel: 'Contact Us',
                url: '/contact'
            }
        });

        // --- SEED CONTACT ---
        await ContactPage.deleteMany();
        await ContactPage.create({
            hero: {
                text: {
                    title: 'CONTACT US',
                    tagline: 'We are here to help you!'
                }
            },
            contactInfo: {
                title: 'CONTACT US',
                phones: ['+91 85549 92350', '+91 88282 44201'],
                emails: ['info@kudaratwaterpark.com'],
                address: 'Kudarat Waterpark, Near Main Highway, Your City - 123456',
                mapUrl: 'https://maps.google.com/?q=Kudarat+Waterpark',
                buttonLabel: 'GET DIRECTIONS ON GOOGLE MAPS'
            },
            messageForm: {
                title: 'SEND US A MESSAGE',
                fields: {
                    name: { label: 'Name', placeholder: 'Your name' },
                    email: { label: 'Email', placeholder: 'your@email.com' },
                    message: { label: 'Message', placeholder: 'Your message...' }
                },
                buttonLabel: 'SEND MESSAGE'
            }
        });

        // --- SEED FAQ ---
        await FaqPage.deleteMany();
        await FaqPage.create({
            title: 'FAQ',
            subtitle: 'Frequently asked questions',
            faqs: [
                {
                    question: 'Can we get non-veg food?',
                    answer: 'No, We serve only PURE VEGETARIAN FOOD.'
                },
                {
                    question: 'Is parking available at park?',
                    answer: 'Limited Free Parking are available on FIRST-COME-FIRST Basis.'
                },
                {
                    question: 'Are outside food allowed inside the park?',
                    answer: 'No, As we have inhouse delicious food arrangements within the ticket price.'
                },
                {
                    question: 'What are the park timings?',
                    answer: 'We are open from 10 AM to 6 PM, every day of the week.'
                },
                {
                    question: 'Do you have locker facilities?',
                    answer: 'Yes, lockers are available on a first-come-first-served basis for a nominal charge.'
                }
            ],
            cta: {
                buttonLabel: 'Contact Us',
                url: '/contact'
            }
        });

        // --- SEED SAFETY ---
        await SafetyPage.deleteMany();
        await SafetyPage.create({
            title: 'SAFETY RULES',
            subtitle: 'Safety First, Fun Always',
            reminder: {
                heading: '🦭 Friendly reminder',
                description: 'Our mascot wants everyone to have a safe, splash-tastic day!'
            },
            rules: {
                title: 'Park Rules',
                list: [
                    'Follow all posted height and age restrictions on rides.',
                    'No running on wet surfaces or pool decks.',
                    'Children must be supervised by an adult at all times.',
                    'Proper swimwear is required. No street clothes in pools.',
                    'Outside food and beverages may not be allowed (check park policy).',
                    'Lockers are available for valuables — use them.',
                    'Report any injury or unsafe condition to staff immediately.',
                    'No diving in shallow areas. Follow lifeguard instructions.'
                ]
            },
            cta: {
                buttonLabel: 'CONTACT US',
                url: '/contact'
            }
        });

        // --- SEED GALLERY ---
        await GalleryPage.deleteMany();
        await GalleryPage.create({
            title: 'OUR GALLERY',
            subtitle: 'Our Gallery — where every image tells a story of fun, splash, and unforgettable moments.',
            categories: [
                {
                    label: 'Amusement Park',
                    value: 'amusement-park',
                    images: [
                        '/gallery/amusement-park/img1.jpg',
                        '/gallery/amusement-park/img2.jpg',
                        '/gallery/amusement-park/img3.jpg',
                        '/gallery/amusement-park/img4.jpg',
                        '/gallery/amusement-park/img5.jpg',
                        '/gallery/amusement-park/img6.jpg',
                        '/gallery/amusement-park/img7.jpg',
                        '/gallery/amusement-park/img8.jpg',
                        '/gallery/amusement-park/img9.jpg',
                        '/gallery/amusement-park/img10.jpg',
                        '/gallery/amusement-park/img11.jpg',
                        '/gallery/amusement-park/img12.jpg'
                    ]
                },
                {
                    label: 'Big Splash',
                    value: 'big-splash',
                    images: [
                        '/gallery/big-splash/img1.jpg',
                        '/gallery/big-splash/img2.jpg',
                        '/gallery/big-splash/img3.jpg',
                        '/gallery/big-splash/img4.jpg',
                        '/gallery/big-splash/img5.jpg',
                        '/gallery/big-splash/img6.jpg',
                        '/gallery/big-splash/img7.jpg',
                        '/gallery/big-splash/img8.jpg',
                        '/gallery/big-splash/img9.jpg',
                        '/gallery/big-splash/img10.jpg',
                        '/gallery/big-splash/img11.jpg',
                        '/gallery/big-splash/img12.jpg'
                    ]
                },
                {
                    label: 'Facilities',
                    value: 'facilities',
                    images: [
                        '/gallery/facilities/img1.jpg',
                        '/gallery/facilities/img2.jpg',
                        '/gallery/facilities/img3.jpg',
                        '/gallery/facilities/img4.jpg',
                        '/gallery/facilities/img5.jpg',
                        '/gallery/facilities/img6.jpg',
                        '/gallery/facilities/img7.jpg',
                        '/gallery/facilities/img8.jpg',
                        '/gallery/facilities/img9.jpg',
                        '/gallery/facilities/img10.jpg',
                        '/gallery/facilities/img11.jpg',
                        '/gallery/facilities/img12.jpg'
                    ]
                }
            ],
            video: {
                title: 'Gallery Video',
                url: '',
                placeholder: 'Video placeholder — Watch Now'
            }
        });

        console.log('All Global Data Seeded Successfully (Home, About, Tickets, Attractions, Contact, FAQ, Safety, Gallery)');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
