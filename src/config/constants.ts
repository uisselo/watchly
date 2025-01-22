const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const HEADER_NAV_ITEMS = [
  { label: "Browse Movies", link: "/browse" },
  { label: "Celebrities", link: "/celebrities" },
];

const FOOTER_NAV_ITEMS = [
  { label: "About us", link: "/about" },
  { label: "Terms of Use", link: "/terms-of-use" },
  { label: "FAQs", link: "/faqs" },
];

export { API_URL, API_KEY, HEADER_NAV_ITEMS, FOOTER_NAV_ITEMS };
