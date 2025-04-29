import { Link } from 'wouter';
import { 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">StartupPulse</h3>
            <p className="text-gray-400 mb-4">Accelerating startup growth through expert guidance, mentorship, and resources.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/#home" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/#services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/#testimonials" className="text-gray-400 hover:text-white">Testimonials</a></li>
              <li><a href="/#faq" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link href="/self-evaluation" className="text-gray-400 hover:text-white">Self Evaluation</Link></li>
              <li><Link href="/consultancy" className="text-gray-400 hover:text-white">Expert Consultancy</Link></li>
              <li><Link href="/mentorship" className="text-gray-400 hover:text-white">Mentorship Program</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">123 Startup Avenue, Bangalore, Karnataka 560001</li>
              <li><a href="tel:+919876543210" className="text-gray-400 hover:text-white">+91 98765 43210</a></li>
              <li><a href="mailto:info@startuppulse.com" className="text-gray-400 hover:text-white">info@startuppulse.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6">
          <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} StartupPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
