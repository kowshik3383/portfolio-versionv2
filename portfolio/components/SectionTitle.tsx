import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface Props {
    icon?: ReactNode;
    badge?: string;
    className?: string;
    classNames?: {
        container?: string;
        title?: string;
        icon?: string;
    };
    title: string;
}

const SectionTitle = ({ icon, badge, title, className, classNames }: Props) => {
    return (
        <div
            className={cn(
                'flex flex-col items-start gap-2 mb-8 sm:mb-10',
                className,
                classNames?.container,
            )}
        >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0064E0]/10 border border-[#0064E0]/20 text-[11px] font-mono font-medium text-[#0064E0]">
                {icon ? (
                    icon
                ) : (
                    <span className="size-1.5 rounded-full bg-[#0064E0] animate-pulse" />
                )}
                <span>{badge || 'CORE ENGINEERING'}</span>
            </div>
            <h2
                className={cn(
                    'font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0A1317] leading-tight',
                    classNames?.title,
                )}
            >
                {title}
            </h2>
        </div>
    );
};

export default SectionTitle;
