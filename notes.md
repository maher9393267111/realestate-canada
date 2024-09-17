Qatar --> Bahrain
Oman --> Kuwait

color triprex
#63ab45

npx rimraf node_modules



https://www.dumangurme.com/haberdetay/zeytincilik-sektorunde-rekor-ustune-rekor
                


import { useLanguageContext } from "@/context/languageContext";

import { useTranslation } from "@/context/useTranslation";



 const { language, changeLanguage } = useLanguageContext();

  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);




----------

 <div className="row gy-4">
                  {data?.books?.map((blog) => {
                    const {
                      _id,

                      createdAt,

                      cover,
                      image,
                      title,
                      story,
                      storyfr,
                      category,
                      country,
                      city,
                      area,
                      features,
                      details,
                      price,

                      // read_time,
                    } = blog;
                    return (
                      <div className="col-md-4 item">
                        <div className="package-card">
                          <div className="package-card-img-wrap">
                            <Link
                              href={`/projects/${_id}`}
                              className="card-img"
                            >
                              <img src={`${ImageEndpoint}/${cover}`} alt="" />

                              {/* <img
                             src="/assets/img/home1/package-card-img1.png"
                            alt=""
                          /> */}
                            </Link>
                          </div>
                          <div className="package-card-content">
                            <div className="card-content-top">
                              <h5>
                                <Link href={`/projects/${_id}`}>{title}</Link>
                              </h5>
                              <div className="location-area">
                                <ul className="location-list scrollTextAnimation">
                                  <li>
                                    <Link href="/package">{country}</Link>
                                  </li>
                                  <li>
                                    <Link href="/package">{city}</Link>
                                  </li>
                                  <li>
                                    <Link href="/package">{area}</Link>
                                  </li>
                                </ul>
                              </div>
                            </div>



                            <div className="location-area ">
                              <ul className="!flex w-2/3  text-[#888] !gap-3 !justify-between containe ">
                                <li>Rooms {details?.rooms}</li>
                                <li>Beds {details?.beds}</li>
                                <li>Baths {details?.baths}</li>
                              </ul>
                            </div>

                            <div className="card-content-bottom">
                              <div className="price-area ">
                                <span>${price}</span>
                              </div>

                              <Link
                                href={`/projects/${_id}`}
                                className="primary-btn2"
                              >
                                Project Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>