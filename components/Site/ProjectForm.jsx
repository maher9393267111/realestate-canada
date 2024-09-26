import axios from "axios";
// import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { message as antdMessage } from "antd";
import useAuth from "@/hooks/useAuth";
import { useLanguageContext } from "@/context/languageContext";

const ProjectForm = ({}) => {


const {language ,reference} = useLanguageContext()

  // const { status } = useSession();
  const { user } = useAuth({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // CRUD State.
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      antdMessage.error(error);
      setError(null);
    }

    if (isSuccess) {
      antdMessage.success("Message send successfully");

      setIsSuccess(false);
    }
  }, [error, isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (status === "unauthenticated") {
    //     setError("You are not sign in");
    //     return
    // }

    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const { data } = await axios.post(
        `/api/offer`,
        {
          name,
          email,
          phone,
          message,
          reference
        },
        config
      );

      antdMessage.success("Your message sended successfully")
      setIsSuccess(data.success);
    } catch (error) {
      setError(error.message);
     // antdMessage.error("Your message sended successfully")
      console.error(error.message);
    }
  };



  return (
    <form
      dir="ltr"
      autoComplete="off"
      className="w-full grid grid-cols-3 gap-4"
    >
      <div className="col-span-3 search-box">
        
        <input
          type="text"
          placeholder={language === "en" ? "Name" : "Nom" }
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border focus:outline-none !border-primary2 focus:!border-primary2 shadow-sm md:text-base"
        />
      </div>
      <div className="col-span-3 search-box">
        <input
          type="email"
          placeholder={language === "en" ? "Email" : "E-mail" }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border  border-color   focus:outline-none !border-primary2 focus:!border-primary2 shadow-sm md:text-base"
        />
      </div>
      <div className="col-span-3 search-box">
        <input
          type="tel"
          placeholder={language === "en" ? "Phone" : "Téléphone" }
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border  border-color   focus:outline-none !border-primary2 focus:!border-primary2 shadow-sm md:text-base"
        />
      </div>
    



      <div className="col-span-3 search-box">
        <textarea
          placeholder={language === "en" ? "Message" : "Message" }
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 p-2 block w-full min-h-[42px] max-h-[210px] rounded-md border focus:outline-none !border-primary2 focus:!border-primary2 shadow-sm md:text-base"
        />
      </div>
      <div className="col-span-3 flex items-center justify-center gap-x-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex w-full items-center !bg-primary rounded-md transition-all overflow-hidden"
        >
          <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span className="block">{language === "en" ? "Send message" : "envoyer un message" }</span>

            {/* {user ? (
              <span className="block">Send message</span>
            ) : (
              <span className="block">Please login to send</span>
            )} */}
          </div>
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
