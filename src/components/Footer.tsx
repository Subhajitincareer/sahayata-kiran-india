
import { Phone, Heart, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sahayata-softGray py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-sahayata-blue p-1">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-poppins text-xl font-bold">Sahayata Kiran</span>
            </div>
            <p className="text-sm text-sahayata-neutralGray">
              A ray of hope for every student facing mental health challenges.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-sahayata-blue">Home</a></li>
              <li><a href="/assessment" className="hover:text-sahayata-blue">Self-Assessment</a></li>
              <li><a href="/resources" className="hover:text-sahayata-blue">Resources</a></li>
              <li><a href="/stories" className="hover:text-sahayata-blue">Stories of Hope</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/forum" className="hover:text-sahayata-blue">Community Forum</a></li>
              <li><a href="/faq" className="hover:text-sahayata-blue">FAQs</a></li>
              <li><a href="/privacy" className="hover:text-sahayata-blue">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Emergency Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sahayata-blue" />
                <span>National Suicide Helpline: 9152987821</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-sahayata-blue" />
                <span>Crisis Text Line: Text HOME to 988</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sahayata-blue" />
                <span>support@sahayatakiran.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-xs text-sahayata-neutralGray">
            &copy; {new Date().getFullYear()} Sahayata Kiran. All rights reserved. This platform is for support only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
