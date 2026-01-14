import type { University } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';

const uniHeader1 = placeholderImages.placeholderImages.find(p => p.id === 'uni-header-1')?.imageUrl || '';
const uniHeader2 = placeholderImages.placeholderImages.find(p => p.id === 'uni-header-2')?.imageUrl || '';
const uniHeader3 = placeholderImages.placeholderImages.find(p => p.id === 'uni-header-3')?.imageUrl || '';
const uniHeader4 = placeholderImages.placeholderImages.find(p => p.id === 'uni-header-4')?.imageUrl || '';
const uniHeader5 = placeholderImages.placeholderImages.find(p => p.id === 'uni-header-5')?.imageUrl || '';


export const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Harvard University',
    details: '<h1>About Harvard</h1><p>Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, it is the oldest institution of higher learning in the United States. Its history, influence, and wealth have made it one of the most prestigious universities in the world.</p>',
    headerImage: uniHeader1,
    Country: 'USA',
    'QS Ranking': 4,
    'Tuition Fees (USD)': '~54,000',
    'Public/Private': 'Private',
  },
  {
    id: '2',
    name: 'University of Oxford',
    details: '<h1>About Oxford</h1><p>The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world and the world\'s second-oldest university in continuous operation.</p>',
    headerImage: uniHeader2,
    Country: 'UK',
    'QS Ranking': 3,
    'Tuition Fees (GBP)': '~28,000',
    City: 'Oxford',
  },
  {
    id: '3',
    name: 'ETH Zurich',
    details: '<h1>About ETH Zurich</h1><p>ETH Zurich is a public research university in the city of Zürich, Switzerland. Founded by the Swiss Federal Government in 1854, it was modeled on the École Polytechnique in Paris, with the stated mission to educate engineers and scientists.</p>',
    headerImage: uniHeader3,
    Country: 'Switzerland',
    'QS Ranking': 7,
    'Acceptance Rate': '27%',
    'Public/Private': 'Public',
  },
  {
    id: '4',
    name: 'National University of Singapore',
    details: '<h1>About NUS</h1><p>The National University of Singapore is a national collegiate research university in Queenstown, Singapore. Founded in 1905 as the Straits Settlements and Federated Malay States Government Medical School, NUS is the oldest autonomous university in the country.</p>',
    headerImage: uniHeader4,
    Country: 'Singapore',
    'QS Ranking': 8,
    'Known For': 'Technology & Engineering',
  },
    {
    id: '5',
    name: 'University of Toronto',
    details: '<h1>About U of T</h1><p>The University of Toronto is a public research university in Toronto, Ontario, Canada, located on the grounds that surround Queen\'s Park. It was founded by royal charter in 1827 as King\'s College, the first institution of higher learning in Upper Canada.</p>',
    headerImage: uniHeader5,
    Country: 'Canada',
    'QS Ranking': 21,
    'Public/Private': 'Public',
    City: 'Toronto',
  },
];

export const mockScholarships = [
  {
    id: 's1',
    name: 'Fulbright Scholarship',
    'Organization': 'US State Department',
    'Award Amount': '$50,000 - $100,000',
    'Deadline': 'October 2025',
    details: 'Study abroad opportunities in the USA',
    knowMore: '<h2>Fulbright Scholarship Details</h2><p>The Fulbright Program is the flagship international exchange program sponsored by the US State Department. It provides grants for master\'s degree study.</p><h3>Eligibility</h3><ul><li>Bachelor\'s degree completed</li><li>English proficiency</li><li>Strong academic record</li></ul>'
  },
  {
    id: 's2',
    name: 'DAAD Scholarships',
    'Organization': 'German Academic Exchange Service',
    'Award Amount': '€934/month',
    'Deadline': 'December 2025',
    details: 'Study in Germany',
    knowMore: '<h2>DAAD Scholarships</h2><p>DAAD offers scholarships for postgraduate study in Germany. Support includes monthly allowance, health insurance, and travel costs.</p>'
  }
];

export const mockAccommodations = [
  {
    id: 'a1',
    name: 'On-Campus Dorms',
    'University/City': 'Various Universities',
    'Average Cost': '$300-600/month',
    'Capacity': 'High',
    details: 'University-provided dormitory facilities',
    knowMore: '<h2>On-Campus Dormitories</h2><p>Most universities offer on-campus housing for students. Amenities include furnished rooms, internet, utilities, and social facilities.</p><h3>Benefits</h3><ul><li>Close to campus</li><li>Community atmosphere</li><li>All-inclusive pricing</li></ul>'
  },
  {
    id: 'a2',
    name: 'Private Apartments',
    'University/City': 'Major Cities',
    'Average Cost': '$600-1200/month',
    'Capacity': 'Medium',
    details: 'Private rental apartments',
    knowMore: '<h2>Private Apartments</h2><p>Independent housing in urban areas. More autonomy and flexibility compared to dorms.</p>'
  }
];

export const mockVisa = [
  {
    id: 'v1',
    name: 'US Student Visa (F-1)',
    'Country': 'USA',
    'Processing Time': '4-6 weeks',
    'Validity': '1 year (renewable)',
    details: 'Visa for studying in the United States',
    knowMore: '<h2>F-1 Student Visa Process</h2><p>The F-1 visa allows international students to study full-time at US schools.</p><h3>Requirements</h3><ul><li>I-20 from school</li><li>Valid passport</li><li>Financial proof</li><li>Interview at embassy</li></ul>'
  },
  {
    id: 'v2',
    name: 'UK Student Visa',
    'Country': 'UK',
    'Processing Time': '3 weeks',
    'Validity': 'Duration of studies',
    details: 'Visa for studying in the United Kingdom',
    knowMore: '<h2>UK Student Visa</h2><p>The UK Student visa allows international students to study at accredited institutions.</p>'
  }
];

export const mockFinances = [
  {
    id: 'f1',
    name: 'Student Loans',
    'Type': 'Loans',
    'Interest Rate': '4-8%',
    'Repayment Period': '10-25 years',
    details: 'Government and private student loans',
    knowMore: '<h2>Student Loan Options</h2><p>Various loan options are available for international students with competitive interest rates.</p><h3>Types</h3><ul><li>Federal loans</li><li>Private loans</li><li>UK government loans</li></ul>'
  },
  {
    id: 'f2',
    name: 'Part-time Work',
    'Type': 'Income',
    'Earning Potential': '$15-25/hour',
    'Hours Allowed': '20 hours/week (term)',
    details: 'Part-time employment while studying',
    knowMore: '<h2>Part-time Work While Studying</h2><p>Many countries allow international students to work part-time on campus and off-campus.</p>'
  }
];

