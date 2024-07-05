import React, { useState } from "react";
import {
  Container,
  Wrapper,
  TitleWrap,
  Title,
  Form,
  Flex,
  Label,
  Input,
  Span,
  SignIn,
  SignInLink,
  ErrorText,
  Button,
} from "./SignUp";
import styled from "styled-components";

export const SignInWrapper = styled.div`
  border: 1px solid red;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    max-width: 468px;
  }
`;

interface SignUpFormData {
  email: string;
  password: string;
}

interface SignUpFormProps {
  title?: string;
  className?: string;
  onSubmitForm?: (formData: SignUpFormData) => void;
}

const SignInForm: React.FC<SignUpFormProps> = ({
  title,
  className,
  onSubmitForm,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase())
      ? undefined
      : "Invalid email address";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("change");
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("From Data:", formData);

    // email validation
    const emailError = validateEmail(formData.email);
    if (emailError) {
      console.log("email is invalid");
      setEmailError("email is invalid");
      return;
    }

    if (onSubmitForm) {
      onSubmitForm(formData);
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <Container>
      <Wrapper>
        <Form className={className} onSubmit={handleSubmit}>
          <Flex>
            <Label style={{ visibility: "hidden" }}>
              <Input />
            </Label>
            <Label style={{ visibility: "hidden" }}>
              <Input />
            </Label>
          </Flex>
          <TitleWrap>
            <Title> {title && <h2>{title}</h2>}</Title>
          </TitleWrap>
          <Label>
            <Input
              type="email"
              placeholder=""
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <Span>Email</Span>
            {emailError && <ErrorText>{emailError}</ErrorText>}
          </Label>
          <Label>
            <Input
              type="text"
              placeholder=""
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <Span>Password</Span>
          </Label>

          <Button type="submit">Sign Up</Button>
        </Form>
        <SignIn>
          Don't have an account? <SignInLink to="/">Sign Up</SignInLink>
        </SignIn>
      </Wrapper>
    </Container>
  );
};

export default SignInForm;
