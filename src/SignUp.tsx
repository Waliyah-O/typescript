import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    from{
        transform: scale(0.9);
        opacity: 1;
    }
    to{
        transform: scale(1.8);
        opacity: 0;
    }
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  /* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* @media screen and (max-width: 400px) {
    width: 100%;
  } */
`;

export const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #474747;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;

  &::before,
  &::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #474747;
  }

  &::before {
    width: 18px;
    height: 18px;
    background-color: #474747;
  }

  &::after {
    width: 18px;
    height: 18px;
    animation: ${pulse} 1s linear infinite;
  }
`;

export const Form = styled.form`
  max-width: 468px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  padding: 20px;
  position: relative;
  margin-bottom: 10px;
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
`;

export const Label = styled.label`
  position: relative;
  display: block;

  span {
    position: absolute;
    left: 10px;
    top: -20px;
    transition: 0.2s;
    font-size: 0.9em;
  }
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #cbcbcb;
  width: 100%;
  box-sizing: border-box;
  height: 54px;
  color: #6d6d6d;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.84px;
  outline: none;

  /* @media screen and (min-width: 1000px) {
    width: 550px;
  }
 */

  &:placeholder-shown + span {
    top: 15px;
  }

  &:focus + span,
  &:valid + span {
    top: 35px;
    font-weight: 600;
  }

  &:valid + span {
    color: green;
  }
`;

export const Span = styled.span`
  position: absolute;
  left: 10px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px 22px 10px 22px;
  background: #000000;
  color: #ffffff;
  outline: none;
  border: none;
  font-size: 16px;
  transform: 0.3s ease;
`;

export const SignIn = styled.p`
  text-align: right;
  font-size: 14px;
  text-align: center;
  color: rgba(88, 87, 87, 0.822);
  margin-bottom: 10px;
`;

export const SignInLink = styled(LinkR)`
  color: #474747;

  &:hover {
    text-decoration: underline #474747;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 10px;
`;

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  title?: string;
  className?: string;
  onSubmitForm?: (formData: SignUpFormData) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  title,
  className,
  onSubmitForm,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase())
      ? undefined
      : "Invalid email address";
  };

  const validatePassword = (password: string) => {
    return password.length >= 6
      ? undefined
      : "Password must be at least 6 characters long";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("change");
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("From Data:", formData);

    // clear password error
    if (name === "password") {
      setPasswordError(undefined);
    }

    // pasword validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setPasswordError(passwordError);
    }
    if (formData.password !== formData.confirmPassword) {
      console.log("passwords do not match");
      setPasswordError("passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Container>
      <Wrapper>
        <Form className={className} onSubmit={handleSubmit}>
          <TitleWrap>
            <Title> {title && <h2>{title}</h2>}</Title>
          </TitleWrap>

          <Flex>
            <Label>
              <Input
                type="text"
                placeholder=""
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Span>Firstname</Span>
            </Label>
            <Label>
              <Input
                type="text"
                placeholder=""
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                required
              />
              <Span>Lastname</Span>
            </Label>
          </Flex>
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
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
          </Label>
          <Label>
            <Input
              type="text"
              placeholder=""
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />
            <Span>Confirm Password</Span>
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
          </Label>

          <Button type="submit">Sign Up</Button>
        </Form>
        <SignIn>
          Already have an account? <SignInLink to="/">Sign In</SignInLink>
        </SignIn>
      </Wrapper>
    </Container>
  );
};

export default SignUpForm;
