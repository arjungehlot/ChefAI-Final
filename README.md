# 🧠🍳 ChefAI – Your Smart AI Cooking Assistant

ChefAI is an intelligent, AI-powered cooking assistant that empowers users to explore recipes, receive meal suggestions tailored to dietary preferences, and follow step-by-step instructions — all through natural voice input and advanced AI capabilities. Whether you're a home cook, beginner, or a food lover, **ChefAI** makes your cooking smarter, easier, and more personalized.

---

## 🌟 Features

- 🔍 **Smart Recipe Generator:** Suggests recipes based on ingredients you have.
- 🥗 **Diet-Aware Meal Planning:** Customize suggestions based on dietary restrictions (e.g., vegan, gluten-free, keto).
- 🧠 **NLP-Powered Voice Commands:** Use voice to interact with the app — “What can I cook with tomatoes and paneer?”
- 🧾 **Step-by-Step Instructions:** Follows a guided, voice-assisted recipe workflow.
- 🧊 **Ingredient Detection (Computer Vision):** Use your camera to scan and recognize ingredients.
- 📊 **Nutritional Analysis:** Get calorie and nutritional breakdown of any recipe.
- 📱 **Responsive UI:** Optimized for all devices – from mobile phones to tablets and desktops.
- 🌐 **Multi-language Support:** Interact in English, Hindi, and more (coming soon).

---

## 🧱 Tech Stack

| Layer            | Technology                                  |
|------------------|----------------------------------------------|
| **Frontend**     | React.js, Tailwind CSS, Framer Motion        |
| **Backend**      | Node.js, Express.js                          |
| **AI Services**  | OpenAI GPT-4 (NLP), TensorFlow.js / Teachable Machine (CV) |
| **Database**     | MongoDB (Mongoose)                           |
| **APIs**         | Spoonacular API, Edamam API, Google TTS      |
| **Voice Input**  | Web Speech API                   |
| **Hosting**      | Vercel / Render (Frontend & Backend)         |

---

## 🧭 Project Flowchart

![ChefAI Flowchart](./public/WorkFlow1.png)

---

## 🎥 Screenshots

| Home Page                        | Ingredient Scanner                 | Recipe Suggestion                   |
|----------------------------------|------------------------------------|-------------------------------------|
| ![Home](./public/Home.png)       | ![Scan](./public/ImageAnaly.png)  | ![Suggest](./public/Suggestion.png) |

![Scan](./public/Ingredients.png)
![Suggest](./public/Profile.png)
![Suggest](./public/Dashboard.png)
---

## 🗣️ How to Use (with Voice)

1. 🎙 Click the **microphone icon** to start voice input.
2. Say something like:  
   - “Find me a recipe with potatoes and spinach.”
   - “I am vegan. What can I eat today?”
3. 🧾 Follow the steps shown for the suggested recipe.
4. 📸 Optionally, scan ingredients using your camera.

---
## 🧭 Brochures

![Brochures](./public/BrochuresFront.png)
![Brochures](./public//Brochures.png)

## 🛠️ Installation & Run Locally

```bash
git clone https://github.com/yourusername/chefai.git
cd chefai
npm install
npm start
