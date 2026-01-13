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
