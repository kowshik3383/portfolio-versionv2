import Link from 'next/link';
import React, { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { Variant } from '@/types';
import { cn } from '@/lib/utils';

const Child = ({ icon }: any) => (
    <span className="flex items-center justify-center gap-2">
        <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
        {!icon && 'Loading...'}
    </span>
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
    as?: 'link' | 'button';
    loading?: boolean;
    icon?: boolean;
    children: ReactNode | ReactNode[];
    className?: string;
    variant?: Variant;
} & (ComponentProps<typeof Link> | ButtonProps);

const Button = ({
    loading,
    variant,
    className,
    children,
    as = 'link',
    icon = false,
    ...rest
}: Props) => {
    // Astryx Button Variants
    const variantClasses = {
        primary: `bg-[#0064E0] text-white hover:bg-[#0052B3] shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98] border border-transparent`,
        secondary: `bg-[#0D8626] text-white hover:bg-[#0B7320] shadow-xs hover:shadow-md hover:shadow-emerald-500/20 active:scale-[0.98] border border-transparent`,
        outline: `bg-white text-[#0A1317] border border-[#E8E3DA] hover:border-neutral-400 hover:bg-[#FAF8F5] active:scale-[0.98] shadow-2xs`,
        success: `bg-[#0D8626] text-white hover:bg-[#0B7320] shadow-xs active:scale-[0.98] border border-transparent`,
        warning: `bg-[#E2A400] text-[#0A1317] hover:bg-[#C58600] active:scale-[0.98] border border-transparent`,
        danger: `bg-[#E3193B] text-white hover:bg-[#C4122F] active:scale-[0.98] border border-transparent`,
        info: `bg-[#0064E0] text-white hover:bg-[#0052B3] active:scale-[0.98] border border-transparent`,
        light: `bg-[#FAF8F5] text-[#0A1317] hover:bg-white border border-[#E8E3DA] active:scale-[0.98]`,
        dark: `bg-[#0A1317] text-white hover:bg-[#1E293B] active:scale-[0.98] border border-transparent`,
        link: `text-[#0064E0] hover:text-[#0052B3] underline-offset-4 hover:underline bg-transparent p-0 h-auto`,
        'no-color': '',
    }[variant || 'primary'];

    const iconClasses = cn(
        'size-9 p-0 inline-flex items-center justify-center rounded-full',
        variantClasses,
    );

    const buttonClasses = cn(
        `group h-11 px-6 inline-flex justify-center items-center gap-2 text-sm font-outfit font-semibold tracking-tight rounded-full outline-none transition-all duration-200 relative select-none disabled:opacity-50 disabled:pointer-events-none`,
        variantClasses,
        { [iconClasses]: icon },
        className,
    );

    if (as === 'link') {
        const props = rest as ComponentProps<typeof Link>;

        if (props.target === '_blank') {
            return (
                <a
                    className={buttonClasses}
                    {...props}
                    href={props.href ? props.href.toString() : '/'}
                >
                    <span className="inline-flex items-center justify-center gap-2">
                        {loading ? <Child icon={icon} /> : children}
                    </span>
                </a>
            );
        }

        return (
            <Link className={buttonClasses} {...props} href={props.href || '/'}>
                <span className="inline-flex items-center justify-center gap-2">
                    {loading ? <Child icon={icon} /> : children}
                </span>
            </Link>
        );
    } else {
        const props = rest as ButtonProps;

        return (
            <button className={buttonClasses} {...props}>
                <span className="inline-flex items-center justify-center gap-2">
                    {loading ? <Child icon={icon} /> : children}
                </span>
            </button>
        );
    }
};

export default Button;
