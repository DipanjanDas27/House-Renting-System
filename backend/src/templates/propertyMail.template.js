import {baseTemplate} from "./baseMailTemplate.js";

export const propertyCreatedTemplate = (title) =>
  baseTemplate({
    title: "Property Listed Successfully",
    subtitle: "Your property is now live.",
    content: `
      <p>Your property <strong>${title}</strong> has been successfully listed on Dwellio.</p>
    `,
  });