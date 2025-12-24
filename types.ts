export enum SiteType {
  News = 'NEWS',
  ECommerce = 'ECOMMERCE',
  Blog = 'BLOG',
  Corporate = 'CORPORATE',
  Portfolio = 'PORTFOLIO'
}

export enum TechStack {
  WordPress = 'WORDPRESS',
  NextJS = 'NEXTJS'
}

export interface Extras {
  // Only generic non-plugin extras here now
  uiux: boolean;
  multilingual: boolean;
  content: boolean;
  storage: boolean; // New: Heavy Media Storage
}

export interface AutomationOption {
  id: string;
  title: string;
  price: number;
  description: string;
  icon: any;
}

export interface ContentCreationOption {
  id: string;
  title: string;
  price: number;
  description: string;
  icon: any;
}

export interface Plugin {
  id: string;
  name: string;
  price: number;
  description: string;
  isMandatory?: boolean; // If true, cannot be unchecked easily
}

export interface SupportPackage {
  id: string;
  title: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface HostingInfo {
  type: string;
  space: string;
  ram: string;
  price: number;
  reason: string;
}

export interface CalculatorState {
  siteType: SiteType | null;
  techStack: TechStack | null;
  extras: Extras;
  selectedPlugins: string[]; // List of Plugin IDs
  selectedAutomations: string[]; // List of Automation IDs
  selectedContentServices: string[]; // New: List of Content Service IDs
  supportPackageId: string | null;
  includeHosting: boolean;
}

export interface MarketData {
  jalaliDate: string;
  gregorianDate: string;
  usdPrice: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  isSearching?: boolean;
  groundingSources?: { uri: string; title: string }[];
  marketData?: MarketData;
}
