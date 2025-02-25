---
repo: Adiii1436/datadoc
url: 'https://github.com/Adiii1436/datadoc'
homepage: ''
starredAt: '2024-03-20T16:06:54Z'
createdAt: '2024-03-19T17:38:15Z'
updatedAt: '2024-06-17T16:16:01Z'
language: Python
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:34.060Z'
description: null
tags:
  - chromadb
  - gemini-api
  - langchain
  - large-language-models
  - streamlit
---

# Datadoc: Your AI DOC Assistant

🌟 **Feature Update**: Offline LLM support. Now you can run whole system offline. [Click here](https://github.com/Adiii1436/datadoc?tab=readme-ov-file#features-). 

Welcome to Datadoc, your personal AI document assistant. Datadoc is designed to help you extract information from documents without having to read or remember the entire content. It's like having a personal assistant who has read all your documents and can instantly recall any piece of information from them. 

![Screenshot from 2024-03-20 00-50-20](https://github.com/Adiii1436/datadoc/assets/73269919/26e596fd-722b-4f0e-92b5-4e68d611693b)

## Features 🚀

- **Document RAG Search**:  Datadoc uses a Retrieval-Augmented Generation (RAG) approach for document search. This involves retrieving relevant documents or passages and then using them to generate a response. This allows Datadoc to provide detailed and contextually relevant answers. 
  - I have uploaded the whole book [Hands-on Machine Learning with Scikit-Learn, Keras, and TensorFlow by Aurélien Géron](https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/) along with other several books. And picked random questions from the excercise section of the book. It answers every question precisely.

    ![Screenshot from 2024-03-18 20-00-30](https://github.com/Adiii1436/datadoc/assets/73269919/77a890bd-2ade-4359-8693-44101902ff2a)
    ![Screenshot from 2024-03-18 20-09-18](https://github.com/Adiii1436/datadoc/assets/73269919/4d7367e9-6b6e-402e-859c-ed926f8d68e8)

- **Offline Support**: Datadoc supports offline mode i.e now you can the LLM model locally on your system. And you also don't need GPU for this. If you prefer to run LLM locally you can use this feature.

   ![image](https://github.com/Adiii1436/datadoc/assets/73269919/60ba0650-ac24-4877-baf5-a399b1c8df7a)

   - Download the Model: Download **mistral-7b-openorca.gguf2.Q4_0.gguf** model from the **Model Explorer** section in GPT4All [website](https://gpt4all.io/index.html).
   - Place the model inside `models/mistral-7b-openorca.gguf2.Q4_0.gguf`.

- **Child Mode**: It enables LLMs to elucidate topics as if they're explaining to a child. This feature proves invaluable for providing detailed and easily understandable explanations for each topic.

   - Without child mode:
    ![Screenshot from 2024-03-20 16-52-25](https://github.com/Adiii1436/datadoc/assets/73269919/31bd1a18-02ff-46fd-add1-697fd3618e9a)

   - After child mode:
    ![Screenshot from 2024-03-20 16-53-17](https://github.com/Adiii1436/datadoc/assets/73269919/ba2d854e-d4bf-4b5a-ab63-ac423abc6d45)

- **Vector Database**: Datadoc uses ChromaDB to store embeddings of the data. Embeddings are vector representations of text that capture semantic meaning. Storing these embeddings in a vector database allows for fast and efficient similarity search, enabling Datadoc to quickly find relevant information in your documents.

  ![Untitled (1)](https://github.com/Adiii1436/datadoc/assets/73269919/c05d570e-5671-49b1-bdb9-d6b2532fe5d9)

- **Supports Multiple Formats**: Datadoc can read information from various document formats such as PDFs, DOCX, MD, and more.
- **Image Search**: Datadoc can also answer queries based on the content of an uploaded image using gemini-pro-vision model.
- **Fast and Efficient**: Powered by Langchain and ChromaDB for storing data embeddings, Datadoc provides instant results.

## How Datadoc Works

- **Intelligent Fusion**: Datadoc harnesses the power of Langchain's Gemini model (a sophisticated Language Model Mixture) in combination with ChromaDB's advanced embedding storage.
- **Versatile Processing**: Datadoc handles a multitude of document formats with ease.
- **Image Understanding**: For image-related queries, the Gemini API steps in to provide deep image analysis.

## Getting Started 🎉

1. Clone the repository
```bash
git clone https://github.com/Adiii1436/datadoc.git
cd datadoc
```
2. Create virtual environment
```bash
python3 -m venv venv
```
3. Install the dependencies
```bash
pip install -r requirements.txt
```
4. Put all your files inside [Transcripts](https://github.com/Adiii1436/datadoc/tree/main/Transcripts) folder.
5. Run the main script and start asking questions!
```bash
streamlit run app.py
```
6. You also need a gemini-api key which you can get from [here](https://ai.google.dev/).
7. Note that initial execution may take some time to create document embeddings and parse various document types, but subsequent runs will be faster.
8. Important Note: [click here](https://github.com/Adiii1436/datadoc/issues/1#issuecomment-2011808810)
   
## Contributing 🤝

We welcome contributions from developers. Feel free to fork this repository, make changes, and submit a pull request.

## License 📄

This project is licensed under the MIT License.

