import React from 'react';
import { useState } from 'react';
import '../index.css';

function Contact() {

    const [copied , setCopied] = useState(false);

    const handleCopy = (email: string) => {
        navigator.clipboard.writeText(email);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    return (
        <div className='contact-body'>
            <h1>CONTACT US</h1>
            <div className='contact-card-container'>
                <div className='contact-card'>
                    <div className='contact-card-content'>
                        <img
                            src="./src/assets/ken.jpg"
                            alt="Sarayut's Profile"
                            className="profile" />
                        <div className='contact-card-text'>
                            <h3>Ken "Saran"</h3>
                            <h4>Sarayut Khuprachamit</h4>
                            <p className='contact-card-paragraph'>ในฐานะ Project Developer ผมอยากจะบอกว่า "Hello World ไปเขาก็ไม่รักคุณหรอก"</p>
                            <div className='contact-card-links'>
                                <div className='email' onClick={() => handleCopy("khuprachamitsarayut@gmail.com")}>
                                    <img src="./src/assets/email.svg" alt="Email" width={24} className='links-icon' /><p className='button'>Email</p>
                                </div>
                                <div className='github' onClick={() => window.open("https://github.com/kennerskk")}>
                                    <img src="./src/assets/github.svg" alt="GitHub" width={24} className='links-icon' /><p className='button'>GitHub</p>
                                </div>
                                <div className='discord' onClick={() => window.open("https://discord.com/users/1058789159390687363")}>
                                    <img src="./src/assets/discord.svg" alt="Discord" width={24} className='links-icon' /><p className='button'>Discord</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='contact-card'>
                    <div className='contact-card-content'>
                        <img
                            src="./src/assets/hope.jpg"
                            alt="Teeruch's Profile"
                            className="profile" />
                        <div className='contact-card-text'>
                            <h3>Hope "Wáng"</h3>
                            <h4>Teeruch Songtalay</h4>
                            <p className='contact-card-paragraph'>ในฐานะ Project Designer ผมอยากจะบอกว่า "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus blanditiis explicabo amet quo deleniti ad placeat soluta vel, porro, fugiat repellat minima deserunt quae! ไปเขาก็ไม่รักคุณหรอก"</p>
                            <div className='contact-card-links'>
                                <div className='email' onClick={() => handleCopy("hopexforwork@gmail.com")}>
                                    <img src="./src/assets/email.svg" alt="Email" width={24} className='links-icon' /><p className='button'>Email</p>
                                </div>
                                <div className='github' onClick={() => window.open("https://github.com/hxpehophopv2")}>
                                    <img src="./src/assets/github.svg" alt="GitHub" width={24} className='links-icon' /><p className='button'>GitHub</p>
                                </div>
                                <div className='discord' onClick={() => window.open("https://discord.com/users/480689836085477377")}>
                                    <img src="./src/assets/discord.svg" alt="Discord" width={24} className='links-icon' /><p className='button'>Discord</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`copied ${copied ? 'show' : ''}`}>Email copied to clipboard!</div>
        </div>
    )
}

export default Contact
