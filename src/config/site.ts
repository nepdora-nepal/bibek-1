export const siteConfig = {
  name: "Nepdora",
  description: "Nepdora Preview System",
  tenantName: "brainstorm-global-education",
  get apiBaseUrl() {
    return `https://${this.tenantName}.nepdora.baliyoventures.com`;
  },
};

export const getApiBaseUrl = (): string => {
  return siteConfig.apiBaseUrl;
};