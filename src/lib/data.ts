export type OrganismType = 'bacteria' | 'virus' | 'fungi' | 'protozoa' | 'parasite' | 'helminth';
export type TransmissionTag = 'vector-borne' | 'foodborne' | 'waterborne' | 'airborne' | 'zoonotic' | 'person-to-person' | 'bloodborne';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Disease {
  id: string;
  name: string;
  commonNames: string[];
  scientificName: string;
  category: 'Bacteria' | 'Virus' | 'Fungus' | 'Parasite' | 'Other';
  organismType: OrganismType;
  transmissionTags: TransmissionTag[];
  overview: string;
  publicHealthRelevance: string;
  classification: string;
  causativeOrganism: string;
  morphology: string;
  microbiologyProfile: string;
  transmission: string;
  vectors: string[];
  reservoirs: string[];
  incubationPeriod: string;
  epidemiology: string;
  globalRelevance: string;
  nigeriaAfricaRelevance: string;
  outbreakInfo: string;
  riskFactors: string[];
  vulnerablePopulations: string[];
  pathogenesis: string;
  symptoms: string[];
  signs: string[];
  complications: string[];
  diagnosisMethods: string[];
  specimenTypes: string[];
  identificationMethods: string[];
  prevention: string[];
  preventionTips: string[];
  vaccinationInfo: string;
  publicHealthControlMeasures: string[];
  treatmentOverview: string;
  managementApproaches: string[];
  antimicrobialConsiderations: string;
  faqs: FAQItem[];
  references: string[];
  lastReviewedDate?: string;
  reviewedBy?: string;
  contentStatus?: 'published' | 'needs-review' | 'draft';
}

export const diseases: Disease[] = [
  {
    id: 'cholera',
    name: 'Cholera',
    commonNames: ['Cholera morbus'],
    scientificName: 'Vibrio cholerae infection',
    category: 'Bacteria',
    organismType: 'bacteria',
    transmissionTags: ['waterborne', 'foodborne'],
    overview: 'An acute diarrheal illness caused by infection of the intestine, capable of causing severe dehydration within hours if untreated.',
    publicHealthRelevance: 'Cholera can cause explosive outbreaks with high fatality if untreated, making it a priority disease for WHO International Health Regulations reporting and rapid outbreak response in Nigeria.',
    classification: 'Acute bacterial diarrheal disease, notifiable under WHO International Health Regulations.',
    causativeOrganism: 'Vibrio cholerae (toxigenic serogroups O1 and O139)',
    morphology: 'Curved, comma-shaped, motile Gram-negative rod with a single polar flagellum.',
    microbiologyProfile: 'A Gram-negative, comma-shaped bacterium. Toxigenic strains produce cholera toxin, which triggers massive fluid secretion into the intestinal lumen. Isolation typically uses TCBS agar and confirmation via biochemical and serological testing.',
    transmission: 'Faecal-oral route, primarily through contaminated water and food, especially during flooding or poor sanitation conditions.',
    vectors: [],
    reservoirs: ['Contaminated water sources', 'Asymptomatic human carriers', 'Estuarine and coastal waters (natural environmental reservoir)'],
    incubationPeriod: '12 hours to 5 days, typically 2-3 days',
    epidemiology: 'Endemic in areas with unsafe water and poor sanitation; seasonal peaks during flooding and rainy seasons in parts of Nigeria.',
    globalRelevance: 'An estimated 1.3 to 4 million cases occur worldwide each year, concentrated in regions lacking safe water and sanitation infrastructure.',
    nigeriaAfricaRelevance: 'Nigeria regularly reports cholera outbreaks, particularly in flood-prone and displacement-affected states during the rainy season.',
    outbreakInfo: 'Outbreaks often follow flooding, population displacement, or breakdown of water infrastructure, and can spread rapidly without prompt intervention.',
    riskFactors: ['Lack of access to safe drinking water', 'Poor sanitation infrastructure', 'Overcrowded displacement or flood-affected settlements', 'Reduced stomach acidity (e.g. from antacid use)'],
    vulnerablePopulations: ['Young children', 'People in overcrowded camps or informal settlements', 'Individuals with reduced gastric acidity'],
    pathogenesis: 'Cholera toxin binds intestinal epithelial cells and activates adenylate cyclase, driving massive chloride and water secretion into the gut lumen and producing the characteristic profuse watery diarrhea.',
    symptoms: ['Profuse watery diarrhea ("rice-water stools")', 'Vomiting', 'Rapid dehydration', 'Muscle cramps', 'Low blood pressure'],
    signs: ['Sunken eyes', 'Decreased skin turgor', 'Rapid, weak pulse', 'Cold extremities'],
    complications: ['Severe dehydration', 'Hypovolemic shock', 'Electrolyte imbalance', 'Acute kidney injury'],
    diagnosisMethods: ['Stool culture on TCBS agar', 'Dark-field microscopy for characteristic motility', 'Rapid dipstick antigen tests', 'PCR confirmation in reference laboratories'],
    specimenTypes: ['Stool sample', 'Rectal swab'],
    identificationMethods: ['Culture on TCBS agar', 'Serogrouping (O1/O139)', 'PCR for cholera toxin genes'],
    prevention: ['Access to safe drinking water', 'Proper sanitation and handwashing', 'Oral cholera vaccination in high-risk areas', 'Safe food handling'],
    preventionTips: ['Drink only boiled, treated, or bottled water', 'Wash hands with soap before eating and after using the toilet', 'Cook food thoroughly and eat it while hot'],
    vaccinationInfo: 'Oral cholera vaccines provide short- to medium-term protection and are used in outbreak response and in high-risk areas ahead of the rainy season.',
    publicHealthControlMeasures: ['Rapid case investigation', 'Water source testing and chlorination', 'Community health education', 'Oral rehydration points in affected areas'],
    treatmentOverview: 'Prompt oral or intravenous rehydration is the priority; antibiotics such as doxycycline may shorten illness duration in moderate-to-severe cases.',
    managementApproaches: ["Oral rehydration salts (ORS) for mild-to-moderate cases", "Intravenous fluids (e.g. Ringer's lactate) for severe dehydration", 'Zinc supplementation in children'],
    antimicrobialConsiderations: 'Antibiotics such as doxycycline or azithromycin shorten disease duration and reduce transmission but are secondary to rehydration, which saves lives on its own.',
    faqs: [
      { question: 'Is cholera contagious from person to person?', answer: 'Direct person-to-person spread is uncommon; most transmission occurs through contaminated water or food.' },
      { question: 'Can cholera be fully prevented?', answer: 'Consistent access to safe water and sanitation dramatically reduces risk, and vaccination adds further protection in high-risk settings.' },
    ],
    references: ['WHO Cholera Fact Sheet', 'Nigeria CDC Outbreak Guidelines', 'Diagnostic Microbiology notes on enteric pathogens'],
    lastReviewedDate: '2026-08-01',
    reviewedBy: 'HOTICE Immunotech',
    contentStatus: 'published',
  },
  {
    id: 'malaria',
    name: 'Malaria',
    commonNames: ['Ague', 'Marsh fever'],
    scientificName: 'Plasmodium spp. infection',
    category: 'Parasite',
    organismType: 'protozoa',
    transmissionTags: ['vector-borne'],
    overview: 'A life-threatening disease caused by Plasmodium parasites transmitted through the bites of infected female Anopheles mosquitoes.',
    publicHealthRelevance: 'Malaria remains one of the leading causes of illness and death in Nigeria, disproportionately affecting young children and pregnant women.',
    classification: 'Vector-borne parasitic disease.',
    causativeOrganism: 'Plasmodium falciparum, P. vivax, P. ovale, P. malariae (P. falciparum most severe in Nigeria)',
    morphology: 'Intracellular protozoan parasites with a complex life cycle involving ring, trophozoite, schizont, and gametocyte stages inside red blood cells.',
    microbiologyProfile: 'Protozoan parasites of the genus Plasmodium. Diagnosis relies on microscopy of thick and thin blood films, rapid diagnostic tests (RDTs), and PCR for confirmation.',
    transmission: 'Transmitted via the bite of infected female Anopheles mosquitoes; can also occur through blood transfusion or from mother to fetus.',
    vectors: ['Female Anopheles mosquitoes'],
    reservoirs: ['Infected humans (the parasite has no significant animal reservoir for the species affecting humans)'],
    incubationPeriod: '7 to 30 days depending on Plasmodium species, commonly around 10-15 days for P. falciparum',
    epidemiology: 'Holoendemic across most of Nigeria, which contributes the largest global malaria burden of any country, with under-five children and pregnant women at highest risk.',
    globalRelevance: 'Malaria caused an estimated 249 million cases and over 600,000 deaths globally in recent years, with sub-Saharan Africa bearing the overwhelming majority.',
    nigeriaAfricaRelevance: 'Nigeria alone accounts for roughly a quarter of the global malaria burden, making it a national public health priority.',
    outbreakInfo: 'Transmission intensifies during and after the rainy season when mosquito breeding sites increase; localized surges can strain health facilities.',
    riskFactors: ['Living in or traveling to endemic regions', 'Standing water near homes (mosquito breeding sites)', 'Lack of insecticide-treated bed nets', 'Pregnancy (reduced immunity)'],
    vulnerablePopulations: ['Children under five', 'Pregnant women', 'Non-immune travelers to endemic areas'],
    pathogenesis: 'Sporozoites injected by mosquito bite invade liver cells, then rupture to infect red blood cells; cyclical rupture of infected erythrocytes causes the classic fever paroxysms.',
    symptoms: ['Fever and chills', 'Headache', 'Fatigue', 'Nausea and vomiting', 'Muscle and joint pain'],
    signs: ['Intermittent fever pattern', 'Pallor (from anemia)', 'Splenomegaly in chronic or repeated infection'],
    complications: ['Severe anemia', 'Cerebral malaria', 'Acute respiratory distress', 'Organ failure in severe P. falciparum infection'],
    diagnosisMethods: ['Thick and thin blood film microscopy', 'Rapid diagnostic tests (RDTs) for parasite antigens', 'PCR for species confirmation and low-density infections'],
    specimenTypes: ['Capillary or venous blood sample'],
    identificationMethods: ['Giemsa-stained thick and thin blood films', 'Antigen-based RDTs', 'Species-specific PCR'],
    prevention: ['Insecticide-treated bed nets', 'Indoor residual spraying', 'Prompt diagnosis and treatment', 'Chemoprophylaxis for travelers and pregnant women'],
    preventionTips: ['Sleep under an insecticide-treated bed net every night', 'Clear stagnant water around the home', 'Seek testing promptly for any fever in endemic areas'],
    vaccinationInfo: 'The RTS,S and R21 malaria vaccines are being rolled out for young children in endemic countries, complementing, not replacing, bed nets and prompt treatment.',
    publicHealthControlMeasures: ['Mass bed net distribution campaigns', 'Indoor residual spraying programmes', 'Seasonal malaria chemoprevention in children', 'Case surveillance and reporting'],
    treatmentOverview: 'Artemisinin-based combination therapy (ACT) is first-line for uncomplicated P. falciparum malaria in Nigeria; severe malaria requires parenteral artesunate.',
    managementApproaches: ['Artemisinin-based combination therapy (ACT) for uncomplicated cases', 'Injectable artesunate for severe malaria', 'Supportive care for complications such as anemia'],
    antimicrobialConsiderations: 'Resistance to older antimalarials (e.g. chloroquine) is widespread, which is why ACTs combining two mechanisms of action are now standard first-line treatment.',
    faqs: [
      { question: 'Can you get malaria more than once?', answer: 'Yes. Immunity is partial and temporary, so repeated infections are common in endemic areas.' },
      { question: 'Do all mosquito bites cause malaria?', answer: 'No, only bites from an infected female Anopheles mosquito can transmit the parasite.' },
    ],
    references: ['National Malaria Elimination Programme (Nigeria)', 'WHO World Malaria Report', 'Basic Microbiology Techniques: blood film preparation'],
    lastReviewedDate: '2026-08-01',
    reviewedBy: 'HOTICE Immunotech',
    contentStatus: 'published',
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (TB)',
    commonNames: ['Consumption (historical)'],
    scientificName: 'Mycobacterium tuberculosis infection',
    category: 'Bacteria',
    organismType: 'bacteria',
    transmissionTags: ['airborne'],
    overview: 'A chronic infectious disease that primarily affects the lungs, spread through airborne droplets when an infected person coughs or sneezes.',
    publicHealthRelevance: 'TB remains a leading infectious cause of death worldwide and is complicated in Nigeria by high rates of under-diagnosis and HIV co-infection.',
    classification: 'Chronic bacterial infection caused by an acid-fast bacillus.',
    causativeOrganism: 'Mycobacterium tuberculosis',
    morphology: 'Slow-growing, acid-fast, rod-shaped bacillus with a lipid-rich cell wall that resists standard Gram staining.',
    microbiologyProfile: 'An acid-fast bacillus. Diagnosis uses Ziehl-Neelsen staining, sputum smear microscopy, GeneXpert MTB/RIF testing, and culture on Lowenstein-Jensen media.',
    transmission: 'Airborne transmission through respiratory droplets released when an infected person coughs, sneezes, or speaks.',
    vectors: [],
    reservoirs: ['Humans with active pulmonary tuberculosis'],
    incubationPeriod: 'Weeks to years; infection can remain latent for decades before reactivating',
    epidemiology: 'Nigeria carries one of the highest TB burdens in Africa, with significant case under-detection driving continued transmission.',
    globalRelevance: 'TB is among the top infectious causes of death globally, with an estimated 10 million people falling ill each year.',
    nigeriaAfricaRelevance: 'Nigeria ranks among the countries with the highest estimated TB burden worldwide, with case detection gaps a major control challenge.',
    outbreakInfo: 'TB spreads more readily in crowded, poorly ventilated settings such as prisons, informal settlements, and healthcare facilities without adequate infection control.',
    riskFactors: ['HIV co-infection', 'Malnutrition', 'Overcrowded living conditions', 'Diabetes', 'Close contact with an infectious case'],
    vulnerablePopulations: ['People living with HIV', 'Malnourished individuals', 'Healthcare workers', 'Prison populations'],
    pathogenesis: 'Inhaled bacilli are engulfed by alveolar macrophages; in most people the immune system contains the infection in a granuloma (latent TB), but reactivation can occur when immunity weakens.',
    symptoms: ['Persistent cough (over 2 weeks)', 'Coughing up blood', 'Chest pain', 'Fatigue and weight loss', 'Night sweats and fever'],
    signs: ['Weight loss', 'Crackles on chest auscultation', 'Lymphadenopathy in extrapulmonary disease'],
    complications: ['Lung damage and fibrosis', 'Pleural effusion', 'Disseminated (miliary) TB', 'Drug-resistant disease'],
    diagnosisMethods: ['Sputum smear microscopy (Ziehl-Neelsen stain)', 'GeneXpert MTB/RIF molecular testing', 'Culture on Lowenstein-Jensen media', 'Chest X-ray'],
    specimenTypes: ['Sputum sample', 'Bronchial lavage (where needed)', 'Tissue biopsy for extrapulmonary TB'],
    identificationMethods: ['Ziehl-Neelsen acid-fast staining', 'GeneXpert MTB/RIF (detects rifampicin resistance)', 'Solid or liquid culture'],
    prevention: ['BCG vaccination in infancy', 'Early case detection and treatment', 'Good ventilation in crowded spaces', 'Directly Observed Treatment, Short-course (DOTS)'],
    preventionTips: ['Seek testing early for a cough lasting more than two weeks', 'Ensure good ventilation indoors', 'Complete the full treatment course if diagnosed'],
    vaccinationInfo: 'The BCG vaccine, given at birth in Nigeria, reduces the risk of severe TB forms in children but offers only partial protection against pulmonary TB in adults.',
    publicHealthControlMeasures: ['Directly Observed Treatment, Short-course (DOTS)', 'Active case finding in high-risk communities', 'Contact tracing', 'Infection control in health facilities'],
    treatmentOverview: 'Standard therapy is a 6-month multidrug regimen (isoniazid, rifampicin, pyrazinamide, ethambutol) delivered under Directly Observed Treatment, Short-course (DOTS).',
    managementApproaches: ['Standard 6-month four-drug regimen for drug-sensitive TB', 'Extended regimens for drug-resistant TB', 'Nutritional support during treatment'],
    antimicrobialConsiderations: 'Incomplete or interrupted treatment is a major driver of multidrug-resistant TB, making adherence support and DOTS supervision essential.',
    faqs: [
      { question: 'Is TB the same as a common cold or pneumonia?', answer: 'No. TB is caused by a specific bacterium and requires a much longer, specific antibiotic regimen than typical respiratory infections.' },
      { question: 'Can latent TB become active later?', answer: 'Yes, latent infection can reactivate years later, especially if the immune system is weakened.' },
    ],
    references: ['National TB and Leprosy Control Programme', 'WHO TB Guidelines', 'Notes on acid-fast staining'],
    lastReviewedDate: '2026-08-01',
    reviewedBy: 'HOTICE Immunotech',
    contentStatus: 'published',
  },
  {
    id: 'lassa-fever',
    name: 'Lassa Fever',
    commonNames: ['Lassa haemorrhagic fever'],
    scientificName: 'Lassa mammarenavirus infection',
    category: 'Virus',
    organismType: 'virus',
    transmissionTags: ['zoonotic', 'person-to-person'],
    overview: 'An acute viral haemorrhagic illness endemic to West Africa, with Nigeria reporting significant annual case counts, especially in the dry season.',
    publicHealthRelevance: 'Lassa fever is a recurring public health emergency in Nigeria, requiring active surveillance and rapid isolation of suspected cases.',
    classification: 'Zoonotic viral haemorrhagic fever.',
    causativeOrganism: 'Lassa virus (Old World arenavirus)',
    morphology: 'Enveloped, roughly spherical virus with a segmented, ambisense single-stranded RNA genome.',
    microbiologyProfile: 'An Old World arenavirus with a segmented single-stranded RNA genome. Diagnosis relies on RT-PCR, with ELISA and viral isolation used in reference laboratories.',
    transmission: 'Primarily through contact with food or household items contaminated with urine or faeces of infected Mastomys rats; person-to-person spread can occur via bodily fluids.',
    vectors: [],
    reservoirs: ['Mastomys natalensis (multimammate rat)'],
    incubationPeriod: '6 to 21 days',
    epidemiology: 'Endemic to West Africa; Nigeria reports the largest annual case burden, with seasonal peaks in the dry season (November-April).',
    globalRelevance: 'Lassa fever is largely confined to West Africa but is monitored globally as a viral haemorrhagic fever of pandemic-preparedness concern.',
    nigeriaAfricaRelevance: 'Nigeria records the highest number of confirmed Lassa fever cases annually among affected West African countries.',
    outbreakInfo: 'Seasonal upticks occur in the dry season as rodents move closer to human dwellings in search of food; healthcare-associated clusters can occur without strict infection control.',
    riskFactors: ['Living in homes with rodent access', 'Poor food storage practices', 'Healthcare exposure without adequate infection control', 'Bushmeat handling in some regions'],
    vulnerablePopulations: ['Rural households with rodent infestation', 'Healthcare workers', 'Pregnant women (higher severity risk)'],
    pathogenesis: 'The virus enters through mucous membranes or broken skin, replicates in the reticuloendothelial system, and in severe cases impairs vascular integrity, leading to bleeding and multi-organ involvement.',
    symptoms: ['Fever', 'Sore throat and headache', 'Vomiting and diarrhea', 'Chest and abdominal pain', 'In severe cases, bleeding from mucous membranes'],
    signs: ['Pharyngitis with exudate', 'Facial swelling in severe cases', 'Hearing loss (a recognized complication)'],
    complications: ['Hemorrhage', 'Hearing loss', 'Multi-organ failure', 'Death in severe untreated cases'],
    diagnosisMethods: ['RT-PCR for viral RNA', 'ELISA for antigen/antibody detection', 'Viral isolation in reference biosafety laboratories'],
    specimenTypes: ['Blood sample', 'Throat swab', 'Urine (in select assays)'],
    identificationMethods: ['RT-PCR for Lassa virus RNA', 'Antigen-capture ELISA', 'IgM/IgG serology'],
    prevention: ['Rodent control in homes and food stores', 'Safe food storage practices', 'Good hand hygiene', 'Infection prevention and control in health facilities'],
    preventionTips: ['Store food in rodent-proof containers', 'Keep living spaces free of clutter where rodents can nest', 'Avoid contact with rodents, alive or dead'],
    vaccinationInfo: 'No licensed vaccine is currently available; several candidates are in clinical development.',
    publicHealthControlMeasures: ['Rodent control campaigns', 'Case-based surveillance', 'Isolation and barrier nursing for confirmed cases', 'Contact tracing'],
    treatmentOverview: 'Supportive care (fluid and electrolyte management) is central; the antiviral ribavirin is most effective when started early in the illness.',
    managementApproaches: ['Early supportive care and fluid management', 'Ribavirin therapy, most effective if started early', 'Barrier nursing to prevent nosocomial spread'],
    antimicrobialConsiderations: 'Lassa fever is viral, so antibiotics are not effective against the virus itself but may be used to treat secondary bacterial infections.',
    faqs: [
      { question: 'Can Lassa fever spread between people?', answer: 'Yes, though less efficiently than through rodent exposure; direct contact with bodily fluids of an infected person carries risk, especially in healthcare settings.' },
      { question: 'Why does Lassa fever peak in the dry season?', answer: 'Rodents move into homes seeking food and shelter as the dry season progresses, increasing human contact with contaminated materials.' },
    ],
    references: ['Nigeria Centre for Disease Control (NCDC) Situation Reports', 'Irrua Specialist Teaching Hospital Lassa Fever Unit'],
    lastReviewedDate: '2026-08-01',
    reviewedBy: 'HOTICE Immunotech',
    contentStatus: 'published',
  },
  {
    id: 'typhoid-fever',
    name: 'Typhoid Fever',
    commonNames: ['Enteric fever'],
    scientificName: 'Salmonella enterica serovar Typhi infection',
    category: 'Bacteria',
    organismType: 'bacteria',
    transmissionTags: ['waterborne', 'foodborne'],
    overview: 'A systemic bacterial infection common in areas with poor sanitation, presenting with sustained fever and gastrointestinal symptoms.',
    publicHealthRelevance: 'Typhoid remains common in Nigeria wherever safe water and sanitation are limited, and rising antibiotic resistance is a growing concern.',
    classification: 'Systemic bacterial infection (enteric fever).',
    causativeOrganism: 'Salmonella enterica serovar Typhi',
    morphology: 'Motile, Gram-negative, flagellated bacillus of the Enterobacteriaceae family.',
    microbiologyProfile: 'A Gram-negative bacillus. Diagnosis uses blood culture (gold standard in the first week), Widal test, and stool/urine culture. MacConkey agar is commonly used for isolation.',
    transmission: "Faecal-oral route through contaminated food or water, or contact with an infected person's stool.",
    vectors: [],
    reservoirs: ['Humans, including asymptomatic chronic carriers'],
    incubationPeriod: '6 to 30 days, typically 1-2 weeks',
    epidemiology: 'Common in Nigeria wherever water and sanitation infrastructure is limited, with school-age children frequently affected.',
    globalRelevance: 'Typhoid fever causes an estimated 9 million illnesses and over 100,000 deaths globally each year, concentrated in low- and middle-income countries.',
    nigeriaAfricaRelevance: 'Typhoid is endemic across much of Nigeria and sub-Saharan Africa, closely tied to gaps in water, sanitation, and hygiene infrastructure.',
    outbreakInfo: 'Localized clusters often trace back to a contaminated communal water source or food vendor, and can be amplified by an unidentified chronic carrier.',
    riskFactors: ['Contaminated water or food sources', 'Poor sanitation', 'Travel to endemic areas', 'Close contact with a chronic carrier'],
    vulnerablePopulations: ['School-age children', 'People without access to safe water', 'Food handlers and their contacts'],
    pathogenesis: 'Bacteria invade the intestinal mucosa, are taken up by macrophages, and disseminate systemically via the lymphatic and blood systems, producing sustained fever and systemic illness.',
    symptoms: ['Sustained high fever', 'Abdominal pain', 'Headache and malaise', 'Rose-coloured skin spots', 'Constipation or diarrhea'],
    signs: ['Relative bradycardia (pulse-fever dissociation)', 'Hepatosplenomegaly', 'Rose spots on the trunk'],
    complications: ['Intestinal perforation', 'Gastrointestinal bleeding', 'Encephalopathy', 'Chronic carrier state'],
    diagnosisMethods: ['Blood culture (most sensitive in the first week)', 'Widal serological test (supportive, not definitive)', 'Stool and urine culture in later illness'],
    specimenTypes: ['Blood sample', 'Stool sample', 'Urine sample'],
    identificationMethods: ['Blood culture on standard media', 'Biochemical identification (e.g. API strips)', 'Serotyping'],
    prevention: ['Safe drinking water and food hygiene', 'Typhoid conjugate vaccination', 'Proper waste disposal', 'Handwashing with soap'],
    preventionTips: ['Drink treated or boiled water', 'Wash fruits and vegetables thoroughly', 'Get vaccinated if in a high-exposure setting or traveling to an endemic area'],
    vaccinationInfo: 'Typhoid conjugate vaccines offer several years of protection and are increasingly used in routine immunization programmes in endemic countries.',
    publicHealthControlMeasures: ['Water source testing and treatment', 'Food handler hygiene training', 'Case investigation for chronic carriers', 'Sanitation infrastructure improvement'],
    treatmentOverview: 'Antibiotics such as ceftriaxone or azithromycin are first-line given rising fluoroquinolone resistance; the typhoid conjugate vaccine offers additional prevention.',
    managementApproaches: ['Empirical antibiotic therapy pending culture results', 'Supportive care for fever and dehydration', 'Surgical management for intestinal perforation if it occurs'],
    antimicrobialConsiderations: 'Fluoroquinolone resistance is now widespread in many regions, making ceftriaxone or azithromycin preferred first-line options pending susceptibility results.',
    faqs: [
      { question: 'Is typhoid the same as regular food poisoning?', answer: 'No. Typhoid is caused by a specific systemic bacterium and typically causes prolonged fever rather than short-lived gastrointestinal upset.' },
      { question: 'Can someone spread typhoid without being sick themselves?', answer: 'Yes, some people become chronic asymptomatic carriers who can still spread the bacteria through contaminated food or water.' },
    ],
    references: ['Practical notes on Salmonella isolation', 'WHO Typhoid Fact Sheet'],
    lastReviewedDate: '2026-08-01',
    reviewedBy: 'HOTICE Immunotech',
    contentStatus: 'published',
  },
  {
    id: 'covid-19',
    name: 'COVID-19',
    commonNames: ['Coronavirus disease 2019'],
    scientificName: 'SARS-CoV-2 infection',
    category: 'Virus',
    organismType: 'virus',
    transmissionTags: ['airborne', 'person-to-person'],
    overview: 'A respiratory illness caused by the SARS-CoV-2 coronavirus, ranging from mild symptoms to severe pneumonia and systemic complications.',
    publicHealthRelevance: 'COVID-19 reshaped global public health practice and remains relevant for ongoing surveillance, vaccination strategy, and health system preparedness.',
    classification: 'Acute respiratory viral illness.',
    causativeOrganism: 'SARS-CoV-2 (betacoronavirus)',
    morphology: 'Enveloped, spherical, positive-sense single-stranded RNA virus studded with distinctive spike proteins.',
    microbiologyProfile: 'An enveloped, positive-sense single-stranded RNA betacoronavirus. Diagnosis relies on RT-PCR of nasopharyngeal swabs, with antigen rapid tests used for quick screening.',
    transmission: 'Primarily through respiratory droplets and aerosols from an infected person, and contact with contaminated surfaces to a lesser extent.',
    vectors: [],
    reservoirs: ['Humans; likely zoonotic animal origin'],
    incubationPeriod: '2 to 14 days, typically around 5 days',
    epidemiology: 'Global pandemic-scale spread since 2019-2020, with ongoing circulation and periodic variant-driven waves.',
    globalRelevance: 'COVID-19 has caused hundreds of millions of confirmed cases and millions of deaths worldwide since its emergence.',
    nigeriaAfricaRelevance: 'Nigeria experienced multiple waves of COVID-19, and national vaccination and surveillance systems built during the pandemic continue to support broader disease control.',
    outbreakInfo: 'New variants have periodically driven fresh waves of transmission, underscoring the value of ongoing genomic surveillance.',
    riskFactors: ['Older age', 'Underlying respiratory or cardiovascular disease', 'Immunocompromised status', 'Unvaccinated status'],
    vulnerablePopulations: ['Older adults', 'People with chronic illness', 'Immunocompromised individuals'],
    pathogenesis: 'The virus binds ACE2 receptors, predominantly in the respiratory tract, triggering an inflammatory response that in severe cases progresses to pneumonia and acute respiratory distress syndrome.',
    symptoms: ['Fever and cough', 'Loss of taste or smell', 'Shortness of breath', 'Fatigue', 'Sore throat'],
    signs: ['Low oxygen saturation in severe disease', 'Bilateral ground-glass opacities on chest imaging'],
    complications: ['Pneumonia', 'Acute respiratory distress syndrome', 'Blood clotting disorders', 'Post-COVID (long COVID) symptoms'],
    diagnosisMethods: ['RT-PCR of nasopharyngeal or oropharyngeal swabs', 'Rapid antigen tests', 'Chest imaging in moderate-to-severe disease'],
    specimenTypes: ['Nasopharyngeal swab', 'Oropharyngeal swab', 'Saliva sample (select assays)'],
    identificationMethods: ['RT-PCR targeting viral genes', 'Antigen rapid diagnostic tests', 'Genomic sequencing for variant identification'],
    prevention: ['Vaccination', 'Good ventilation and mask use in crowded settings', 'Hand hygiene', 'Isolation of confirmed cases'],
    preventionTips: ['Stay up to date with recommended vaccine doses', 'Improve indoor ventilation where possible', 'Stay home and test if you develop respiratory symptoms'],
    vaccinationInfo: 'Multiple COVID-19 vaccines (mRNA, viral vector, and protein subunit platforms) have been shown to reduce severe disease and death; booster recommendations evolve with circulating variants.',
    publicHealthControlMeasures: ['National vaccination campaigns', 'Genomic surveillance for variants', 'Case isolation and contact tracing', 'Public health risk communication'],
    treatmentOverview: 'Most cases are managed with supportive care; antivirals and monoclonal antibodies may be used in high-risk patients, alongside vaccination as the primary prevention tool.',
    managementApproaches: ['Supportive care (rest, fluids, fever control) for mild disease', 'Oxygen therapy for hypoxia', 'Antiviral therapy for eligible high-risk patients'],
    antimicrobialConsiderations: 'Antibiotics have no effect on the virus itself and are reserved only for confirmed secondary bacterial infections.',
    faqs: [
      { question: 'Can you get COVID-19 more than once?', answer: 'Yes, reinfection is possible, particularly as new variants emerge and immunity wanes over time.' },
      { question: 'Is COVID-19 still a public health concern?', answer: 'While the emergency phase has passed in most places, ongoing surveillance and vaccination remain important, especially for vulnerable groups.' },
    ],
    references: ['NCDC COVID-19 Resource Centre', 'WHO Coronavirus Dashboard'],
    lastReviewedDate: '2026-08-01',
    reviewedBy: 'HOTICE Immunotech',
    contentStatus: 'published',
  },
  {
    id: 'candidiasis',
    name: 'Candidiasis',
    commonNames: ['Thrush', 'Yeast infection'],
    scientificName: 'Candida albicans infection (and related species)',
    category: 'Fungus',
    organismType: 'fungi',
    transmissionTags: [],
    overview: 'A common fungal infection that can affect the skin, mouth, genitals, or bloodstream, ranging from mild superficial infections to serious systemic illness in immunocompromised individuals.',
    publicHealthRelevance: 'While usually mild, invasive candidiasis is a significant cause of illness in hospitalized and immunocompromised patients, and drug-resistant Candida species are an emerging concern.',
    classification: 'Opportunistic fungal infection (mycosis).',
    causativeOrganism: 'Candida albicans and other Candida species',
    morphology: 'Dimorphic yeast capable of switching between oval budding yeast cells and elongated invasive hyphal or pseudohyphal forms.',
    microbiologyProfile: 'Candida species are dimorphic yeasts, part of normal human flora, that can overgrow and become pathogenic when host defenses are disrupted. Laboratory identification uses germ tube tests, culture on Sabouraud dextrose agar, and biochemical or MALDI-TOF species confirmation.',
    transmission: "Usually arises from overgrowth of a person's own commensal Candida (endogenous); healthcare-associated transmission of invasive candidiasis can occur via contaminated devices or hands.",
    vectors: [],
    reservoirs: ['Normal human skin, mouth, gut, and genital flora'],
    incubationPeriod: 'Variable; typically develops gradually as normal flora balance is disrupted rather than following a fixed incubation period',
    epidemiology: 'Common worldwide; oral and vaginal candidiasis are frequent in the general population, while invasive candidiasis is concentrated among hospitalized and immunocompromised patients.',
    globalRelevance: 'Candida is among the most common causes of healthcare-associated bloodstream infections worldwide, with rising concern over drug-resistant species such as Candida auris.',
    nigeriaAfricaRelevance: 'Oral and vaginal candidiasis are commonly seen in Nigerian clinical practice, often linked to antibiotic use, diabetes, or HIV-related immunosuppression.',
    outbreakInfo: 'Healthcare-associated clusters of invasive candidiasis, including drug-resistant Candida auris, have been reported in hospital settings globally.',
    riskFactors: ['Antibiotic use disrupting normal flora', 'Diabetes mellitus', 'HIV infection or other immunosuppression', 'Indwelling catheters or devices', 'Pregnancy'],
    vulnerablePopulations: ['Infants', 'People with diabetes', 'Immunocompromised patients', 'Hospitalized patients with central lines'],
    pathogenesis: 'Disruption of normal bacterial flora or host immunity allows Candida to switch from a commensal yeast form to an invasive hyphal form, penetrating epithelial surfaces or, in severe cases, entering the bloodstream.',
    symptoms: ['White patches in the mouth (oral thrush)', 'Itching and discharge (genital candidiasis)', 'Skin fold redness and irritation', 'Fever and chills in bloodstream infection'],
    signs: ['White, adherent oral plaques', 'Erythema in skin folds', 'Vaginal discharge with itching'],
    complications: ['Esophageal candidiasis in advanced HIV', 'Bloodstream infection (candidemia)', 'Disseminated infection in severe immunosuppression'],
    diagnosisMethods: ['Direct microscopy with KOH preparation', 'Culture on Sabouraud dextrose agar', 'Blood culture for suspected invasive candidiasis'],
    specimenTypes: ['Skin or mucosal swab', 'Blood culture for suspected systemic infection'],
    identificationMethods: ['Germ tube test', 'Culture on Sabouraud dextrose agar', 'MALDI-TOF or biochemical species identification'],
    prevention: ['Judicious antibiotic use', 'Good hygiene and moisture control in skin folds', 'Blood sugar control in diabetes', 'Careful catheter care in hospital settings'],
    preventionTips: ['Keep skin folds clean and dry', 'Avoid unnecessary antibiotic use', 'Manage blood sugar levels if diabetic'],
    vaccinationInfo: 'No vaccine currently exists for Candida infections; prevention relies on addressing modifiable risk factors.',
    publicHealthControlMeasures: ['Antibiotic stewardship programmes', 'Infection control for catheter and device care', 'Surveillance for drug-resistant Candida species in hospitals'],
    treatmentOverview: 'Topical or oral antifungals (e.g. fluconazole, nystatin) treat most superficial infections; invasive candidiasis requires systemic antifungal therapy, often with echinocandins.',
    managementApproaches: ['Topical antifungals for localized skin or oral infection', 'Oral fluconazole for more extensive mucosal disease', 'Intravenous echinocandins for invasive candidiasis'],
    antimicrobialConsiderations: 'Some Candida species, including Candida auris, show resistance to multiple antifungal drug classes, making species identification and susceptibility testing important in severe cases.',
    faqs: [
      { question: 'Is candidiasis a sexually transmitted infection?', answer: 'Not typically; it usually results from overgrowth of yeast already present on the body, though it can occasionally be passed between sexual partners.' },
      { question: 'Why do antibiotics increase candidiasis risk?', answer: 'Antibiotics can reduce protective bacteria that normally keep Candida in check, allowing it to overgrow.' },
    ],
    references: ['CDC Candidiasis Fact Sheet', 'WHO Fungal Priority Pathogens List'],
    lastReviewedDate: '2026-08-01',
    reviewedBy: 'HOTICE Immunotech',
    contentStatus: 'published',
  },
];

export interface Article {
  id: string;
  title: string;
  category: 'Microbiology' | 'Public Health' | 'Research';
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    id: 'antibiotic-resistance-nigeria',
    title: 'Understanding Antibiotic Resistance in Nigeria',
    category: 'Microbiology',
    excerpt: 'Why misuse of antibiotics in clinics, farms, and pharmacies is fuelling a silent public health crisis.',
    content: [
      'Antimicrobial resistance (AMR) occurs when bacteria evolve mechanisms to survive drugs designed to kill them. In Nigeria, unregulated over-the-counter antibiotic sales, incomplete treatment courses, and antibiotic use in livestock have accelerated resistance in common pathogens like Escherichia coli, Klebsiella pneumoniae, and Staphylococcus aureus.',
      'Diagnostic microbiology plays a central role in tackling AMR. Techniques such as the Kirby-Bauer disc diffusion method allow laboratories to determine which antibiotics remain effective against a given isolate, guiding clinicians toward targeted therapy instead of broad, unnecessary prescriptions.',
      'Addressing AMR requires coordinated action: stronger antimicrobial stewardship programmes in hospitals, public education on completing prescribed courses, regulation of pharmacy sales, and continued investment in local diagnostic capacity across Nigerian laboratories.',
    ],
    author: 'HoticeEpiConnect Editorial Team',
    date: 'Aug 2026',
    readTime: '5 min read',
  },
  {
    id: 'gram-staining-diagnostics',
    title: 'The Role of Gram Staining in Diagnostic Microbiology',
    category: 'Microbiology',
    excerpt: 'A foundational technique that still shapes how clinicians choose the right treatment, fast.',
    content: [
      'Gram staining, developed by Hans Christian Gram in 1884, remains one of the fastest and most informative tests in a diagnostic microbiology laboratory. By exploiting differences in bacterial cell wall structure, it separates bacteria into Gram-positive (purple) and Gram-negative (pink) groups within minutes.',
      'This single test narrows the list of likely pathogens dramatically, helping clinicians choose empirical antibiotics before culture results are available, often the difference between timely treatment and a preventable complication.',
      'Students learning Gram staining should pay close attention to smear thickness, fixation, and decolorization timing, since over- or under-decolorizing a smear is one of the most common sources of diagnostic error in student and novice technician practice.',
    ],
    author: 'HoticeEpiConnect Editorial Team',
    date: 'Jul 2026',
    readTime: '4 min read',
  },
  {
    id: 'cholera-rainy-season',
    title: 'Preventing Cholera Outbreaks During Rainy Season',
    category: 'Public Health',
    excerpt: 'Flooding and overcrowded water sources create ideal conditions for Vibrio cholerae to spread quickly.',
    content: [
      'Nigeria typically sees a rise in cholera cases during the rainy season, when flooding contaminates wells, boreholes, and open water sources with faecal matter. Informal settlements with limited sanitation infrastructure are disproportionately affected.',
      'Community-level prevention combines simple, low-cost interventions: boiling or chlorinating drinking water, safe disposal of waste, and handwashing with soap at critical times. Oral cholera vaccines are also deployed in high-risk local government areas ahead of the rains.',
      'Early reporting matters. A cluster of watery diarrhea cases in a community should be reported quickly so response teams can investigate water sources and prevent a localized outbreak from spreading further.',
    ],
    author: 'HoticeEpiConnect Editorial Team',
    date: 'Jun 2026',
    readTime: '4 min read',
  },
  {
    id: 'vaccines-immune-system',
    title: 'How Vaccines Train the Immune System',
    category: 'Microbiology',
    excerpt: "A closer look at the immunological memory that makes vaccination one of public health's greatest tools.",
    content: [
      'Vaccines work by introducing a harmless piece or weakened form of a pathogen, an antigen, to the immune system. This triggers the production of antibodies and memory B and T cells without causing the actual disease.',
      'When the body later encounters the real pathogen, this immunological memory allows a much faster, stronger response, often neutralizing the threat before symptoms develop. This is the biological basis for herd immunity in vaccinated populations.',
      'Understanding this mechanism helps explain why completing multi-dose vaccine schedules matters: booster doses reinforce memory cell populations, improving both the strength and duration of protection.',
    ],
    author: 'HoticeEpiConnect Editorial Team',
    date: 'May 2026',
    readTime: '5 min read',
  },
  {
    id: 'lassa-fever-nigeria',
    title: 'Lassa Fever: What Every Nigerian Should Know',
    category: 'Public Health',
    excerpt: 'Practical, evidence-based guidance for reducing household risk during peak Lassa fever season.',
    content: [
      'Lassa fever is endemic in Nigeria, with cases typically rising between November and April. The primary route of infection is contact with food or surfaces contaminated by the Mastomys natalensis rat, a rodent species common in many Nigerian homes and farms.',
      'Simple household measures significantly reduce risk: storing food in rodent-proof containers, keeping living spaces clean and clutter-free, and disposing of refuse away from the home. Cats can also help control rodent populations naturally.',
      'Because early Lassa fever symptoms resemble malaria and typhoid, health workers are trained to maintain a high index of suspicion in endemic areas and refer suspected cases for RT-PCR testing promptly.',
    ],
    author: 'HoticeEpiConnect Editorial Team',
    date: 'Apr 2026',
    readTime: '4 min read',
  },
  {
    id: 'food-safety-microbial-contamination',
    title: 'Food Safety and Microbial Contamination',
    category: 'Research',
    excerpt: 'What serial dilution and pour plate studies reveal about the microbial load of everyday foods.',
    content: [
      'Food microbiology studies routinely use serial dilution and pour plate techniques to estimate microbial load in samples ranging from soil to street food. These methods allow researchers to quantify colony-forming units (CFU) per gram or millilitre of a sample.',
      'Contamination can originate from soil, water, poor handling, or inadequate storage temperatures. Common contaminants studied in Nigerian food safety research include Escherichia coli, Staphylococcus aureus, and various fungal species capable of producing mycotoxins.',
      'Consistent food safety practices, proper handwashing, safe storage temperatures, and clean preparation surfaces, remain the most effective way to reduce microbial contamination in both home and commercial food settings.',
    ],
    author: 'HoticeEpiConnect Editorial Team',
    date: 'Mar 2026',
    readTime: '5 min read',
  },
];

export interface StateReport {
  name: string;
  reports: number;
}

export const nigerianStates: StateReport[] = [
  { name: 'Lagos', reports: 82 },
  { name: 'Rivers', reports: 65 },
  { name: 'Kano', reports: 58 },
  { name: 'FCT Abuja', reports: 47 },
  { name: 'Edo', reports: 39 },
  { name: 'Enugu', reports: 31 },
];
