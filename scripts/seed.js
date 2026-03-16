const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Home = require('../models/Home');
const About = require('../models/About');
const TicketPage = require('../models/TicketPage');
const Attraction = require('../models/Attraction');
const ContactPage = require('../models/ContactPage');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // --- SEED HOME ---
        await Home.deleteMany();
        await Home.create({
            hero: {
                background: [
                    '/home/hero/hero-bg-dummy-1.png',
                    '/home/hero/hero-bg-dummy-2.png'
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
                        iconUrl: '/home/facilities/pool-icon.png',
                        title: 'ROOF-TOP POOL',
                        description: 'ENJOY STUNNING VIEWS FROM OUR EXCLUSIVE ROOF-TOP POOL'
                    },
                    {
                        iconUrl: '/home/facilities/rides-icon.png',
                        title: 'BEST-IN-CLASS RIDES',
                        description: 'EXPERIENCE THRILLING WATER SLIDES AND ATTRACTIONS'
                    },
                    {
                        iconUrl: '/home/facilities/filtration-icon.png',
                        title: 'WATER FILTRATION',
                        description: 'CLEAN AND SAFE WATER WITH ADVANCED FILTRATION SYSTEMS'
                    },
                    {
                        iconUrl: '/home/facilities/lockers-icon.png',
                        title: 'SAFE LOCKERS',
                        description: 'SECURE YOUR BELONGINGS WITH OUR RELIABLE LOCKERS'
                    },
                    {
                        iconUrl: '/home/facilities/costume-icon.png',
                        title: 'COSTUME RENTALS',
                        description: 'RENT SWIMWEAR AND ACCESSORIES FOR A HASSLE-FREE VISIT'
                    },
                    {
                        iconUrl: '/home/facilities/dine-icon.png',
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
                        iconUrl: '/home/rides/tsunami-icon.png',
                        title: 'The Tsunami Wave',
                        description: 'Ride ocean-like waves in our main pool. Pure thrill!'
                    },
                    {
                        iconUrl: '/home/rides/spiral-icon.png',
                        title: 'Spiral Splash',
                        description: 'Race down spiral slides with family. Multiple lanes!'
                    },
                    {
                        iconUrl: '/home/rides/paradise-icon.png',
                        title: 'Paradise Beach',
                        description: 'Beach-style wave pool. Relax and play in gentle waves.'
                    },
                    {
                        iconUrl: '/home/rides/adventure-icon.png',
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
                        details: '9:30 AM TO 5:30 PM, KIDS BELOW 3 YEARS - FREE ENTRY.'
                    },
                    {
                        title: 'FRIDAY - SUNDAY',
                        subtitle: 'WEEKENDS & HOLIDAYS',
                        price: '₹999/PERSON',
                        details: '9:30 AM TO 6:00 PM, KIDS BELOW 3 YEARS - FREE ENTRY.'
                    },
                    {
                        title: 'COSTUME CHARGES',
                        subtitle: 'RENTAL GEAR',
                        price: '₹500',
                        details: '₹150 RENT, ₹150 REFUNDABLE DEPOSIT.'
                    },
                    {
                        title: 'LOCKER CHARGES',
                        subtitle: 'SECURE STORAGE',
                        price: '₹350',
                        details: '₹200 RENT, ₹150 REFUNDABLE DEPOSIT.'
                    }
                ]
            },
            gallery: {
                text: {
                    tagline: '@FOLLOW THE AMAZING MEMORIES WITH US ON INSTAGRAM'
                },
                images: [
                    '/home/gallery/gallery-dummy-1.png',
                    '/home/gallery/gallery-dummy-2.png',
                    '/home/gallery/gallery-dummy-3.png',
                    '/home/gallery/gallery-dummy-4.png',
                    '/home/gallery/gallery-dummy-5.png',
                    '/home/gallery/gallery-dummy-6.png',
                    '/home/gallery/gallery-dummy-7.png',
                    '/home/gallery/gallery-dummy-8.png',
                    '/home/gallery/gallery-dummy-9.png',
                    '/home/gallery/gallery-dummy-10.png'
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
                    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.64366943634!2d72.6738541!3d23.18321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87178876c16b%3A0xe5495033871fd14f!2sKudarat%20Water%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
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
                iconUrl: "/about/dolphin-dummy.png",
                backgroundUrl: "/about/hero-bg-dummy.png"
            },
            story: {
                title: "SPLISH, SPLASH AND SOAK UP THE FUN!",
                description: "Our expansive waterpark spans acres of pure excitement — water rides, thrilling slides, wave pools, and relaxation zones for the whole family. Whether you want high-energy adventures or to unwind by the water, Kudarat Waterpark guarantees endless fun. Make memories that last a lifetime as you dive, splash, and laugh with loved ones.",
                imageUrl: "/about/story-dummy.png"
            },
            features: {
                title: "What we offer",
                cards: [
                    {
                        iconUrl: "/about/slides-icon-dummy.png",
                        title: "THRILLING WATER SLIDES",
                        description: "Feel the rush with steep drops and sharp turns. Tube slides, body slides, and raft slides for an adrenaline-packed experience."
                    },
                    {
                        iconUrl: "/about/wave-icon-dummy.png",
                        title: "WAVE POOL",
                        description: "Catch a wave at our state-of-the-art wave pool. Perfect for relaxing or having fun with the family."
                    },
                    {
                        iconUrl: "/about/raindance-icon-dummy.png",
                        title: "RAIN DANCE PARTY",
                        description: "Dance under the rain surrounded by friends and family — drenched in pure delight!"
                    }
                ]
            },
            support: {
                title: "We're Here to Help",
                phone: "+91 85549 92350",
                email: "info@kudaratwaterpark.com",
                iconUrl: "/about/seal-dummy.png",
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
                iconUrl: '/tickets/ticket-icon-dummy.png',
                backgroundUrl: '/tickets/hero-bg-dummy.png'
            },
            bookingForm: {
                title: 'SELECT YOUR TICKETS',
                fields: {
                    name: {
                        label: 'Full Name',
                        placeholder: 'Enter your name'
                    },
                    email: {
                        label: 'Email Address',
                        placeholder: 'Enter your email'
                    },
                    phone: {
                        label: 'Phone Number',
                        placeholder: 'Enter your phone number'
                    },
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
                                iconUrl: '/tickets/adult-icon-dummy.png'
                            },
                            {
                                label: 'Child',
                                value: 'Child',
                                price: 600,
                                iconUrl: '/tickets/child-icon-dummy.png'
                            }
                        ]
                    },
                    quantity: {
                        label: 'Quantity',
                        min: 1
                    }
                },
                summary: {
                    priceLabel: 'Price per ticket',
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
                },
                iconUrl: '/attractions/swimmer-icon-dummy.png',
                backgroundUrl: '/attractions/hero-bg-dummy.png'
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
                        imageUrl: '/attractions/tsunami-dummy.png'
                    },
                    {
                        title: 'Spiral Splash',
                        category: 'Water',
                        description: 'Race your friends and family down our spiral slides. Multiple lanes let everyone slide together for a splashing good time. Mats provided at the ride.',
                        requirements: {
                            height: 'Min 4 ft (122 cm)',
                            age: 'Ages 8+ or with adult'
                        },
                        imageUrl: '/attractions/spiral-dummy.png'
                    },
                    {
                        title: 'Paradise Beach',
                        category: 'Water',
                        description: 'Relax and play at our beach-style wave pool. Gentle waves and a sandy vibe make it the perfect spot for families to unwind and enjoy the water.',
                        requirements: {
                            height: 'None in shallow area',
                            age: 'All ages; children under 12 with adult'
                        },
                        imageUrl: '/attractions/paradise-dummy.png'
                    },
                    {
                        title: 'Adventure Rapids',
                        category: 'Water',
                        description: 'Dance under cascading water jets and rain showers. A fun, active zone ideal for all ages to cool off and play in the rapids.',
                        requirements: {
                            height: 'None',
                            age: 'All ages'
                        },
                        imageUrl: '/attractions/adventure-dummy.png'
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
                },
                iconUrl: '/contact/contact-icon-dummy.png',
                backgroundUrl: '/contact/hero-bg-dummy.png'
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

        console.log('All Global Data Seeded Successfully (Home, About, Tickets, Attractions, Contact)');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
