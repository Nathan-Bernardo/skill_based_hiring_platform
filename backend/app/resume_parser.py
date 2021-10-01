import io
from io import StringIO
from pprint import pprint
import os
import sys
import re
import pandas as pd
import spacy
from spacy.matcher import Matcher
from pdfminer3.layout import LAParams, LTTextBox
from pdfminer3.pdfpage import PDFPage
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.converter import PDFPageAggregator
from pdfminer3.converter import TextConverter
from fastapi import FastAPI, File, UploadFile, APIRouter, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uuid
import json
from uuid import UUID
from pydantic import BaseModel

sys.path.append(os.path.abspath(".."))

router = APIRouter()

class ResumeParser():

    def convert_pdf_to_txt(self, path):
        resource_manager = PDFResourceManager()
        fake_file_handle = io.StringIO()
        converter = TextConverter(
            resource_manager, fake_file_handle, laparams=LAParams())
        page_interpreter = PDFPageInterpreter(resource_manager, converter)

        with open(path, 'rb') as fh:

            for page in PDFPage.get_pages(fh, caching=True, check_extractable=True):
                page_interpreter.process_page(page)

            resume_text = fake_file_handle.getvalue()

        # close open handles
        converter.close()
        fake_file_handle.close()

        return resume_text

    def extract_name(self, resume_text):
        nlp = spacy.load("en_core_web_lg")
        nlp_text = nlp(resume_text)
        matcher = Matcher(nlp.vocab)

        # First name and Last name are always Proper Nouns
        pattern = [{'POS': 'PROPN'}, {'POS': 'PROPN'}]

        matcher.add('NAME', [pattern])

        matches = matcher(nlp_text)

        for match_id, start, end in matches:
            span = nlp_text[start:end]
            return span.text

    def extract_mobile_number(self, text):
        phone = re.findall(re.compile(
            r'(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?'), text)

        if phone:
            number = ''.join(phone[0])
            if len(number) > 10:
                return '+' + number
            else:
                return number

    def extract_email(self, email):
        email = re.findall("([^@|\s]+@[^@]+\.[^@|\s]+)", email)
        if email:
            try:
                return email[0].split()[0].strip(';')
            except IndexError:
                return None
                x = []

    def extract_skills(self, resume_text, skills_data):
        nlp = spacy.load("en_core_web_lg")
        nlp_text = nlp(resume_text)
        noun_chunks = nlp_text.noun_chunks

        # removing stop words and implementing word tokenization
        tokens = [token.text for token in nlp_text if not token.is_stop]

        # reading the csv file
        data = pd.read_csv(skills_data)

        # extract values
        skills = list(data.columns.values)

        skillset = []

        # check for one-grams (example: python)
        for token in tokens:
            if token.lower() in skills:
                skillset.append(token)

        # check for bi-grams and tri-grams (example: machine learning)
        for token in noun_chunks:
            token = token.text.lower().strip()
            if token in skills:
                skillset.append(token)

        return [i.capitalize() for i in set([i.lower() for i in skillset])]

@router.get("/candidate-information", response_description="Get candidates information")
async def main() -> dict:
    parser = ResumeParser()
    # Use GPU and load nlp model
    # spacy.prefer_gpu()
    nlp = spacy.load('en_core_web_lg')

    # Create data structure for storing fields
    candidate_info = {}

    # Path to resume and skills data
    resumeDir = "/home/ncbernar/Github/listeedemo/backend/app/resumes/"
    skills_data = "/home/ncbernar/Github/listeedemo/backend/app/ResumeParser/data/skills.csv"

    # Extract text from pdf
    # resume_text = convertPDFToText(file_path)

    resume_token = []
    resume_text = ''
    for filename in os.listdir(resumeDir):
        if(filename.endswith(".pdf")):
            try:
                resume_token.append(
                    parser.convert_pdf_to_txt(resumeDir+filename))
            except Exception:
                print('Error reading .pdf file' + filename)

    for i in resume_token:
        resume_text += str(i)

    candidate_name = parser.extract_name(resume_text)
    candidate_phone = parser.extract_mobile_number(resume_text)
    candidate_email = parser.extract_email(resume_text)
    candidate_skills = parser.extract_skills(resume_text, skills_data)
    converted_uuid = json.dumps(uuid.uuid4(), cls=UUIDEncoder)

    # candidate_info["userId"] = converted_uuid
    candidate_info["name"] = candidate_name
    candidate_info["phone"] = candidate_phone
    candidate_info["email"] = candidate_email
    candidate_info["skills"] = candidate_skills
    candidates_info = [candidate_info]
    pprint(candidate_info)

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=candidates_info)

class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            return obj.hex
        return json.JSONEncoder.default(self, obj)
