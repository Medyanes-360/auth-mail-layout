"use server"
import React from "react";
import { render } from "@react-email/components";
import NewUserGreet from "./NewUserGreet.jsx";
import Test from "./Test.jsx";
import PasswordReset from "./PasswordReset.jsx";

const templates = {
  newusergreet: NewUserGreet,
  test: Test,
  passwordreset: PasswordReset
};

export async function renderTemplate(name, props) {
  const TemplateComponent = templates[name.toLowerCase()];
  if (!TemplateComponent) throw new Error("Template bulunamadı: " + name);
  return await render(React.createElement(TemplateComponent, props));
}