type JobList = {
  id: string;
  name: string;
  permissions: {
    view: string[];
    edit: string[];
  };
  childJobLists: string[];
  jobs: string[];
};

export default JobList;
