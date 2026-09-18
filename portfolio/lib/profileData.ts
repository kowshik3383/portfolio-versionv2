import profileRaw from '@/data/profile.json';

export interface WorkRole {
    company: string;
    title: string;
    period: string;
    highlights: string[];
}

export interface ShippedApp {
    name: string;
    tag: string;
    stack: string;
    link: string;
    oneLiner: string;
}

export interface ProfileData {
    name: string;
    handle: string;
    role: string;
    bio: string;
    location: string;
    experience: {
        total: string;
        summary: string;
        roles: WorkRole[];
    };
    availability: {
        status: string;
        noticePeriod: string;
        openTo: string[];
        workAuthorization: string;
    };
    apps: ShippedApp[];
    skills: {
        mobile: string[];
        frontend: string[];
        backend: string[];
        cloud_tools: string[];
    };
    contact: {
        email: string;
        linkedin: string;
        github: string;
        upwork: string;
    };
    funFacts: string[];
}

export const PROFILE_DATA: ProfileData = profileRaw as ProfileData;
