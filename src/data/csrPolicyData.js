export const CSR_STORAGE_KEY = 'website_csr_policy_data_v2';

export const csrPolicyContents = [
  { no: 1, topic: 'Introduction & Background' },
  { no: 2, topic: 'CSR Vision & Policy Statement' },
  { no: 3, topic: 'CSR Committee Composition and Responsibility' },
  { no: 4, topic: 'Scope & Applicability' },
  { no: 5, topic: 'CSR Budget' },
  { no: 6, topic: 'Implementation' },
  { no: 7, topic: 'Activities / Focus Areas' },
  { no: 8, topic: 'Monitoring' },
  { no: 9, topic: 'Miscellaneous Information' },
  { no: 10, topic: 'Annexure' }
];

export const csrPolicyDefaults = {
  documentTitle: 'Corporate Social Responsibility (CSR) Policy',
  organisation: 'Bihar State Text Book Publishing Corporation Ltd.',
  pdfUrl: '/CSR-Policy.pdf',
  pdfFileName: 'BSTBPC_CSR_Policy.pdf',
  pdfSizeLabel: '1.2 MB',
  introParagraphs: [
    'The Bihar State Text Book Publishing Corporation Ltd. (BSTBPC) recognizes its responsibility towards the society and the environment in which it operates.',
  ],
  objectivesIntro: 'The objectives of this CSR Policy are to:',
  objectives: [
    'Ensure an increased commitment at all levels in the organisation, to operate its business in an economically, socially & environmentally sustainable manner.',
    'Direct BSTBPC\'s CSR Programmes, inter alia, towards achieving one or more of the following: enhancing environmental and natural capital; supporting rural development; promoting education; providing preventive healthcare, providing sanitation and drinking water; creating livelihoods for people, especially those from disadvantaged sections of society, in rural and urban India.'
  ],
  committeeText: 'The CSR Committee will consist of the Board of Directors...',
  scopeText: 'This policy applies to all CSR projects undertaken by BSTBPC as per Schedule VII of the Companies Act, 2013.',
  budgetItems: [
    'The CSR budget will be allocated as per the provisions of the Companies Act, 2013 and rules made thereunder.'
  ],
  implementationItems: [
    'CSR projects will be implemented directly or through external implementing agencies with a proven track record.'
  ],
  activitiesIntro: 'The following focus areas have been identified:',
  activities: [
    'Promoting education, including special education and employment enhancing vocation skills.'
  ],
  monitoringItems: [
    'The CSR Committee shall monitor the progress of CSR projects on a regular basis.'
  ],
  miscellaneousItems: [
    { label: 'Dissemination', text: 'The CSR Policy will be hosted on the website of the Corporation.' }
  ],
  annexureTitle: 'List of Approved CSR Projects'
};

export const loadCsrPolicy = () => {
  const saved = localStorage.getItem(CSR_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse CSR policy data', e);
    }
  }
  return csrPolicyDefaults;
};

export const romanize = (num) => {
  const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  let roman = '';
  // Convert 0-indexed to 1-indexed for roman numerals
  let n = num + 1;
  for (let i in lookup) {
    while (n >= lookup[i]) {
      roman += i;
      n -= lookup[i];
    }
  }
  return roman.toLowerCase();
};
