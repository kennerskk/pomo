import { useState, useEffect } from 'react';
import '../index.css';

function Contact() {
    const [copied, setCopied] = useState(false);

    const handleCopy = (email: string) => {
        navigator.clipboard.writeText(email);
        setCopied(true);

        setTimeout(() => {
        setCopied(false);
        }, 2000);
    };

    useEffect(() => {
        const scrollbar = document.querySelector(".scrollbar") as HTMLElement;

        const onScroll = () => {
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        const scrollbarHeight = (winHeight / docHeight) * winHeight;
        const scrollbarTop = (scrollTop / docHeight) * winHeight;

        if (scrollbar) {
            scrollbar.style.height = `${scrollbarHeight}px`;
            scrollbar.style.top = `${scrollbarTop}px`;
        }
        };

        window.addEventListener("scroll", onScroll);
        onScroll(); // run once when component mounts

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className='contact-body'>
        <h1 className='contact-header'>CONTACT US</h1>
        <div className='contact-card-container'>
            <div className='contact-card'>
            <div className='contact-card-content'>
                <img
                src="./public/ken.jpg"
                alt="Sarayut's Profile"
                className="profile"
                />
                <div className='contact-card-text'>
                <h3>Ken "Saran"</h3>
                <h4>Mr. Sarayut Khuprachamit</h4>
                <p className='contact-card-paragraph'>
                    "แม้ว่าคุณจะใช้งานแอพของผม แต่ถ้าคุณยังแอบไถรีลไอจีระหว่างเรียนก็ไม่มีประโยชน์ครับ"
                </p>
                <div className='contact-card-links'>
                    <div className='email' onClick={() => handleCopy("khuprachamitsarayut@gmail.com")}>
                    <img src="./public/email.svg" alt="Email" width={24} className='links-icon' />
                    <p className='button'>Email</p>
                    </div>
                    <div className='github' onClick={() => window.open("https://github.com/kennerskk")}>
                    <img src="./public/github.svg" alt="GitHub" width={24} className='links-icon' />
                    <p className='button'>GitHub</p>
                    </div>
                    <div className='discord' onClick={() => window.open("https://discord.com/users/1058789159390687363")}>
                    <img src="./public/discord.svg" alt="Discord" width={24} className='links-icon' />
                    <p className='button'>Discord</p>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className='contact-card'>
            <div className='contact-card-content'>
                <img
                src="./public/hope.jpg"
                alt="Teeruch's Profile"
                className="profile"
                />
                <div className='contact-card-text'>
                <h3>Hope "Wáng"</h3>
                <h4>Mr. Teeruch Songtalay</h4>
                <p className='contact-card-paragraph'>
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit ไปเขาก็ไม่รักคุณหรอก"
                </p>
                <div className='contact-card-links'>
                    <div className='email' onClick={() => handleCopy("hopexforwork@gmail.com")}>
                    <img src="./public/email.svg" alt="Email" width={24} className='links-icon' />
                    <p className='button'>Email</p>
                    </div>
                    <div className='github' onClick={() => window.open("https://github.com/hxpehophopv2")}>
                    <img src="./public/github.svg" alt="GitHub" width={24} className='links-icon' />
                    <p className='button'>GitHub</p>
                    </div>
                    <div className='discord' onClick={() => window.open("https://discord.com/users/480689836085477377")}>
                    <img src="./public/discord.svg" alt="Discord" width={24} className='links-icon' />
                    <p className='button'>Discord</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Toast */}
        <div className={`copied ${copied ? 'show' : ''}`}>
            Email copied to clipboard!
        </div>
        </div>
    );
}

export default Contact;
