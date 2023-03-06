import React from 'react'

function About() {
    return (
        <div id="about_page">
            
            <div className=''>
                <div className='mb-2 border-bottom border-secondary py-3'>
                    <h1 className='text-center font_labrada'>Welcome to PoetryLog!</h1>
                    <h4 className=' text-secondary text-center mx-2 font_mukta'>A platform to satisfy your poetic ambitions</h4>
                </div>

                <div className='mt-4 mb-3 border-bottom border-secondary pb-4' id="about">
                    <div className='p-2 mb-3 about_heading_container font_labrada'>
                        <h1>About</h1>
                    </div>

                    <h5 className='fw-normal text-dark text-left mb-3 font_lato fs-6 mx-3'>
                        So, what is PoetryLog?
                    </h5>
                    <h5 className='fw-normal text-dark text-left mb-3 font_lato fs-6 mx-3'>
                        Well, put simply, it is a platform for writing and sharing personal poems. 
                    </h5>
                    <h5 className='fw-normal text-dark text-left mb-3 font_lato fs-6 mx-3'>
                        There are almost no restrictions on the poems you want to create, but do be respectful to others' creations and efforts, of course. 
                    </h5>

                    <h5 className='fw-normal text-dark text-left mb-3 font_lato fs-6 mx-3'>
                        Keep in mind that there will be people on the other end who can see your poems should you choose to make them public. So be mindful of what you put out there. <span className='text-danger fw-bold fs-6 fst-italics'>Poems will most likely not be vetted to ensure the protection of sensitive personal information. You have been warned.</span>
                    </h5>
                     
                    <h5 className='fw-normal text-dark text-left mb-3 font_lato fs-6 mx-3'>
                        This page will primarily serve as a brief introduction to the platform. Navigation-wise, this page will be divided into subsections; you can use the navigation bar attached to the bottom of this page to quickly navigate to each subsection according to your needs.   
                    </h5>

                    <h5 className='fw-normal text-dark text-left mb-3 font_lato fs-6 mx-3'>
                        The <span className='fw-bold'>Getting Started</span> section will go over the features of the platform and how you can start writing your first few poems. It will (probably) be all you need to use the platform. The last two sections will just serve to document the technologies used in the project, as well as the media links for any inquiries/requests; they are both aptly titled <span className='fw-bold'>Technology Used</span> and <span className='fw-bold'>Media</span> respectively.
                    </h5>
                </div>

                <div className='mt-5 mb-2 pb-3 border-bottom border-secondary' id="get_started">
                    <div className='p-2 mb-3 about_heading_container font_labrada getting_started'>
                        <h1>Getting Started</h1>
                    </div>
                    
                    <h5 className='fw-normal text-dark text-left mb-4 mx-3 fs-6 font_lato'>
                        Before you can start writing poems, you'll have to create an account first. You can do this by clicking the <span className='fw-bold text-dark'>Register</span> tab located on the navigation bar at the top of the page. You'll be asked to provide an email address and an username, along with a password you want to use to login to the platform.  
                    </h5>

                    <h5 className='text-dark text-left mb-4 mx-3 fs-6 font_mukta'>
                        Just a small note on registration, currently, the platform only accepts gmail email addresses. We're looking to potentially address this in the future.  
                    </h5>

                    <div className='my-4' id="register_gif_container">
                        <img src="./register_gif.gif" id="register_gif" alt="register_info_gif"></img>
                    </div>
                    <h5 className='fw-normal text-dark text-left mb-4 mx-3 fs-6 font_lato'>
                        After registration, you will need to verify your credentials using the email you provided during registration. An email will be sent to said email address with a link to verify your credentials. Follow the link and voila... congratulations! You can now log into your account and start writing poems. Go wild. 
                    </h5>

                    <h5 className='fw-normal text-dark text-left mb-4 mx-3 fs-6 font_lato'>
                        You will be redirected to your personal page on logging into the platform. You can use the buttons at the bottom of that page to write your first poem, and to view all the poems you have written so far on this platform. There is also a page for viewing any poems written by others which have been made public.  
                    </h5>

                    <h5 className='fw-normal text-dark text-left mb-4 mx-3 fs-6 font_lato'>
                        When viewing your poems, there will be a button to toggle the visibility of the poem, in regards to whether or not you want your poems to be private or public. By default, any poem you write is private, until you toggle it in the view tab.
                    </h5>

                    <h5 className='fw-normal text-dark text-left mb-4 mx-3 fs-6 font_lato'>
                        Should you want to consult this <span className='fst-italic fw-bold'>About</span> page again you can do so by using the appropriate button located at the bottom of the homepage. And then you can read these words again 😉.
                    </h5>
                </div>

                <div className='mt-5 mb-2 pb-3 border-bottom border-secondary' id="credits">
                    <div className='about_heading_container font_labrada p-2 mb-3 technology_used'>
                        <h1>Credits</h1>
                    </div>
                    
                    <div className='m-3 p-2' id="technology_used_container">
                        <div className='ms-3'>
                            <h4 className='fst-italic font_mukta text-decoration-underline mb-3'>Technology & Frameworks</h4>

                            <div className='ms-1'>
                                <dl className='row'>
                                    <dt className='col-4 col-sm-3'>MongoDB</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used to house poem data, as well as applying operations to said data.</dd>

                                    <dt className='col-4 col-sm-3'>ExpressJS</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used in setting up server-side (backend) operations.</dd>

                                    <dt className='col-4 col-sm-3'>ReactJS</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used for layout and design, and for use in conjunction with backend technologies.</dd>

                                    <dt className='col-4 col-sm-3'>NodeJS</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used in conjunction with ExpressJS to set up server-side operations.</dd>
                                    
                                    <dt className='col-4 col-sm-3'> JavaScript</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used for DOM manipulation, and trivial operations such as toggling certain elements.</dd>
                                </dl>
                            </div>
                        </div>

                        <hr/>

                        <div className='ms-3'>
                            <h4 className='fst-italic font_mukta text-decoration-underline mb-3'>Styling, Design & Images</h4>

                            <div className='ms-1'>
                                <dl className='row'>
                                    <dt className='col-4 col-sm-3'>Canva</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used to populate backgrounds on certain pages with appropriate background images.</dd>

                                    <dt className='col-4 col-sm-3'>CSS</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used for design and layout, as well as to integrate aspects of responsiveness to some pages/components.</dd>
                                   
                                    <dt className='col-4 col-sm-3'>Bootstrap</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used predefined classes for layout and design, in conjunction with CSS.</dd>

                                    <dt className='col-4 col-sm-3 mb-3'>Google Fonts</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used Mukta, Lato, and Labrada fonts for particular headings, and paragraphs.</dd>

                                    <dt className='col-4 col-sm-3'>GIMP</dt>
                                    <dd className='col-8 col-sm-9 mb-4'>Used to process and edit images used throughout the platform.</dd>

                                    
                                </dl>
                            </div>
                        </div>

                        <hr />
                        <div className='ms-3'> 
                            <h4 className='fst-italic font_mukta text-decoration-underline mb-3'>Additional Thanks:</h4>

                            <p>
                                Thank you to my friends and family for helping test the platform, attempting to break the platform in all ways imaginable, and offering recommendations for design and layout. Without your help, I could not progress in this project in an appropriate manner 😊.
                            </p>
                            <p className='text-end me-3'>-T.S.</p>
                        </div>
                    </div>
                </div>

                <div className='mt-4 mb-5' id="media">
                    <div className='about_heading_container font_labrada p-2 mb-3 media'>
                        <h1>Media</h1>
                    </div>
                    <div className='' id="media_links_heading">
                        <h2 className='text-center fw-bold mb-0 font_mukta'>Links</h2>
                        <h5 className='text-center text-secondary mb-3  fw-normal font_mukta'>(For any questions, requests, and other content)</h5>
                    </div>
                    <div className='d-flex flex-column justify-content-center py-4' id="media_links_container">
                        <div className='align-self-center media_link mb-3'>
                            <a href="https://twitter.com/TS_Dev_28" target="_blank"><img src="./twitterIcon.png"></img></a>
                        </div>
                        <div className='align-self-center media_link mb-3 ' id="youtube_container">
                            <a href="https://www.youtube.com/@TS_DEV" target="_blank"><img src="./youtubeIcon.png" ></img></a>
                        </div>
                        <div className='align-self-center media_link'>
                            <a href="https://github.com/ST28Dev" target="_blank"><img src="./githubIcon.png" ></img></a>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div className='' id="about_nav_bottom">
                <div className='d-flex bg-dark justify-content-center flex-wrap' id="about-nav-bottom-links">
                    <a href="#about" className='me-2 p-2 text-decoration-none bg-light text-dark my-2 font_mukta fw-normal'>About</a>
                    <a href="#get_started" className='me-2 p-2 text-decoration-none bg-light text-dark my-2 font_mukta fw-normal'>Getting Started</a>
                    <a href="#credits" className='me-2 p-2 text-decoration-none bg-light text-dark my-2 font_mukta fw-normal'>Credits</a>
                    <a href="#media" className='me-2 btn-small text-decoration-none bg-light text-dark p-2 my-2 font_mukta fw-normal'>Media</a>
                </div>
            </div>

        </div>
    )
}

export default About