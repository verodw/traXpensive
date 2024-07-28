import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about">
            <header>
                <h1>About Us</h1>
            </header>
            <main>
                <section className="intro">
                    <h2>Our Mission</h2>
                    <p>
                        At <strong>traXpensive</strong>, we understand that managing expenses can be a complex and time-consuming task for small businesses. Our mission is to simplify expense tracking, offering an intuitive and powerful solution that helps you keep your financials organized, so you can focus on growing your business.
                    </p>
                </section>

                <section className="features">
                    <h2>What We Do</h2>
                    <ul>
                        <li><strong>Real-Time Expense Tracking:</strong> Log and view your expenses as they happen, ensuring you always have up-to-date financial information.</li>
                        <li><strong>Detailed Reporting:</strong> Generate comprehensive reports that help you analyze spending patterns and make informed financial decisions.</li>
                        <li><strong>Automated Categorization:</strong> Automatically categorize your expenses to streamline your bookkeeping and save time.</li>
                        <li><strong>User-Friendly Interface:</strong> Navigate through our easy-to-use platform designed with small business owners in mind.</li>
                    </ul>
                </section>

                <section className="story">
                    <h2>Our Story</h2>
                    <p>
                        Founded with a vision to empower small business owners, our team has combined their expertise to create a tool that addresses the unique challenges faced by small businesses in managing their finances. We are passionate about helping you achieve financial clarity and efficiency.
                    </p>
                </section>

                <section className="co-founders">
                    <h2>Meet the Co-Founders</h2>
                    <div className="founder">
                        <img src="adeline.png" alt="Gaizkia Adeline Atmaka" />
                        <div className="info">
                            <h3>Gaizkia Adeline Atmaka</h3>
                            <p>[Computer Science & Mathematics student with a keen interest in Machine Learning, continually developing skills for a future career in the field.]</p>
                        </div>
                    </div>
                    <div className="founder">
                        <img src="vero.png" alt="Veronica Dwiyanti" />
                        <div className="info">
                            <h3>Veronica Dwiyanti</h3>
                            <p>[Mobile Application and Technology student passionate about UI/UX design, mobile development, AI, and machine learning, combining creativity with technical expertise.]</p>
                        </div>
                    </div>
                    <div className="founder">
                        <img src="fatih.png" alt="Fatih" />
                        <div className="info">
                            <h3>Fatih</h3>
                            <p>[High schooler with HTML, Python, CSS, and JavaScript Stack who will be majoring in Electrical Engineering & Computer Science.]</p>
                        </div>
                    </div>
                </section>

                <section className="contact">
                    <h2>Contact Us</h2>
                    <p>
                        We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out to us at <a href="mailto:info@traxpensive.com">info@traxpensive.com</a> or follow us on <a href="https://www.socialmedia.com">Social Media</a>.
                    </p>

                </section>
            </main>
        </div>
    );
};

export default About;
