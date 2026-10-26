/* Human-readable task guides. Official links are provided where applicable.
   Requirements vary by vessel, company and current MARINA/DMW policy. */
'use strict';
const GUIDES = {
  age: {
    why: 'Shipboard employment has minimum-age rules. Most first-time overseas seafarer roles start at 18 years old.',
    steps: ['Check your date of birth on your PSA birth certificate and a government ID.', 'Compare your name and birth date across your passport and other records.', 'If you are under 18, prepare your education and skills first; do not falsify your age.'],
    bring: 'PSA birth certificate or another official proof of birth.',
    note: 'Age requirements for a particular employer can be higher than the legal minimum.'
  },
  birth: {
    why: 'A PSA-issued birth certificate helps establish your identity and is commonly used for passport applications.',
    steps: ['Check whether you already have an official PSA-issued copy.', 'If not, book a PSA appointment or use an official PSA-authorized delivery service.', 'Inspect names, birth date and spelling carefully. Resolve discrepancies before submitting other applications.', 'Keep the original securely and save a readable scan.'],
    bring: 'Your birth details and acceptable identification for requesting the record.',
    links: [{label:'PSA birth certificate instructions', url:'https://psa.gov.ph/birth-certificate'}, {label:'PSA appointment', url:'https://appointment.psa.gov.ph/'}]
  },
  passport: {
    why: 'A Philippine passport is the travel document you will need to join an international vessel.',
    steps: ['Visit the official DFA passport appointment website; appointment booking itself is free.', 'Choose the correct application type and an available consular site.', 'Prepare the documentary requirements shown for first-time applicants, including acceptable ID and PSA record.', 'Attend the appointment for document checking and biometrics.', 'Collect your passport and verify that every detail is correct.'],
    bring: 'Appointment confirmation, acceptable IDs, PSA certificate and other DFA-listed documents.',
    links: [{label:'Official DFA appointments', url:'https://www.passport.gov.ph/appointment'}, {label:'DFA application locations',url:'https://www.passport.gov.ph/sites/site'}],
    note: 'Avoid fixers and paid appointment slot sellers. Check passport validity rules with the agency before deployment.'
  },
  nbi: {
    why: 'Many manning agencies request a recent NBI clearance as part of screening.',
    steps: ['Create or sign in to your account on the official NBI clearance website.', 'Choose the correct application type and appointment or renewal option.', 'Follow the official payment and ID instructions.', 'Attend if required and keep the original or verified digital copy available.'],
    bring: 'Valid government IDs and NBI appointment details.',
    links: [{label:'Official NBI clearance', url:'https://clearance.nbi.gov.ph/'}],
    note: 'Ask the agency how recent the clearance must be, so you do not renew prematurely.'
  },
  resume: {
    why: 'A clear, one-page resume shows that you are ready for entry-level galley or mess hall work—even without sea experience.',
    steps: ['Add your accurate contact information and city/province.', 'Write an objective: first-time messman applicant seeking catering or utility duties.', 'List your education and transferable work such as food service, cleaning, inventory or customer service.', 'Add only training and certificates you have actually completed.', 'Save as a clean PDF and proofread your contact details.'],
    bring: 'School history, work history, training dates and an active email address.',
    note: 'Do not claim shipboard experience you do not have. Avoid including unnecessary sensitive identity numbers.'
  },
  school: {
    why: 'School credentials may be asked for by some agencies, even when a maritime college degree is not necessary.',
    steps: ['Ask the target company about its minimum education requirement.', 'Find a clear copy of your highest completed school diploma.', 'Request a transcript or school certification only if the employer specifies it.', 'Place these in your application folder.'],
    bring: 'Highest school diploma and any employer-requested transcript.',
    note: 'Different agencies may set different education or experience criteria.'
  },
  photos: {
    why: 'Some agencies, MARINA applications and training centers request specific photo sizes.',
    steps: ['Check the exact size, background, attire and recency requested.', 'Have photos taken in the requested format.', 'Keep both printed copies and a high-quality digital file, if permitted.'],
    bring: 'The employer or training center photo specification.',
    note: 'Do not pay for multiple photo formats before confirming the requested size.'
  },
  bt: {
    why: 'STCW Basic Training introduces survival, fire fighting, first aid and personal safety responsibilities before work at sea.',
    steps: ['Check the MARINA list of approved maritime training institutions.', 'Ask the training center if it offers the current Revised Basic Training (including updated PSSR content).', 'Confirm their documentary requirements, course schedule and complete fees.', 'Complete classroom and practical assessments.', 'Keep the completion document; you will use it to apply for the MARINA COP.'],
    bring: 'Training center registration requirements, identification and the required training fee.',
    links: [{label:'MARINA approved institutions', url:'https://marina.gov.ph/approved-maritime-training-institutions/'}, {label:'MARINA revised Basic Training guidance', url:'https://marina.gov.ph/2025/10/30/step-by-step-application-for-cop-for-the-revised-basic-training-starting-november-3-2025/'}],
    note: 'New applicants should ask for the revised course, not the old Basic Training curriculum.'
  },
  'bt-cop': {
    why: 'A training completion certificate and a MARINA Certificate of Proficiency (COP) are different documents.',
    steps: ['After finishing current Basic Training, sign in to MARINA MISMO.', 'Choose Select Transaction → Certification → Issuance → COP.', 'For the revised course, choose BASIC TRAINING REVISED OR WITH UPDATING PSSR as instructed by MARINA.', 'Upload the required documents and submit your application.', 'Select the evaluation date shown in MISMO and monitor the application status.'],
    bring: 'Basic Training proof and the documents requested within MISMO.',
    links: [{label:'MARINA MISMO', url:'https://online-appointment.marina.gov.ph/'}, {label:'Official COP step-by-step', url:'https://marina.gov.ph/2025/10/30/step-by-step-application-for-cop-for-the-revised-basic-training-starting-november-3-2025/'}],
    note: 'The official COP instructions say physical appearance is not required for this application pathway.'
  },
  security: {
    why: 'Ships require appropriate security awareness. Crew with designated security duties may need additional SDSD qualification.',
    steps: ['Ask the agency whether your assignment requires Security Awareness only or Security Training for Seafarers with Designated Security Duties (SDSD).', 'Confirm which MARINA-approved center offers the required course.', 'Complete the applicable training and follow the current COP/certification process.', 'Keep the proof in your application folder.'],
    bring: 'Employer security-training specification and approved course documents.',
    links: [{label:'Approved MARINA training centers', url:'https://marina.gov.ph/approved-maritime-training-institutions/'}, {label:'MARINA MISMO', url:'https://online-appointment.marina.gov.ph/'}],
    note: 'SDSD is not automatically the same requirement for every messman job. Confirm before enrolling.'
  },
  nc1: {
    why: 'TESDA Ship’s Catering Services NC I is designed for mess hall service, housekeeping, and assistance with supplies and provisions—the core work of a Messman.',
    steps: ['Ask prospective agencies whether they require or prefer Ships’ Catering Services NC I.', 'Find a TESDA-registered course provider offering this specific qualification.', 'Ask the center about tuition, training duration and whether the competency assessment fee is included.', 'Complete training and schedule a TESDA assessment at an accredited center.', 'After passing the assessment, obtain and verify your National Certificate (NC I).'],
    bring: 'TESDA center enrollment requirements and assessment documentation.',
    links: [{label:'TESDA qualification overview (PDF)', url:'https://www.tesda.gov.ph/Downloadables/TR%20Ship%27s%20Catering%20Services%20NC%20I.pdf'}, {label:'Official TESDA website', url:'https://www.tesda.gov.ph/'}],
    note: 'NC I is relevant to the job, but do not assume every agency requires it before accepting applications.'
  },
  food: {
    why: 'Some employers add company-specific food handling, hygiene, or vessel training beyond standard documents.',
    steps: ['Ask for the official list of extra certificates from the manning agency.', 'Confirm whether the course is mandatory for your vessel or position.', 'Verify that the training provider and qualification will be accepted.', 'Enroll only when you have confirmed the requirement.'],
    bring: 'Written employer instructions about the exact additional course.',
    note: 'Do not buy courses simply because an unofficial recruiter says they are required.'
  },
  mismo: {
    why: 'MARINA MISMO is used to apply for and manage maritime competency certificates, including your Basic Training COP.',
    steps: ['Open the MARINA MISMO website.', 'Register or log in with your accurate personal information.', 'Verify your contact details and take note of your Seafarer Registration Number if assigned.', 'Keep your account access safe; you will use it for COP transactions.'],
    bring: 'Accurate personal data, email address and other registration details.',
    links: [{label:'Open MARINA MISMO', url:'https://online-appointment.marina.gov.ph/'}],
    note: 'MISMO and the eGovPH SID/SRB appointment process serve different purposes.'
  },
  srb: {
    why: 'The Seafarer’s Record Book (SRB or “seaman’s book”) records a seafarer’s ship service.',
    steps: ['Read the current MARINA SRB issuance requirements for a first-time applicant.', 'Download the eGovPH app and create/verify your account.', 'Open MARINA → MARINA OAS in the app.', 'Choose SRB issuance, select an appointment and follow the payment instructions.', 'Attend at the selected MARINA office with all documentary requirements.'],
    bring: 'MARINA-listed SRB application documents, appointment and payment confirmation.',
    links: [{label:'Official eGovPH portal', url:'https://e.gov.ph/'}, {label:'MARINA appointment instructions', url:'https://marina.gov.ph/2026/05/12/alamin-paano-gamitin-ang-egovph-app-para-sa-srb-at-sid-appointment/'}],
    note: 'Since May 13, 2026, new SRB/SID appointments use the eGovPH app. Earlier booked appointments remain valid.'
  },
  dmw: {
    why: 'DMW e-Registration supports official overseas employment-related transactions and helps keep your records ready.',
    steps: ['Visit the official DMW online services portal.', 'Create or access your e-Registration account.', 'Complete your profile using accurate personal, education and contact details.', 'Record certificates and work history truthfully and keep your credentials secure.'],
    bring: 'Personal details, email, identification and employment or training history.',
    links: [{label:'DMW Online Services', url:'https://onlineservices.dmw.gov.ph/'}, {label:'Department of Migrant Workers', url:'https://dmw.gov.ph/'}],
    note: 'Registration does not guarantee placement or a job offer.'
  },
  sid: {
    why: 'The Seafarer’s Identity Document (SID) is separate from the SRB and may be required depending on employment and travel arrangements.',
    steps: ['Ask the licensed manning agency whether an SID is needed for your assignment.', 'Use the eGovPH app and navigate to MARINA → MARINA OAS.', 'Select the appropriate SID appointment and follow the official documentary requirements.', 'Attend the appointment at the designated processing center.'],
    bring: 'MARINA-listed SID documentary requirements and appointment confirmation.',
    links: [{label:'MARINA SID/SRB advisory', url:'https://marina.gov.ph/2026/05/11/breaking-marina-releases-advisory-on-exclusive-online-application-of-sid-srb-through-egovph-app/'}, {label:'eGovPH', url:'https://e.gov.ph/'}],
    note: 'Do not confuse SID (identity document) with SRB (service record book).'
  },
  agency: {
    why: 'A DMW-licensed manning agency is the safer official channel for Filipino seafarer recruitment.',
    steps: ['Find a seabased agency or legitimate job posting.', 'Verify that the agency has a valid DMW license and that the job offer is genuine.', 'Contact the agency using independently verified official contact details.', 'Never send identity documents or money to a stranger using only a personal social-media account.', 'Ask for a written list of qualifications and the expected hiring stages.'],
    bring: 'Agency name, license details, job posting and the recruiter’s contact information.',
    links: [{label:'DMW official website', url:'https://dmw.gov.ph/'}],
    note: 'Be cautious about placement-fee demands or requests to pay a recruiter to reserve a shipboard job.'
  },
  copies: {
    why: 'Organized digital files make applications and official uploads easier.',
    steps: ['Scan documents clearly using your phone or a scanner.', 'Use simple names such as Passport.pdf, BT-COP.pdf or Resume.pdf.', 'Check that every scan is readable and complete.', 'Keep backups in a secure place.', 'Only upload personal documents through trusted agency and government channels.'],
    bring: 'Documents you already have; secure phone or computer storage.',
    note: 'Never put passport numbers, complete birth dates or other sensitive IDs in public posts.'
  },
  applications: {
    why: 'A first contract may take time. Some companies accept beginners while others require catering or sea experience.',
    steps: ['Search for Messman, utility, galley utility or trainee catering positions.', 'Read eligibility and work-experience requirements for each vacancy.', 'Apply only through verified DMW-licensed channels.', 'Submit your resume and available documents; be clear about missing documents you are still completing.', 'Track applications, interview dates and contact details in a private place.'],
    bring: 'Updated resume, available certificates and genuine vacancy details.',
    links: [{label:'DMW official site', url:'https://dmw.gov.ph/'}],
    note: 'Do not assume a first-time applicant is qualified for a vacancy requiring prior sea service.'
  },
  interview: {
    why: 'Recruiters may assess communication, attitude, hygiene knowledge and suitability for life on board.',
    steps: ['Practice introducing yourself in simple English.', 'Learn the difference between Messman duties, Cook duties and general utility duties.', 'Review food safety, sanitation, waste segregation and teamwork basics.', 'Prepare honest answers to questions about experience and certificates.', 'Ask what documents and assessments come next if selected.'],
    bring: 'Your resume, details about your training and a few questions for the recruiter.',
    note: 'Useful sample answer: “I am a beginner, but I can maintain cleanliness, follow food safety instructions and work well with a team.”'
  },
  peme: {
    why: 'Employers need to confirm medical fitness for the particular shipboard assignment.',
    steps: ['Wait for the manning agency’s medical instructions and accredited facility information.', 'Confirm which exams are included and who pays.', 'Attend the appointment and follow the clinic’s instructions.', 'Submit the result to the agency through the authorized channel.'],
    bring: 'Agency referral, identification and relevant medical history as requested by the clinic.',
    note: 'Medical requirements and timing vary; avoid paying for a full pre-employment exam before the employer asks.'
  },
  contract: {
    why: 'Your employment contract sets out your role, pay, term, working conditions and benefits.',
    steps: ['Request a copy of the contract before signing.', 'Check the position title, monthly wage, overtime, contract length and leave arrangements.', 'Check employer identity, vessel assignment, insurance and repatriation arrangements.', 'Ask the licensed agency to clarify anything you do not understand.', 'Keep your signed copy safe.'],
    bring: 'Approved employment contract and any applicable company or CBA terms.',
    note: 'Do not sign a blank or incomplete contract.'
  },
  oec: {
    why: 'Filipino overseas workers need the applicable DMW deployment processing and clearance before departure.',
    steps: ['Ask your licensed agency which DMW deployment documents apply to a seafarer on your contract.', 'Submit the required information to your agency through official channels.', 'Review any OEC or clearance details issued through the correct system.', 'Keep copies of your clearance and departure documents.'],
    bring: 'Approved contract and the employer/agency’s deployment paperwork.',
    links: [{label:'DMW Online Services', url:'https://onlineservices.dmw.gov.ph/'}],
    note: 'Manning agencies ordinarily coordinate seabased deployment processing; follow your actual agency’s instructions.'
  },
  visa: {
    why: 'A joining port or transit route can require special travel permissions, visas or health documents.',
    steps: ['Ask the employer for the travel itinerary and written joining instructions.', 'Confirm whether a visa, transit visa or vaccination document is necessary.', 'Use the employer-approved application process and keep originals available for travel.'],
    bring: 'Current passport, joining instructions and employer-provided travel information.',
    note: 'Requirements depend on the joining country, route and itinerary. Never assume every Messman needs the same visa.'
  },
  orientation: {
    why: 'Before departure you may need mandatory or company orientation covering employment conditions, rights and life onboard.',
    steps: ['Ask your licensed agency which orientations apply to your deployment.', 'Attend at the approved time and location or approved platform.', 'Record any safety, emergency or employment contact details provided.', 'Keep evidence of attendance if instructed.'],
    bring: 'Agency instructions, identification and any required course materials.',
    note: 'Do not purchase unofficial pre-departure seminars from unsolicited agents.'
  },
  additional: {
    why: 'Some assignments demand additional certificates depending on vessel type and onboard safety responsibilities.',
    steps: ['Obtain a written list of vessel-specific courses from your agency.', 'Check whether the requested training is needed before joining the vessel.', 'Verify any required training center accreditation and total cost.', 'Finish the required course and provide the certificate to your employer.'],
    bring: 'The exact vessel, assignment and employer certificate list.',
    links: [{label:'MARINA approved institutions',url:'https://marina.gov.ph/approved-maritime-training-institutions/'}],
    note: 'Do not enrol in tanker, survival craft or other extra courses unless your job and ship require them.'
  }
};