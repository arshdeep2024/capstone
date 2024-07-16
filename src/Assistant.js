//Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./components/config/config";

const genAI = new GoogleGenerativeAI(config.geminiKey);

async function Assistant(query, prevOrders, username, ordersInCart) {

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const preamble = `this is an API call, the backend developer wants you to know the following things : \n (1) You are integrated to a customer support chatbot so all your replies are shown as it is on our professional website. (2) Strictly reply according to the data given to you about the user. Give direct (but polite) answers. (3) If there is no Javascript Array in front of any of the things like "Previous Orders: " or "Orders in cart of user" then they have no previous orders or orders in their cart at the moment.`

    const UserQuery = `\n User Query : ${query}`
  
    const prompt = `${preamble}\n Previous orders : ${prevOrders} \n Name of user: ${username}\n Orders in cart of user : ${ordersInCart} \n User Query: ${UserQuery}`
  
    const result = await model.generateContent(prompt);

  return result.response?.text()
}

export default Assistant