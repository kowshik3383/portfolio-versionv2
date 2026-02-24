export type Next_Page_Url = string;
// UrlObject;
// | __next_route_internal_types__.StaticRoutes
// | __next_route_internal_types__.DynamicRoutes;

export type Variant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'no-color';

export interface IProject {
    slug: string;
    title: string;
    year?: number;
    description: string;
    role?: string;
    tags?: string[]; // optional
    techStack?: string[]; // ✅ add this
    thumbnail: string;
    longThumbnail?: string;
    images?: string[];
    link: string;
    liveUrl: string;
    sourceCode?: string;
    details?: {
        overview: string;
        features: string[];
        challenges?: string;
        outcome?: string;
    };
}

