import React from 'react'
import { MdEmail } from "react-icons/md";
import { useLanguageContext } from '@/context/languageContext';

export default function TeamCard({member}) {


  const { language } = useLanguageContext();


  return (
    <div className="teams-card">
                        <img src="/assets/img/home2/teams-card-bg.png" alt="" />
                        <div className="teams-img">
                          <img
                          className='     object-top'
                           src={member?.image}
                          // src="/assets/img/home2/teams-card-img1.png"
                            alt=""
                          />
                        </div>
                        <div className="teams-content px-1">
                          <h4>{member?.name}</h4>
                          <span> 

                          {member.languages.length > 0 && (
      <p>{language === "en" ? "Languages:" : "Langues:"} {language === "en" ? `${member.languages.join(', ')}` : `${member.languagesfr.join(', ')}`}</p>
    )}

                          </span>
                          <span>{language === "en" ? `${member?.title}` : `${member?.titlefr}`}</span>
                          
                        </div>
                        
                        <ul className="social-list">
                          <li>
                            <a href={`mailto:${member?.email}`}>
                              <i className="bx bxl-gmail" />
                              <MdEmail className="text-xl"/>
                            </a>
                          </li>
                          {/* <li>
                            <a href="https://www.pinterest.com/">
                              <i className="bx bxl-pinterest-alt" />
                            </a>
                          </li>
                          <li>
                            <a href="https://twitter.com/">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                fill="currentColor"
                                className="bi bi-twitter-x"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.facebook.com/">
                              <i className="bx bxl-facebook" />
                            </a>
                          </li> */}
                        </ul>
                      </div>
  )
}
