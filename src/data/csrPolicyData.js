// Content transcribed from the official BSTBPCL "Corporate Social Responsibility Policy"
// document. Section numbering and wording follow the source document exactly.

import { getSetting } from '../services/settingService';

export const csrPolicyDefaults = {
  documentTitle: 'Corporate Social Responsibility Policy',
  organisation: 'Bihar State Text Book Publishing Corporation Limited',

  // Downloadable copy of the signed policy document
  pdfUrl: '/csr-policy.pdf',
  pdfFileName: 'BSTBPCL-CSR-Policy.pdf',
  pdfSizeLabel: '5.1 MB',

  // 1. Introduction & Background
  introParagraphs: [
    'Bihar State Text Book Publishing Corporation Limited ("BSTBPCL"), formed about 53 years ago started as a "Government Company", and has been carrying out its social responsibility through the various projects. Corporate Social Responsibility ("CSR") is not only a significant part of BSTBPCL as a corporate entity, but is a part of its DNA which has been imbued into the existence of each human being working in the organization.',
    'This Policy lays the formal framework for the CSR activities that will be carried out by BSTBPCL.'
  ],

  // 2. CSR Vision & Policy Statement - Objectives of this CSR Policy
  objectivesIntro:
    'With an endeavor to achieve our vision and fulfill our commitment to be socially responsible, this CSR Policy has been formulated with the following objectives:',
  objectives: [
    'To promote activities that have a high social impact in a manner which is aligned with BSTBPCL\'s tradition of creating health & wealth in the community and create a framework to identify the beneficiaries, causes to work and the appropriate projects, in accordance with Schedule VII of the Companies Act, 2013 ("the Act") read with the Companies (Corporate Social Responsibility Policy) Rules, 2014 ("CSR Rules").',
    'To encourage employees at all levels to participate and increase commitment to give back to the society.',
    'To identify thrust areas for CSR that currently includes education, health creation and the environment.',
    'To utilise the resources of the company and its people to give back to the society and affect positive changes in the lives of Indian citizens.',
    'BSTBPCL will invest its CSR resources that help build the nation and the economy in thrust areas such as education including basic education and skills etc.'
  ],

  // 3. CSR Committee Composition and Responsibility
  committeeText:
    'The CSR committee shall consist of their 2 (two) Board members or more, out of which at least 1 (one) Board member would be a Non-executive director, as per the requirement of the Act.',

  // 4. Scope & Applicability
  scopeText: 'This Policy is applicable to BSTBPCL.',

  // 5. CSR Budget
  budgetItems: [
    'In line with the Act read with the CSR Rules, BSTBPCL will utilise 2% of the average net profit in the previous 3 (three) years on CSR activities within the ambit of Schedule VII of the Act.',
    'The surplus arising out of the CSR projects or programs or activities shall not form part of the business profit of the Company.'
  ],

  // 6. Implementation
  implementationItems: [
    'The CSR committee of the Board shall monitor the CSR Policy and its implementation periodically.',
    'The CSR Committee shall recommend to the Board, the projects / programmes to be undertaken, and the modalities of execution and implementation schedule from time to time, including recommending the amount of expenditure for the CSR activities.',
    'BSTBPCL will set up a CSR team for supporting the CSR committee and implementation of the CSR activities. The CSR team members will include the Company Secretary and Chief Financial Officer. The CSR team will set up a formal process of evaluation of the CSR activities under the guidance of the CSR Committee.',
    'BSTBPCL may undertake CSR activities as per the provisions of the Act through a registered trust or a society or a company(ies) under Section 8 of the Companies Act or through such other trusts, NGOs, registered societies etc. BSTBPCL may also collaborate with other companies for undertaking the CSR projects / programmes approved by the CSR committee / Board in accordance with the Act.',
    'The CSR committee will decide on the locations for the CSR activities in the state of Bihar.'
  ],

  // 7. Activities / Focus Areas
  activitiesIntro:
    'The scope of CSR activities of BSTBPCL will inter alia cover the below mentioned key thrust areas:',
  activities: [
    'Promoting education, including special education and employment enhancing vocation skills especially among children, women, elderly, and the differently abled and livelihood enhancement projects;',
    'Contributions or funds provided to technology incubators as permitted under Companies Act, 2013 and rules made there under;',
    'Contribution to the Prime Ministers Relief Fund or any other fund set up by the Central Government for socio economic development and relief and welfare of the Scheduled Castes, Scheduled Tribes, Other Backward Classes, minorities and women in accordance with Paragraph (viii) of Schedule VII of the Companies Act;',
    'Support large-scale causes such as disaster relief or any other cause as determined by the CSR committee / Board;',
    'Any other activity as permitted under the Companies Act.'
  ],

  // 8. Monitoring
  monitoringItems: [
    'The CSR team set up by BSTBPCL will meet periodically to review the progress of various CSR projects / activities and will report the progress of the CSR activities in writing periodically as required.',
    'The CSR team may also take help of an advisory committee or third party agencies to carry out various tasks such as project analysis, site visits and also monitor the CSR projects.',
    'This CSR Policy and the project updates will be put up on the BSTBPCL website and made available in the public domain.'
  ],

  // 9. Miscellaneous Information
  miscellaneousItems: [
    {
      label: 'Dissemination',
      text: 'As per section 135 (4)(a) of the Act, BSTBPCL will disclose contents of the CSR Policy on its website, in such a manner, as is prescribed.'
    },
    {
      label: 'Partnerships',
      text: "Collaborative partnerships may be formed with other NGOs and like-minded organizations. This helps widen BSTBPCL's reach and leverage upon the collective expertise, wisdom and experience that these partnerships bring to the table. BSTBPCL may engage with well established and recognized programmes and national platforms in order to achieve the objective."
    }
  ],

  // 10. Annexure A (listed in the document's table of contents)
  annexureTitle: 'Annexure A – Projects for FY 2018-19'
};

// Table of contents exactly as printed in the source document.
export const csrPolicyContents = [
  { no: 1, topic: 'Introduction & Background', anchor: 'introduction' },
  { no: 2, topic: 'CSR Vision & Policy Statement Objectives of the CSR Policy', anchor: 'vision' },
  { no: 3, topic: 'CSR Committee Composition', anchor: 'committee' },
  { no: 4, topic: 'Scope & Applicability', anchor: 'scope' },
  { no: 5, topic: 'CSR Budget', anchor: 'budget' },
  { no: 6, topic: 'Implementation', anchor: 'implementation' },
  { no: 7, topic: 'Activities / Focus Areas', anchor: 'activities' },
  { no: 8, topic: 'Monitoring Process', anchor: 'monitoring' },
  { no: 9, topic: 'Miscellaneous', anchor: 'miscellaneous' },
  { no: 10, topic: 'Annexure A – Projects for FY 2018-19', anchor: 'annexure' }
];

export const romanize = (n) => ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'][n] || n + 1;

// Admin-saved content (setting "csr_policy_content") merged over the document defaults,
// so sections added to the defaults later still appear for older saved content.
export const loadCsrPolicy = () =>
  getSetting('csr_policy_content')
    .then((saved) => (saved ? { ...csrPolicyDefaults, ...saved } : csrPolicyDefaults))
    .catch(() => csrPolicyDefaults);