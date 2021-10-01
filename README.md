# About
This product was meant to revolutionize the hiring process through a skill-based system rather than what typical ATS systems look for in a resume. As a startup company, we wanted to help users see their value as a candidate through user stories and provide them a metric on where they stand amongst other companies based on their skill level.

# Responsbilities
I came in as a Machine Learning Engineer, though later developed to be a Software Development Engineer (ML is just a tool for SDEs).  My responsbility was to:
* Build the profile creation process for users to make their account.
* Develop a backend that could parse a resume and extract the common details (name, email, phone number) as well as the user's skills and experiences. 
* Work with other software engineers in creating data schemas (e.g. candidate info for hiring manager dashboard, candidate's skills, candidate's experiences).

Regarding the codebase, the backend can be found in the [backend folder](https://github.com/Nathan-Bernardo/skill_based_hiring_platform/tree/master/backend). For the frontend, I mostly worked on the [CandidateAccount folder](https://github.com/Nathan-Bernardo/skill_based_hiring_platform/tree/master/src/Components/CanidateAccount)

# Tools
For the frontend, I used:
* React
* Redux - Made state management easy. Components that required data from specific features could be accessed globally because of the Redux store. This introduced stability and robustness in our application, as well as reduce the number of rerenders.
* Redux TK - Helps reduce writing boilerplate code that Redux introduces.
* Immutable.js - Combined with Redux to create our reducers.  Made sure data was immutable and only changed when needed.
* Axios and fetchAPI - Needed for fetching and sending data to the backend.
* Typescript 

For the backend, I used:
* FastAPI - Python based. Had full support for NoSql databases, fast, and easy to route together different APIs.
* MongoDB - Needed a NoSql database to handle unstructured data.
* EmiSkills - This API provided a useful method for extract the skills from the user's resumes.  The schema was already constructed from the API and included a URL link property for defining the skill.
