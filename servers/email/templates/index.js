"use server";
import { render } from "@react-email/components";
import React from "react";
import NewUserGreet from "./NewUserGreet.jsx";
import PasswordReset from "./PasswordReset.jsx";
import Test from "./Test.jsx";
import sanitizeHtml from "sanitize-html";

const templates = {
  newusergreet: NewUserGreet,
  test: Test,
  passwordreset: PasswordReset,
};

function sanitizeProps(props) {
  const sanitized = {};
  for (const key in props) {
    if (typeof props[key] === "string") {
      sanitized[key] = sanitizeHtml(props[key], { allowedTags: [], allowedAttributes: {} });
    } else {
      sanitized[key] = props[key];
    }
  }
  return sanitized;
}

export async function renderTemplate(name, props) {
  const TemplateComponent = templates[name.toLowerCase()];
  if (!TemplateComponent) throw new Error("Template bulunamadı: " + name);
  const safeProps = sanitizeProps(props);
  return await render(React.createElement(TemplateComponent, safeProps));
}
