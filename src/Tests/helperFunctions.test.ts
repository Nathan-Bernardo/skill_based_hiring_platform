import { v4 as uuidv4 } from 'uuid';

import { generateDummyJobList } from '../constants/placeholderData';
import { populateJobs } from '../helperFunctions';

test('populateJobs returns empty array when given no children and no jobs', () => {
  const id = uuidv4();
  const something = populateJobs(generateDummyJobList(id), {}, id);
  expect(something).toHaveLength(0);
});
