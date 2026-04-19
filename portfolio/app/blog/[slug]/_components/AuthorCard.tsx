import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';

interface AuthorCardProps {
  name?: string;
  title?: string;
  bio?: string;
  avatar?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export default function AuthorCard({
  name = 'Kowshik Valipireddy',
  title = 'Full Stack Developer',
  bio = 'Passionate about building performant web applications and sharing knowledge with the developer community.',
  avatar = '/logo/profile.jpg',
  socials = {
    github: 'https://github.com/kowshik3383',
    linkedin: 'https://linkedin.com/in/kowshikvalipireddy',
    twitter: 'https://twitter.com/kowshik_dev',
  },
}: AuthorCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-8">
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-200">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{bio}</p>
          
          <div className="flex items-center gap-3">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}