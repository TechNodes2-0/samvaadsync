### Overview

Welcome to the SaamvaadSync project repository. SaamvaadSync, which means 'conversation' in several Indian languages, aims to revolutionize global digital communication, especially in the recruitment sector. By breaking down language barriers and enhancing conversation quality across platforms, SaamvaadSync ensures seamless and efficient connections.

![image](https://github.com/Nishitbaria/SamvaadSync/assets/85815172/1a1c1087-65ba-47cf-88b2-c98b812320f5)

### Features

- **Real-Time Chat Translation Services**: Leveraging Microsoft Azure Translation services, we provide instant translations for chat messages to facilitate clear and real-time communication across different languages.

- **Live Translated Captions during Video Calls**: Utilizing Vonage audio connectors and Azure Speech to Text translation services, we offer live captioning in the user's preferred language during video calls.

- **Conversation Summaries and Key Insights**: Post-conversation, we generate summaries and key insights using OpenAI for chats and Symbl.ai for video calls, all translated into the user’s preferred language.

- **End-to-End Encryption**: Ensures that messages are encrypted from sender to receiver, enhancing privacy and security.

- **Chat with Resume**: Recruiters can interact with potential hires while accessing their resumes in real-time within the same interface, enhancing the recruitment process.

- **Integrated ATS Database**: Our system integrates seamlessly with Applicant Tracking Systems (ATS), extracting and synthesizing key details from resumes, chats, and video transcriptions.

- **Smart Candidate Search**: Using Vector Embedding, our system conducts smart searches within the ATS to include a wider range of relevant skills beyond simple keyword matches.

### Future Enhancements

1. **Recruiter Panel with Recommended Questions and Regulation Help**: Enhancing recruiter interactions by suggesting tailored interview questions and regulatory guidelines based on AI analysis of the job position and candidate's details.

2. **Integrating Call Features for International Communication**: Incorporating advanced call features with options for automatic summarization and language translation.

3. **Document Verification Features**: Implementing digital verification and forgery detection to ensure the authenticity of candidate documents.

4. **Integration with ATS Systems**: Developing APIs for seamless integration with existing ATS systems, ensuring data synchronization and customization capabilities.

### Business Impact

- **Efficiency**: Automates and simplifies the recruitment process, saving valuable time for recruiters.
- **Data Enrichment**: Enhances recruiter databases by automatically integrating data from diverse candidate interactions.
- **Marketing & Outreach**: Expands job seeker opportunities and enriches company databases, serving as a comprehensive resource for future recruitment needs.

### Technical Stack

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Supabase
- **Translation Services**: Microsoft Azure Translation
- **Speech Recognition**: Azure Speech to Text
- **AI Services**: OpenAI, Symbl.ai
- **Security**: End-to-end encryption techniques
- **APIs**: Vonage, Azure

### Installation

```bash
git clone https://github.com/your-github/saamvaadsync.git
cd saamvaadsync
npm install
npm start
```

### Configuration

Ensure you have the necessary API keys from Azure, Vonage, and other services. Create a `.env` file in the root directory and populate it with your API keys:

```plaintext
AZURE_TRANSLATION_KEY="YourAzureTranslationAPIKey"
VONAGE_API_KEY="YourVonageAPIKey"
OPENAI_API_KEY="YourOpenAIKey"
```

### Usage

After installation and configuration, run the application using `npm start`. Navigate to `http://localhost:3000` to start using SaamvaadSync for efficient and enhanced recruitment communications.

### Contribution

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Please ensure to update tests as appropriate.

### License

Distributed under the MIT License. See `LICENSE` for more information.

---

For more information on how to set up, configure, and use SaamvaadSync, please refer to the detailed documentation in the `docs` directory.

We hope SaamvaadSync will be a valuable tool in your recruitment toolkit, making your hiring process more inclusive, efficient, and effective.
