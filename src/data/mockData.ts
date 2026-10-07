import { Department, Achievement, CampusBuilding, NoticeEvent, GuestbookEntry } from '../types';

export const CAMPUS_IMAGES = {
  aerial: '/src/assets/images/fisat_campus_aerial_1791305247981.jpg',
  entrance: '/src/assets/images/fisat_campus_hero.jpg',
  courtyard: '/src/assets/images/fisat_green_campus_1791307565583.jpg',
  robotics: '/src/assets/images/college_robotics_lab_1791305270171.jpg',
  concert: '/src/assets/images/campus_fest_concert_1791305285093.jpg',
  library: '/src/assets/images/library_reading_hall_1791305302023.jpg',
  foundation: '/src/assets/images/fisat_foundation_archive_1791306115024.jpg',
  mikaRobot: '/src/assets/images/fisat_robotics_mika_1791306128809.jpg',
};

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-2002',
    year: 2002,
    era: 'Genesis · 2002',
    title: 'Inception & Foundation Stone at Hormis Nagar',
    description: 'Established under the visionary leadership of Founder Chairman Adv. P.V. Mathew by the Federal Bank Officers’ Association Educational Society (FBOAES). Dedicated to the memory of KP Hormis, founder of Federal Bank.',
    category: 'Foundation',
    accent: '#0f3b3a',
    emoji: '🏛️',
    image: CAMPUS_IMAGES.foundation,
    verifier: 'FBOAES Registry · Hormis Nagar',
    impactMetric: '45-Acre Eco-Tech Campus Founded',
    keyDignitaries: 'Adv. P.V. Mathew, Shri K.A. Babu, FBOA Leadership'
  },
  {
    id: 'ach-2008',
    year: 2008,
    era: 'Ascent · 2008',
    title: 'Genesis of Nakshatra Tech Fest & Campus Fiber Grid',
    description: 'Inauguration of "Nakshatra", which grew into one of South India’s premier collegiate technical and cultural festivals. Full campus Gigabit fiber optic backbone laid connecting every department.',
    category: 'Innovation',
    accent: '#c99a2e',
    emoji: '⚡',
    image: CAMPUS_IMAGES.concert,
    verifier: 'All India Council for Technical Education (AICTE)',
    impactMetric: 'Over 8,000+ Annual Festival Footfalls',
    keyDignitaries: 'Students Council & Tech Guild'
  },
  {
    id: 'ach-2015',
    year: 2015,
    era: 'Maker Era · 2015',
    title: 'Super FabLab Node Established with Kerala Startup Mission',
    description: 'FISAT became one of the pioneering engineering institutions in Kerala to set up an advanced MIT FabLab Node, equipped with laser cutters, multi-axis CNC machines, and electronics fabrication equipment.',
    category: 'Innovation',
    accent: '#2d6aa0',
    emoji: '🔬',
    image: CAMPUS_IMAGES.robotics,
    verifier: 'Fab Foundation & Kerala Startup Mission (KSUM)',
    impactMetric: '₹3.5 Cr Advanced Fabrication Facility',
    keyDignitaries: 'Fab Academy Global & KSUM Delegates'
  },
  {
    id: 'ach-2019',
    year: 2019,
    era: 'Robotics · 2019',
    title: 'Creation of MIKA Humanoid Robot for Kochi Metro (KMRL)',
    description: 'Interdisciplinary team of FISAT students and faculty engineered "MIKA", an autonomous humanoid assistive robot prototype created to assist passengers with multilingual navigation across Kochi Metro stations.',
    category: 'Robotics',
    accent: '#b5502e',
    emoji: '🤖',
    image: CAMPUS_IMAGES.mikaRobot,
    verifier: 'Kochi Metro Rail Limited (KMRL) Citation',
    impactMetric: 'State-Level Innovation Excellence Trophy',
    keyDignitaries: 'FISAT Centre for Robotics & KMRL Board'
  },
  {
    id: 'ach-2023',
    year: 2023,
    era: 'Global Honor · 2023',
    title: 'Phoenix Contact Global Xplore Award & VAIGA Gold',
    description: 'Secured international honors at the Phoenix Contact Xplore Technology Award in Germany for Smart Water Management, alongside Gold Prize at the National VAIGA Agri Hackathon.',
    category: 'Global Honor',
    accent: '#7a4fa0',
    emoji: '🏆',
    image: CAMPUS_IMAGES.library,
    verifier: 'Phoenix Contact GmbH (Germany) & Govt of Kerala',
    impactMetric: 'International Global Finalist Trophy',
    keyDignitaries: 'Global Jury, Bad Pyrmont, Germany'
  },
  {
    id: 'ach-2025',
    year: 2025,
    era: 'Pinnacle · 2025',
    title: 'UGC Conferred Autonomous Status & NAAC A+ (3.45 CGPA)',
    description: 'University Grants Commission (UGC) conferred 10-Year Autonomous Status upon FISAT. Reinforced with NAAC A+ Reaccreditation (3.45 CGPA), NBA Tier-1 accreditation across 6 disciplines, and peak ₹32 LPA placements.',
    category: 'Accreditation',
    accent: '#0f3b3a',
    emoji: '🎓',
    image: CAMPUS_IMAGES.aerial,
    verifier: 'University Grants Commission (UGC) & NAAC',
    impactMetric: 'UGC Autonomous Status for 10 Years',
    keyDignitaries: 'National UGC Inspection Council'
  }
];

export const MEMORIES_DATA = ACHIEVEMENTS_DATA;

export const DEPARTMENTS_DATA: Department[] = [
  {
    id: 'cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    tagline: 'Deep learning clusters, distributed systems, and next-gen cryptographic security.',
    description: 'The Department of Computer Science & Engineering is re-accredited by NBA and recognized for rigorous systems programming, GPU AI computing, and vibrant open-source culture. Students engineer production applications, publish novel neural architectures, and secure placements across global technology majors.',
    headOfDept: 'Dr. Paul P. Mathai',
    established: 2002,
    intake: 180,
    accreditation: 'NBA Tier-1 Reaccredited & UGC Autonomous',
    vision: 'To emerge as a center of academic excellence and frontier computing innovation, producing ethically grounded engineers capable of solving complex societal challenges through cutting-edge digital technologies.',
    mission: [
      'Deliver rigorous, industry-relevant curriculum grounded in algorithmic thinking and practical systems design.',
      'Foster world-class research culture across Machine Learning, Distributed Computing, and Cybersecurity.',
      'Nurture leadership, societal ethics, entrepreneurship, and lifelong learning among aspiring computing professionals.'
    ],
    achievements: [
      'Top University KTU Ranks consistently secured over the past 5 academic batches.',
      'Published over 140+ research papers in Scopus-indexed IEEE and Springer journals.',
      'Active Google Developer Student Club and award-winning Free & Open Source Software (FOSS) Cell.',
      'Record campus placement offer of ₹32 LPA from top-tier multinational software guild.'
    ],
    futureGoals: [
      'Establish a dedicated Quantum Computing & Neuromorphic Chip Simulation Laboratory by 2027.',
      'Incubate 15 student-led AI/DeepTech startups through seed venture funding.',
      'Forge direct research partnerships with leading international institutions and open-source foundations.'
    ],
    highlights: [
      'NVIDIA GPU High Performance Computing Cluster',
      'Google Developer Student Club & Active FOSS Cell',
      'Highest CTC in 2025: ₹32 LPA (Average: 8.4 LPA)',
      '18 Published Patents in AI & Distributed Ledger Systems'
    ],
    labs: [
      'Artificial Intelligence & Cognitive Computing Suite',
      'Advanced Cloud Systems & Virtualization Testbed',
      'Network Security & Cryptographic Protocol Studio',
      'Mobile App Studio & Ubiquitous Computing Lab'
    ],
    careers: ['Machine Learning Systems Engineer', 'Cloud Infrastructure Architect', 'Cybersecurity Specialist', 'Distributed Software Lead'],
    topRecruiters: ['Microsoft', 'Amazon', 'Cognizant', 'TCS Digital', 'Zoho', 'Bosch Global Software'],
    techStack: ['PyTorch', 'Rust', 'Docker', 'Kubernetes', 'Go', 'TypeScript', 'React', 'CUDA'],
    blueprintType: 'network',
    stats: {
      patents: 18,
      placements: '98.2%',
      publications: 142,
      alumniNetwork: '4,200+ worldwide'
    },
    location: {
      buildingName: 'Main Academic Quadrangle',
      floors: '2nd & 3rd Floors',
      wing: 'East Wing',
      roomNumbers: 'Rooms 201–218 & 301–312',
      landmark: 'Directly above Central Administrative Atrium, overlooking the Green Lawn',
      mapPinX: 32,
      mapPinY: 42
    },
    faculties: [
      {
        id: 'f-cse-1',
        name: 'Dr. Paul P. Mathai',
        designation: 'Professor & Head of Department',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Distributed Systems, High Performance Computing & Cloud Architectures',
        email: 'hodcs@fisat.ac.in',
        experienceYears: 22,
        isHod: true
      },
      {
        id: 'f-cse-2',
        name: 'Dr. Jyothish K. John',
        designation: 'Professor',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Machine Learning, Data Mining & Intelligent Systems',
        email: 'jyothish@fisat.ac.in',
        experienceYears: 20
      },
      {
        id: 'f-cse-3',
        name: 'Lt. Dr. Prasad J. C.',
        designation: 'Professor & Dean Student Affairs',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Computer Networks, Cryptography & Network Security',
        email: 'prasad@fisat.ac.in',
        experienceYears: 24
      },
      {
        id: 'f-cse-4',
        name: 'Dr. Binu V. P.',
        designation: 'Associate Professor',
        qualification: 'Ph.D., M.Tech',
        specialization: 'Computer Vision, Medical Image Analysis & Deep Learning',
        email: 'binuvp@fisat.ac.in',
        experienceYears: 16
      },
      {
        id: 'f-cse-5',
        name: 'Dr. Sreeraj M.',
        designation: 'Associate Professor',
        qualification: 'Ph.D., M.Tech',
        specialization: 'Cybersecurity, Blockchain Protocols & Cryptographic Proofs',
        email: 'sreeraj@fisat.ac.in',
        experienceYears: 14
      }
    ]
  },
  {
    id: 'ece',
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    tagline: 'Nanoscale VLSI silicon architectures, RF microwave telemetry, and embedded robotics.',
    description: 'From designing custom ASICs using Cadence EDA suites to programming autonomous rovers and 5G communication protocols, the ECE department boasts top university ranks and alumni working at ISRO, Intel, and Texas Instruments.',
    headOfDept: 'Dr. Bejoy Varghese',
    established: 2002,
    intake: 120,
    accreditation: 'NBA Tier-1 Accredited & ISO 9001:2015',
    vision: 'To be a premier hub of microelectronics and communication engineering education, empowering scholars to engineer cutting-edge silicon architectures and wireless ecosystems for global impact.',
    mission: [
      'Provide comprehensive laboratory training spanning VLSI design, digital signal processing, and RF communications.',
      'Facilitate interdisciplinary innovation in robotics, edge computing, and space electronics.',
      'Promote industry linkages with leading semiconductor and telecommunication industries.'
    ],
    achievements: [
      'Engineered the autonomous Humanoid Assistive Robot "MIKA" for Kochi Metro Rail Limited (KMRL).',
      'Secured Two University Ranks in KTU examinations for the graduating batch.',
      'Cadence EDA certified training lab with tape-out ready chip layouts.',
      'ISRO satellite telemetry payload collaborative project spearheaded by faculty.'
    ],
    futureGoals: [
      'Build an ultra-cleanroom Nano-Device Characterization Bench by 2027.',
      'Launch an on-campus Satellite Ground Station for amateur radio and CubeSat tracking.',
      'Expand direct hiring tie-ups with global semiconductor foundry partners.'
    ],
    highlights: [
      'Cadence EDA & Synopsys Nanometer VLSI Design Toolchain',
      'Texas Instruments Embedded Systems Research Bay',
      'Creators of MIKA Humanoid Robot for Kochi Metro',
      'Collaborative space payload projects with ISRO alumni'
    ],
    labs: [
      'VLSI & Microelectronics Fabrication Simulation Lab',
      'Microwave, Antenna & RF Propagation Anechoic Chamber',
      'Robotics, Microcontrollers & IoT Prototyping Sandbox',
      'Digital Signal & Audio-Visual Processing Suite'
    ],
    careers: ['VLSI Physical Design Engineer', 'Embedded Firmware Developer', 'RF Telecom Specialist', 'Hardware Systems QA'],
    topRecruiters: ['Texas Instruments', 'Qualcomm', 'Intel', 'Wipro VLSI', 'Tata Elxsi', 'Bosch'],
    techStack: ['Verilog', 'VHDL', 'C/C++', 'MATLAB', 'ARM Cortex', 'KiCad', 'RTOS', 'FPGA'],
    blueprintType: 'circuit',
    stats: {
      patents: 14,
      placements: '95.6%',
      publications: 118,
      alumniNetwork: '3,800+ worldwide'
    },
    location: {
      buildingName: 'Main Academic Quadrangle',
      floors: '1st & 2nd Floors',
      wing: 'West Wing',
      roomNumbers: 'Rooms 115–130 & 219–228',
      landmark: 'Adjacent to the Advanced Electronics Workshop and Central Server Hub',
      mapPinX: 32,
      mapPinY: 42
    },
    faculties: [
      {
        id: 'f-ece-1',
        name: 'Dr. Bejoy Varghese',
        designation: 'Associate Professor & Head of Department',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Signal Processing, Embedded Hardware Architectures & Edge AI',
        email: 'hodec@fisat.ac.in',
        experienceYears: 19,
        isHod: true
      },
      {
        id: 'f-ece-2',
        name: 'Dr. Mini P. R.',
        designation: 'Professor',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'VLSI Design, Low Power Architectures & Semiconductor Physics',
        email: 'minipr@fisat.ac.in',
        experienceYears: 23
      },
      {
        id: 'f-ece-3',
        name: 'Dr. Shemim Kalathil',
        designation: 'Professor',
        qualification: 'Ph.D., M.Tech',
        specialization: 'Wireless Communications, 5G/6G Networks & Antenna Modeling',
        email: 'shemim@fisat.ac.in',
        experienceYears: 21
      },
      {
        id: 'f-ece-4',
        name: 'Dr. Jisma M.',
        designation: 'Associate Professor',
        qualification: 'Ph.D., M.Tech',
        specialization: 'Nano-Electronics, Photonic Sensors & Optical Communications',
        email: 'jisma@fisat.ac.in',
        experienceYears: 15
      }
    ]
  },
  {
    id: 'eee',
    code: 'EEE',
    name: 'Electrical & Electronics Engineering',
    tagline: 'Next-generation smart grid topologies, EV powertrains, and green renewable storage.',
    description: 'Empowering students to drive the clean energy transition. The EEE department features a 100kW on-campus solar tracking farm, electric vehicle battery dynamometers, and Siemens industrial automation PLC workstations.',
    headOfDept: 'Dr. Surya Susan Alex',
    established: 2002,
    intake: 60,
    accreditation: 'NBA Tier-1 Accredited',
    vision: 'To emerge as a premier center of technical education in electrical engineering, producing graduates committed to sustainable energy, electromobility, and high-voltage grid engineering.',
    mission: [
      'Impart robust theoretical mastery and hands-on skill in power systems, industrial drives, and power conversion.',
      'Pioneer innovative solutions for electric transportation and renewable energy storage.',
      'Instill ethical responsibility and safety standards conforming to global electricity regulations.'
    ],
    achievements: [
      'Commissioned 100kW Grid-Tied Solar Power Farm powering major campus facilities.',
      'Direct industrial consultancy agreements with Kerala State Electricity Board (KSEB).',
      'Phoenix Contact Xplore Technology international award recognition in Germany.',
      'Active student development of high-efficiency regenerative EV battery controllers.'
    ],
    futureGoals: [
      'Install an automated High-Voltage Impulse Testing Laboratory conforming to IEEE standards.',
      'Develop Green Hydrogen fuel cell integration testbenches for transport research.',
      'Establish a Smart Microgrid Energy Trading testbed on blockchain.'
    ],
    highlights: [
      '100kW On-Campus Solar Tracking & Battery Storage Bay',
      'Electric Vehicle Dynamometer & BMS Testing Rig',
      'Direct industry tie-ups with KSEB and L&T Power',
      'Certified Siemens Industrial Automation Center'
    ],
    labs: [
      'Electric Drives & Power Converters Laboratory',
      'High Voltage & Electrical Machine Testing Bay',
      'Smart Grid SCADA & Automation Station',
      'Renewable Energy & Battery Chemistry Research Cell'
    ],
    careers: ['Power Systems Engineer', 'EV Powertrain Engineer', 'Industrial Automation Lead', 'Energy Consultant'],
    topRecruiters: ['Larsen & Toubro', 'ABB', 'Schneider Electric', 'Siemens', 'Tata Power', 'Kirloskar'],
    techStack: ['Simulink', 'PowerWorld', 'PLC/SCADA', 'LabVIEW', 'Embedded C', 'AutoCAD Electrical'],
    blueprintType: 'grid',
    stats: {
      patents: 9,
      placements: '92.4%',
      publications: 84,
      alumniNetwork: '2,100+ worldwide'
    },
    location: {
      buildingName: 'Main Academic Quadrangle (South Wing)',
      floors: 'Ground & 1st Floors',
      wing: 'South Wing',
      roomNumbers: 'Rooms 012–026 & 101–110',
      landmark: 'Directly adjacent to the Electrical Machines Hall and 100kW Solar Farm',
      mapPinX: 32,
      mapPinY: 42
    },
    faculties: [
      {
        id: 'f-eee-1',
        name: 'Dr. Surya Susan Alex',
        designation: 'Associate Professor & Head of Department',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Power Systems, Renewable Energy Microgrids & Grid Integration',
        email: 'hodee@fisat.ac.in',
        experienceYears: 18,
        isHod: true
      },
      {
        id: 'f-eee-2',
        name: 'Dr. Archana R.',
        designation: 'Professor',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Electric Drives, Power Converters & EV Charging Infrastructure',
        email: 'archana@fisat.ac.in',
        experienceYears: 22
      },
      {
        id: 'f-eee-3',
        name: 'Dr. Parvathy M.',
        designation: 'Associate Professor',
        qualification: 'Ph.D., M.Tech',
        specialization: 'Smart Grids, High Voltage Engineering & SCADA Automation',
        email: 'parvathym@fisat.ac.in',
        experienceYears: 15
      }
    ]
  },
  {
    id: 'me',
    code: 'ME',
    name: 'Mechanical Engineering',
    tagline: 'Computational fluid dynamics, 5-axis CNC machining, and Formula student racecraft.',
    description: 'Accredited by NBA until 2026. The Mechanical Engineering department at FISAT unites heavy workshop fabrication with finite element analysis, additive metal 3D printing, and supersonic wind tunnel aerodynamic modeling.',
    headOfDept: 'Dr. Rejeesh C. R.',
    established: 2004,
    intake: 90,
    accreditation: 'NBA Tier-1 Accredited (Valid till 2026)',
    vision: 'To be a premier department of mechanical engineering cultivating transformative technical leaders skilled in precision manufacturing, thermal sciences, and automotive innovation.',
    mission: [
      'Offer comprehensive experiential learning in machining, computer-aided design, and robotics.',
      'Support competitive student automotive engineering teams (Formula Student, Baja SAE).',
      'Foster sustainable manufacturing, eco-friendly materials, and renewable thermal cycles.'
    ],
    achievements: [
      'FISAT Racing Team bagged multiple awards at National Baja SAE and Formula Green.',
      'ASME Student Chapter recognized with National Outstanding Supporter Award.',
      'Designed and fabricated custom composite aerodynamic kits for competitive racecraft.',
      '5-Axis CNC Milling Center delivering industrial prototyping for defense and aerospace.'
    ],
    futureGoals: [
      'Establish a Cryogenic Fuel & Thermal Propulsion Testing Tunnel by 2028.',
      'Pioneer Metal Additive 3D Printing for biocompatible surgical implants.',
      'Launch student electric hypercar prototype targeting international Formula Student UK.'
    ],
    highlights: [
      'FISAT Racing Team: National Baja SAE & Formula Student winners',
      '5-Axis CNC & High-Precision Metal 3D Printing Centre',
      'Subsonic Wind Tunnel for aerodynamic profiling',
      'Centre of Excellence in Computational Aerodynamics'
    ],
    labs: [
      'Advanced CNC Machining & Metrology Centre',
      'Fluid Mechanics & Subsonic Wind Tunnel Facility',
      'Heat Transfer & IC Engines Performance Test Cell',
      'Robotics & Automated Material Handling Bay'
    ],
    careers: ['Aerospace Structural Engineer', 'Robotics Systems Designer', 'Automotive CAE Analyst', 'Manufacturing Director'],
    topRecruiters: ['Mahindra & Mahindra', 'Tata Motors', 'Royal Enfield', 'Federal-Mogul', 'Quest Global'],
    techStack: ['SolidWorks', 'ANSYS Fluent', 'CATIA', 'Mastercam', 'GD&T', 'Abaqus'],
    blueprintType: 'mechanical',
    stats: {
      patents: 11,
      placements: '91.8%',
      publications: 96,
      alumniNetwork: '2,400+ worldwide'
    },
    location: {
      buildingName: 'Mechanical Workshops & Prototyping Bay',
      floors: 'Ground & 1st Floor',
      wing: 'North Campus Bay',
      roomNumbers: 'Rooms MW-01 to MW-14',
      landmark: 'Behind the Technology Labs Complex, adjacent to the Baja Racing Pit and Foundry',
      mapPinX: 68,
      mapPinY: 34
    },
    faculties: [
      {
        id: 'f-me-1',
        name: 'Dr. Rejeesh C. R.',
        designation: 'Professor & Head of Department',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Thermal Systems, Heat Transfer & Composite Material Tribology',
        email: 'hodme@fisat.ac.in',
        experienceYears: 21,
        isHod: true
      },
      {
        id: 'f-me-2',
        name: 'Dr. Jose Cherian',
        designation: 'Professor',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Finite Element Analysis, Structural Optimization & Additive Manufacturing',
        email: 'josecherian@fisat.ac.in',
        experienceYears: 24
      },
      {
        id: 'f-me-3',
        name: 'Dr. Harish Kumar R.',
        designation: 'Associate Professor',
        qualification: 'Ph.D., M.Tech',
        specialization: 'Computational Fluid Dynamics, Aerodynamics & Wind Tunnel Testing',
        email: 'harish@fisat.ac.in',
        experienceYears: 17
      }
    ]
  },
  {
    id: 'ce',
    code: 'CE',
    name: 'Civil & Environmental Engineering',
    tagline: 'Resilient green skyscrapers, sustainable water treatment, and drone GIS cartography.',
    description: 'Accredited by the NBA. Civil Engineering at FISAT blends Kerala’s unique ecological demands with advanced structural dynamics, earthquake shake table simulation, smart transit corridors, and green concrete formulation.',
    headOfDept: 'Dr. Kavitha P. E.',
    established: 2011,
    intake: 60,
    accreditation: 'NBA Tier-1 Accredited',
    vision: 'To build a globally benchmarked academic and research environment in civil engineering, fostering engineers committed to resilient, climate-adaptive, and sustainable infrastructure.',
    mission: [
      'Provide experiential education in structural mechanics, geomatics, and environmental engineering.',
      'Partner with state disaster management agencies on flood and landslide mitigation frameworks.',
      'Inculcate green building design ethics and environmental stewardship in infrastructure creation.'
    ],
    achievements: [
      'Formulated specialized geo-hazard flood mapping for Kerala State Disaster Management Authority.',
      'Indian Green Building Council (IGBC) Platinum student chapter recognized nationwide.',
      'Multiple National Student Design awards in Seismic Shake Table bridge simulations.',
      'Over 90% placement record in leading EPC infrastructure corporations.'
    ],
    futureGoals: [
      'Develop Ultra-High Performance Eco-Concrete utilizing industrial pozzolanic waste by 2027.',
      'Deploy drone-based real-time structural health monitoring across key public transport bridges.',
      'Establish a Smart Urban Water Resiliency Testing Basin.'
    ],
    highlights: [
      'Total Station & RTK-GPS Drone Surveying Unit',
      'Concrete Durability & Non-Destructive Testing Bay',
      'MoU with Kerala State Disaster Management Authority',
      'Indian Green Building Council (IGBC) Platinum student chapter'
    ],
    labs: [
      'Structural Dynamics & Shake Table Simulator',
      'Geotechnical & Soil Mechanics Quality Lab',
      'Environmental Engineering & Water Chemistry Lab',
      'Geomatics & Drone GIS Spatial Analytics Lab'
    ],
    careers: ['Structural Project Consultant', 'BIM & Urban Planner', 'Geotechnical Specialist', 'Hydrology Analyst'],
    topRecruiters: ['L&T Construction', 'Shapoorji Pallonji', 'Afcons', 'Atkins Global', 'Sobha Developers'],
    techStack: ['AutoCAD', 'STAAD.Pro', 'Revit BIM', 'ETABS', 'ArcGIS', 'Primavera'],
    blueprintType: 'structure',
    stats: {
      patents: 7,
      placements: '90.5%',
      publications: 78,
      alumniNetwork: '1,500+ worldwide'
    },
    location: {
      buildingName: 'Civil Engineering Block',
      floors: 'Ground & 1st Floor',
      wing: 'East Academic Complex',
      roomNumbers: 'Rooms CE-101 to CE-116',
      landmark: 'Next to the Strength of Materials & Environmental Testing Courtyard',
      mapPinX: 32,
      mapPinY: 42
    },
    faculties: [
      {
        id: 'f-ce-1',
        name: 'Dr. Kavitha P. E.',
        designation: 'Professor & Head of Department',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Structural Dynamics, Earthquake Engineering & Seismic Soil-Structure Interaction',
        email: 'hodce@fisat.ac.in',
        experienceYears: 20,
        isHod: true
      },
      {
        id: 'f-ce-2',
        name: 'Dr. Unni Kartha G.',
        designation: 'Professor',
        qualification: 'Ph.D., M.Tech, B.Tech',
        specialization: 'Concrete Technology, Green Building Design & Disaster Mitigation',
        email: 'unnikartha@fisat.ac.in',
        experienceYears: 23
      },
      {
        id: 'f-ce-3',
        name: 'Dr. Jiji Antony',
        designation: 'Associate Professor',
        qualification: 'Ph.D., M.Tech',
        specialization: 'Geotechnical Engineering, Soil Mechanics & Ground Improvement',
        email: 'jijiantony@fisat.ac.in',
        experienceYears: 16
      }
    ]
  },
  {
    id: 'mca-mba',
    code: 'PG',
    name: 'Postgraduate Studies: MCA & MBA',
    tagline: 'Venture incubation, financial engineering, and enterprise architecture leadership.',
    description: 'The Department of Computer Applications (MCA) and Business Administration (MBA) operating under FISAT Business School (FBS). Integrating technical depth with entrepreneurial leadership, venture capital pitching, and data analytics.',
    headOfDept: 'Dr. Deepa Mary Mathews & Dr. A. J. Joshua',
    established: 2006,
    intake: 120,
    accreditation: 'AICTE Approved & NBA Tier-1',
    vision: 'To be a premier center of postgraduate education in applied computing and management, shaping innovative entrepreneurs and agile tech leaders for the global digital economy.',
    mission: [
      'Deliver cutting-edge software engineering and executive management pedagogy.',
      'Nurture student ventures through seed capital, startup incubation, and mentor networks.',
      'Foster ethical decision-making, financial literacy, and corporate governance excellence.'
    ],
    achievements: [
      'FISAT Technology Business Incubator (TBI) incubated 24 student-led enterprises.',
      'Bloomberg Market Concepts certified financial analytics lab on campus.',
      'Consistently achieving 94%+ placements across Tier-1 financial institutions and consulting firms.',
      'Organizing the Annual National Management & Hackathon Conclave attracting 50+ universities.'
    ],
    futureGoals: [
      'Launch an AI Venture Studio with ₹50 Lakhs dedicated seed prototype fund by 2027.',
      'Establish global student exchange programs with European and Southeast Asian business academies.',
      'Expand executive analytics certification with Bloomberg and CFA Institute partners.'
    ],
    highlights: [
      'FISAT Technology Business Incubator (TBI) with seed grants',
      'Bloomberg Market Concepts & Financial Analytics lab',
      'Alumni active at Goldman Sachs, Google, EY, and Federal Bank',
      'Annual National Management Conclave & Hackathons'
    ],
    labs: [
      'Business Analytics & Data Visualization Studio',
      'FinTech & Quantitative Modeling Terminal',
      'Incubation & Startup Ideation Pods',
      'Executive Boardroom & Negotiation Simulation Arena'
    ],
    careers: ['Product Manager', 'FinTech Analyst', 'Enterprise Solution Architect', 'Management Consultant'],
    topRecruiters: ['Federal Bank', 'Deloitte', 'Ernst & Young', 'KPMG', 'HDFC Bank', 'PwC'],
    techStack: ['Python', 'SQL', 'Tableau', 'PowerBI', 'R', 'Jira', 'Figma', 'ERP Systems'],
    blueprintType: 'system',
    stats: {
      patents: 5,
      placements: '94.0%',
      publications: 62,
      alumniNetwork: '1,800+ worldwide'
    },
    location: {
      buildingName: 'FISAT Business School (FBS) Executive Complex',
      floors: '3rd & 4th Floors',
      wing: 'North Executive Quad',
      roomNumbers: 'Rooms FBS-301 to FBS-320',
      landmark: 'Directly overlooking the Central Indoor Auditorium and Incubation TBI Pods',
      mapPinX: 82,
      mapPinY: 68
    },
    faculties: [
      {
        id: 'f-pg-1',
        name: 'Dr. A. J. Joshua',
        designation: 'Director & Dean (FISAT Business School)',
        qualification: 'Ph.D., MBA, M.Com',
        specialization: 'Strategic Management, Marketing Analytics & Organizational Leadership',
        email: 'director@fbs.ac.in',
        experienceYears: 25,
        isHod: true
      },
      {
        id: 'f-pg-2',
        name: 'Dr. Deepa Mary Mathews',
        designation: 'Professor & Head of MCA',
        qualification: 'Ph.D., MCA, B.Sc',
        specialization: 'Applied Computing, Data Structures & Cloud Software Architecture',
        email: 'hodmca@fisat.ac.in',
        experienceYears: 21,
        isHod: true
      },
      {
        id: 'f-pg-3',
        name: 'Dr. Santhosh P.',
        designation: 'Associate Professor (MBA)',
        qualification: 'Ph.D., MBA, CFA',
        specialization: 'Financial Modeling, Portfolio Theory & Quantitative FinTech',
        email: 'santhosh@fbs.ac.in',
        experienceYears: 18
      }
    ]
  }
];

export const CAMPUS_BUILDINGS: CampusBuilding[] = [
  {
    id: 'main-block',
    name: 'Main Administrative Quadrangle',
    label: 'Main Academic Block',
    sqft: '140,000 sq ft',
    floors: 4,
    description: 'The iconic architectural anchor of FISAT with colonnaded porticos. Houses the Principal Directorate, Admissions Registry, Central Examination Cell, Senior Faculty Chambers, and the Executive Boardroom.',
    facilities: ['Executive Boardroom', 'Admissions Helpdesk', 'Accounts & Registrations', 'Central Server Room', 'Language Lab'],
    timings: '8:30 AM – 5:00 PM',
    highlight: 'Classic-Modern hybrid portico overlooking the green central lawn and fountain circle.',
    pinX: 32,
    pinY: 42,
    color: '#0f3b3a'
  },
  {
    id: 'labs-block',
    name: 'Advanced Technology & Super FabLab Complex',
    label: 'Research Labs & FabLab',
    sqft: '185,000 sq ft',
    floors: 4,
    description: 'Where theory transforms into functioning prototypes. Houses computing clusters, high voltage test cages, robotic workcells, and the MIT-affiliated Super FabLab Node.',
    facilities: ['NVIDIA AI Supercluster', 'FabLab 3D Rapid Prototyping', 'Subsonic Wind Tunnel', 'Robotics & Mechatronics Bay', 'VLSI Design Studio'],
    timings: '8:00 AM – 8:30 PM (24/7 during Hackathons)',
    highlight: 'Home to the MIKA Humanoid Robot and ₹18 Crores in scientific test instrumentation.',
    pinX: 68,
    pinY: 34,
    color: '#16504d'
  },
  {
    id: 'library-block',
    name: 'Dr. APJ Abdul Kalam Central Library',
    label: 'Central Library',
    sqft: '45,000 sq ft',
    floors: 3,
    description: 'A serene sanctuary of learning holding over 75,000 physical volumes, 12,000 digital journal subscriptions (IEEE Xplore, ScienceDirect), and specialized PhD research carrels.',
    facilities: ['Digital Reference Carrels', 'RFID Automated Checkout', 'Quiet Study Hall', 'E-Journals Data Terminal', 'Rare Manuscript Corner'],
    timings: '8:00 AM – 9:00 PM (Exam weeks till 10:30 PM)',
    highlight: 'Automated RFID self-lending kiosks and fully air-conditioned silent floors.',
    pinX: 24,
    pinY: 72,
    color: '#2d6aa0'
  },
  {
    id: 'canteen-block',
    name: 'Student Food Court & Gazebo Hub',
    label: 'Food Court & Canteen',
    sqft: '28,000 sq ft',
    floors: 2,
    description: 'The vibrant social pulse of campus life. Fresh Kerala snacks, hot meals, specialty juices, and shaded outdoor gazebo tables for group project discussions.',
    facilities: ['Steam Powered Hygiene Kitchen', 'Juice & Chaat Bar', 'Spacious Seating for 750', 'Project Gazebos'],
    timings: '7:30 AM – 7:30 PM',
    highlight: 'Famous for hot pazham pori (banana fritters), egg puffs, and tea debates.',
    pinX: 52,
    pinY: 66,
    color: '#b5502e'
  },
  {
    id: 'auditorium-block',
    name: 'Grand Indoor Auditorium & Stadium',
    label: 'Auditorium & Sports Complex',
    sqft: '52,000 sq ft',
    floors: 2,
    description: 'Air-conditioned auditorium seating 2,500 with acoustic panelling and theatrical lighting. Adjacent to the indoor basketball and badminton courts.',
    facilities: ['Green Rooms & Dressing Lounges', 'Dolby Atmos Tuned Acoustics', 'Press Gallery', 'VIP Reception Suites'],
    timings: 'Events, Conventions & Matches',
    highlight: 'Host to tech fest Nakshatra, national symposiums, and star night concerts.',
    pinX: 82,
    pinY: 68,
    color: '#7a4fa0'
  }
];

export const NOTICES_DATA: NoticeEvent[] = [
  {
    id: 'n-1',
    title: 'Nakshatra 2026: Flagship National Techno-Cultural Fest',
    date: 'OCT 12, 2026',
    day: '12',
    month: 'OCT',
    category: 'event',
    description: '3 Days, 45 Events, ₹10 Lakhs Prize Pool. Featuring hackathons, robowars, drone GP, and star concert night.',
    fullDetails: 'The grand annual tech festival of FISAT returns. Teams from over 120 institutions across India will compete in Robowars, 36-hour Hackathon, Game Dev Jam, and Cultural Dance showdowns. Registrations now open on the official portal.',
    badge: 'FLAGSHIP EVENT',
    linkText: 'Register Delegations'
  },
  {
    id: 'n-2',
    title: 'Campus Placement Drive: Bosch & Microsoft Cloud Guild',
    date: 'OCT 08, 2026',
    day: '08',
    month: 'OCT',
    category: 'placement',
    description: 'Registration opens for Final Year B.Tech and MCA candidates. Pre-placement talk in the auditorium.',
    fullDetails: 'Bosch Global Software Technologies and Microsoft Cloud partners will be holding campus recruitment interviews for Software Engineer, Embedded Systems Architect, and Cloud Operations roles. Eligible CGPA: 7.0 and above.',
    badge: 'PLACEMENTS',
    linkText: 'Check Eligibility & Apply'
  },
  {
    id: 'n-3',
    title: 'UGC Autonomous Curriculum & KTU Schedule Released',
    date: 'OCT 02, 2026',
    day: '02',
    month: 'OCT',
    category: 'circular',
    description: 'Autonomous curriculum handbook and semester examination schedule available on student intranet.',
    fullDetails: 'With the conferment of UGC Autonomous status, FISAT has updated the syllabus to integrate AI, Quantum Computing, and Clean Energy modules. Download your hall tickets and academic guides from the portal.',
    badge: 'AUTONOMOUS CELL',
    linkText: 'Download Handbook PDF'
  },
  {
    id: 'n-4',
    title: 'FISAT TBI Seed Grant: Applications for 2026 Cohort',
    date: 'SEP 28, 2026',
    day: '28',
    month: 'SEP',
    category: 'news',
    description: 'Grants up to ₹5,00,000 for student-led hardware and software startup prototypes.',
    fullDetails: 'The FISAT Technology Business Incubator invites pitches from interdisciplinary student teams. Selected startups receive dedicated co-working space, cloud credits, legal patent counsel, and prototype funding.',
    badge: 'INNOVATION',
    linkText: 'Submit Pitch Deck'
  },
  {
    id: 'n-5',
    title: 'B.Tech Lateral Entry & NRI Merit Quota Counseling',
    date: 'SEP 24, 2026',
    day: '24',
    month: 'SEP',
    category: 'circular',
    description: 'Document verification and seat allotment rounds commencing at the Admissions Directorate.',
    fullDetails: 'Candidates seeking admission under NRI Merit, Lateral Entry for Polytechnic diploma holders, and Management quotas are advised to bring original certificates for on-spot verification and fee settlement.',
    badge: 'ADMISSIONS',
    linkText: 'View Vacancy List'
  }
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'Arjun Menon',
    batch: 'Class of 2018',
    branch: 'ECE',
    message: 'Remembering late night lab hours in the FabLab before college fest! FISAT gave me the foundation to build my chip design career in Austin.',
    timestamp: 'Yesterday at 9:42 PM'
  },
  {
    id: 'gb-2',
    name: 'Sneha Mary Kurian',
    batch: 'Class of 2022',
    branch: 'CSE',
    message: 'The best four years of my life! Canteen pazham pori + tea breaks between compiler design lectures were unbeatable. Proud alumnus!',
    timestamp: '2 days ago'
  },
  {
    id: 'gb-3',
    name: 'Kiran Dev P.',
    batch: 'Class of 2025',
    branch: 'Mechanical',
    message: 'FISAT Baja SAE Formula team forever. Sleepless nights in the mechanical workshop made us real engineers.',
    timestamp: '5 days ago'
  }
];

export const BRANCH_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'When you look at modern technology, what captivates you first?',
    options: [
      { text: 'Intelligent algorithms, neural networks, and high-speed web apps', weights: { cse: 3, 'mca-mba': 1 } },
      { text: 'Microchips, silicon wafers, robotics sensors, and wireless radios', weights: { ece: 3, eee: 1 } },
      { text: 'Electric vehicles, mega-battery packs, and smart solar grids', weights: { eee: 3, ece: 1 } },
      { text: 'Roaring engines, aerodynamic wings, 3D printing, and heavy machinery', weights: { me: 3 } },
      { text: 'Iconic bridges, high-speed rail, smart green cities, and hydrology', weights: { ce: 3 } },
      { text: 'Launching high-growth tech startups, business analytics, and product teams', weights: { 'mca-mba': 3, cse: 1 } }
    ]
  },
  {
    id: 2,
    question: 'Choose your ideal capstone project to work on for 6 months:',
    options: [
      { text: 'An autonomous AI agent network running distributed on GPU servers', weights: { cse: 3 } },
      { text: 'A swarm of miniature drones communicating via custom RF telemetry', weights: { ece: 2, me: 1, cse: 1 } },
      { text: 'A high-efficiency regenerative braking controller for an electric supercar', weights: { eee: 3, me: 1 } },
      { text: 'A lightweight carbon-fiber chassis with tuned CFD aerodynamics', weights: { me: 3 } },
      { text: 'An earthquake-resistant smart foundation with fiber-optic strain monitors', weights: { ce: 3 } },
      { text: 'A scalable venture-backed FinTech SaaS with a full business and product model', weights: { 'mca-mba': 3, cse: 1 } }
    ]
  },
  {
    id: 3,
    question: 'What is your preferred everyday workspace?',
    options: [
      { text: 'Dual 4K monitors, mechanical keyboard, dark mode IDE and terminal', weights: { cse: 3, 'mca-mba': 1 } },
      { text: 'A workbench with an oscilloscope, soldering iron, and logic analyzer', weights: { ece: 3, eee: 2 } },
      { text: 'A high-voltage test bay with dynamometers and power inverters', weights: { eee: 3 } },
      { text: 'A maker garage with a 5-axis CNC mill, grease, and lathe cutters', weights: { me: 3 } },
      { text: 'An open surveying field with laser total stations and civil CAD drafting tables', weights: { ce: 3 } },
      { text: 'A dynamic innovation boardroom with whiteboards, metrics dashboards, and pitch decks', weights: { 'mca-mba': 3 } }
    ]
  }
];
