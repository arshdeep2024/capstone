import React, { useEffect, useState } from 'react';
import './ChatBox.css';
import Assistant from '../../Assistant';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ChatBot() {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([
    {
      sender: 'assistant',
      text: "HOLA! HAVE QUERIES? NO WORRIES, I'm HERE.",
    },
  ]);

  const prevOrders = useSelector(state => state.auth.purchasedItems);
  const username = useSelector(state => state.auth.userData?.name || '');
  const ordersInCart = useSelector(state => state.auth.cart);
  const active = useSelector(state => state.auth.active)
  const navigate = useNavigate()

  const createBox = () => {
    const btn = document.getElementById('helpbtn');
    const box = document.getElementById('chatbox');
    btn.classList.toggle('hidden');
    box.classList.toggle('hidden');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (query.trim() === '') return;

    setConversation([...conversation, { sender: 'user', text: query }]);
    
    const reply = await Assistant(query, prevOrders, username, ordersInCart);
    setQuery('')
    
    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: 'assistant', text: reply },
    ]);

    setQuery('');
  };

  return (
    <footer className="bg-gray-400">
      <div className="fixed bottom-20 right-32">
        <div id="chatbox" className="hidden float-right">
          <div className="">
            <div
              className="border-black text-white border-2 bg-gray-950 p-2"
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            >
              <p className="mx-auto inline-block">Assistant</p>
              <button
                onClick={createBox}
                className="float-right text-white hover:scale-110"
              >
                <img
                  src="https://cdn.vectorstock.com/i/1000x1000/92/03/icon-close-button-vector-20409203.webp"
                  className="h-5 w-5 mt-0.5"
                  alt=""
                />
              </button>
            </div>
            <div
              className="border-2 border-black bg-gray-600 w-full h-96 mb-11 overflow-y-scroll"
              style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
            >
              {conversation.map((message, index) => (
                <p
                  key={index}
                  className={`text-white w-full flex items-center ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <img
                      src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg"
                      alt="DP"
                      className="w-12 h-12 inline-block border-2 border-white m-2"
                    />
                  )}
                  {message.text}
                  {message.sender === 'user' && (
                    <img src="https://pbs.twimg.com/profile_images/1379990456336011264/KHAIF9yw_400x400.jpg" alt="picture" 
                    className="w-12 h-12 inline-block border-2 border-white m-2"
                    />
                  )}
                </p>
              ))}
              <form onSubmit={handleSubmit} className="flex justify-center w-full">
                <input
                  type="text"
                  className="absolute bottom-16 w-3/5 py-2 rounded-lg overflow-scroll overflow-y-scroll"
                  placeholder="  Enter Query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
        <button
          id="helpbtn"
          onClick={createBox}
          className="bg-green-500 rounded-lg py-2 px-5 font-semibold hover:bg-green-600 justify-self-center fixed bottom-10 right-10"
        >
          How may I help you?
        </button>
      </div>
    </footer>
  );
}

export default ChatBot;